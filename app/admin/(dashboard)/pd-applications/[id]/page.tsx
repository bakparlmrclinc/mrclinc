"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PDApplicationStatus } from "@prisma/client";

interface PDApplication {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: PDApplicationStatus;
  fullName: string;
  country: string;
  city: string;
  email: string;
  phone: string;
  preferredContact: string;
  currentProfession: string;
  organisationType: string;
  yearsExperience: string;
  professionalActivity: string;
  networkTypes: string[];
  networkTypesOther: string | null;
  networkCountries: string[];
  introductionApproach: string;
  availabilityLevel: string;
  workingMode: string;
  ackFreelance: boolean;
  ackNoSales: boolean;
  ackNotClinic: boolean;
  ackTraceable: boolean;
  ackCaseBased: boolean;
  declareAccurate: boolean;
  declareAcceptFramework: boolean;
  signatureName: string;
  signatureDate: string;
  reviewedAt: string | null;
  reviewNotes: string | null;
}

const statusColors: Record<PDApplicationStatus, string> = {
  PENDING: "bg-amber-100 text-amber-800 border-amber-200",
  REVIEWED: "bg-blue-100 text-blue-800 border-blue-200",
  APPROVED: "bg-green-100 text-green-800 border-green-200",
  REJECTED: "bg-red-100 text-red-800 border-red-200",
};

const networkTypeLabels: Record<string, string> = {
  patient_support: "Patient support or advocacy groups",
  intl_advisors: "International patient advisors / coordinators",
  expat_orgs: "Expat or diaspora organisations",
  corporate_wellness: "Corporate wellness or employee health contacts",
  other: "Other",
};

