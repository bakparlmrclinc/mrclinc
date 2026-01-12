/**
 * PD (Pathway Developer) Session Management
 * 
 * Server-side session handling for PD authentication
 * Uses Prisma + HTTP-only cookies
 */
import { prisma } from "@/lib/db/prisma";
import { cookies } from "next/headers";
import { verifyPassword } from "./password";

const PD_SESSION_COOKIE_NAME = "pd_session";
const SESSION_DURATION_HOURS = 24;

/**
 * Generate secure session token
 */
function generateSessionToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Session user info (safe to expose to PD)
 */
export interface PDSessionUser {
  id: string;
  pdCode: string;
  fullName: string;
  city: string;
  email: string | null;
}

/**
 * Create new PD session
 */
export async function createPDSession(
  pdId: string,
  ipAddress?: string,
  userAgent?: string
): Promise<string> {
  const token = generateSessionToken();
  const expiresAt = new Date(
    Date.now() + SESSION_DURATION_HOURS * 60 * 60 * 1000
  );

  await prisma.pDSession.create({
    data: {
      pdId,
      token,
      expiresAt,
      ipAddress,
      userAgent,
    },
  });

  // Update last login
  await prisma.pD.update({
    where: { id: pdId },
    data: { lastLoginAt: new Date() },
  });

  return token;
}

/**
 * Validate PD session token
 */
export async function validatePDSession(
  token: string
): Promise<PDSessionUser | null> {
  const session = await prisma.pDSession.findUnique({
    where: { token },
    include: { pd: true },
  });

  if (!session) return null;
  
  // Check expiration
  if (session.expiresAt < new Date()) {
    await prisma.pDSession.delete({ where: { id: session.id } });
    return null;
  }
  
  // Check PD status
  if (session.pd.status !== "ACTIVE") return null;

  // Update last active
  await prisma.pD.update({
    where: { id: session.pd.id },
    data: { lastActiveAt: new Date() },
  });

  return {
    id: session.pd.id,
    pdCode: session.pd.pdCode,
    fullName: session.pd.fullName,
    city: session.pd.city,
    email: session.pd.email,
  };
}

/**
 * Destroy PD session
 */
export async function destroyPDSession(token: string): Promise<void> {
  await prisma.pDSession.deleteMany({ where: { token } });
}

/**
 * Get PD session from cookies
 */
export async function getPDSessionFromCookies(): Promise<PDSessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(PD_SESSION_COOKIE_NAME)?.value;

  if (!token) return null;

  return validatePDSession(token);
}

/**
 * Set PD session cookie
 */
export async function setPDSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(PD_SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_DURATION_HOURS * 60 * 60,
    path: "/",
  });
}

/**
 * Clear PD session cookie
 */
export async function clearPDSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(PD_SESSION_COOKIE_NAME);
}

/**
 * Validate PD credentials (pdCode + password)
 */
export async function validatePDCredentials(
  pdCode: string,
  password: string
): Promise<PDSessionUser | null> {
  // Normalize PD code - accept with or without dash
  const normalizedCode = pdCode.toUpperCase().trim();
  
  // Try to find PD by exact code or with dash added
  let pd = await prisma.pD.findFirst({
    where: { 
      pdCode: normalizedCode,
      status: "ACTIVE",
    },
  });
  
  // If not found and code doesn't have dash, try with dash
  if (!pd && !normalizedCode.includes("-")) {
    const codeWithDash = `PD-${normalizedCode.replace(/^PD/i, "")}`;
    pd = await prisma.pD.findFirst({
      where: { 
        pdCode: codeWithDash,
        status: "ACTIVE",
      },
    });
  }

  if (!pd || !pd.passwordHash) return null;

  const isValid = await verifyPassword(password, pd.passwordHash);
  if (!isValid) return null;

  return {
    id: pd.id,
    pdCode: pd.pdCode,
    fullName: pd.fullName,
    city: pd.city,
    email: pd.email,
  };
}

export { PD_SESSION_COOKIE_NAME };
