"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const documents = [
  {
    id: "agreement",
    title: "Pathway Developer Agreement",
    description: "Terms and conditions for PD platform access and activities",
    icon: "📄",
  },
  {
    id: "role",
    title: "Role Definition & Scope",
    description: "Detailed explanation of PD responsibilities and boundaries",
    icon: "📋",
  },
  {
    id: "conduct",
    title: "Code of Conduct",
    description: "Ethical and professional standards for all PD interactions",
    icon: "⚖️",
  },
  {
    id: "compensation",
    title: "Compensation Framework",
    description: "How compensation is calculated and processed",
    icon: "💶",
  },
  {
    id: "data",
    title: "Data Processing Notice",
    description: "How personal data is accessed and processed by PDs",
    icon: "🔒",
  },
];

export default function PDDocsPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/pd/auth");
        const data = await res.json();
        if (data.success && data.data?.pd) {
          setIsAuthenticated(true);
        } else {
          router.push("/pd/login");
        }
      } catch {
        router.push("/pd/login");
      }
    };
    checkAuth();
  }, [router]);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/pd/portal">
            <img src="/images/logo.svg" alt="MR.CLINC" className="h-10 w-auto" />
          </Link>
          <Link 
            href="/pd/portal" 
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ← Back to Portal
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">PD Documentation</h1>
          <p className="text-gray-600">
            Important documents and policies for Pathway Developers. Please review these carefully.
          </p>
        </div>

        <div className="grid gap-4">
          {documents.map((doc) => (
            <Link
              key={doc.id}
              href={`/pd/docs/${doc.id}`}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-primary-200 transition-all group"
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl">{doc.icon}</span>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {doc.title}
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">{doc.description}</p>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <p className="text-sm text-amber-800">
            <strong>Important:</strong> By continuing to use the MrClinc platform, you confirm your 
            understanding of and commitment to these policies. Violations may result in suspension 
            or termination of platform access.
          </p>
        </div>
      </main>
    </div>
  );
}
