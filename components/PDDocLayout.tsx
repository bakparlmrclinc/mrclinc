"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface PDDocLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function PDDocLayout({ title, children }: PDDocLayoutProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/pd/session");
        if (res.ok) {
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
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/pd/portal">
            <img src="/images/logo.svg" alt="MR.CLINC" className="h-10 w-auto" />
          </Link>
          <Link 
            href="/pd/docs" 
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ← Back to Documents
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 md:p-12">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-sm text-gray-500 mb-8">Last updated: January 2025</p>
          
          <div className="prose prose-gray max-w-none">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
