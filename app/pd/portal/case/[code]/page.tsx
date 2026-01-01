"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

interface TimelineItem {
  status: string;
  timestamp: string;
  note?: string;
}

interface EscalationNote {
  id: string;
  type: string;
  message: string;
  createdAt: string;
  response?: string;
  respondedAt?: string;
}

interface CaseDetail {
  trackingCode: string;
  patientName: string;
  location: string;
  age: number;
  service: string;
  category: string;
  currentStatus: string;
  submittedAt: string;
  timeline: TimelineItem[];
  escalations: EscalationNote[];
}

const demoCases: Record<string, CaseDetail> = {
  "TRK-H7G2X": {
    trackingCode: "TRK-H7G2X",
    patientName: "John D.",
    location: "Manchester",
    age: 34,
    service: "Hair Transplant (FUE)",
    category: "Aesthetic Surgery",
    currentStatus: "in-progress",
    submittedAt: "2024-12-20T10:30:00Z",
    timeline: [
      { status: "Received", timestamp: "2024-12-20T10:30:00Z" },
      { status: "Processing", timestamp: "2024-12-20T14:15:00Z" },
      { status: "Quotes Sent", timestamp: "2024-12-22T09:45:00Z", note: "3 clinics responded" },
      { status: "In Progress", timestamp: "2024-12-28T14:00:00Z", note: "Patient booked treatment" },
    ],
    escalations: [],
  },
  "TRK-R4K8N": {
    trackingCode: "TRK-R4K8N",
    patientName: "Sarah M.",
    location: "London",
    age: 29,
    service: "Rhinoplasty",
    category: "Aesthetic Surgery",
    currentStatus: "quotes-sent",
    submittedAt: "2024-12-25T09:15:00Z",
    timeline: [
      { status: "Received", timestamp: "2024-12-25T09:15:00Z" },
      { status: "Processing", timestamp: "2024-12-25T11:00:00Z" },
      { status: "Quotes Sent", timestamp: "2024-12-27T11:30:00Z", note: "4 clinics responded" },
    ],
    escalations: [],
  },
  "TRK-C2P9L": {
    trackingCode: "TRK-C2P9L",
    patientName: "Ahmed K.",
    location: "Birmingham",
    age: 52,
    service: "Second Opinion - Colon Cancer",
    category: "Cancer Surgery",
    currentStatus: "processing",
    submittedAt: "2024-12-29T16:45:00Z",
    timeline: [
      { status: "Received", timestamp: "2024-12-29T16:45:00Z" },
      { status: "Processing", timestamp: "2024-12-29T17:00:00Z", note: "Coordinating with oncology specialists" },
    ],
    escalations: [
      {
        id: "esc-1",
        type: "Patient hasn't heard back",
        message: "Patient called asking for update. It's been 2 days.",
        createdAt: "2024-12-31T10:00:00Z",
        response: "Second opinions for cancer cases require specialist review. Expected completion: 3-5 days. Patient has been notified.",
        respondedAt: "2024-12-31T14:30:00Z",
      },
    ],
  },
  "TRK-B5M1Q": {
    trackingCode: "TRK-B5M1Q",
    patientName: "Emma W.",
    location: "Leeds",
    age: 45,
    service: "Gallbladder Surgery",
    category: "General Surgery",
    currentStatus: "completed",
    submittedAt: "2024-11-15T08:00:00Z",
    timeline: [
      { status: "Received", timestamp: "2024-11-15T08:00:00Z" },
      { status: "Processing", timestamp: "2024-11-15T10:30:00Z" },
      { status: "Quotes Sent", timestamp: "2024-11-17T14:00:00Z", note: "3 clinics responded" },
      { status: "In Progress", timestamp: "2024-11-25T09:00:00Z", note: "Treatment scheduled" },
      { status: "Completed", timestamp: "2024-12-10T16:00:00Z", note: "Treatment completed successfully" },
    ],
    escalations: [],
  },
  "TRK-F9N3T": {
    trackingCode: "TRK-F9N3T",
    patientName: "Michael R.",
    location: "Glasgow",
    age: 38,
    service: "Breast Augmentation",
    category: "Aesthetic Surgery",
    currentStatus: "received",
    submittedAt: "2024-12-30T12:00:00Z",
    timeline: [
      { status: "Received", timestamp: "2024-12-30T12:00:00Z" },
    ],
    escalations: [],
  },
};

const statusConfig: Record<string, { variant: "default" | "primary" | "success" | "warning" | "error" }> = {
  received: { variant: "default" },
  processing: { variant: "primary" },
  "quotes-sent": { variant: "warning" },
  "in-progress": { variant: "primary" },
  completed: { variant: "success" },
  closed: { variant: "default" },
};

