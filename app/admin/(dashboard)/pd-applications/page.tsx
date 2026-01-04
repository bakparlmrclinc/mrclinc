"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PDApplicationStatus } from "@prisma/client";

interface PDApplication {
  id: string;
  createdAt: string;
  status: PDApplicationStatus;
  fullName: string;
  email: string;
  country: string;
  city: string;
  currentProfession: string;
  yearsExperience: string;
  availabilityLevel: string;
}

interface StatusCounts {
  PENDING: number;
  REVIEWED: number;
  APPROVED: number;
  REJECTED: number;
}

const statusColors: Record<PDApplicationStatus, string> = {
  PENDING: "bg-amber-100 text-amber-800",
  REVIEWED: "bg-blue-100 text-blue-800",
  APPROVED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
};

const statusLabels: Record<PDApplicationStatus, string> = {
  PENDING: "Pending Review",
  REVIEWED: "Under Review",
  APPROVED: "Approved",
  REJECTED: "Rejected",
};

export default function PDApplicationsPage() {
  const [applications, setApplications] = useState<PDApplication[]>([]);
  const [counts, setCounts] = useState<StatusCounts>({
    PENDING: 0,
    REVIEWED: 0,
    APPROVED: 0,
    REJECTED: 0,
  });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<PDApplicationStatus | "ALL">("ALL");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchApplications();
  }, [filter, search]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filter !== "ALL") params.set("status", filter);
      if (search) params.set("search", search);

      const res = await fetch(`/api/admin/pd-applications?${params}`);
      if (res.ok) {
        const data = await res.json();
        setApplications(data.applications);
        setCounts(data.counts);
      }
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalCount = counts.PENDING + counts.REVIEWED + counts.APPROVED + counts.REJECTED;

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">PD Applications</h1>
        <p className="text-gray-600 mt-1">
          Review and manage Pathway Developer applications
        </p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <button
          onClick={() => setFilter("ALL")}
          className={`p-4 rounded-xl border-2 transition-all ${
            filter === "ALL"
              ? "border-primary-500 bg-primary-50"
              : "border-gray-200 bg-white hover:border-gray-300"
          }`}
        >
          <p className="text-2xl font-bold text-gray-900">{totalCount}</p>
          <p className="text-sm text-gray-600">All Applications</p>
        </button>

        <button
          onClick={() => setFilter("PENDING")}
          className={`p-4 rounded-xl border-2 transition-all ${
            filter === "PENDING"
              ? "border-amber-500 bg-amber-50"
              : "border-gray-200 bg-white hover:border-gray-300"
          }`}
        >
          <p className="text-2xl font-bold text-amber-600">{counts.PENDING}</p>
          <p className="text-sm text-gray-600">Pending</p>
        </button>

        <button
          onClick={() => setFilter("REVIEWED")}
          className={`p-4 rounded-xl border-2 transition-all ${
            filter === "REVIEWED"
              ? "border-blue-500 bg-blue-50"
              : "border-gray-200 bg-white hover:border-gray-300"
          }`}
        >
          <p className="text-2xl font-bold text-blue-600">{counts.REVIEWED}</p>
          <p className="text-sm text-gray-600">Reviewed</p>
        </button>

        <button
          onClick={() => setFilter("APPROVED")}
          className={`p-4 rounded-xl border-2 transition-all ${
            filter === "APPROVED"
              ? "border-green-500 bg-green-50"
              : "border-gray-200 bg-white hover:border-gray-300"
          }`}
        >
          <p className="text-2xl font-bold text-green-600">{counts.APPROVED}</p>
          <p className="text-sm text-gray-600">Approved</p>
        </button>

        <button
          onClick={() => setFilter("REJECTED")}
          className={`p-4 rounded-xl border-2 transition-all ${
            filter === "REJECTED"
              ? "border-red-500 bg-red-50"
              : "border-gray-200 bg-white hover:border-gray-300"
          }`}
        >
          <p className="text-2xl font-bold text-red-600">{counts.REJECTED}</p>
          <p className="text-sm text-gray-600">Rejected</p>
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name, email, country, or profession..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : applications.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No applications found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Applicant
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Location
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Profession
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Experience
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Availability
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Applied
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{app.fullName}</p>
                        <p className="text-sm text-gray-500">{app.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {app.city}, {app.country}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {app.currentProfession}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {app.yearsExperience}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600 capitalize">
                      {app.availabilityLevel}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${
                          statusColors[app.status]
                        }`}
                      >
                        {statusLabels[app.status]}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">
                      {new Date(app.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-4">
                      <Link
                        href={`/admin/pd-applications/${app.id}`}
                        className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                      >
                        Review →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
