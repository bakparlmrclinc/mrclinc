<<<<<<< HEAD
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { getPDSessionFromCookies } from "@/lib/auth/pd-session";
import { Button } from "@/components/ui/Button";
=======
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
import { Badge } from "@/components/ui/Badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/Card";
<<<<<<< HEAD
import PDPortalHeader from "./PDPortalHeader";

// Status config
const statusConfig: Record<string, { label: string; variant: "secondary" | "primary" | "success" | "warning" | "error" }> = {
  received: { label: "Received", variant: "secondary" },
  under_review: { label: "Under Review", variant: "primary" },
  channel_contacted: { label: "Channel Contacted", variant: "warning" },
  information_ready: { label: "Info Ready", variant: "primary" },
  next_steps_shared: { label: "Next Steps Shared", variant: "primary" },
  confirmed: { label: "Confirmed", variant: "success" },
  completed: { label: "Completed", variant: "success" },
  closed: { label: "Closed", variant: "secondary" },
};

// Format date
function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

interface CaseData {
  id: string;
  trackingCode: string;
  patientName: string | null;
  patientCity: string | null;
  mainCategory: string;
  medicalSubType: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export default async function PDPortalPage() {
  // Server-side session validation
  const session = await getPDSessionFromCookies();
  
  if (!session) {
    redirect("/pd/login");
  }

  // Fetch PD info and cases from database
  const pd = await prisma.pD.findUnique({
    where: { id: session.id },
    select: {
      id: true,
      pdCode: true,
      fullName: true,
      status: true,
    },
  });

  if (!pd || pd.status !== "ACTIVE") {
    redirect("/pd/login");
  }

  // Fetch assigned cases
  const cases: CaseData[] = await prisma.case.findMany({
    where: { assignedPdId: pd.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      trackingCode: true,
      patientName: true,
      patientCity: true,
      mainCategory: true,
      medicalSubType: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  // Calculate stats
  const stats = {
    total: cases.length,
    open: cases.filter((c: CaseData) => !["completed", "closed"].includes(c.status)).length,
    completed: cases.filter((c: CaseData) => c.status === "completed").length,
    thisMonth: cases.filter((c: CaseData) => {
      const date = new Date(c.createdAt);
=======

// Types
interface Case {
  trackingCode: string;
  patientName: string;
  location: string;
  service: string;
  category: string;
  status: "received" | "processing" | "quotes-sent" | "in-progress" | "completed" | "closed";
  submittedAt: string;
  updatedAt: string;
}

// Demo data
const demoCases: Case[] = [
  {
    trackingCode: "TRK-H7G2X",
    patientName: "John D.",
    location: "Manchester",
    service: "Hair Transplant",
    category: "Aesthetic",
    status: "in-progress",
    submittedAt: "2024-12-20T10:30:00Z",
    updatedAt: "2024-12-28T14:00:00Z",
  },
  {
    trackingCode: "TRK-R4K8N",
    patientName: "Sarah M.",
    location: "London",
    service: "Rhinoplasty",
    category: "Aesthetic",
    status: "quotes-sent",
    submittedAt: "2024-12-25T09:15:00Z",
    updatedAt: "2024-12-27T11:30:00Z",
  },
  {
    trackingCode: "TRK-C2P9L",
    patientName: "Ahmed K.",
    location: "Birmingham",
    service: "Second Opinion - Colon Cancer",
    category: "Cancer",
    status: "processing",
    submittedAt: "2024-12-29T16:45:00Z",
    updatedAt: "2024-12-29T17:00:00Z",
  },
  {
    trackingCode: "TRK-B5M1Q",
    patientName: "Emma W.",
    location: "Leeds",
    service: "Gallbladder Surgery",
    category: "General",
    status: "completed",
    submittedAt: "2024-11-15T08:00:00Z",
    updatedAt: "2024-12-10T16:00:00Z",
  },
  {
    trackingCode: "TRK-F9N3T",
    patientName: "Michael R.",
    location: "Glasgow",
    service: "Breast Augmentation",
    category: "Aesthetic",
    status: "received",
    submittedAt: "2024-12-30T12:00:00Z",
    updatedAt: "2024-12-30T12:00:00Z",
  },
];

// Status config
const statusConfig: Record<string, { label: string; variant: "default" | "primary" | "success" | "warning" | "error" }> = {
  received: { label: "Received", variant: "default" },
  processing: { label: "Processing", variant: "primary" },
  "quotes-sent": { label: "Quotes Sent", variant: "warning" },
  "in-progress": { label: "In Progress", variant: "primary" },
  completed: { label: "Completed", variant: "success" },
  closed: { label: "Closed", variant: "default" },
};

// Filter options
const statusOptions = [
  { value: "", label: "All Statuses" },
  { value: "received", label: "Received" },
  { value: "processing", label: "Processing" },
  { value: "quotes-sent", label: "Quotes Sent" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "closed", label: "Closed" },
];

const categoryOptions = [
  { value: "", label: "All Categories" },
  { value: "Aesthetic", label: "Aesthetic Surgery" },
  { value: "Cancer", label: "Cancer Surgery" },
  { value: "General", label: "General Surgery" },
];

// Format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export default function PDPortalPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [pdInfo, setPdInfo] = useState<{ code: string; name: string } | null>(null);
  const [cases, setCases] = useState<Case[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // Check auth on mount
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

    setPdInfo({ code: parsed.code, name: parsed.name });
    setCases(demoCases);
    setIsLoading(false);
  }, [router]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("pdSession");
    router.push("/pd/login");
  };

  // Filter cases
  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      !searchTerm ||
      c.trackingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.service.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = !statusFilter || c.status === statusFilter;
    const matchesCategory = !categoryFilter || c.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Stats
  const stats = {
    total: cases.length,
    open: cases.filter((c) => !["completed", "closed"].includes(c.status)).length,
    completed: cases.filter((c) => c.status === "completed").length,
    thisMonth: cases.filter((c) => {
      const date = new Date(c.submittedAt);
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
      const now = new Date();
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    }).length,
  };

<<<<<<< HEAD
  return (
    <div className="min-h-screen bg-gray-50">
      <PDPortalHeader pdCode={pd.pdCode} pdName={pd.fullName} />
=======
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-xl font-bold text-primary-600">
                MrClinc
              </Link>
              <span className="text-gray-300">|</span>
              <span className="text-gray-600 text-sm">PD Portal</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{pdInfo?.name}</p>
                <p className="text-xs text-gray-500 font-mono">{pdInfo?.code}</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            <Link
              href="/pd/portal"
              className="py-4 border-b-2 border-primary-600 text-primary-600 font-medium text-sm"
            >
              Dashboard
            </Link>
            <Link
              href="/pd/portal/earnings"
              className="py-4 border-b-2 border-transparent text-gray-600 hover:text-gray-900 font-medium text-sm"
            >
              Earnings
            </Link>
            <Link
              href="/pd/portal/education"
              className="py-4 border-b-2 border-transparent text-gray-600 hover:text-gray-900 font-medium text-sm"
            >
              Education
            </Link>
            <Link
              href="/pd/portal/profile"
              className="py-4 border-b-2 border-transparent text-gray-600 hover:text-gray-900 font-medium text-sm"
            >
              Profile
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="mb-8">
<<<<<<< HEAD
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {pd.fullName}</h1>
          <p className="text-gray-600">Here&apos;s an overview of your cases.</p>
=======
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {pdInfo?.name}</h1>
          <p className="text-gray-600">Here's an overview of your cases.</p>
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card variant="bordered">
            <CardContent className="py-4">
              <p className="text-sm text-gray-500">Total Cases</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </CardContent>
          </Card>
          <Card variant="bordered">
            <CardContent className="py-4">
              <p className="text-sm text-gray-500">Open Cases</p>
              <p className="text-3xl font-bold text-primary-600">{stats.open}</p>
            </CardContent>
          </Card>
          <Card variant="bordered">
            <CardContent className="py-4">
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-3xl font-bold text-success-600">{stats.completed}</p>
            </CardContent>
          </Card>
          <Card variant="bordered">
            <CardContent className="py-4">
              <p className="text-sm text-gray-500">This Month</p>
              <p className="text-3xl font-bold text-gray-900">{stats.thisMonth}</p>
            </CardContent>
          </Card>
        </div>

        {/* Cases Section */}
        <Card variant="bordered">
          <CardHeader>
<<<<<<< HEAD
            <CardTitle>Your Cases</CardTitle>
          </CardHeader>
          <CardContent>
            {cases.length === 0 ? (
=======
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle>Your Cases</CardTitle>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  placeholder="Search cases..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-48"
                />
                <Select
                  options={statusOptions}
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full sm:w-40"
                />
                <Select
                  options={categoryOptions}
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full sm:w-44"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredCases.length === 0 ? (
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
              <div className="text-center py-12">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
<<<<<<< HEAD
                <p className="text-gray-500">No cases assigned yet</p>
                <p className="text-sm text-gray-400 mt-1">Cases will appear here once assigned to you.</p>
=======
                <p className="text-gray-500">No cases found</p>
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Code</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Patient</th>
<<<<<<< HEAD
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 hidden sm:table-cell">Category</th>
=======
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 hidden sm:table-cell">Service</th>
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 hidden md:table-cell">Updated</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-500"></th>
                    </tr>
                  </thead>
                  <tbody>
<<<<<<< HEAD
                    {cases.map((c: CaseData) => (
                      <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50">
=======
                    {filteredCases.map((c) => (
                      <tr key={c.trackingCode} className="border-b border-gray-100 hover:bg-gray-50">
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
                        <td className="py-3 px-4">
                          <span className="font-mono text-sm text-primary-600">{c.trackingCode}</span>
                        </td>
                        <td className="py-3 px-4">
<<<<<<< HEAD
                          <p className="font-medium text-gray-900 text-sm">{c.patientName?.split(" ")[0] || "Patient"}.</p>
                          <p className="text-xs text-gray-500">{c.patientCity || "Unknown"}</p>
                        </td>
                        <td className="py-3 px-4 hidden sm:table-cell">
                          <p className="text-sm text-gray-900">{c.mainCategory}</p>
                          {c.medicalSubType && <p className="text-xs text-gray-500">{c.medicalSubType}</p>}
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            variant={statusConfig[c.status]?.variant || "secondary"}
=======
                          <p className="font-medium text-gray-900 text-sm">{c.patientName}</p>
                          <p className="text-xs text-gray-500">{c.location}</p>
                        </td>
                        <td className="py-3 px-4 hidden sm:table-cell">
                          <p className="text-sm text-gray-900">{c.service}</p>
                          <p className="text-xs text-gray-500">{c.category}</p>
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            variant={statusConfig[c.status]?.variant || "default"}
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
                            size="sm"
                          >
                            {statusConfig[c.status]?.label || c.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 hidden md:table-cell">
                          <span className="text-sm text-gray-500">{formatDate(c.updatedAt)}</span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Link href={`/pd/portal/case/${c.trackingCode}`}>
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <Link href="/pd/portal/earnings" className="block">
            <Card variant="bordered" className="hover:border-primary-300 transition-colors">
              <CardContent className="py-6 flex items-center gap-4">
                <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">View Earnings</h3>
                  <p className="text-sm text-gray-500">Track your partnership fees</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/pd/portal/education" className="block">
            <Card variant="bordered" className="hover:border-primary-300 transition-colors">
              <CardContent className="py-6 flex items-center gap-4">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Education</h3>
                  <p className="text-sm text-gray-500">Training modules and guides</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/pd/portal/profile" className="block">
            <Card variant="bordered" className="hover:border-primary-300 transition-colors">
              <CardContent className="py-6 flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Profile</h3>
                  <p className="text-sm text-gray-500">Your account settings</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  );
}
