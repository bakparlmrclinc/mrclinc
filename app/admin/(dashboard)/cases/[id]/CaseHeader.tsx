"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CaseStatus, EscalationLevel } from "@prisma/client";

interface CaseData {
  id: string;
  trackingCode: string;
  status: CaseStatus;
  escalationLevel: EscalationLevel;
  updatedAt: Date;
}

// Status transitions allowed (spec 5.1)
const ALLOWED_TRANSITIONS: Record<CaseStatus, CaseStatus[]> = {
  received: ["under_review", "closed"],
  under_review: ["channel_contacted", "closed"],
  channel_contacted: ["information_ready", "closed"],
  information_ready: ["next_steps_shared", "closed"],
  next_steps_shared: ["confirmed", "closed"],
  confirmed: ["completed", "closed"],
  completed: [],
  closed: [],
};

const STATUS_LABELS: Record<CaseStatus, string> = {
  received: "Received",
  under_review: "Under Review",
  channel_contacted: "Channel Contacted",
  information_ready: "Information Ready",
  next_steps_shared: "Next Steps Shared",
  confirmed: "Confirmed",
  completed: "Completed",
  closed: "Closed",
};

export default function CaseHeader({
  caseData,
  canEdit,
  userId,
}: {
  caseData: CaseData;
  canEdit: boolean;
  userId: string;
}) {
  const router = useRouter();
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<CaseStatus | "">("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const allowedStatuses = ALLOWED_TRANSITIONS[caseData.status];

  async function handleStatusChange() {
    if (!selectedStatus) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/cases/${caseData.id}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: selectedStatus,
          note,
          changedById: userId,
        }),
      });

      if (res.ok) {
        setShowStatusModal(false);
        setSelectedStatus("");
        setNote("");
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  }

  function copyTrackingCode() {
    navigator.clipboard.writeText(caseData.trackingCode);
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-mono font-semibold text-slate-800">
                {caseData.trackingCode}
              </h1>
              <button
                onClick={copyTrackingCode}
                className="text-slate-400 hover:text-slate-600"
                title="Copy"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </button>
            </div>
            <div className="text-sm text-slate-500 mt-1">
              Last updated:{" "}
              {new Date(caseData.updatedAt).toLocaleString("en-GB")}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {caseData.escalationLevel !== "NONE" && (
            <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-sm font-medium">
              Escalation: {caseData.escalationLevel}
            </span>
          )}

          <StatusBadge status={caseData.status} />

          {canEdit && allowedStatuses.length > 0 && (
            <button
              onClick={() => setShowStatusModal(true)}
              className="px-3 py-1.5 bg-teal-600 text-white rounded text-sm hover:bg-teal-700"
            >
              Change Status
            </button>
          )}
        </div>
      </div>

      {/* Status change modal */}
      {showStatusModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              Change Status
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  New Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) =>
                    setSelectedStatus(e.target.value as CaseStatus)
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-md"
                >
                  <option value="">Select status...</option>
                  {allowedStatuses.map((s) => (
                    <option key={s} value={s}>
                      {STATUS_LABELS[s]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Internal Note (optional)
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md"
                  placeholder="Add a note about this status change..."
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowStatusModal(false)}
                className="px-4 py-2 text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleStatusChange}
                disabled={!selectedStatus || loading}
                className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 disabled:opacity-50"
              >
                {loading ? "Saving..." : "Update Status"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: CaseStatus }) {
  const colors: Record<CaseStatus, string> = {
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
      className={`inline-flex px-3 py-1 rounded text-sm font-medium ${colors[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
