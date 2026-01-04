<<<<<<< HEAD
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
=======
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

interface Transaction {
  id: string;
  caseCode: string;
  service: string;
  category: "aesthetic" | "cancer" | "general";
  amount: number;
  bonus: number;
  status: "pending" | "approved" | "paid";
  completedAt: string;
  paidAt?: string;
}

interface EarningsSummary {
  totalEarnings: number;
  pendingEarnings: number;
  paidEarnings: number;
  thisMonth: number;
  casesCompleted: number;
}

// Demo data
const demoTransactions: Transaction[] = [
  {
    id: "txn-1",
    caseCode: "TRK-B5M1Q",
    service: "Gallbladder Surgery",
    category: "general",
    amount: 1000,
    bonus: 200,
    status: "paid",
    completedAt: "2024-12-10T16:00:00Z",
    paidAt: "2024-12-15T10:00:00Z",
  },
  {
    id: "txn-2",
    caseCode: "TRK-X7K2P",
    service: "Hair Transplant (FUE)",
    category: "aesthetic",
    amount: 250,
    bonus: 100,
    status: "paid",
    completedAt: "2024-11-28T14:00:00Z",
    paidAt: "2024-12-01T10:00:00Z",
  },
  {
    id: "txn-3",
    caseCode: "TRK-M3N9R",
    service: "Rhinoplasty",
    category: "aesthetic",
    amount: 250,
    bonus: 0,
    status: "paid",
    completedAt: "2024-11-15T11:00:00Z",
    paidAt: "2024-12-01T10:00:00Z",
  },
  {
    id: "txn-4",
    caseCode: "TRK-Q8W4E",
    service: "Second Opinion - Breast Cancer",
    category: "cancer",
    amount: 1000,
    bonus: 200,
    status: "approved",
    completedAt: "2024-12-28T09:00:00Z",
  },
  {
    id: "txn-5",
    caseCode: "TRK-H7G2X",
    service: "Hair Transplant (FUE)",
    category: "aesthetic",
    amount: 250,
    bonus: 100,
    status: "pending",
    completedAt: "2024-12-30T16:00:00Z",
  },
];

const demoSummary: EarningsSummary = {
  totalEarnings: 3350,
  pendingEarnings: 350,
  paidEarnings: 1800,
  thisMonth: 1550,
  casesCompleted: 5,
};

const categoryConfig = {
  aesthetic: { label: "Aesthetic", base: 250, bonus: 100, color: "bg-purple-100 text-purple-700" },
  cancer: { label: "Cancer", base: 1000, bonus: 200, color: "bg-red-100 text-red-700" },
  general: { label: "General", base: 1000, bonus: 200, color: "bg-blue-100 text-blue-700" },
};

const statusConfig: Record<string, { variant: "default" | "primary" | "success" | "warning" }> = {
  pending: { variant: "warning" },
  approved: { variant: "primary" },
  paid: { variant: "success" },
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
  }).format(amount);
};

