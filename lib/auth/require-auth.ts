import { redirect } from "next/navigation";
import { getSessionFromCookies, type SessionUser } from "@/lib/auth";
import { AdminRole } from "@prisma/client";

export async function requireAuth(): Promise<SessionUser> {
  const user = await getSessionFromCookies();
  if (!user) {
    redirect("/admin/login");
  }
  return user;
}

export async function requireRole(
  allowedRoles: AdminRole[]
): Promise<SessionUser> {
  const user = await requireAuth();
  if (!allowedRoles.includes(user.role)) {
    redirect("/admin?error=unauthorized");
  }
  return user;
}

// Permission helpers based on spec 2.2
export function canEditCases(role: AdminRole): boolean {
  return role === "SUPER_ADMIN" || role === "OPS_ADMIN";
}

export function canEditPDs(role: AdminRole): boolean {
  return role === "SUPER_ADMIN" || role === "OPS_ADMIN";
}

export function canEditChannels(role: AdminRole): boolean {
  return role === "SUPER_ADMIN" || role === "OPS_ADMIN";
}

export function canEditEarnings(role: AdminRole): boolean {
  return role === "SUPER_ADMIN" || role === "FINANCE_ADMIN";
}

export function canViewEarnings(role: AdminRole): boolean {
  return true; // All roles can view
}

export function canEditSettings(role: AdminRole): boolean {
  return role === "SUPER_ADMIN";
}

// PII masking for Finance role
export function shouldMaskPII(role: AdminRole): boolean {
  return role === "FINANCE_ADMIN";
}

export function maskEmail(email: string): string {
  const [name, domain] = email.split("@");
  if (!domain) return "***@***.***";
  return `${name.slice(0, 2)}***@${domain}`;
}

export function maskPhone(phone: string | null): string {
  if (!phone) return "—";
  return `***${phone.slice(-4)}`;
}
