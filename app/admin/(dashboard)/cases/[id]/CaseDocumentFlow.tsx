"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface CaseData {
  id: string;
  clinicRequestedDocsAt: Date | null;
  patientSentDocsAt: Date | null;
  clinicConfirmedDocsAt: Date | null;
}

export default function CaseDocumentFlow({
  caseData,
  canEdit,
  userId,
}: {
  caseData: CaseData;
  canEdit: boolean;
  userId: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  async function toggleCheckbox(field: string) {
    setLoading(field);
    try {
      await fetch(`/api/admin/cases/${caseData.id}/document-flow`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          field,
          updatedById: userId,
        }),
      });
      router.refresh();
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200">
      <div className="px-4 py-3 border-b border-slate-200">
        <h2 className="font-medium text-slate-800">Document Flow</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Operational checkboxes only - documents not stored
        </p>
      </div>
      <div className="p-4 space-y-3">
        <CheckboxRow
          label="Clinic requested documents"
          timestamp={caseData.clinicRequestedDocsAt}
          canEdit={canEdit}
          loading={loading === "clinicRequestedDocsAt"}
          onToggle={() => { void toggleCheckbox("clinicRequestedDocsAt"); }}
        />
        <CheckboxRow
          label="Patient sent documents to clinic"
          timestamp={caseData.patientSentDocsAt}
          canEdit={canEdit}
          loading={loading === "patientSentDocsAt"}
          onToggle={() => { void toggleCheckbox("patientSentDocsAt"); }}
        />
        <CheckboxRow
          label="Clinic confirmed receipt"
          timestamp={caseData.clinicConfirmedDocsAt}
          canEdit={canEdit}
          loading={loading === "clinicConfirmedDocsAt"}
          onToggle={() => { void toggleCheckbox("clinicConfirmedDocsAt"); }}
        />
      </div>
    </div>
  );
}

function CheckboxRow({
  label,
  timestamp,
  canEdit,
  loading,
  onToggle,
}: {
  label: string;
  timestamp: Date | null;
  canEdit: boolean;
  loading: boolean;
  onToggle: () => void;
}) {
  const isChecked = !!timestamp;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {canEdit ? (
          <button
            onClick={onToggle}
            disabled={loading}
            className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
              isChecked
                ? "bg-teal-600 border-teal-600 text-white"
                : "border-slate-300 hover:border-slate-400"
            } ${loading ? "opacity-50" : ""}`}
          >
            {isChecked && (
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        ) : (
          <span
            className={`w-5 h-5 rounded border flex items-center justify-center ${
              isChecked
                ? "bg-teal-600 border-teal-600 text-white"
                : "border-slate-300"
            }`}
          >
            {isChecked && (
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </span>
        )}
        <span className="text-sm text-slate-700">{label}</span>
      </div>
      {timestamp && (
        <span className="text-xs text-slate-500">
          {new Date(timestamp).toLocaleString("en-GB")}
        </span>
      )}
    </div>
  );
}
