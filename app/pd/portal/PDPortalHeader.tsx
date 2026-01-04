"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface PDPortalHeaderProps {
  pdCode: string;
  pdName: string;
}

export default function PDPortalHeader({ pdCode, pdName }: PDPortalHeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/pd/auth", { method: "DELETE" });
    } catch {
      // Ignore errors on logout
    }
    router.push("/pd/login");
    router.refresh();
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex-shrink-0">
              <img src="/images/logo.svg" alt="MrClinc" className="h-[42px] w-auto" />
            </Link>
            <span className="text-gray-300">|</span>
            <span className="text-gray-600 text-sm">PD Portal</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{pdName}</p>
              <p className="text-xs text-gray-500 font-mono">{pdCode}</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
