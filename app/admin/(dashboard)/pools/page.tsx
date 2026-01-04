import { prisma } from "@/lib/db";
import { requireAuth, canEditPDs } from "@/lib/auth";
import Link from "next/link";

export default async function PoolsPage() {
  const user = await requireAuth();
  const canEdit = canEditPDs(user.role);

  const pools = await prisma.pool.findMany({
    include: {
      pds: {
        where: { isActive: true },
        include: { pd: { select: { pdCode: true, fullName: true, status: true } } },
      },
      _count: {
        select: { pds: { where: { isActive: true } } },
      },
    },
    orderBy: { city: "asc" },
  });

  // Get backlog counts per city
  const backlogs = await prisma.case.groupBy({
    by: ["poolCity"],
    where: {
      assignedPdId: null,
      status: { notIn: ["completed", "closed"] },
      poolCity: { not: null },
    },
    _count: true,
  });

  const backlogMap = Object.fromEntries(
    backlogs.map((b) => [b.poolCity, b._count])
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-800">Pools</h1>
        {canEdit && (
          <button 
            className="px-4 py-2 bg-gray-300 text-gray-500 rounded text-sm cursor-not-allowed"
            disabled
            title="Pool management is handled by platform administrators"
          >
            + Add Pool
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pools.map((pool) => (
          <div
            key={pool.id}
            className="bg-white rounded-lg border border-slate-200 p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-medium text-slate-800">{pool.city}</h2>
              <span
                className={`px-2 py-0.5 rounded text-xs font-medium ${
                  pool.isActive
                    ? "bg-green-100 text-green-700"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {pool.isActive ? "Active" : "Inactive"}
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Queue Policy</span>
                <span className="text-slate-700">{pool.queuePolicy}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Active PDs</span>
                <span className="text-slate-700">{pool._count.pds}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Backlog</span>
                <span
                  className={
                    backlogMap[pool.city]
                      ? "text-amber-600 font-medium"
                      : "text-slate-700"
                  }
                >
                  {backlogMap[pool.city] || 0} cases
                </span>
              </div>
            </div>

            {/* PD list */}
            {pool.pds.length > 0 && (
              <div className="mt-4 pt-3 border-t border-slate-200">
                <div className="text-xs font-medium text-slate-500 mb-2">
                  PDs in Pool
                </div>
                <div className="space-y-1">
                  {pool.pds.slice(0, 5).map((pp) => (
                    <div
                      key={pp.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <Link
                        href={`/admin/pds/${pp.pd.pdCode}`}
                        className="text-teal-600 hover:text-teal-700 font-mono text-xs"
                      >
                        {pp.pd.pdCode}
                      </Link>
                      <span
                        className={`text-xs ${
                          pp.pd.status === "ACTIVE"
                            ? "text-green-600"
                            : "text-slate-400"
                        }`}
                      >
                        {pp.pd.status}
                      </span>
                    </div>
                  ))}
                  {pool.pds.length > 5 && (
                    <div className="text-xs text-slate-400">
                      +{pool.pds.length - 5} more
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}

        {pools.length === 0 && (
          <div className="col-span-full text-center py-8 text-slate-500">
            No pools configured
          </div>
        )}
      </div>
    </div>
  );
}
