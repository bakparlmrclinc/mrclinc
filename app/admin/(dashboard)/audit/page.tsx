// app/admin/(dashboard)/audit/page.tsx
// Audit Log Page

import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import Link from "next/link";

interface SearchParams {
  page?: string;
  entityType?: string;
  action?: string;
}

export default async function AuditLogPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const user = await requireAuth();
  const params = await searchParams;

  const page = parseInt(params.page || "1");
  const pageSize = 50;
  const skip = (page - 1) * pageSize;

  const where: Record<string, unknown> = {};
  if (params.entityType) {
    where.entityType = params.entityType;
  }
  if (params.action) {
    where.action = { contains: params.action };
  }

  const [logs, total] = await Promise.all([
    prisma.auditLog.findMany({
      where,
      include: {
        actor: {
          select: { name: true, email: true },
        },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
    }),
    prisma.auditLog.count({ where }),
  ]);

  const totalPages = Math.ceil(total / pageSize);

  // Get unique entity types for filter
  const entityTypes = await prisma.auditLog.groupBy({
    by: ["entityType"],
    orderBy: { entityType: "asc" },
  });

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getActionColor = (action: string) => {
    if (action.includes("CREATED")) return "bg-green-100 text-green-800";
    if (action.includes("UPDATED") || action.includes("CHANGED"))
      return "bg-blue-100 text-blue-800";
    if (action.includes("DELETED")) return "bg-red-100 text-red-800";
    return "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Audit Log</h1>
        <p className="text-sm text-gray-500 mt-1">
          Complete history of all system changes
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <form className="flex flex-wrap gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Entity Type
            </label>
            <select
              name="entityType"
              defaultValue={params.entityType || ""}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Types</option>
              {entityTypes.map((et) => (
                <option key={et.entityType} value={et.entityType}>
                  {et.entityType}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Action
            </label>
            <input
              type="text"
              name="action"
              defaultValue={params.action || ""}
              placeholder="e.g., STATUS_CHANGED"
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
            >
              Filter
            </button>
          </div>
          {(params.entityType || params.action) && (
            <div className="flex items-end">
              <Link
                href="/admin/audit"
                className="px-4 py-2 text-gray-500 hover:text-gray-700 text-sm"
              >
                Clear
              </Link>
            </div>
          )}
        </form>
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-500">
        Showing {skip + 1}-{Math.min(skip + pageSize, total)} of {total} entries
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Timestamp
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Entity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Details
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(log.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {log.actor?.name || log.actorType}
                  </div>
                  {log.actor?.email && (
                    <div className="text-xs text-gray-500">{log.actor.email}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getActionColor(
                      log.action
                    )}`}
                  >
                    {log.action}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{log.entityType}</div>
                  <div className="text-xs text-gray-500 font-mono">
                    {log.entityId.substring(0, 8)}...
                  </div>
                </td>
                <td className="px-6 py-4">
                  <AuditDetails log={log} />
                </td>
              </tr>
            ))}
            {logs.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-12 text-center text-sm text-gray-500"
                >
                  No audit logs found
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
            Page {page} of {totalPages}
          </div>
          <div className="flex gap-2">
            {page > 1 && (
              <Link
                href={`/admin/audit?page=${page - 1}${
                  params.entityType ? `&entityType=${params.entityType}` : ""
                }${params.action ? `&action=${params.action}` : ""}`}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
              >
                Previous
              </Link>
            )}
            {page < totalPages && (
              <Link
                href={`/admin/audit?page=${page + 1}${
                  params.entityType ? `&entityType=${params.entityType}` : ""
                }${params.action ? `&action=${params.action}` : ""}`}
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

function AuditDetails({ log }: { log: { beforeJson: string | null; afterJson: string | null } }) {
  if (!log.beforeJson && !log.afterJson) {
    return <span className="text-xs text-gray-400">No details</span>;
  }

  const before = log.beforeJson ? JSON.parse(log.beforeJson) : null;
  const after = log.afterJson ? JSON.parse(log.afterJson) : null;

  // Find changed fields
  const changes: { field: string; from: unknown; to: unknown }[] = [];

  if (before && after) {
    for (const key of Object.keys(after)) {
      if (JSON.stringify(before[key]) !== JSON.stringify(after[key])) {
        changes.push({
          field: key,
          from: before[key],
          to: after[key],
        });
      }
    }
  }

  if (changes.length === 0 && after) {
    return (
      <span className="text-xs text-gray-500">
        Created with {Object.keys(after).length} fields
      </span>
    );
  }

  return (
    <div className="space-y-1">
      {changes.slice(0, 3).map((change) => (
        <div key={change.field} className="text-xs">
          <span className="font-medium text-gray-700">{change.field}:</span>{" "}
          <span className="text-red-600 line-through">
            {String(change.from).substring(0, 20)}
          </span>{" "}
          →{" "}
          <span className="text-green-600">
            {String(change.to).substring(0, 20)}
          </span>
        </div>
      ))}
      {changes.length > 3 && (
        <div className="text-xs text-gray-400">
          +{changes.length - 3} more changes
        </div>
      )}
    </div>
  );
}
