import { prisma } from "@/lib/db";
import { requireAuth, shouldMaskPII, maskEmail, maskPhone } from "@/lib/auth";
import Link from "next/link";
import { Prisma, CaseStatus, EscalationLevel } from "@prisma/client";
import CasesFilters from "./CasesFilters";
import CasesTable from "./CasesTable";

interface SearchParams {
  status?: string;
  search?: string;
  pdId?: string;
  escalation?: string;
  city?: string;
  country?: string;
  category?: string;
  dateFrom?: string;
  dateTo?: string;
  page?: string;
}

const PAGE_SIZE = 25;

export default async function CasesListPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const user = await requireAuth();
  const params = await searchParams;
  const maskPII = shouldMaskPII(user.role);

  // Build where clause
  const where: Prisma.CaseWhereInput = {};

  if (params.status) {
    const statuses = params.status.split(",") as CaseStatus[];
    where.status = { in: statuses };
  }

  if (params.search) {
    where.OR = [
      { trackingCode: { contains: params.search, mode: "insensitive" } },
      { patientName: { contains: params.search, mode: "insensitive" } },
      { patientEmail: { contains: params.search, mode: "insensitive" } },
    ];
  }

  if (params.pdId) {
    where.assignedPdId = params.pdId;
  }

  if (params.escalation) {
    if (params.escalation === "none") {
      where.escalationLevel = EscalationLevel.NONE;
    } else {
      where.escalationLevel = params.escalation as EscalationLevel;
    }
  }

  if (params.city) {
    where.patientCity = { contains: params.city, mode: "insensitive" };
  }

  if (params.country) {
    where.patientCountry = { contains: params.country, mode: "insensitive" };
  }

  if (params.category) {
    where.mainCategory = params.category;
  }

  if (params.dateFrom) {
    where.createdAt = { ...((where.createdAt as object) || {}), gte: new Date(params.dateFrom) };
  }

  if (params.dateTo) {
    where.createdAt = { ...((where.createdAt as object) || {}), lte: new Date(params.dateTo) };
  }

  const page = parseInt(params.page || "1", 10);
  const skip = (page - 1) * PAGE_SIZE;

  const [cases, total, pds] = await Promise.all([
    prisma.case.findMany({
      where,
      include: {
        assignedPd: { select: { pdCode: true, fullName: true } },
        escalations: { where: { resolvedAt: null }, select: { id: true } },
      },
      orderBy: { createdAt: "desc" },
      take: PAGE_SIZE,
      skip,
    }),
    prisma.case.count({ where }),
    prisma.pD.findMany({
      where: { status: "ACTIVE" },
      select: { id: true, pdCode: true, fullName: true },
      orderBy: { fullName: "asc" },
    }),
  ]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  // Apply PII masking if needed
  const displayCases = cases.map((c) => ({
    ...c,
    patientEmail: maskPII ? maskEmail(c.patientEmail) : c.patientEmail,
    patientPhone: maskPII ? maskPhone(c.patientPhone) : c.patientPhone,
    hasOpenEscalation: c.escalations.length > 0,
  }));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-800">Cases</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500">{total} total</span>
          <Link
            href="/admin/cases/export"
            className="text-sm text-teal-600 hover:text-teal-700"
          >
            Export CSV
          </Link>
        </div>
      </div>

      <CasesFilters pds={pds} currentParams={params} />

      <CasesTable cases={displayCases} />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4">
          <div className="text-sm text-slate-500">
            Page {page} of {totalPages}
          </div>
          <div className="flex gap-2">
            {page > 1 && (
              <Link
                href={`/admin/cases?${new URLSearchParams({ ...params, page: String(page - 1) })}`}
                className="px-3 py-1 text-sm border border-slate-300 rounded hover:bg-slate-50"
              >
                Previous
              </Link>
            )}
            {page < totalPages && (
              <Link
                href={`/admin/cases?${new URLSearchParams({ ...params, page: String(page + 1) })}`}
                className="px-3 py-1 text-sm border border-slate-300 rounded hover:bg-slate-50"
              >
                Next
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
