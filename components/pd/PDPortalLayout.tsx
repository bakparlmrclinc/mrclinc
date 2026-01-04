"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface PDPortalLayoutProps {
  children: React.ReactNode;
}

interface PDInfo {
  name: string;
  code: string;
}

export function PDPortalLayout({ children }: PDPortalLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [pdInfo, setPdInfo] = useState<PDInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

    setPdInfo({ name: parsed.name, code: parsed.code });
    setIsLoading(false);
  }, [router]);

  const handleSignOut = () => {
    localStorage.removeItem("pdSession");
    router.push("/pd/login");
  };

  const navItems = [
    { href: "/pd/portal", label: "Dashboard", exact: true },
    { href: "/pd/portal/earnings", label: "Earnings" },
    { href: "/pd/portal/education", label: "Education" },
    { href: "/pd/portal/profile", label: "Profile" },
  ];

  const isActive = (href: string, exact?: boolean) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-xl font-bold text-primary-600">MrClinc</Link>
              <span className="text-gray-300">|</span>
              <span className="text-gray-600 text-sm">PD Portal</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 hidden sm:block">{pdInfo?.name}</span>
              <Badge variant="primary" size="sm">{pdInfo?.code}</Badge>
              <Button variant="outline" size="sm" onClick={handleSignOut}>Sign Out</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-6 h-12 overflow-x-auto">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center text-sm whitespace-nowrap border-b-2 transition-colors ${
                  isActive(item.href, item.exact)
                    ? "text-primary-600 font-medium border-primary-600"
                    : "text-gray-600 hover:text-primary-600 border-transparent"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      {children}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500">
            MrClinc PD Portal - For authorized Pathway Developers only
          </p>
        </div>
      </footer>
    </div>
  );
}
