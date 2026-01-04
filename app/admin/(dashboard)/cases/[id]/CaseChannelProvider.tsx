"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Provider {
  id: string;
  displayName: string;
}

interface Channel {
  id: string;
  name: string;
  city: string;
  providers: Provider[];
}

interface CaseData {
  id: string;
  channelId: string | null;
  providerId: string | null;
  channelContactedAt: Date | null;
  handoverAt: Date | null;
  channel: { id: string; name: string; city: string } | null;
  provider: { id: string; displayName: string } | null;
}

export default function CaseChannelProvider({
  caseData,
  channels,
  canEdit,
  userId,
}: {
  caseData: CaseData;
  channels: Channel[];
  canEdit: boolean;
  userId: string;
}) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [selectedChannelId, setSelectedChannelId] = useState(
    caseData.channelId || ""
  );
  const [selectedProviderId, setSelectedProviderId] = useState(
    caseData.providerId || ""
  );
  const [loading, setLoading] = useState(false);

  const selectedChannel = channels.find((c) => c.id === selectedChannelId);

  async function handleSave() {
    setLoading(true);

    try {
      const res = await fetch(
        `/api/admin/cases/${caseData.id}/channel-provider`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            channelId: selectedChannelId || null,
            providerId: selectedProviderId || null,
            updatedById: userId,
          }),
        }
      );

      if (res.ok) {
        setShowModal(false);
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  }

  async function setContactedNow() {
    setLoading(true);
    try {
      await fetch(`/api/admin/cases/${caseData.id}/channel-contacted`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updatedById: userId }),
      });
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  async function setHandoverNow() {
    setLoading(true);
    try {
      await fetch(`/api/admin/cases/${caseData.id}/handover`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updatedById: userId }),
      });
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200">
      <div className="px-4 py-3 border-b border-slate-200">
        <h2 className="font-medium text-slate-800">
          Clinical Channel / Provider
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">Internal only</p>
      </div>
      <div className="p-4 space-y-3">
        {/* Current channel */}
        <div className="text-sm">
          <span className="text-slate-500">Channel: </span>
          <span className="text-slate-700">
            {caseData.channel
              ? `${caseData.channel.name} (${caseData.channel.city})`
              : "Not selected"}
          </span>
        </div>

        {/* Current provider */}
        <div className="text-sm">
          <span className="text-slate-500">Provider: </span>
          <span className="text-slate-700">
            {caseData.provider ? caseData.provider.displayName : "Not selected"}
          </span>
        </div>

        {/* Timestamps */}
        <div className="text-sm space-y-1">
          <div>
            <span className="text-slate-500">Channel contacted: </span>
            <span className="text-slate-700">
              {caseData.channelContactedAt
                ? new Date(caseData.channelContactedAt).toLocaleString("en-GB")
                : "—"}
            </span>
            {canEdit && !caseData.channelContactedAt && (
              <button
                onClick={setContactedNow}
                disabled={loading}
                className="ml-2 text-xs text-teal-600 hover:text-teal-700"
              >
                Set now
              </button>
            )}
          </div>
          <div>
            <span className="text-slate-500">Handover: </span>
            <span className="text-slate-700">
              {caseData.handoverAt
                ? new Date(caseData.handoverAt).toLocaleString("en-GB")
                : "—"}
            </span>
            {canEdit && !caseData.handoverAt && (
              <button
                onClick={setHandoverNow}
                disabled={loading}
                className="ml-2 text-xs text-teal-600 hover:text-teal-700"
              >
                Set now
              </button>
            )}
          </div>
        </div>

        {/* Actions */}
        {canEdit && (
          <button
            onClick={() => setShowModal(true)}
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded hover:bg-slate-50"
          >
            Change Channel/Provider
          </button>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              Select Channel & Provider
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Clinical Channel
                </label>
                <select
                  value={selectedChannelId}
                  onChange={(e) => {
                    setSelectedChannelId(e.target.value);
                    setSelectedProviderId("");
                  }}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md"
                >
                  <option value="">Select a channel...</option>
                  {channels.map((ch) => (
                    <option key={ch.id} value={ch.id}>
                      {ch.name} ({ch.city})
                    </option>
                  ))}
                </select>
              </div>

              {selectedChannel && selectedChannel.providers.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Provider (optional)
                  </label>
                  <select
                    value={selectedProviderId}
                    onChange={(e) => setSelectedProviderId(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md"
                  >
                    <option value="">Select a provider...</option>
                    {selectedChannel.providers.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.displayName}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