export default function EarningsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [pdInfo, setPdInfo] = useState<{ name: string; code: string } | null>(null);

  useEffect(() => {
    const session = localStorage.getItem("pdSession");
    if (!session) {
      router.push("/pd/login");
      return;
    }

    const parsed = JSON.parse(session);
    if (!parsed.loggedIn) {
      router.push("/pd/login");
      return;
    }

    setPdInfo({ name: parsed.name, code: parsed.code });
    setIsLoading(false);
  }, [router]);

  const handleSignOut = () => {
    localStorage.removeItem("pdSession");
    router.push("/pd/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Calculate next payment date (1st or 15th)
  const today = new Date();
  const currentDay = today.getDate();
  let nextPaymentDate: Date;
  if (currentDay < 15) {
    nextPaymentDate = new Date(today.getFullYear(), today.getMonth(), 15);
  } else {
    nextPaymentDate = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-xl font-bold text-primary-600">MrClinc</Link>
              <span className="text-gray-300">|</span>
              <span className="text-gray-600 text-sm">PD Portal</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{pdInfo?.name}</p>
                <p className="text-xs text-gray-500 font-mono">{pdInfo?.code}</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleSignOut}>Sign Out</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-8">
            <Link href="/pd/portal" className="py-4 text-sm font-medium text-gray-500 hover:text-gray-700 border-b-2 border-transparent">
              Dashboard
            </Link>
            <Link href="/pd/portal/earnings" className="py-4 text-sm font-medium text-primary-600 border-b-2 border-primary-600">
              Earnings
            </Link>
            <Link href="/pd/portal/education" className="py-4 text-sm font-medium text-gray-500 hover:text-gray-700 border-b-2 border-transparent">
              Education
            </Link>
            <Link href="/pd/portal/profile" className="py-4 text-sm font-medium text-gray-500 hover:text-gray-700 border-b-2 border-transparent">
              Profile
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Earnings</h1>

        {/* Summary Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card variant="bordered">
            <CardContent className="py-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Earnings</p>
                  <p className="text-xl font-bold text-gray-900">{formatCurrency(demoSummary.totalEarnings)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="bordered">
            <CardContent className="py-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-warning-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-warning-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pending</p>
                  <p className="text-xl font-bold text-warning-600">{formatCurrency(demoSummary.pendingEarnings)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="bordered">
            <CardContent className="py-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Paid</p>
                  <p className="text-xl font-bold text-success-600">{formatCurrency(demoSummary.paidEarnings)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="bordered">
            <CardContent className="py-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">This Month</p>
                  <p className="text-xl font-bold text-gray-900">{formatCurrency(demoSummary.thisMonth)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Transaction History */}
          <div className="lg:col-span-2">
            <Card variant="bordered">
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Case</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Service</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-gray-500 hidden sm:table-cell">Category</th>
                        <th className="text-right py-3 px-2 text-sm font-medium text-gray-500">Amount</th>
                        <th className="text-center py-3 px-2 text-sm font-medium text-gray-500">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {demoTransactions.map((txn) => (
                        <tr key={txn.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-2">
                            <Link href={`/pd/portal/case/${txn.caseCode}`} className="font-mono text-sm text-primary-600 hover:underline">
                              {txn.caseCode}
                            </Link>
                            <p className="text-xs text-gray-400">{formatDate(txn.completedAt)}</p>
                          </td>
                          <td className="py-3 px-2">
                            <p className="text-sm text-gray-900">{txn.service}</p>
                          </td>
                          <td className="py-3 px-2 hidden sm:table-cell">
                            <span className={`text-xs px-2 py-1 rounded-full ${categoryConfig[txn.category].color}`}>
                              {categoryConfig[txn.category].label}
                            </span>
                          </td>
                          <td className="py-3 px-2 text-right">
                            <p className="text-sm font-medium text-gray-900">{formatCurrency(txn.amount + txn.bonus)}</p>
                            {txn.bonus > 0 && (
                              <p className="text-xs text-success-600">+{formatCurrency(txn.bonus)} bonus</p>
                            )}
                          </td>
                          <td className="py-3 px-2 text-center">
                            <Badge variant={statusConfig[txn.status].variant} size="sm">
                              {txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {demoTransactions.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No transactions yet
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Payment Schedule */}
            <Card variant="bordered">
              <CardHeader>
                <CardTitle>Payment Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Next Payment</span>
                    <span className="text-sm font-medium text-gray-900">
                      {nextPaymentDate.toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Payment Cycle</span>
                    <span className="text-sm font-medium text-gray-900">1st & 15th</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Currency</span>
                    <span className="text-sm font-medium text-gray-900">EUR</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-400">
                    Payments are processed within 3 business days of each cycle date.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Earnings Structure */}
            <Card variant="bordered">
              <CardHeader>
                <CardTitle>Earnings Structure</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-purple-700">Aesthetic Surgery</span>
                    </div>
                    <p className="text-xs text-purple-600">Base: €250 | Bonus: +€100</p>
                    <p className="text-xs text-purple-500 mt-1">Potential: €350 per case</p>
                  </div>

                  <div className="p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-red-700">Cancer Surgery</span>
                    </div>
                    <p className="text-xs text-red-600">Base: €1,000 | Bonus: +€200</p>
                    <p className="text-xs text-red-500 mt-1">Potential: €1,200 per case</p>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-blue-700">General Surgery</span>
                    </div>
                    <p className="text-xs text-blue-600">Base: €1,000 | Bonus: +€200</p>
                    <p className="text-xs text-blue-500 mt-1">Potential: €1,200 per case</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-400">
                    Bonus awarded for fast bookings (within 14 days) or 3+ cases per month.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Note */}
            <Card variant="bordered" className="bg-gray-50">
              <CardContent className="py-4">
                <div className="flex gap-3">
                  <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Partnership Fees</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Earnings are paid only when treatment is successfully completed. Second Opinion alone does not generate earnings.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
        </div>
      </main>
    </div>
  );
}
