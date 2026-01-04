import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { getPDSessionFromCookies } from "@/lib/auth/pd-session";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/Card";
import PDPortalHeader from "../PDPortalHeader";

// Format currency
function formatCurrency(amount: number, currency: string = "EUR") {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
}

// Format date
function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

interface EarningsEntry {
  id: string;
  earnedAt: Date;
  baseAmount: unknown;
  bonusAmount: unknown;
  payoutStatus: string;
  case: {
    trackingCode: string;
    mainCategory: string;
  } | null;
}

export default async function PDEarningsPage() {
  // Server-side session validation
  const session = await getPDSessionFromCookies();
  
  if (!session) {
    redirect("/pd/login");
  }

  // Fetch PD info
  const pd = await prisma.pD.findUnique({
    where: { id: session.id },
    select: {
      id: true,
      pdCode: true,
      fullName: true,
      status: true,
    },
  });

  if (!pd || pd.status !== "ACTIVE") {
    redirect("/pd/login");
  }

  // Fetch earnings from database
  const earnings: EarningsEntry[] = await prisma.earningsLedger.findMany({
    where: { pdId: pd.id },
    orderBy: { earnedAt: "desc" },
    include: {
      case: {
        select: {
          trackingCode: true,
          mainCategory: true,
        },
      },
    },
  });

  // Calculate summary
  const summary = {
    totalEarnings: earnings.reduce((sum: number, e: EarningsEntry) => sum + Number(e.baseAmount) + Number(e.bonusAmount || 0), 0),
    paidEarnings: earnings
      .filter((e: EarningsEntry) => e.payoutStatus === "PAID")
      .reduce((sum: number, e: EarningsEntry) => sum + Number(e.baseAmount) + Number(e.bonusAmount || 0), 0),
    pendingEarnings: earnings
      .filter((e: EarningsEntry) => e.payoutStatus === "UNPAID" || e.payoutStatus === "SCHEDULED")
      .reduce((sum: number, e: EarningsEntry) => sum + Number(e.baseAmount) + Number(e.bonusAmount || 0), 0),
  };

  const statusColors: Record<string, string> = {
    UNPAID: "bg-yellow-100 text-yellow-800",
    SCHEDULED: "bg-blue-100 text-blue-800",
    PAID: "bg-green-100 text-green-800",
    ADJUSTED: "bg-gray-100 text-gray-600",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PDPortalHeader pdCode={pd.pdCode} pdName={pd.fullName} />

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            <Link
              href="/pd/portal"
              className="py-4 border-b-2 border-transparent text-gray-600 hover:text-gray-900 font-medium text-sm"
            >
              Dashboard
            </Link>
            <Link
              href="/pd/portal/earnings"
              className="py-4 border-b-2 border-primary-600 text-primary-600 font-medium text-sm"
            >
              Earnings
            </Link>
            <Link
              href="/pd/portal/education"
              className="py-4 border-b-2 border-transparent text-gray-600 hover:text-gray-900 font-medium text-sm"
            >
              Education
            </Link>
            <Link
              href="/pd/portal/profile"
              className="py-4 border-b-2 border-transparent text-gray-600 hover:text-gray-900 font-medium text-sm"
            >
              Profile
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Earnings</h1>
          <p className="text-gray-600">Track your partnership earnings and payout status.</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card variant="bordered">
            <CardContent className="py-6">
              <p className="text-sm text-gray-500 mb-1">Total Earnings</p>
              <p className="text-3xl font-bold text-gray-900">{formatCurrency(summary.totalEarnings)}</p>
            </CardContent>
          </Card>
          <Card variant="bordered">
            <CardContent className="py-6">
              <p className="text-sm text-gray-500 mb-1">Paid</p>
              <p className="text-3xl font-bold text-success-600">{formatCurrency(summary.paidEarnings)}</p>
            </CardContent>
          </Card>
          <Card variant="bordered">
            <CardContent className="py-6">
              <p className="text-sm text-gray-500 mb-1">Pending</p>
              <p className="text-3xl font-bold text-warning-600">{formatCurrency(summary.pendingEarnings)}</p>
            </CardContent>
          </Card>
        </div>

        {/* Transactions Table */}
        <Card variant="bordered">
          <CardHeader>
            <CardTitle>Earning History</CardTitle>
          </CardHeader>
          <CardContent>
            {earnings.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-500">No earnings yet</p>
                <p className="text-sm text-gray-400 mt-1">Earnings will appear here once cases are completed.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Case</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Category</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Amount</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {earnings.map((e: EarningsEntry) => (
                      <tr key={e.id} className="border-b border-gray-100">
                        <td className="py-3 px-4 text-sm text-gray-600">{formatDate(e.earnedAt)}</td>
                        <td className="py-3 px-4">
                          <span className="font-mono text-sm text-primary-600">{e.case?.trackingCode || "-"}</span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">{e.case?.mainCategory || "-"}</td>
                        <td className="py-3 px-4 text-sm font-medium text-gray-900">
                          {formatCurrency(Number(e.baseAmount) + Number(e.bonusAmount || 0))}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${statusColors[e.payoutStatus] || "bg-gray-100 text-gray-600"}`}>
                            {e.payoutStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info Note */}
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>Note:</strong> Earnings are recorded when cases reach completion milestones. 
            Payouts are processed according to the schedule outlined in your PD Agreement.
          </p>
        </div>
      </main>
    </div>
  );
}
