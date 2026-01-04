import { CaseStatus } from "@prisma/client";

interface StatusHistoryItem {
  id: string;
  status: CaseStatus;
  changedAt: Date;
  note: string | null;
  source: string;
  changedBy: { name: string } | null;
}

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

export default function CaseTimeline({
  history,
}: {
  history: StatusHistoryItem[];
}) {
  if (history.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-slate-200">
        <div className="px-4 py-3 border-b border-slate-200">
          <h2 className="font-medium text-slate-800">Timeline</h2>
        </div>
        <div className="p-4 text-sm text-slate-500">No status history</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200">
      <div className="px-4 py-3 border-b border-slate-200">
        <h2 className="font-medium text-slate-800">Timeline</h2>
      </div>
      <div className="p-4">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-slate-200" />

          <div className="space-y-4">
            {history.map((item, index) => (
              <div key={item.id} className="relative pl-8">
                {/* Timeline dot */}
                <div
                  className={`absolute left-0 w-4 h-4 rounded-full border-2 ${
                    index === 0
                      ? "bg-teal-500 border-teal-500"
                      : "bg-white border-slate-300"
                  }`}
                />

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-800">
                      {STATUS_LABELS[item.status]}
                    </span>
                    <span className="text-xs text-slate-400">
                      {item.source}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {new Date(item.changedAt).toLocaleString("en-GB")}
                    {item.changedBy && ` by ${item.changedBy.name}`}
                  </div>
                  {item.note && (
                    <div className="mt-1 text-sm text-slate-600 bg-slate-50 rounded p-2">
                      {item.note}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
