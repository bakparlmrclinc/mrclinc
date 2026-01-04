"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ContactDirection, ContactMethod } from "@prisma/client";

interface ContactLogItem {
  id: string;
  actorType: string;
  direction: ContactDirection;
  method: ContactMethod;
  summary: string;
  createdAt: Date;
  adminActor: { name: string } | null;
}

export default function CaseContactLog({
  caseId,
  logs,
  canEdit,
  userId,
}: {
  caseId: string;
  logs: ContactLogItem[];
  canEdit: boolean;
  userId: string;
}) {
  const router = useRouter();
  const [showAddModal, setShowAddModal] = useState(false);
  const [direction, setDirection] = useState<ContactDirection>("OUTBOUND");
  const [method, setMethod] = useState<ContactMethod>("EMAIL");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAdd() {
    if (!summary.trim()) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/cases/${caseId}/contact-log`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          direction,
          method,
          summary: summary.trim(),
          actorId: userId,
        }),
      });

      if (res.ok) {
        setShowAddModal(false);
        setDirection("OUTBOUND");
        setMethod("EMAIL");
        setSummary("");
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200">
      <div className="px-4 py-3 border-b border-slate-200 flex justify-between items-center">
        <h2 className="font-medium text-slate-800">Contact Log</h2>
        {canEdit && (
          <button
            onClick={() => setShowAddModal(true)}
            className="text-sm text-teal-600 hover:text-teal-700"
          >
            + Add entry
          </button>
        )}
      </div>
      <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
        {logs.length === 0 ? (
          <div className="p-4 text-sm text-slate-500">No contact logs</div>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="p-4">
              <div className="flex items-center gap-2">
                <span
                  className={`px-1.5 py-0.5 rounded text-xs ${
                    log.direction === "OUTBOUND"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {log.direction}
                </span>
                <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">
                  {log.method}
                </span>
                <span className="text-xs text-slate-400">{log.actorType}</span>
              </div>
              <p className="text-sm text-slate-700 mt-1">{log.summary}</p>
              <div className="text-xs text-slate-500 mt-1">
                {new Date(log.createdAt).toLocaleString("en-GB")}
                {log.adminActor && ` by ${log.adminActor.name}`}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              Add Contact Log
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Direction
                  </label>
                  <select
                    value={direction}
                    onChange={(e) =>
                      setDirection(e.target.value as ContactDirection)
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-md"
                  >
                    <option value="OUTBOUND">Outbound</option>
                    <option value="INBOUND">Inbound</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Method
                  </label>
                  <select
                    value={method}
                    onChange={(e) =>
                      setMethod(e.target.value as ContactMethod)
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-md"
                  >
                    <option value="EMAIL">Email</option>
                    <option value="PHONE">Phone</option>
                    <option value="WHATSAPP">WhatsApp</option>
                    <option value="OTHER">Other</option>
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
                  placeholder="Brief summary of the contact (no medical content)"
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
                disabled={!summary.trim() || loading}
                className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 disabled:opacity-50"
              >
                {loading ? "Saving..." : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
