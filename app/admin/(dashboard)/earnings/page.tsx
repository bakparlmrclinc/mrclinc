// app/admin/(dashboard)/earnings/page.tsx
// Earnings & Payouts Management - Hak Ediş Yönetimi

import { prisma } from "@/lib/db";
import { requireAuth, canViewEarnings, canEditEarnings } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PayoutActions } from "./PayoutActions";

interface SearchParams {
  status?: string;
  pdId?: string;
  page?: string;
}

const PAGE_SIZE = 25;

export default async function EarningsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const user = await requireAuth();
  
  if (!canViewEarnings(user.role)) {
    redirect("/admin");
  }

  const canEdit = canEditEarnings(user.role);
  const params = await searchParams;

  const page = parseInt(params.page || "1");
  const skip = (page - 1) * PAGE_SIZE;

  const where: Record<string, unknown> = {};
  if (params.status) {
    where.payoutStatus = params.status;
  }
  if (params.pdId) {
    where.pdId = params.pdId;
  }

  const [earnings, total, pds, stats] = await Promise.all([
    prisma.earningsLedger.findMany({
      where,
      include: {
        pd: { select: { pdCode: true, fullName: true } },
        case: { select: { trackingCode: true } },
      },
      orderBy: { earnedAt: "desc" },
      skip,
      take: PAGE_SIZE,
    }),
    prisma.earningsLedger.count({ where }),
    prisma.pD.findMany({
      where: { status: "ACTIVE" },
      select: { id: true, pdCode: true, fullName: true },
      orderBy: { fullName: "asc" },
    }),
    prisma.earningsLedger.groupBy({
      by: ["payoutStatus"],
      _sum: { baseAmount: true, bonusAmount: true },
      _count: true,
    }),
  ]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  const formatCurrency = (amount: number | null, currency: string = "EUR") => {
    if (amount === null) return "-";
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency,
    }).format(Number(amount));
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "UNPAID":
        return "bg-yellow-100 text-yellow-800";
      case "SCHEDULED":
        return "bg-blue-100 text-blue-800";
      case "PAID":
        return "bg-green-100 text-green-800";
      case "ADJUSTED":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Calculate totals
  const unpaidTotal = stats.find(s => s.payoutStatus === "UNPAID");
  const scheduledTotal = stats.find(s => s.payoutStatus === "SCHEDULED");
  const paidTotal = stats.find(s => s.payoutStatus === "PAID");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Earnings & Payouts
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Hak ediş yönetimi ve ödeme takibi
          </p>
        </div>
        <Link
          href="/api/admin/export/payouts"
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
        >
          Export CSV
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="text-sm text-yellow-700">Unpaid (Bekleyen)</div>
          <div className="text-2xl font-semibold text-yellow-800 mt-1">
            {formatCurrency(
              Number(unpaidTotal?._sum.baseAmount || 0) + Number(unpaidTotal?._sum.bonusAmount || 0),
              "EUR"
            )}
          </div>
          <div className="text-xs text-yellow-600 mt-1">
            {unpaidTotal?._count || 0} entries
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="text-sm text-blue-700">Scheduled (Planlanmış)</div>
          <div className="text-2xl font-semibold text-blue-800 mt-1">
            {formatCurrency(
              Number(scheduledTotal?._sum.baseAmount || 0) + Number(scheduledTotal?._sum.bonusAmount || 0),
              "EUR"
            )}
          </div>
          <div className="text-xs text-blue-600 mt-1">
            {scheduledTotal?._count || 0} entries
          </div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="text-sm text-green-700">Paid (Ödendi)</div>
          <div className="text-2xl font-semibold text-green-800 mt-1">
            {formatCurrency(
              Number(paidTotal?._sum.baseAmount || 0) + Number(paidTotal?._sum.bonusAmount || 0),
              "EUR"
            )}
          </div>
          <div className="text-xs text-green-600 mt-1">
            {paidTotal?._count || 0} entries
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <form className="flex flex-wrap gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Status
            </label>
            <select
              name="status"
              defaultValue={params.status || ""}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All</option>
              <option value="UNPAID">Unpaid</option>
              <option value="SCHEDULED">Scheduled</option>
              <option value="PAID">Paid</option>
              <option value="ADJUSTED">Adjusted</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              PD
            </label>
            <select
              name="pdId"
              defaultValue={params.pdId || ""}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All PDs</option>
              {pds.map((pd) => (
                <option key={pd.id} value={pd.id}>
                  {pd.pdCode} - {pd.fullName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
            >
              Filter
            </button>
            {(params.status || params.pdId) && (
              <Link
                href="/admin/earnings"
                className="px-4 py-2 text-gray-500 hover:text-gray-700 text-sm"
              >
                Clear
              </Link>
            )}
          </div>
        </form>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                PD
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Case
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Service
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Base
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bonus
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Earned
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              {canEdit && (
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {earnings.map((entry) => (
              <tr key={entry.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {entry.pd.pdCode}
                  </div>
                  <div className="text-xs text-gray-500">{entry.pd.fullName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    href={`/admin/cases/${entry.caseId}`}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    {entry.case.trackingCode}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {entry.serviceType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                  {formatCurrency(Number(entry.baseAmount), entry.currency)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                  {Number(entry.bonusAmount) > 0
                    ? formatCurrency(Number(entry.bonusAmount), entry.currency)
                    : "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(entry.earnedAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      entry.payoutStatus
                    )}`}
                  >
                    {entry.payoutStatus}
                  </span>
                </td>
                {canEdit && (
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <PayoutActions
                      entryId={entry.id}
                      currentStatus={entry.payoutStatus}
                    />
                  </td>
                )}
              </tr>
            ))}
            {earnings.length === 0 && (
              <tr>
                <td
                  colSpan={canEdit ? 8 : 7}
                  className="px-6 py-12 text-center text-sm text-gray-500"
                >
                  No earnings entries found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Page {page} of {totalPages} ({total} total)
          </div>
          <div className="flex gap-2">
            {page > 1 && (
              <Link
                href={`/admin/earnings?page=${page - 1}${
                  params.status ? `&status=${params.status}` : ""
                }${params.pdId ? `&pdId=${params.pdId}` : ""}`}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
              >
                Previous
              </Link>
            )}
            {page < totalPages && (
              <Link
                href={`/admin/earnings?page=${page + 1}${
                  params.status ? `&status=${params.status}` : ""
                }${params.pdId ? `&pdId=${params.pdId}` : ""}`}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
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
