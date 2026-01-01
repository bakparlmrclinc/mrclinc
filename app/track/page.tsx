"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface TrackingStatus {
  code: string;
  service: string;
  status: "received" | "processing" | "quotes-sent" | "in-progress" | "completed" | "closed";
  timeline: Array<{
    status: string;
    date: string;
    description: string;
    completed: boolean;
  }>;
}

const mockData: Record<string, TrackingStatus> = {
  "TRK-DEMO1": {
    code: "TRK-DEMO1",
    service: "Rhinoplasty",
    status: "quotes-sent",
    timeline: [
      { status: "Received", date: "2026-01-01 10:30", description: "Request submitted successfully", completed: true },
      { status: "Processing", date: "2026-01-01 14:20", description: "Request being reviewed and coordinated", completed: true },
      { status: "Quotes Sent", date: "2026-01-02 09:15", description: "3 clinics have sent quotes to your email", completed: true },
      { status: "In Progress", date: "", description: "Treatment booked and scheduled", completed: false },
      { status: "Completed", date: "", description: "Treatment completed successfully", completed: false },
    ]
  },
  "TRK-DEMO2": {
    code: "TRK-DEMO2",
    service: "Cancer Second Opinion",
    status: "processing",
    timeline: [
      { status: "Received", date: "2026-01-01 16:00", description: "Second Opinion request submitted", completed: true },
      { status: "Processing", date: "2026-01-01 16:30", description: "Specialists reviewing your case", completed: true },
      { status: "Report Ready", date: "", description: "Second Opinion report delivered", completed: false },
    ]
  }
};

function TrackContent() {
  const searchParams = useSearchParams();
  const initialCode = searchParams.get("code") || "";
  
  const [code, setCode] = useState(initialCode);
  const [result, setResult] = useState<TrackingStatus | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 800));

    const found = mockData[code.toUpperCase()];
    if (found) {
      setResult(found);
    } else if (code.toUpperCase().startsWith("TRK-")) {
      // Generate demo result for any TRK- code
      setResult({
        code: code.toUpperCase(),
        service: "General Surgery",
        status: "received",
        timeline: [
          { status: "Received", date: new Date().toISOString().slice(0, 16).replace("T", " "), description: "Request submitted successfully", completed: true },
          { status: "Processing", date: "", description: "Request being reviewed", completed: false },
          { status: "Quotes Sent", date: "", description: "Clinics will send quotes", completed: false },
        ]
      });
    } else {
      setError("Tracking code not found. Please check and try again.");
    }
    setIsLoading(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "received": return <Badge variant="primary">Received</Badge>;
      case "processing": return <Badge variant="warning">Processing</Badge>;
      case "quotes-sent": return <Badge variant="info">Quotes Sent</Badge>;
      case "in-progress": return <Badge variant="accent">In Progress</Badge>;
      case "completed": return <Badge variant="success">Completed</Badge>;
      case "closed": return <Badge variant="secondary">Closed</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">Track Your Request</h1>
      <p className="text-gray-600 text-center mb-8">Enter your tracking code to view request status</p>

      {/* Search Form */}
      <Card variant="bordered" className="mb-8">
        <CardContent className="py-6">
          <form onSubmit={handleSearch} className="flex gap-3">
            <Input
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="TRK-XXXXX"
              className="flex-1"
            />
            <Button type="submit" variant="primary" isLoading={isLoading}>
              Track
            </Button>
          </form>
          {error && (
            <p className="text-error-600 text-sm mt-3">{error}</p>
          )}
          <p className="text-xs text-gray-500 mt-3">
            Demo codes: TRK-DEMO1, TRK-DEMO2
          </p>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <Card variant="bordered">
          <CardContent className="py-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
              <div>
                <p className="text-sm text-gray-500">Tracking Code</p>
                <p className="text-xl font-bold text-gray-900">{result.code}</p>
              </div>
              {getStatusBadge(result.status)}
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-500">Service</p>
              <p className="font-medium text-gray-900">{result.service}</p>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
              {result.timeline.map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      item.completed ? "bg-success-100" : "bg-gray-100"
                    }`}>
                      {item.completed ? (
                        <svg className="w-4 h-4 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <div className="w-2 h-2 bg-gray-300 rounded-full" />
                      )}
                    </div>
                    {idx < result.timeline.length - 1 && (
                      <div className={`w-0.5 h-8 mt-2 ${item.completed ? "bg-success-200" : "bg-gray-200"}`} />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className={`font-medium ${item.completed ? "text-gray-900" : "text-gray-400"}`}>
                      {item.status}
                    </p>
                    <p className={`text-sm ${item.completed ? "text-gray-600" : "text-gray-400"}`}>
                      {item.description}
                    </p>
                    {item.date && (
                      <p className="text-xs text-gray-400 mt-1">{item.date}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Help */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Questions about your request?{" "}
                <Link href="/contact" className="text-primary-600 hover:underline">Contact us</Link>
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* No code entered yet */}
      {!result && !error && (
        <div className="text-center text-gray-500">
          <p>Your tracking code was provided when you submitted your request.</p>
          <p className="mt-2">
            Don't have a code yet?{" "}
            <Link href="/apply" className="text-primary-600 hover:underline">Submit a request</Link>
          </p>
        </div>
      )}
    </div>
  );
}

export default function TrackPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <Suspense fallback={
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
          </div>
        }>
          <TrackContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
