import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAuth, canEditPDs } from "@/lib/auth";
import PDForm from "./PDForm";
import PDComplianceFlags from "./PDComplianceFlags";
import PDCases from "./PDCases";
import PDEarnings from "./PDEarnings";

export default async function PDDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireAuth();
  const { id } = await params;
  const canEdit = canEditPDs(user.role);

  // Check if this is a "new" page
  if (id === "new") {
    if (!canEdit) {
      notFound();
    }
    return (
      <div className="max-w-2xl">
        <h1 className="text-2xl font-semibold text-slate-800 mb-6">Add New PD</h1>
        <PDForm pd={null} userId={user.id} />
      </div>
    );
  }

  const pd = await prisma.pD.findUnique({
    where: { id },
    include: {
      complianceFlags: { orderBy: { createdAt: "desc" } },
      pools: { include: { pool: true } },
    },
  });

  if (!pd) {
    notFound();
  }

  // Get recent cases
  const recentCases = await prisma.case.findMany({
    where: { assignedPdId: id },
    orderBy: { createdAt: "desc" },
    take: 10,
    select: {
      id: true,
      trackingCode: true,
      status: true,
      mainCategory: true,
      createdAt: true,
    },
  });

  // Get earnings summary
  const earningsSummary = await prisma.earningsLedger.aggregate({
    where: { pdId: id },
    _sum: { baseAmount: true, bonusAmount: true },
  });

  const unpaidEarnings = await prisma.earningsLedger.aggregate({
    where: { pdId: id, payoutStatus: "UNPAID" },
    _sum: { baseAmount: true, bonusAmount: true },
  });

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-mono font-semibold text-slate-800">
            {pd.pdCode}
          </h1>
          <p className="text-slate-500">{pd.fullName}</p>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={pd.status} />
          <VerificationBadge state={pd.verificationState} />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main form */}
        <div className="lg:col-span-2">
          <PDForm pd={pd} canEdit={canEdit} userId={user.id} />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats */}
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <h3 className="font-medium text-slate-800 mb-3">Performance</h3>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-500">Cases Claimed</dt>
                <dd className="text-slate-700">{pd.casesClaimedCount}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Cases Active</dt>
                <dd className="text-slate-700">{pd.casesActiveCount}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Cases Completed</dt>
                <dd className="text-slate-700">{pd.casesCompletedCount}</dd>
              </div>
            </dl>
          </div>

          {/* Pool memberships */}
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <h3 className="font-medium text-slate-800 mb-3">Pool Memberships</h3>
            {pd.pools.length === 0 ? (
              <p className="text-sm text-slate-500">Not in any pools</p>
            ) : (
              <div className="space-y-1">
                {pd.pools.map((pp) => (
                  <div
                    key={pp.id}
                    className={`text-sm px-2 py-1 rounded ${
                      pp.isActive
                        ? "bg-green-50 text-green-700"
                        : "bg-slate-50 text-slate-500"
                    }`}
                  >
                    {pp.pool.city} {!pp.isActive && "(inactive)"}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Earnings summary (hak ediş) */}
          <PDEarnings
            totalEarned={earningsSummary._sum.baseAmount || 0}
            totalBonus={earningsSummary._sum.bonusAmount || 0}
            unpaidAmount={unpaidEarnings._sum.baseAmount || 0}
            unpaidBonus={unpaidEarnings._sum.bonusAmount || 0}
          />
        </div>
      </div>

      {/* Compliance flags */}
      <PDComplianceFlags
        pdId={pd.id}
        flags={pd.complianceFlags}
        canEdit={canEdit}
        userId={user.id}
      />

      {/* Recent cases */}
      <PDCases cases={recentCases} />
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    ACTIVE: "bg-green-100 text-green-700",
    PAUSED: "bg-amber-100 text-amber-700",
    REMOVED: "bg-slate-100 text-slate-500",
  };
  return (
    <span className={`px-2 py-1 rounded text-sm font-medium ${colors[status]}`}>
      {status}
    </span>
  );
}

function VerificationBadge({ state }: { state: string }) {
  const colors: Record<string, string> = {
    PENDING: "bg-amber-100 text-amber-700",
    VERIFIED: "bg-green-100 text-green-700",
    REJECTED: "bg-red-100 text-red-700",
  };
  return (
    <span className={`px-2 py-1 rounded text-sm font-medium ${colors[state]}`}>
      {state}
    </span>
  );
}
