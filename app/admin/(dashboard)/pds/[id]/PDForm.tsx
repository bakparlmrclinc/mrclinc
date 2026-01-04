"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PDStatus, VerificationState } from "@prisma/client";

interface PD {
  id: string;
  pdCode: string;
  fullName: string;
  profession: string | null;
  country: string;
  city: string;
  languages: string[];
  notes: string | null;
  email: string | null;
  phone: string | null;
  status: PDStatus;
  verificationState: VerificationState;
}

export default function PDForm({
  pd,
  canEdit = true,
  userId,
}: {
  pd: PD | null;
  canEdit?: boolean;
  userId: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: pd?.fullName || "",
    profession: pd?.profession || "",
    country: pd?.country || "",
    city: pd?.city || "",
    languages: pd?.languages.join(", ") || "",
    email: pd?.email || "",
    phone: pd?.phone || "",
    notes: pd?.notes || "",
    status: pd?.status || "ACTIVE",
    verificationState: pd?.verificationState || "PENDING",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const url = pd ? `/api/admin/pds/${pd.id}` : "/api/admin/pds";
      const method = pd ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          languages: formData.languages.split(",").map((l) => l.trim()).filter(Boolean),
          updatedById: userId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to save");
        return;
      }

      if (pd) {
        router.refresh();
      } else {
        router.push(`/admin/pds/${data.id}`);
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-slate-200">
      <div className="px-4 py-3 border-b border-slate-200">
        <h2 className="font-medium text-slate-800">
          {pd ? "PD Details" : "New PD"}
        </h2>
      </div>

      <div className="p-4 space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-md p-3">
            {error}
          </div>
        )}

        {pd && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              PD Code
            </label>
            <input
              type="text"
              value={pd.pdCode}
              disabled
              className="w-full px-3 py-2 border border-slate-200 rounded-md bg-slate-50 font-mono"
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              disabled={!canEdit}
              className="w-full px-3 py-2 border border-slate-300 rounded-md disabled:bg-slate-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Profession
            </label>
            <input
              type="text"
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              disabled={!canEdit}
              className="w-full px-3 py-2 border border-slate-300 rounded-md disabled:bg-slate-50"
              placeholder="e.g., Health Professional"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Country *
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              disabled={!canEdit}
              className="w-full px-3 py-2 border border-slate-300 rounded-md disabled:bg-slate-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              City * (Pool basis)
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              disabled={!canEdit}
              className="w-full px-3 py-2 border border-slate-300 rounded-md disabled:bg-slate-50"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Languages (comma-separated)
          </label>
          <input
            type="text"
            name="languages"
            value={formData.languages}
            onChange={handleChange}
            disabled={!canEdit}
            className="w-full px-3 py-2 border border-slate-300 rounded-md disabled:bg-slate-50"
            placeholder="e.g., English, Turkish, German"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email (internal)
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!canEdit}
              className="w-full px-3 py-2 border border-slate-300 rounded-md disabled:bg-slate-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Phone (internal)
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!canEdit}
              className="w-full px-3 py-2 border border-slate-300 rounded-md disabled:bg-slate-50"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              disabled={!canEdit}
              className="w-full px-3 py-2 border border-slate-300 rounded-md disabled:bg-slate-50"
            >
              <option value="ACTIVE">Active</option>
              <option value="PAUSED">Paused</option>
              <option value="REMOVED">Removed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Verification State
            </label>
            <select
              name="verificationState"
              value={formData.verificationState}
              onChange={handleChange}
              disabled={!canEdit}
              className="w-full px-3 py-2 border border-slate-300 rounded-md disabled:bg-slate-50"
            >
              <option value="PENDING">Pending</option>
              <option value="VERIFIED">Verified</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Internal Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            disabled={!canEdit}
            className="w-full px-3 py-2 border border-slate-300 rounded-md disabled:bg-slate-50"
          />
        </div>
      </div>

      {canEdit && (
        <div className="px-4 py-3 border-t border-slate-200 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : pd ? "Save Changes" : "Create PD"}
          </button>
        </div>
      )}
    </form>
  );
}
