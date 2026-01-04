"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AdminRole } from "@prisma/client";

interface NavItem {
  label: string;
  href: string;
  roles?: AdminRole[];
}

const navItems: NavItem[] = [
  { label: "Overview", href: "/admin" },
  { label: "Cases", href: "/admin/cases" },
  { label: "PD Applications", href: "/admin/pd-applications" },
  { label: "PDs", href: "/admin/pds" },
  { label: "Pools", href: "/admin/pools" },
  { label: "Clinical Channels", href: "/admin/channels" },
  {
    label: "Earnings & Payouts",
    href: "/admin/earnings",
    roles: ["SUPER_ADMIN", "FINANCE_ADMIN", "OPS_ADMIN"],
  },
  { label: "Audit Log", href: "/admin/audit" },
];

export default function AdminSidebar({ role }: { role: AdminRole }) {
  const pathname = usePathname();

  const visibleItems = navItems.filter(
    (item) => !item.roles || item.roles.includes(role)
  );

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-slate-800 text-white hidden lg:block">
      <div className="flex h-16 items-center justify-center border-b border-slate-700 gap-3">
        <Link href="/" className="flex items-center gap-3">
          <div className="bg-white rounded p-1.5">
            <img src="/images/logo-icon.svg" alt="MrClinc" className="h-8 w-8" />
          </div>
          <span className="text-lg font-semibold">Admin</span>
        </Link>
      </div>
      <nav className="mt-4 px-3">
        <ul className="space-y-1">
          {visibleItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block px-4 py-2.5 rounded-md text-sm transition-colors ${
                    isActive
                      ? "bg-teal-600 text-white"
                      : "text-slate-300 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="absolute bottom-4 left-0 right-0 px-3">
        <div className="px-4 py-2 text-xs text-slate-500">
          Role: {role.replace("_", " ")}
        </div>
      </div>
    </aside>
  );
}
