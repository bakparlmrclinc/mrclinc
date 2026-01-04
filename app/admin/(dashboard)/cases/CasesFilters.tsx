"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface PD {
  id: string;
  pdCode: string;
  fullName: string;
}

interface FilterParams {
  status?: string;
  search?: string;
  pdId?: string;
  escalation?: string;
  city?: string;
  country?: string;
  category?: string;
  dateFrom?: string;
  dateTo?: string;
}

const STATUSES = [
  { value: "received", label: "Received" },
  { value: "under_review", label: "Under Review" },
  { value: "channel_contacted", label: "Channel Contacted" },
  { value: "information_ready", label: "Information Ready" },
  { value: "next_steps_shared", label: "Next Steps Shared" },
  { value: "confirmed", label: "Confirmed" },
  { value: "completed", label: "Completed" },
  { value: "closed", label: "Closed" },
];

const ESCALATION_LEVELS = [
  { value: "", label: "All" },
  { value: "none", label: "None" },
  { value: "L1", label: "L1" },
  { value: "L2", label: "L2" },
  { value: "L3", label: "L3" },
];

const CATEGORIES = [
  { value: "", label: "All Categories" },
  { value: "Medical Surgery", label: "Medical Surgery" },
  { value: "Aesthetic Surgery", label: "Aesthetic Surgery" },
];

export default function CasesFilters({
  pds,
  currentParams,
}: {
  pds: PD[];
  currentParams: FilterParams;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(currentParams.search || "");

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page"); // Reset to page 1 on filter change
    router.push(`/admin/cases?${params.toString()}`);
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    updateFilter("search", search);
  }

  function clearFilters() {
    router.push("/admin/cases");
    setSearch("");
  }

  const hasFilters =
    currentParams.status ||
    currentParams.search ||
    currentParams.pdId ||
    currentParams.escalation ||
    currentParams.city ||
    currentParams.country ||
    currentParams.category ||
    currentParams.dateFrom ||
    currentParams.dateTo;

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 space-y-4">
      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search TRK code, name, or email..."
          className="flex-1 px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-teal-600 text-white rounded-md text-sm hover:bg-teal-700"
        >
          Search
        </button>
      </form>

      {/* Filter row */}
      <div className="flex flex-wrap gap-3">
        {/* Status multi-select */}
        <select
          value={currentParams.status || ""}
          onChange={(e) => updateFilter("status", e.target.value)}
          className="px-3 py-2 border border-slate-300 rounded-md text-sm"
        >
          <option value="">All Statuses</option>
          {STATUSES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>

        {/* Category */}
        <select
          value={currentParams.category || ""}
          onChange={(e) => updateFilter("category", e.target.value)}
          className="px-3 py-2 border border-slate-300 rounded-md text-sm"
        >
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>

        {/* PD */}
        <select
          value={currentParams.pdId || ""}
          onChange={(e) => updateFilter("pdId", e.target.value)}
          className="px-3 py-2 border border-slate-300 rounded-md text-sm"
        >
          <option value="">All PDs</option>
          {pds.map((pd) => (
            <option key={pd.id} value={pd.id}>
              {pd.pdCode} - {pd.fullName}
            </option>
          ))}
        </select>

        {/* Escalation */}
        <select
          value={currentParams.escalation || ""}
          onChange={(e) => updateFilter("escalation", e.target.value)}
          className="px-3 py-2 border border-slate-300 rounded-md text-sm"
        >
          {ESCALATION_LEVELS.map((e) => (
            <option key={e.value} value={e.value}>
              Escalation: {e.label}
            </option>
          ))}
        </select>

        {/* Country */}
        <input
          type="text"
          value={currentParams.country || ""}
          onChange={(e) => updateFilter("country", e.target.value)}
          placeholder="Country"
          className="w-32 px-3 py-2 border border-slate-300 rounded-md text-sm"
        />

        {/* Date range */}
        <input
          type="date"
          value={currentParams.dateFrom || ""}
          onChange={(e) => updateFilter("dateFrom", e.target.value)}
          className="px-3 py-2 border border-slate-300 rounded-md text-sm"
        />
        <span className="self-center text-slate-400">to</span>
        <input
          type="date"
          value={currentParams.dateTo || ""}
          onChange={(e) => updateFilter("dateTo", e.target.value)}
          className="px-3 py-2 border border-slate-300 rounded-md text-sm"
        />

        {hasFilters && (
          <button
            onClick={clearFilters}
            className="px-3 py-2 text-sm text-slate-600 hover:text-slate-800"
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  );
}
