"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { EscalationLevel, EscalationReason } from "@prisma/client";

interface EscalationItem {
  id: string;
  level: EscalationLevel;
  reason: EscalationReason;
  summary: string;
  createdAt: Date;
  resolvedAt: Date | null;
  resolutionNote: string | null;
  createdBy: { name: string };
  resolvedBy: { name: string } | null;
}

const REASON_LABELS: Record<EscalationReason, string> = {
  SLA_BREACH: "SLA Breach",
  PATIENT_COMPLAINT: "Patient Complaint",
  PD_ISSUE: "PD Issue",
  CHANNEL_ISSUE: "Channel Issue",
  PROCESS_DELAY: "Process Delay",
  OTHER: "Other",
};

export default function CaseEscalations({
  caseId,
  escalations,
  canEdit,
  userId,
}: {
  caseId: string;
  escalations: EscalationItem[];
  canEdit: boolean;
  userId: string;
}) {
  const router = useRouter();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showResolveModal, setShowResolveModal] = useState<string | null>(null);
  const [level, setLevel] = useState<EscalationLevel>("L1");
  const [reason, setReason] = useState<EscalationReason>("OTHER");
  const [summary, setSummary] = useState("");
  const [resolutionNote, setResolutionNote] = useState("");
  const [loading, setLoading] = useState(false);

  const openEscalations = escalations.filter((e) => !e.resolvedAt);
  const resolvedEscalations = escalations.filter((e) => e.resolvedAt);

  async function handleCreate() {
    if (!summary.trim()) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/cases/${caseId}/escalations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          level,
          reason,
          summary: summary.trim(),
          createdById: userId,
        }),
      });

      if (res.ok) {
        setShowCreateModal(false);
        setLevel("L1");
        setReason("OTHER");
        setSummary("");
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleResolve(escalationId: string) {
    if (!resolutionNote.trim()) return;
    setLoading(true);

    try {
      const res = await fetch(
        `/api/admin/cases/${caseId}/escalations/${escalationId}/resolve`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            resolutionNote: resolutionNote.trim(),
            resolvedById: userId,
          }),
        }
      );

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
        <h2 className="font-medium text-slate-800">Escalations</h2>
        {canEdit && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="text-sm text-teal-600 hover:text-teal-700"
          >
            + Create
          </button>
        )}
      </div>

      <div className="divide-y divide-slate-100">
        {escalations.length === 0 ? (
          <div className="p-4 text-sm text-slate-500">No escalations</div>
        ) : (
          <>
            {/* Open escalations */}
            {openEscalations.map((esc) => (
              <div key={esc.id} className="p-4 bg-red-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 bg-red-100 text-red-700 rounded text-xs font-medium">
                      {esc.level}
                    </span>
                    <span className="text-sm text-slate-700">
                      {REASON_LABELS[esc.reason]}
                    </span>
                  </div>
                  {canEdit && (
                    <button
                      onClick={() => setShowResolveModal(esc.id)}
                      className="text-xs text-teal-600 hover:text-teal-700"
                    >
                      Resolve
                    </button>
                  )}
                </div>
                <p className="text-sm text-slate-600 mt-1">{esc.summary}</p>
                <div className="text-xs text-slate-500 mt-1">
                  {new Date(esc.createdAt).toLocaleString("en-GB")} by{" "}
                  {esc.createdBy.name}
                </div>
              </div>
            ))}

            {/* Resolved escalations */}
            {resolvedEscalations.map((esc) => (
              <div key={esc.id} className="p-4">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">
                    {esc.level}
                  </span>
                  <span className="text-sm text-slate-500 line-through">
                    {REASON_LABELS[esc.reason]}
                  </span>
                  <span className="px-1.5 py-0.5 bg-green-100 text-green-700 rounded text-xs">
                    Resolved
                  </span>
                </div>
                <p className="text-sm text-slate-500 mt-1">{esc.summary}</p>
                {esc.resolutionNote && (
                  <p className="text-sm text-green-700 mt-1 bg-green-50 p-2 rounded">
                    Resolution: {esc.resolutionNote}
                  </p>
                )}
                <div className="text-xs text-slate-400 mt-1">
                  Resolved:{" "}
                  {esc.resolvedAt &&
                    new Date(esc.resolvedAt).toLocaleString("en-GB")}{" "}
                  by {esc.resolvedBy?.name}
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Create modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              Create Escalation
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Level
                  </label>
                  <select
                    value={level}
                    onChange={(e) =>
                      setLevel(e.target.value as EscalationLevel)
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-md"
                  >
                    <option value="L1">L1</option>
                    <option value="L2">L2</option>
                    <option value="L3">L3</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Reason
                  </label>
                  <select
                    value={reason}
                    onChange={(e) =>
                      setReason(e.target.value as EscalationReason)
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-md"
                  >
                    {Object.entries(REASON_LABELS).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Summary
                </label>
                <textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md"
                  placeholder="Describe the escalation issue..."
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={!summary.trim() || loading}
                className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create"}
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
              Resolve Escalation
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
                placeholder="How was this resolved?"
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
