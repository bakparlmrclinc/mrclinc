import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { getPDSessionFromCookies } from "@/lib/auth/pd-session";
import { Badge } from "@/components/ui/Badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/Card";
import PDPortalHeader from "../../PDPortalHeader";

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
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export default async function PDCaseDetailPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  
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

  // Fetch the case - must be assigned to this PD
  const caseData = await prisma.case.findFirst({
    where: {
      trackingCode: code.toUpperCase(),
      assignedPdId: pd.id, // Authorization: PD can only see their own cases
    },
    include: {
      statusHistory: {
        orderBy: { changedAt: "desc" },
        take: 10,
      },
      channel: {
        select: { name: true, city: true },
      },
    },
  });

  if (!caseData) {
    notFound();
  }

  // Mask patient info for privacy (show initials only)
  const patientInitials = caseData.patientName
    ? caseData.patientName.split(" ").map((n: string) => n[0]).join("").toUpperCase()
    : "N/A";

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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/pd/portal" className="text-primary-600 hover:text-primary-700 text-sm">
            ← Back to Dashboard
          </Link>
        </div>

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-mono">{caseData.trackingCode}</h1>
            <p className="text-gray-500 mt-1">Case assigned to you</p>
          </div>
          <Badge variant={statusConfig[caseData.status]?.variant || "secondary"} size="sm">
            {statusConfig[caseData.status]?.label || caseData.status}
          </Badge>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Case Overview */}
          <Card variant="bordered">
            <CardHeader>
              <CardTitle>Case Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Patient</dt>
                  <dd className="text-sm font-medium text-gray-900">{patientInitials}.</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Location</dt>
                  <dd className="text-sm text-gray-900">{caseData.patientCity || "Unknown"}, {caseData.patientCountry || "Unknown"}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Category</dt>
                  <dd className="text-sm text-gray-900">{caseData.mainCategory}</dd>
                </div>
                {caseData.medicalSubType && (
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-500">Service Type</dt>
                    <dd className="text-sm text-gray-900">{caseData.medicalSubType}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Submitted</dt>
                  <dd className="text-sm text-gray-900">{formatDate(caseData.createdAt)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Last Updated</dt>
                  <dd className="text-sm text-gray-900">{formatDate(caseData.updatedAt)}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          {/* Clinical Channel */}
          <Card variant="bordered">
            <CardHeader>
              <CardTitle>Clinical Channel</CardTitle>
            </CardHeader>
            <CardContent>
              {caseData.channel ? (
                <dl className="space-y-3">
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-500">Channel</dt>
                    <dd className="text-sm font-medium text-gray-900">{caseData.channel.name}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-500">Location</dt>
                    <dd className="text-sm text-gray-900">{caseData.channel.city}</dd>
                  </div>
                </dl>
              ) : (
                <div className="text-center py-6">
                  <p className="text-sm text-gray-500">Channel not yet assigned</p>
                  <p className="text-xs text-gray-400 mt-1">The platform will assign a channel once the case is processed.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Status History */}
        <Card variant="bordered" className="mt-6">
          <CardHeader>
            <CardTitle>Status History</CardTitle>
          </CardHeader>
          <CardContent>
            {caseData.statusHistory.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">No status changes recorded yet.</p>
            ) : (
              <div className="space-y-4">
                {caseData.statusHistory.map((h, idx) => (
                  <div key={h.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${idx === 0 ? "bg-primary-600" : "bg-gray-300"}`} />
                      {idx < caseData.statusHistory.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-200 mt-1" />
                      )}
                    </div>
                    <div className="pb-4">
                      <p className="text-sm font-medium text-gray-900">
                        {statusConfig[h.status]?.label || h.status}
                      </p>
                      <p className="text-xs text-gray-500">{formatDate(h.changedAt)}</p>
                      {h.note && <p className="text-sm text-gray-600 mt-1">{h.note}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info Note */}
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>Note:</strong> Patient contact information is managed by the platform. 
            If you need to communicate with the patient regarding this case, please use the platform&apos;s messaging system.
          </p>
        </div>
      </main>
    </div>
  );
}