const escalationTypes = [
  { value: "", label: "Select issue type..." },
  { value: "no-response", label: "Patient hasn't heard back" },
  { value: "process-question", label: "Patient has process question" },
  { value: "clinic-issue", label: "Patient reported issue with clinic" },
  { value: "urgent", label: "Urgent - needs immediate attention" },
  { value: "other", label: "Other" },
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function CaseDetailPage() {
  const router = useRouter();
  const params = useParams();
  const code = params.code as string;

  const [isLoading, setIsLoading] = useState(true);
  const [caseData, setCaseData] = useState<CaseDetail | null>(null);
  const [showEscalationForm, setShowEscalationForm] = useState(false);
  const [escalationData, setEscalationData] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem("pdSession");
    if (!session) {
      router.push("/pd/login");
      return;
    }

    const parsed = JSON.parse(session);
    if (!parsed.loggedIn) {
      router.push("/pd/login");
      return;
    }

    const data = demoCases[code.toUpperCase()];
    if (data) {
      setCaseData(data);
    }
    setIsLoading(false);
  }, [router, code]);

  const handleEscalationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!escalationData.type || !escalationData.message.trim()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (caseData) {
      const newEscalation: EscalationNote = {
        id: `esc-${Date.now()}`,
        type: escalationTypes.find(t => t.value === escalationData.type)?.label || escalationData.type,
        message: escalationData.message,
        createdAt: new Date().toISOString(),
      };
      setCaseData({
        ...caseData,
        escalations: [...caseData.escalations, newEscalation],
      });
    }

    setIsSubmitting(false);
    setSubmitSuccess(true);
    setShowEscalationForm(false);
    setEscalationData({ type: "", message: "" });
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Case Not Found</h2>
          <p className="text-gray-600 mb-4">The case {code} could not be found.</p>
          <Link href="/pd/portal">
            <Button variant="primary">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-xl font-bold text-primary-600">MrClinc</Link>
              <span className="text-gray-300">|</span>
              <span className="text-gray-600 text-sm">PD Portal</span>
            </div>
            <Link href="/pd/portal">
              <Button variant="outline" size="sm">Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/pd/portal" className="text-sm text-primary-600 hover:underline">Dashboard</Link>
          <span className="text-gray-400 mx-2">/</span>
          <span className="text-sm text-gray-600">{caseData.trackingCode}</span>
        </div>

        {submitSuccess && (
          <div className="mb-6 bg-success-50 border border-success-200 text-success-700 px-4 py-3 rounded-lg">
            Escalation submitted successfully. Team will respond within 24 hours.
          </div>
        )}

        <Card variant="bordered" className="mb-6">
          <CardContent className="py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-sm text-gray-500">Tracking Code</p>
                <h1 className="text-2xl font-bold font-mono text-primary-600">{caseData.trackingCode}</h1>
              </div>
              <Badge variant={statusConfig[caseData.currentStatus]?.variant || "default"} size="lg">
                {caseData.currentStatus.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card variant="bordered">
              <CardHeader>
                <CardTitle>Case Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Patient</p>
                    <p className="font-medium text-gray-900">{caseData.patientName}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Location</p>
                    <p className="font-medium text-gray-900">{caseData.location}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Age</p>
                    <p className="font-medium text-gray-900">{caseData.age}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Submitted</p>
                    <p className="font-medium text-gray-900">{formatDate(caseData.submittedAt)}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-500">Service</p>
                    <p className="font-medium text-gray-900">{caseData.service}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-500">Category</p>
                    <p className="font-medium text-gray-900">{caseData.category}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-400">
                    Note: Patient medical details and clinic quotes are not visible to PDs.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card variant="bordered">
              <CardHeader>
                <CardTitle>Status Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {caseData.timeline.map((item, index) => {
                    const isLast = index === caseData.timeline.length - 1;
                    return (
                      <div key={index} className="relative flex gap-4">
                        {!isLast && (
                          <div className="absolute left-3 top-8 bottom-0 w-0.5 bg-gray-200" />
                        )}
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${isLast ? "bg-primary-500" : "bg-gray-300"}`}>
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div className="flex-1 pb-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-900">{item.status}</h4>
                            <span className="text-sm text-gray-500">{formatDate(item.timestamp)}</span>
                          </div>
                          {item.note && <p className="text-sm text-gray-600 mt-1">{item.note}</p>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card variant="bordered">
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  If there&apos;s an issue with this case or the patient needs assistance, submit an escalation note.
                </p>
                <Button variant="primary" className="w-full" onClick={() => setShowEscalationForm(!showEscalationForm)}>
                  {showEscalationForm ? "Cancel" : "Submit Escalation"}
                </Button>
              </CardContent>
            </Card>

            {showEscalationForm && (
              <Card variant="bordered" className="border-primary-200 bg-primary-50">
                <CardHeader>
                  <CardTitle>New Escalation</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleEscalationSubmit} className="space-y-4">
                    <Select
                      label="Issue Type"
                      options={escalationTypes}
                      value={escalationData.type}
                      onChange={(e) => setEscalationData(prev => ({ ...prev, type: e.target.value }))}
                      required
                    />
                    <Textarea
                      label="Details"
                      value={escalationData.message}
                      onChange={(e) => setEscalationData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Describe the issue..."
                      rows={4}
                      required
                    />
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full"
                      loading={isSubmitting}
                      disabled={isSubmitting || !escalationData.type || !escalationData.message.trim()}
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {caseData.escalations.length > 0 && (
              <Card variant="bordered">
                <CardHeader>
                  <CardTitle>Escalation History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {caseData.escalations.map((esc) => (
                      <div key={esc.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="default" size="sm">{esc.type}</Badge>
                          <span className="text-xs text-gray-500">{formatDate(esc.createdAt)}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{esc.message}</p>
                        {esc.response ? (
                          <div className="bg-gray-50 rounded-lg p-3 mt-2">
                            <p className="text-xs text-gray-500 mb-1">Team Response:</p>
                            <p className="text-sm text-gray-700">{esc.response}</p>
                            <p className="text-xs text-gray-400 mt-1">{formatDate(esc.respondedAt!)}</p>
                          </div>
                        ) : (
                          <p className="text-xs text-primary-600">Awaiting response...</p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
