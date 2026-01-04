import Link from "next/link";
import { CaseStatus } from "@prisma/client";

interface CaseRow {
  id: string;
  trackingCode: string;
  status: CaseStatus;
  mainCategory: string;
  createdAt: Date;
}

export default function PDCases({ cases }: { cases: CaseRow[] }) {
  if (cases.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <h2 className="font-medium text-slate-800 mb-3">Recent Cases</h2>
        <p className="text-sm text-slate-500">No cases assigned</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200">
      <div className="px-4 py-3 border-b border-slate-200">
        <h2 className="font-medium text-slate-800">Recent Cases</h2>
      </div>
      <div className="divide-y divide-slate-100">
        {cases.map((c) => (
          <Link
            key={c.id}
            href={`/admin/cases/${c.id}`}
            className="block px-4 py-3 hover:bg-slate-50"
          >
            <div className="flex justify-between items-center">
              <div>
                <span className="font-mono text-teal-600">{c.trackingCode}</span>
                <span className="text-sm text-slate-500 ml-2">{c.mainCategory}</span>
              </div>
              <StatusBadge status={c.status} />
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {new Date(c.createdAt).toLocaleDateString("en-GB")}
            </div>
          </Link>
        ))}
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
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${colors[status]}`}>
      {status.replace(/_/g, " ")}
    </span>
  );
}
