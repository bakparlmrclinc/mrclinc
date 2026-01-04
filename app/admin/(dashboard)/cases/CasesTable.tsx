import Link from "next/link";
import { CaseStatus, EscalationLevel } from "@prisma/client";

interface CaseRow {
  id: string;
  trackingCode: string;
  createdAt: Date;
  mainCategory: string;
  medicalSubType: string | null;
  patientCity: string | null;
  patientCountry: string;
  status: CaseStatus;
  escalationLevel: EscalationLevel;
  assignedPd: { pdCode: string; fullName: string } | null;
  poolCity: string | null;
  hasOpenEscalation: boolean;
  updatedAt: Date;
}

export default function CasesTable({ cases }: { cases: CaseRow[] }) {
  if (cases.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 p-8 text-center text-slate-500">
        No cases found
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-4 py-3 text-left font-medium text-slate-600">
                TRK Code
              </th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">
                Created
              </th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">
                Service
              </th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">
                Location
              </th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">
                Assignment
              </th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">
                Status
              </th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">
                Flags
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {cases.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/cases/${c.id}`}
                    className="font-mono text-teal-600 hover:text-teal-700"
                  >
                    {c.trackingCode}
                  </Link>
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {formatDate(c.createdAt)}
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {c.mainCategory}
                  {c.medicalSubType && (
                    <span className="text-slate-400">
                      {" "}
                      → {c.medicalSubType}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {c.patientCity && `${c.patientCity}, `}
                  {c.patientCountry}
                </td>
                <td className="px-4 py-3">
                  {c.assignedPd ? (
                    <span className="text-slate-700">
                      {c.assignedPd.pdCode}
                    </span>
                  ) : c.poolCity ? (
                    <span className="text-amber-600">Pool: {c.poolCity}</span>
                  ) : (
                    <span className="text-slate-400">Unassigned</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={c.status} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    {c.hasOpenEscalation && (
                      <span className="px-1.5 py-0.5 bg-red-100 text-red-700 rounded text-xs">
                        ESC
                      </span>
                    )}
                    {c.escalationLevel !== "NONE" && !c.hasOpenEscalation && (
                      <span className="px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded text-xs">
                        {c.escalationLevel}
                      </span>
                    )}
                    {isSlaWarning(c.status, c.updatedAt) && (
                      <span className="px-1.5 py-0.5 bg-orange-100 text-orange-700 rounded text-xs">
                        SLA
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
      className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${colors[status]}`}
    >
      {status.replace(/_/g, " ")}
    </span>
  );
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  }).format(new Date(date));
}

function isSlaWarning(status: CaseStatus, updatedAt: Date): boolean {
  const hoursSinceUpdate =
    (Date.now() - new Date(updatedAt).getTime()) / (1000 * 60 * 60);

  const slaHours: Partial<Record<CaseStatus, number>> = {
    received: 2,
    under_review: 6,
    channel_contacted: 24,
    information_ready: 12,
  };

  const limit = slaHours[status];
  return limit !== undefined && hoursSinceUpdate > limit;
}