export default function PDApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [application, setApplication] = useState<PDApplication | null>(null);
  const [pdAccountExists, setPdAccountExists] = useState(false);
  const [pdAccountId, setPdAccountId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [creatingPD, setCreatingPD] = useState(false);
  const [reviewNotes, setReviewNotes] = useState("");
  const [showCredentials, setShowCredentials] = useState<{
    email: string;
    password: string;
    pdCode: string;
  } | null>(null);

  useEffect(() => {
    fetchApplication();
  }, [id]);

  const fetchApplication = async () => {
    try {
      const res = await fetch(`/api/admin/pd-applications/${id}`);
      if (res.ok) {
        const data = await res.json();
        setApplication(data.application);
        setPdAccountExists(data.pdAccountExists);
        setPdAccountId(data.pdAccountId);
        setReviewNotes(data.application.reviewNotes || "");
      } else {
        router.push("/admin/pd-applications");
      }
    } catch (error) {
      console.error("Failed to fetch application:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (newStatus: PDApplicationStatus) => {
    if (!application) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/admin/pd-applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, reviewNotes }),
      });
      if (res.ok) {
        const data = await res.json();
        setApplication(data.application);
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setUpdating(false);
    }
  };

  const createPDAccount = async () => {
    if (!application || application.status !== "APPROVED") return;
    setCreatingPD(true);
    try {
      const res = await fetch(`/api/admin/pd-applications/${id}`, {
        method: "POST",
      });
      if (res.ok) {
        const data = await res.json();
        setShowCredentials({
          email: data.pdUser.email,
          password: data.tempPassword,
          pdCode: data.pdUser.pdCode,
        });
        setPdAccountExists(true);
        setPdAccountId(data.pdUser.id);
      } else {
        const error = await res.json();
        alert(error.error || "Failed to create PD account");
      }
    } catch (error) {
      console.error("Failed to create PD account:", error);
    } finally {
      setCreatingPD(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!application) {
    return null;
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <Link
            href="/admin/pd-applications"
            className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-block"
          >
            ← Back to Applications
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            {application.fullName}
          </h1>
          <p className="text-gray-600">{application.email}</p>
        </div>
        <span
          className={`px-4 py-2 text-sm font-medium rounded-lg border ${
            statusColors[application.status]
          }`}
        >
          {application.status}
        </span>
      </div>

      {/* Credentials Modal */}
      {showCredentials && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900">PD Account Created</h2>
              <p className="text-gray-600 mt-1">Share these credentials with the PD</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 space-y-3 mb-6">
              <div>
                <p className="text-xs text-gray-500 uppercase">PD Code</p>
                <p className="font-mono font-bold text-lg text-primary-600">
                  {showCredentials.pdCode}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Email</p>
                <p className="font-medium">{showCredentials.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Temporary Password</p>
                <p className="font-mono font-bold text-lg">{showCredentials.password}</p>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6">
              <p className="text-sm text-amber-800">
                <strong>Important:</strong> The PD should change this password after first login. 
                Send these credentials securely via their preferred contact method.
              </p>
            </div>

            <button
              onClick={() => setShowCredentials(null)}
              className="w-full py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700"
            >
              Done
            </button>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Application Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Basic Information
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium">{application.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{application.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{application.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Preferred Contact</p>
                <p className="font-medium capitalize">{application.preferredContact}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">
                  {application.city}, {application.country}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Applied On</p>
                <p className="font-medium">
                  {new Date(application.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Professional Background */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Professional Background
            </h2>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Profession</p>
                <p className="font-medium">{application.currentProfession}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Organisation Type</p>
                <p className="font-medium capitalize">{application.organisationType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Experience</p>
                <p className="font-medium">{application.yearsExperience} years</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Professional Activity</p>
              <p className="text-gray-700 bg-gray-50 rounded-lg p-3">
                {application.professionalActivity}
              </p>
            </div>
          </div>

          {/* Network & Channel */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Network & Channel Context
            </h2>
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">Connected With</p>
              <div className="flex flex-wrap gap-2">
                {application.networkTypes.map((type) => (
                  <span
                    key={type}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {networkTypeLabels[type] || type}
                  </span>
                ))}
              </div>
              {application.networkTypesOther && (
                <p className="text-gray-600 mt-2 text-sm">
                  Other: {application.networkTypesOther}
                </p>
              )}
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-1">Network Countries</p>
              <p className="font-medium">{application.networkCountries.join(", ")}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Introduction Approach</p>
              <p className="text-gray-700 bg-gray-50 rounded-lg p-3">
                {application.introductionApproach}
              </p>
            </div>
          </div>

          {/* Availability */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Availability & Engagement
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Availability Level</p>
                <p className="font-medium capitalize">{application.availabilityLevel}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Working Mode</p>
                <p className="font-medium capitalize">{application.workingMode}</p>
              </div>
            </div>
          </div>

          {/* Compliance */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Compliance Acknowledgements
            </h2>
            <div className="space-y-2">
              {[
                { key: "ackFreelance", label: "Understands freelance status" },
                { key: "ackNoSales", label: "Understands no sales/referral role" },
                { key: "ackNotClinic", label: "Understands MrClinc is not a clinic" },
                { key: "ackTraceable", label: "Understands activity is traceable" },
                { key: "ackCaseBased", label: "Understands case-based compensation" },
              ].map((item) => (
                <div key={item.key} className="flex items-center gap-2">
                  {application[item.key as keyof PDApplication] ? (
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                  <span className="text-gray-700">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Declaration */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Declaration</h2>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Confirmed information is accurate</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Accepted PD framework</span>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-500">Signed by</p>
              <p className="font-medium">{application.signatureName}</p>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(application.signatureDate).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Actions */}
        <div className="space-y-6">
          {/* Status Actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions</h2>

            {/* Review Notes */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Review Notes
              </label>
              <textarea
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500"
                placeholder="Add internal notes..."
              />
            </div>

            {/* Status Buttons */}
            <div className="space-y-2">
              {application.status === "PENDING" && (
                <>
                  <button
                    onClick={() => updateStatus("REVIEWED")}
                    disabled={updating}
                    className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
                  >
                    {updating ? "Updating..." : "Mark as Reviewed"}
                  </button>
                  <button
                    onClick={() => updateStatus("APPROVED")}
                    disabled={updating}
                    className="w-full py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50"
                  >
                    {updating ? "Updating..." : "Approve"}
                  </button>
                  <button
                    onClick={() => updateStatus("REJECTED")}
                    disabled={updating}
                    className="w-full py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:opacity-50"
                  >
                    {updating ? "Updating..." : "Reject"}
                  </button>
                </>
              )}

              {application.status === "REVIEWED" && (
                <>
                  <button
                    onClick={() => updateStatus("APPROVED")}
                    disabled={updating}
                    className="w-full py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50"
                  >
                    {updating ? "Updating..." : "Approve"}
                  </button>
                  <button
                    onClick={() => updateStatus("REJECTED")}
                    disabled={updating}
                    className="w-full py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:opacity-50"
                  >
                    {updating ? "Updating..." : "Reject"}
                  </button>
                </>
              )}

              {application.status === "APPROVED" && !pdAccountExists && (
                <button
                  onClick={createPDAccount}
                  disabled={creatingPD}
                  className="w-full py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50"
                >
                  {creatingPD ? "Creating..." : "Create PD Account"}
                </button>
              )}

              {application.status === "APPROVED" && pdAccountExists && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <svg className="w-8 h-8 text-green-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-green-800 font-medium">PD Account Active</p>
                  <Link
                    href={`/admin/pds/${pdAccountId}`}
                    className="text-sm text-primary-600 hover:underline"
                  >
                    View PD Profile →
                  </Link>
                </div>
              )}

              {application.status === "REJECTED" && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                  <p className="text-red-800">This application was rejected</p>
                  <button
                    onClick={() => updateStatus("PENDING")}
                    disabled={updating}
                    className="mt-2 text-sm text-primary-600 hover:underline"
                  >
                    Revert to Pending
                  </button>
                </div>
              )}
            </div>

            {/* Last Review Info */}
            {application.reviewedAt && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Last reviewed:{" "}
                  {new Date(application.reviewedAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            )}
          </div>

          {/* Quick Contact */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Contact</h2>
            <div className="space-y-3">
              <a
                href={`mailto:${application.email}`}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm">{application.email}</span>
              </a>
              <a
                href={`https://wa.me/${application.phone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span className="text-sm">{application.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
