import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import Link from "next/link";
import { cache } from "react";

// Cached stats fetcher - deduped per request
const getStats = cache(async () => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [
    totalCasesToday,
    totalCases7d,
    totalCases30d,
    activeCases,
    escalationsOpen,
    completedCount,
    closedCount,
    poolBacklog,
    recentActivity,
  ] = await Promise.all([
    prisma.case.count({ where: { createdAt: { gte: today } } }),
    prisma.case.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
    prisma.case.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
    prisma.case.count({
      where: {
        status: {
          in: [
            "under_review",
            "channel_contacted",
            "information_ready",
            "next_steps_shared",
            "confirmed",
          ],
        },
      },
    }),
    prisma.escalation.count({ where: { resolvedAt: null } }),
    prisma.case.count({ where: { status: "completed" } }),
    prisma.case.count({ where: { status: "closed" } }),
    prisma.case.groupBy({
      by: ["poolCity"],
      where: {
        assignedPdId: null,
        status: { not: "closed" },
        poolCity: { not: null },
      },
      _count: true,
    }),
    prisma.auditLog.findMany({
      take: 20,
      orderBy: { createdAt: "desc" },
      include: { actor: { select: { name: true } } },
    }),
  ]);

  return {
    totalCasesToday,
    totalCases7d,
    totalCases30d,
    activeCases,
    escalationsOpen,
    completedCount,
    closedCount,
    poolBacklog,
    recentActivity,
  };
});

// Cached needs attention fetcher
const getNeedsAttention = cache(async () => {
  const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000);
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const cases = await prisma.case.findMany({
    where: {
      OR: [
        // under_review > 6 hours
        { status: "under_review", updatedAt: { lt: sixHoursAgo } },
        // channel_contacted > 24 hours
        { status: "channel_contacted", updatedAt: { lt: twentyFourHoursAgo } },
        // Has open escalation
        { escalations: { some: { resolvedAt: null } } },
      ],
    },
    include: {
      assignedPd: { select: { pdCode: true, fullName: true } },
    },
    take: 10,
    orderBy: { updatedAt: "asc" },
  });

  return cases;
});

export default async function AdminOverviewPage() {
  await requireAuth();

  const stats = await getStats();
  const needsAttention = await getNeedsAttention();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-slate-800">Overview</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="Cases Today"
          value={stats.totalCasesToday}
          subtext={`7d: ${stats.totalCases7d} | 30d: ${stats.totalCases30d}`}
        />
        <StatCard label="Active Cases" value={stats.activeCases} />
        <StatCard
          label="Open Escalations"
          value={stats.escalationsOpen}
          variant={stats.escalationsOpen > 0 ? "warning" : "default"}
        />
        <StatCard
          label="Completed / Closed"
          value={`${stats.completedCount} / ${stats.closedCount}`}
        />
      </div>

      {/* Pool Backlog */}
      {stats.poolBacklog.length > 0 && (
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <h2 className="text-sm font-medium text-slate-700 mb-3">
            Pool Backlog by City
          </h2>
          <div className="flex flex-wrap gap-2">
            {stats.poolBacklog.map((p) => (
              <span
                key={p.poolCity}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-amber-100 text-amber-800"
              >
                {p.poolCity}: {p._count}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Needs Attention */}
        <div className="bg-white rounded-lg border border-slate-200">
          <div className="px-4 py-3 border-b border-slate-200">
            <h2 className="font-medium text-slate-800">Needs Attention</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {needsAttention.length === 0 ? (
              <div className="px-4 py-8 text-center text-slate-500 text-sm">
                No cases require immediate attention
              </div>
            ) : (
              needsAttention.map((c) => (
                <Link
                  key={c.id}
                  href={`/admin/cases/${c.id}`}
                  className="block px-4 py-3 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-mono text-sm text-teal-600">
                        {c.trackingCode}
                      </span>
                      <p className="text-sm text-slate-600 mt-0.5">
                        {c.mainCategory}
                        {c.medicalSubType && ` → ${c.medicalSubType}`}
                      </p>
                    </div>
                    <StatusBadge status={c.status} />
                  </div>
                  <div className="mt-1 text-xs text-slate-500">
                    {c.assignedPd
                      ? `PD: ${c.assignedPd.pdCode}`
                      : c.poolCity
                        ? `Pool: ${c.poolCity}`
                        : "Unassigned"}
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg border border-slate-200">
          <div className="px-4 py-3 border-b border-slate-200">
            <h2 className="font-medium text-slate-800">Recent Activity</h2>
          </div>
          <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
            {stats.recentActivity.length === 0 ? (
              <div className="px-4 py-8 text-center text-slate-500 text-sm">
                No recent activity
              </div>
            ) : (
              stats.recentActivity.map((log) => (
                <div key={log.id} className="px-4 py-3">
                  <div className="text-sm text-slate-700">
                    <span className="font-medium">
                      {log.actor?.name || "System"}
                    </span>{" "}
                    {formatAction(log.action)}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {formatDate(log.createdAt)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  subtext,
  variant = "default",
}: {
  label: string;
  value: string | number;
  subtext?: string;
  variant?: "default" | "warning";
}) {
  return (
    <div
      className={`rounded-lg border p-4 ${
        variant === "warning"
          ? "bg-amber-50 border-amber-200"
          : "bg-white border-slate-200"
      }`}
    >
      <div className="text-sm text-slate-500">{label}</div>
      <div
        className={`text-2xl font-semibold mt-1 ${
          variant === "warning" ? "text-amber-700" : "text-slate-800"
        }`}
      >
        {value}
      </div>
      {subtext && <div className="text-xs text-slate-400 mt-1">{subtext}</div>}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    received: "bg-slate-100 text-slate-700",
    under_review: "bg-blue-100 text-blue-700",
    channel_contacted: "bg-purple-100 text-purple-700",
    information_ready: "bg-cyan-100 text-cyan-700",
    next_steps_shared: "bg-indigo-100 text-indigo-700",
    confirmed: "bg-emerald-100 text-emerald-700",
    completed: "bg-green-100 text-green-700",
    closed: "bg-slate-100 text-slate-500",
  };

  return (
    <span
      className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${colors[status] || "bg-slate-100 text-slate-700"}`}
    >
      {status.replace(/_/g, " ")}
    </span>
  );
}

function formatAction(action: string): string {
  const map: Record<string, string> = {
    CASE_STATUS_CHANGED: "changed case status",
    CASE_CREATED: "created a case",
    CASE_ASSIGNED: "assigned a case",
    PD_CREATED: "created a PD",
    PD_STATUS_CHANGED: "changed PD status",
    PD_UPDATED: "updated PD",
    CHANNEL_CREATED: "created a channel",
    CHANNEL_UPDATED: "updated channel",
    PROVIDER_CREATED: "created a provider",
    ESCALATION_CREATED: "created escalation",
    ESCALATION_RESOLVED: "resolved escalation",
    PAYOUT_MARKED_PAID: "marked payout as paid",
    ADMIN_LOGIN: "logged in",
  };
  return map[action] || action.toLowerCase().replace(/_/g, " ");
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}
