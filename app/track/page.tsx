"use client";

<<<<<<< HEAD
import { useState, useEffect, Suspense } from "react";
=======
import { useState, Suspense } from "react";
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

<<<<<<< HEAD
// Status types matching backend (patient-facing only)
type Status = 
  | "received" 
  | "under_review" 
  | "channel_contacted" 
  | "information_ready" 
  | "next_steps_shared" 
  | "confirmed" 
  | "completed" 
  | "closed";

interface TimelineEntry {
  status: string;
  date: string;
  description: string;
}

interface TrackingResult {
  trackingCode: string;
  category: string;
  serviceType: string | null;
  status: string;
  statusDescription: string;
  timeline: TimelineEntry[];
  submittedAt: string;
  lastUpdatedAt: string;
}

// Status label mapping for UI display
const statusLabels: Record<Status, { label: string; color: string; bg: string }> = {
  "received": { label: "Received", color: "#1B4965", bg: "#F0F7FA" },
  "under_review": { label: "Under Review", color: "#1B4965", bg: "#F0F7FA" },
  "channel_contacted": { label: "Healthcare Provider Contacted", color: "#1B4965", bg: "#F0F7FA" },
  "information_ready": { label: "Information Ready", color: "#166534", bg: "#DCFCE7" },
  "next_steps_shared": { label: "Next Steps Shared", color: "#166534", bg: "#DCFCE7" },
  "confirmed": { label: "Confirmed", color: "#9A3412", bg: "#FFEDD5" },
  "completed": { label: "Completed", color: "#166534", bg: "#DCFCE7" },
  "closed": { label: "Closed", color: "#6B7280", bg: "#F3F4F6" }
};

// Get status style with fallback
function getStatusStyle(status: string): { label: string; color: string; bg: string } {
  return statusLabels[status as Status] || { label: status, color: "#6B7280", bg: "#F3F4F6" };
}

// Format ISO date to readable format
function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
=======
type Status = "received" | "processing" | "quotes-sent" | "in-progress" | "completed" | "closed";

interface TrackingResult {
  code: string;
  service: string;
  status: Status;
  submittedAt: string;
  lastUpdated: string;
  timeline: { status: Status; date: string; description: string }[];
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
}

function TrackForm() {
  const searchParams = useSearchParams();
  const initialCode = searchParams.get("code") || "";
  const [code, setCode] = useState(initialCode);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TrackingResult | null>(null);
  const [error, setError] = useState("");

<<<<<<< HEAD
  // Auto-track if code is in URL
  useEffect(() => {
    if (initialCode) {
      handleTrack();
    }
  }, []);

  const handleTrack = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!code.trim()) return;
    
    setIsLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(`/api/requests/${code.toUpperCase()}`);
      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.error?.message || "Request not found. Please check your tracking code.");
        return;
      }

      setResult(data.data);
    } catch (err) {
      setError("Unable to retrieve request status. Please try again.");
    } finally {
      setIsLoading(false);
    }
=======
  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    setIsLoading(true);
    setError("");
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (code.toUpperCase().startsWith("TRK-")) {
      setResult({
        code: code.toUpperCase(),
        service: "Aesthetic Surgery - Rhinoplasty",
        status: "quotes-sent",
        submittedAt: "2025-12-28 10:30",
        lastUpdated: "2025-12-30 14:20",
        timeline: [
          { status: "received", date: "Dec 28, 10:30", description: "Request received and confirmed" },
          { status: "processing", date: "Dec 28, 14:00", description: "Request assigned to clinics" },
          { status: "quotes-sent", date: "Dec 30, 14:20", description: "3 clinics have sent quotes" },
        ]
      });
    } else {
      setError("Invalid tracking code. Please check and try again.");
      setResult(null);
    }
    setIsLoading(false);
  };

  const statusLabels: Record<Status, { label: string; color: string; bg: string }> = {
    "received": { label: "Received", color: "#1B4965", bg: "#F0F7FA" },
    "processing": { label: "Processing", color: "#1B4965", bg: "#F0F7FA" },
    "quotes-sent": { label: "Quotes Sent", color: "#166534", bg: "#DCFCE7" },
    "in-progress": { label: "In Progress", color: "#9A3412", bg: "#FFEDD5" },
    "completed": { label: "Completed", color: "#166534", bg: "#DCFCE7" },
    "closed": { label: "Closed", color: "#6B7280", bg: "#F3F4F6" }
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {/* Search Form */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Enter Your Tracking Code</h2>
        <form onSubmit={handleTrack} className="flex gap-3">
          <Input value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} placeholder="TRK-XXXXX" className="flex-1" />
          <Button type="submit" variant="primary" isLoading={isLoading}>Track</Button>
        </form>
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      </div>

      {/* Result */}
      {result && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200" style={{ backgroundColor: '#F9FAFB' }}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-sm text-gray-500">Tracking Code</p>
<<<<<<< HEAD
                <p className="text-xl font-bold" style={{ color: '#1B4965' }}>{result.trackingCode}</p>
              </div>
              <span 
                className="inline-block px-3 py-1 text-sm font-medium rounded-full" 
                style={{ 
                  backgroundColor: getStatusStyle(result.status).bg, 
                  color: getStatusStyle(result.status).color 
                }}
              >
                {getStatusStyle(result.status).label}
=======
                <p className="text-xl font-bold" style={{ color: '#1B4965' }}>{result.code}</p>
              </div>
              <span className="inline-block px-3 py-1 text-sm font-medium rounded-full" style={{ backgroundColor: statusLabels[result.status].bg, color: statusLabels[result.status].color }}>
                {statusLabels[result.status].label}
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
              </span>
            </div>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-1">Service</p>
<<<<<<< HEAD
              <p className="text-gray-900">
                {result.category}
                {result.serviceType && ` - ${result.serviceType}`}
              </p>
            </div>
            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-1">Submitted</p>
              <p className="text-gray-900">{formatDate(result.submittedAt)}</p>
=======
              <p className="text-gray-900">{result.service}</p>
            </div>
            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-1">Submitted</p>
              <p className="text-gray-900">{result.submittedAt}</p>
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 mb-4">Timeline</p>
              <div className="space-y-4">
                {result.timeline.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#1B4965' }} />
                      {idx < result.timeline.length - 1 && <div className="w-0.5 flex-1 mt-1" style={{ backgroundColor: '#D9EEF5' }} />}
                    </div>
                    <div className="flex-1 pb-4">
<<<<<<< HEAD
                      <p className="font-medium text-gray-900">{item.status}</p>
=======
                      <p className="font-medium text-gray-900">{statusLabels[item.status].label}</p>
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
                      <p className="text-sm text-gray-500">{item.date}</p>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {!result && !error && (
        <div className="text-center text-gray-500">
          <p>Enter your tracking code above to see your request status</p>
        </div>
      )}
    </div>
  );
}

export default function TrackPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
        <section className="py-12" style={{ backgroundColor: '#1B4965' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-2 text-white">Track Your Request</h1>
            <p style={{ color: '#B3DDED' }}>Enter your tracking code to see the status of your request</p>
          </div>
        </section>
        <Suspense fallback={<div className="flex items-center justify-center py-12"><div className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#1B4965', borderTopColor: 'transparent' }} /></div>}>
          <TrackForm />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
