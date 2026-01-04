import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { getPDSessionFromCookies } from "@/lib/auth/pd-session";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/Card";
import PDPortalHeader from "./PDPortalHeader";

// Status config
const statusConfig: Record<string, { label: string; variant: "secondary" | "primary" | "success" | "warning" | "error" }> = {
  received: { label: "Received", variant: "secondary" },
  under_review: { label: "Under Review", variant: "primary" },
  channel_contacted: { label: "Channel Contacted", variant: "warning" },
  information_ready: { label: "Info Ready", variant: "primary" },
  next_steps_shared: { label: "Next Steps Shared", variant: "primary" },
  confirmed: { label: "Confirmed", variant: "success" },
  completed: { label: "Completed", variant: "success" },
  closed: { label: "Closed", variant: "secondary" },
};

// Format date
function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

interface CaseData {
  id: string;
  trackingCode: string;
  patientName: string | null;
  patientCity: string | null;
  mainCategory: string;
  medicalSubType: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export default async function PDPortalPage() {
  // Server-side session validation
  const session = await getPDSessionFromCookies();
  
  if (!session) {
    redirect("/pd/login");
  }

  // Fetch PD info and cases from database
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

  // Fetch assigned cases
  const cases: CaseData[] = await prisma.case.findMany({
    where: { assignedPdId: pd.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      trackingCode: true,
      patientName: true,
      patientCity: true,
      mainCategory: true,
      medicalSubType: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  // Calculate stats
  const stats = {
    total: cases.length,
    open: cases.filter((c: CaseData) => !["completed", "closed"].includes(c.status)).length,
    completed: cases.filter((c: CaseData) => c.status === "completed").length,
    thisMonth: cases.filter((c: CaseData) => {
      const date = new Date(c.createdAt);
      const now = new Date();
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    }).length,
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
              className="py-4 border-b-2 border-primary-600 text-primary-600 font-medium text-sm"
            >
              Dashboard
            </Link>
            <Link
              href="/pd/portal/earnings"
              className="py-4 border-b-2 border-transparent text-gray-600 hover:text-gray-900 font-medium text-sm"
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
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {pd.fullName}</h1>
          <p className="text-gray-600">Here&apos;s an overview of your cases.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card variant="bordered">
            <CardContent className="py-4">
              <p className="text-sm text-gray-500">Total Cases</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </CardContent>
          </Card>
          <Card variant="bordered">
            <CardContent className="py-4">
              <p className="text-sm text-gray-500">Open Cases</p>
              <p className="text-3xl font-bold text-primary-600">{stats.open}</p>
            </CardContent>
          </Card>
          <Card variant="bordered">
            <CardContent className="py-4">
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-3xl font-bold text-success-600">{stats.completed}</p>
            </CardContent>
          </Card>
          <Card variant="bordered">
            <CardContent className="py-4">
              <p className="text-sm text-gray-500">This Month</p>
              <p className="text-3xl font-bold text-gray-900">{stats.thisMonth}</p>
            </CardContent>
          </Card>
        </div>

        {/* Cases Section */}
        <Card variant="bordered">
          <CardHeader>
            <CardTitle>Your Cases</CardTitle>
          </CardHeader>
          <CardContent>
            {cases.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-gray-500">No cases assigned yet</p>
                <p className="text-sm text-gray-400 mt-1">Cases will appear here once assigned to you.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Code</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Patient</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 hidden sm:table-cell">Category</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 hidden md:table-cell">Updated</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-500"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cases.map((c: CaseData) => (
                      <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <span className="font-mono text-sm text-primary-600">{c.trackingCode}</span>
                        </td>
                        <td className="py-3 px-4">
                          <p className="font-medium text-gray-900 text-sm">{c.patientName?.split(" ")[0] || "Patient"}.</p>
                          <p className="text-xs text-gray-500">{c.patientCity || "Unknown"}</p>
                        </td>
                        <td className="py-3 px-4 hidden sm:table-cell">
                          <p className="text-sm text-gray-900">{c.mainCategory}</p>
                          {c.medicalSubType && <p className="text-xs text-gray-500">{c.medicalSubType}</p>}
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            variant={statusConfig[c.status]?.variant || "secondary"}
                            size="sm"
                          >
                            {statusConfig[c.status]?.label || c.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 hidden md:table-cell">
                          <span className="text-sm text-gray-500">{formatDate(c.updatedAt)}</span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Link href={`/pd/portal/case/${c.trackingCode}`}>
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <Link href="/pd/portal/earnings" className="block">
            <Card variant="bordered" className="hover:border-primary-300 transition-colors">
              <CardContent className="py-6 flex items-center gap-4">
                <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">View Earnings</h3>
                  <p className="text-sm text-gray-500">Track your partnership fees</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/pd/portal/education" className="block">
            <Card variant="bordered" className="hover:border-primary-300 transition-colors">
              <CardContent className="py-6 flex items-center gap-4">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Education</h3>
                  <p className="text-sm text-gray-500">Training modules and guides</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/pd/portal/profile" className="block">
            <Card variant="bordered" className="hover:border-primary-300 transition-colors">
              <CardContent className="py-6 flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Profile</h3>
                  <p className="text-sm text-gray-500">Your account settings</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  );
}
