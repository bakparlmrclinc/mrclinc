import { redirect } from "next/navigation";
import { getSessionFromCookies } from "@/lib/auth";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionFromCookies();
  
  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminSidebar role={user.role} />
      <div className="lg:pl-64">
        <AdminHeader user={user} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
