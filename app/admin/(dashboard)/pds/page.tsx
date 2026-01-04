import { prisma } from "@/lib/db";
import { requireAuth, canEditPDs } from "@/lib/auth";
import Link from "next/link";
import { Prisma, PDStatus, VerificationState } from "@prisma/client";

interface SearchParams {
  status?: string;
  search?: string;
  city?: string;
  verification?: string;
  page?: string;
}

const PAGE_SIZE = 25;

export default async function PDsListPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const user = await requireAuth();
  const params = await searchParams;
  const canEdit = canEditPDs(user.role);

  // Build where clause
  const where: Prisma.PDWhereInput = {};

  if (params.status) {
    where.status = params.status as PDStatus;
  }

  if (params.search) {
    where.OR = [
      { pdCode: { contains: params.search, mode: "insensitive" } },
      { fullName: { contains: params.search, mode: "insensitive" } },
      { email: { contains: params.search, mode: "insensitive" } },
    ];
  }

  if (params.city) {
    where.city = { contains: params.city, mode: "insensitive" };
  }

  if (params.verification) {
    where.verificationState = params.verification as VerificationState;
  }

  const page = parseInt(params.page || "1", 10);
  const skip = (page - 1) * PAGE_SIZE;

  const [pds, total] = await Promise.all([
    prisma.pD.findMany({
      where,
      include: {
        _count: { select: { cases: true, complianceFlags: { where: { resolvedAt: null } } } },
      },
      orderBy: { createdAt: "desc" },
      take: PAGE_SIZE,
      skip,
    }),
    prisma.pD.count({ where }),
  ]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-800">PDs</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500">{total} total</span>
          {canEdit && (
            <Link
              href="/admin/pds/new"
              className="px-4 py-2 bg-teal-600 text-white rounded text-sm hover:bg-teal-700"
            >
              + Add PD
            </Link>
          )}
        </div>
      </div>

      {/* Filters */}
      <PDFilters currentParams={params} />

      {/* Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-4 py-3 text-left font-medium text-slate-600">PD Code</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Name</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">City</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Status</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Verification</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Cases</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Flags</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pds.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-slate-500">
                    No PDs found
                  </td>
                </tr>
              ) : (
                pds.map((pd) => (
                  <tr key={pd.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/pds/${pd.id}`}
                        className="font-mono text-teal-600 hover:text-teal-700"
                      >
                        {pd.pdCode}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-slate-700">{pd.fullName}</td>
                    <td className="px-4 py-3 text-slate-600">{pd.city}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={pd.status} />
                    </td>
                    <td className="px-4 py-3">
                      <VerificationBadge state={pd.verificationState} />
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {pd.casesActiveCount} active / {pd.casesCompletedCount} completed
                    </td>
                    <td className="px-4 py-3">
                      {pd._count.complianceFlags > 0 && (
                        <span className="px-1.5 py-0.5 bg-red-100 text-red-700 rounded text-xs">
                          {pd._count.complianceFlags} open
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4">
          <div className="text-sm text-slate-500">Page {page} of {totalPages}</div>
          <div className="flex gap-2">
            {page > 1 && (
              <Link
                href={`/admin/pds?${new URLSearchParams({ ...params, page: String(page - 1) })}`}
                className="px-3 py-1 text-sm border border-slate-300 rounded hover:bg-slate-50"
              >
                Previous
              </Link>
            )}
            {page < totalPages && (
              <Link
                href={`/admin/pds?${new URLSearchParams({ ...params, page: String(page + 1) })}`}
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

function PDFilters({ currentParams }: { currentParams: SearchParams }) {
  return (
    <form className="bg-white rounded-lg border border-slate-200 p-4">
      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          name="search"
          defaultValue={currentParams.search}
          placeholder="Search PD code, name, email..."
          className="flex-1 min-w-[200px] px-3 py-2 border border-slate-300 rounded-md text-sm"
        />
        <select
          name="status"
          defaultValue={currentParams.status}
          className="px-3 py-2 border border-slate-300 rounded-md text-sm"
        >
          <option value="">All Statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="PAUSED">Paused</option>
          <option value="REMOVED">Removed</option>
        </select>
        <select
          name="verification"
          defaultValue={currentParams.verification}
          className="px-3 py-2 border border-slate-300 rounded-md text-sm"
        >
          <option value="">All Verification</option>
          <option value="PENDING">Pending</option>
          <option value="VERIFIED">Verified</option>
          <option value="REJECTED">Rejected</option>
        </select>
        <input
          type="text"
          name="city"
          defaultValue={currentParams.city}
          placeholder="City"
          className="w-32 px-3 py-2 border border-slate-300 rounded-md text-sm"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-teal-600 text-white rounded-md text-sm hover:bg-teal-700"
        >
          Filter
        </button>
      </div>
    </form>
  );
}

function StatusBadge({ status }: { status: PDStatus }) {
  const colors: Record<PDStatus, string> = {
    ACTIVE: "bg-green-100 text-green-700",
    PAUSED: "bg-amber-100 text-amber-700",
    REMOVED: "bg-slate-100 text-slate-500",
  };
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${colors[status]}`}>
      {status}
    </span>
  );
}

function VerificationBadge({ state }: { state: VerificationState }) {
  const colors: Record<VerificationState, string> = {
    PENDING: "bg-amber-100 text-amber-700",
    VERIFIED: "bg-green-100 text-green-700",
    REJECTED: "bg-red-100 text-red-700",
  };
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${colors[state]}`}>
      {state}
    </span>
  );
}
