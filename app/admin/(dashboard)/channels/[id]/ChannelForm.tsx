// app/admin/(dashboard)/channels/[id]/ChannelForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ClinicalChannel } from "@prisma/client";

interface ChannelFormProps {
  channel: ClinicalChannel | null;
  canEdit: boolean;
}

const SERVICE_OPTIONS = [
  "Aesthetic Surgery",
  "Cancer Surgery",
  "General Surgery",
  "Orthopedics",
  "Cardiology",
  "Neurology",
  "Ophthalmology",
  "Dental",
  "Other",
];

const CITIES = [
  "Istanbul",
  "Ankara",
  "Izmir",
  "Antalya",
  "Bursa",
  "Adana",
  "Other",
];

export function ChannelForm({ channel, canEdit }: ChannelFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: channel?.name || "",
    city: channel?.city || "",
    serviceCoverage: channel?.serviceCoverage || [],
    status: channel?.status || "ACTIVE",
    responseSlaHours: channel?.responseSlaHours?.toString() || "",
    contactMethods: channel?.contactMethods || "",
    notes: channel?.notes || "",
  });

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      serviceCoverage: prev.serviceCoverage.includes(service)
        ? prev.serviceCoverage.filter((s) => s !== service)
        : [...prev.serviceCoverage, service],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canEdit) return;

    setLoading(true);
    setError(null);

    try {
      const url = channel
        ? `/api/admin/channels/${channel.id}`
        : "/api/admin/channels";
      const method = channel ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          responseSlaHours: formData.responseSlaHours
            ? parseInt(formData.responseSlaHours)
            : null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save channel");
      }

      router.push("/admin/channels");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">
        Channel Information
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Channel Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={!canEdit}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            placeholder="e.g., Istanbul Medical Center"
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City *
          </label>
          <select
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            disabled={!canEdit}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
          >
            <option value="">Select city</option>
            {CITIES.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Service Coverage */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Service Coverage *
          </label>
          <div className="flex flex-wrap gap-2">
            {SERVICE_OPTIONS.map((service) => (
              <button
                key={service}
                type="button"
                onClick={() => canEdit && handleServiceToggle(service)}
                disabled={!canEdit}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  formData.serviceCoverage.includes(service)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {service}
              </button>
            ))}
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            disabled={!canEdit}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
          >
            <option value="ACTIVE">Active</option>
            <option value="PAUSED">Paused</option>
          </select>
        </div>

        {/* Response SLA */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Response SLA (hours)
          </label>
          <input
            type="number"
            value={formData.responseSlaHours}
            onChange={(e) =>
              setFormData({ ...formData, responseSlaHours: e.target.value })
            }
            disabled={!canEdit}
            min="1"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            placeholder="e.g., 24"
          />
        </div>

        {/* Contact Methods (Internal) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contact Methods (Internal)
          </label>
          <textarea
            value={formData.contactMethods}
            onChange={(e) =>
              setFormData({ ...formData, contactMethods: e.target.value })
            }
            disabled={!canEdit}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            placeholder='e.g., {"email": "contact@clinic.com", "phone": "+90..."}'
          />
          <p className="mt-1 text-xs text-gray-500">
            JSON format for internal use only
          </p>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Internal Notes
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            disabled={!canEdit}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            placeholder="Internal notes about this channel..."
          />
        </div>
      </div>

      {canEdit && (
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || formData.serviceCoverage.length === 0}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : channel ? "Save Changes" : "Create Channel"}
          </button>
        </div>
      )}
    </form>
  );
}
