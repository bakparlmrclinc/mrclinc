"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AssignmentMode } from "@prisma/client";
import Link from "next/link";

interface PD {
  id: string;
  pdCode: string;
  fullName: string;
  city: string;
}

interface Pool {
  id: string;
  city: string;
}

interface CaseData {
  id: string;
  assignmentMode: AssignmentMode | null;
  assignedPdId: string | null;
  assignedAt: Date | null;
  poolCity: string | null;
  claimedAt: Date | null;
  pdCodeProvided: string | null;
  assignedPd: PD | null;
}

export default function CaseAssignment({
  caseData,
  pds,
  pools,
  poolBacklog,
  canEdit,
  userId,
}: {
  caseData: CaseData;
  pds: PD[];
  pools: Pool[];
  poolBacklog: number;
  canEdit: boolean;
  userId: string;
}) {
  const router = useRouter();
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedPdId, setSelectedPdId] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAssign() {
    if (!selectedPdId || !reason.trim()) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/cases/${caseData.id}/assign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pdId: selectedPdId,
          reason,
          assignedById: userId,
        }),
      });

      if (res.ok) {
        setShowAssignModal(false);
        setSelectedPdId("");
        setReason("");
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200">
      <div className="px-4 py-3 border-b border-slate-200">
        <h2 className="font-medium text-slate-800">Assignment</h2>
      </div>
      <div className="p-4 space-y-3">
        {/* Assignment mode */}
        <div className="text-sm">
          <span className="text-slate-500">Mode: </span>
          <span className="text-slate-700">
            {caseData.assignmentMode
              ? caseData.assignmentMode.replace(/_/g, " ")
              : "Not assigned"}
          </span>
        </div>

        {/* PD Code provided */}
        {caseData.pdCodeProvided && (
          <div className="text-sm">
            <span className="text-slate-500">PD Code provided: </span>
            <span className="font-mono text-slate-700">
              {caseData.pdCodeProvided}
            </span>
          </div>
        )}

        {/* Assigned PD */}
        {caseData.assignedPd ? (
          <div className="p-3 bg-slate-50 rounded-md">
            <div className="flex justify-between items-start">
              <div>
                <Link
                  href={`/admin/pds/${caseData.assignedPd.id}`}
                  className="font-mono text-teal-600 hover:text-teal-700"
                >
                  {caseData.assignedPd.pdCode}
                </Link>
                <div className="text-sm text-slate-600">
                  {caseData.assignedPd.fullName}
                </div>
                <div className="text-xs text-slate-500">
                  {caseData.assignedPd.city}
                </div>
              </div>
              {caseData.assignedAt && (
                <div className="text-xs text-slate-500">
                  Assigned:{" "}
                  {new Date(caseData.assignedAt).toLocaleDateString("en-GB")}
                </div>
              )}
            </div>
            {caseData.claimedAt && (
              <div className="text-xs text-slate-500 mt-2">
                Claimed:{" "}
                {new Date(caseData.claimedAt).toLocaleDateString("en-GB")}
              </div>
            )}
          </div>
        ) : caseData.poolCity ? (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
            <div className="text-sm font-medium text-amber-800">
              In Pool: {caseData.poolCity}
            </div>
            <div className="text-xs text-amber-600 mt-1">
              Backlog in this pool: {poolBacklog} cases
            </div>
            <div className="text-xs text-amber-600">
              Waiting for PD claim
            </div>
          </div>
        ) : (
          <div className="p-3 bg-slate-50 rounded-md text-sm text-slate-500">
            Not assigned to any PD or pool
          </div>
        )}

        {/* Actions */}
        {canEdit && (
          <button
            onClick={() => setShowAssignModal(true)}
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded hover:bg-slate-50"
          >
            {caseData.assignedPd ? "Reassign PD" : "Assign PD"}
          </button>
        )}
      </div>

      {/* Assignment modal */}
      {showAssignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              Assign PD
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Select PD
                </label>
                <select
                  value={selectedPdId}
                  onChange={(e) => setSelectedPdId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md"
                >
                  <option value="">Select a PD...</option>
                  {pds.map((pd) => (
                    <option key={pd.id} value={pd.id}>
                      {pd.pdCode} - {pd.fullName} ({pd.city})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Reason (required for audit)
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md"
                  placeholder="Why are you assigning/reassigning this case?"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowAssignModal(false)}
                className="px-4 py-2 text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleAssign}
                disabled={!selectedPdId || !reason.trim() || loading}
                className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 disabled:opacity-50"
              >
                {loading ? "Saving..." : "Assign"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
