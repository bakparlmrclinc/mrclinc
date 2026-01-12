/**
 * PD (Pathway Developer) Session Management
 */
import { prisma } from "@/lib/db/prisma";
import { cookies } from "next/headers";
import { verifyPassword } from "./password";

const PD_SESSION_COOKIE_NAME = "pd_session";
const SESSION_DURATION_HOURS = 24;
const SESSION_DURATION_REMEMBER_DAYS = 30;

function generateSessionToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export interface PDSessionUser {
  id: string;
  pdCode: string;
  fullName: string;
  city: string;
  email: string | null;
}

export async function createPDSession(pdId: string, ipAddress?: string, userAgent?: string, rememberMe: boolean = false): Promise<string> {
  const token = generateSessionToken();
  const durationMs = rememberMe
    ? SESSION_DURATION_REMEMBER_DAYS * 24 * 60 * 60 * 1000
    : SESSION_DURATION_HOURS * 60 * 60 * 1000;
  const expiresAt = new Date(Date.now() + durationMs);
  await prisma.pDSession.create({ data: { pdId, token, expiresAt, ipAddress, userAgent } });
  await prisma.pD.update({ where: { id: pdId }, data: { lastLoginAt: new Date() } });
  return token;
}

export async function validatePDSession(token: string): Promise<PDSessionUser | null> {
  const session = await prisma.pDSession.findUnique({ where: { token }, include: { pd: true } });
  if (!session) return null;
  if (session.expiresAt < new Date()) {
    await prisma.pDSession.delete({ where: { id: session.id } });
    return null;
  }
  if (session.pd.status !== "ACTIVE") return null;
  await prisma.pD.update({ where: { id: session.pd.id }, data: { lastActiveAt: new Date() } });
  return { id: session.pd.id, pdCode: session.pd.pdCode, fullName: session.pd.fullName, city: session.pd.city, email: session.pd.email };
}

export async function destroyPDSession(token: string): Promise<void> {
  await prisma.pDSession.deleteMany({ where: { token } });
}

export async function getPDSessionFromCookies(): Promise<PDSessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(PD_SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return validatePDSession(token);
}

export async function setPDSessionCookie(token: string, rememberMe: boolean = false): Promise<void> {
  const cookieStore = await cookies();
  const maxAge = rememberMe
    ? SESSION_DURATION_REMEMBER_DAYS * 24 * 60 * 60
    : SESSION_DURATION_HOURS * 60 * 60;
  cookieStore.set(PD_SESSION_COOKIE_NAME, token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", maxAge, path: "/" });
}

export async function clearPDSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(PD_SESSION_COOKIE_NAME);
}

export async function validatePDCredentials(identifier: string, password: string): Promise<PDSessionUser | null> {
  const trimmedIdentifier = identifier.trim();

  let pd;

  // Check if identifier is an email (contains @)
  if (trimmedIdentifier.includes("@")) {
    // Email login - case-insensitive lookup
    pd = await prisma.pD.findFirst({
      where: { email: { equals: trimmedIdentifier, mode: "insensitive" }, status: "ACTIVE" },
    });
  } else {
    // PD Code login - normalize and try different formats
    const normalizedCode = trimmedIdentifier.toUpperCase();
    const codeWithoutDash = normalizedCode.replace(/-/g, "");
    const codeWithDash = codeWithoutDash.startsWith("PD")
      ? codeWithoutDash.replace(/^PD/, "PD-")
      : `PD-${codeWithoutDash}`;

    pd = await prisma.pD.findFirst({
      where: { pdCode: { in: [normalizedCode, codeWithoutDash, codeWithDash] }, status: "ACTIVE" },
    });
  }

  if (!pd || !pd.passwordHash) return null;
  const isValid = await verifyPassword(password, pd.passwordHash);
  if (!isValid) return null;
  return { id: pd.id, pdCode: pd.pdCode, fullName: pd.fullName, city: pd.city, email: pd.email };
}

export { PD_SESSION_COOKIE_NAME };
