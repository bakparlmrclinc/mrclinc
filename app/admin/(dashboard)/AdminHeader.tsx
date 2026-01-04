"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { SessionUser } from "@/lib/auth";

export default function AdminHeader({ user }: { user: SessionUser }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-40 h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between">
      <div className="lg:hidden flex items-center gap-3">
        <Link href="/">
          <img src="/images/logo.svg" alt="MrClinc" className="h-[36px] w-auto" />
        </Link>
        <span className="text-sm text-slate-500">Admin</span>
      </div>
      <div className="hidden lg:block" />
      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-600">{user.name}</span>
        <button
          onClick={handleLogout}
          className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
        >
          Sign out
        </button>
      </div>
    </header>
  );
}
