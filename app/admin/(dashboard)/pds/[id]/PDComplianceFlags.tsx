"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ComplianceFlag {
  id: string;
  flagType: string;
  severity: string;
  reason: string;
  createdAt: Date;
  resolvedAt: Date | null;
  resolutionNote: string | null;
}

export default function PDComplianceFlags({
  pdId,
  flags,
  canEdit,
  userId,
}: {
  pdId: string;
  flags: ComplianceFlag[];
  canEdit: boolean;
  userId: string;
}) {
  const router = useRouter();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showResolveModal, setShowResolveModal] = useState<string | null>(null);
  const [flagType, setFlagType] = useState("");
  const [severity, setSeverity] = useState("MEDIUM");
  const [reason, setReason] = useState("");
  const [resolutionNote, setResolutionNote] = useState("");
  const [loading, setLoading] = useState(false);

  const openFlags = flags.filter((f) => !f.resolvedAt);
  const resolvedFlags = flags.filter((f) => f.resolvedAt);

  async function handleAdd() {
    if (!flagType.trim() || !reason.trim()) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/pds/${pdId}/flags`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          flagType: flagType.trim(),
          severity,
          reason: reason.trim(),
          createdById: userId,
        }),
      });

      if (res.ok) {
        setShowAddModal(false);
        setFlagType("");
        setSeverity("MEDIUM");
        setReason("");
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleResolve(flagId: string) {
    if (!resolutionNote.trim()) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/pds/${pdId}/flags/${flagId}/resolve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resolutionNote: resolutionNote.trim(),
          resolvedById: userId,
        }),
      });

      if (res.ok) {
        setShowResolveModal(null);
        setResolutionNote("");
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200">
      <div className="px-4 py-3 border-b border-slate-200 flex justify-between items-center">
        <h2 className="font-medium text-slate-800">Compliance Flags</h2>
        {canEdit && (
          <button
            onClick={() => setShowAddModal(true)}
            className="text-sm text-teal-600 hover:text-teal-700"
          >
            + Add Flag
          </button>
        )}
      </div>

      <div className="divide-y divide-slate-100">
        {flags.length === 0 ? (
          <div className="p-4 text-sm text-slate-500">No compliance flags</div>
        ) : (
          <>
            {openFlags.map((flag) => (
              <div key={flag.id} className="p-4 bg-red-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <SeverityBadge severity={flag.severity} />
                    <span className="text-sm font-medium text-slate-700">
                      {flag.flagType}
                    </span>
                  </div>
                  {canEdit && (
                    <button
                      onClick={() => setShowResolveModal(flag.id)}
                      className="text-xs text-teal-600 hover:text-teal-700"
                    >
                      Resolve
                    </button>
                  )}
                </div>
                <p className="text-sm text-slate-600 mt-1">{flag.reason}</p>
                <div className="text-xs text-slate-500 mt-1">
                  {new Date(flag.createdAt).toLocaleDateString("en-GB")}
                </div>
              </div>
            ))}

            {resolvedFlags.map((flag) => (
              <div key={flag.id} className="p-4">
                <div className="flex items-center gap-2">
                  <SeverityBadge severity={flag.severity} resolved />
                  <span className="text-sm text-slate-500 line-through">
                    {flag.flagType}
                  </span>
                  <span className="px-1.5 py-0.5 bg-green-100 text-green-700 rounded text-xs">
                    Resolved
                  </span>
                </div>
                <p className="text-sm text-slate-500 mt-1">{flag.reason}</p>
                {flag.resolutionNote && (
                  <p className="text-sm text-green-700 mt-1 bg-green-50 p-2 rounded">
                    Resolution: {flag.resolutionNote}
                  </p>
                )}
              </div>
            ))}
          </>
        )}
      </div>

      {/* Add modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              Add Compliance Flag
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Flag Type
                </label>
                <input
                  type="text"
                  value={flagType}
                  onChange={(e) => setFlagType(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md"
                  placeholder="e.g., asked_for_payment"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Severity
                </label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md"
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Reason
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                disabled={!flagType.trim() || !reason.trim() || loading}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
              >
                {loading ? "Adding..." : "Add Flag"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Resolve modal */}
      {showResolveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              Resolve Flag
            </h2>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Resolution Note
              </label>
              <textarea
                value={resolutionNote}
                onChange={(e) => setResolutionNote(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-slate-300 rounded-md"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowResolveModal(null)}
                className="px-4 py-2 text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={() => handleResolve(showResolveModal)}
                disabled={!resolutionNote.trim() || loading}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? "Resolving..." : "Resolve"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SeverityBadge({
  severity,
  resolved = false,
}: {
  severity: string;
  resolved?: boolean;
}) {
  const colors: Record<string, string> = {
    LOW: resolved ? "bg-slate-100 text-slate-500" : "bg-yellow-100 text-yellow-700",
    MEDIUM: resolved ? "bg-slate-100 text-slate-500" : "bg-orange-100 text-orange-700",
    HIGH: resolved ? "bg-slate-100 text-slate-500" : "bg-red-100 text-red-700",
  };
  return (
    <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${colors[severity]}`}>
      {severity}
    </span>
  );
}
