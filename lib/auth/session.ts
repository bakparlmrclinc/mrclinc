import { prisma } from "@/lib/db";
import { cookies } from "next/headers";
import { AdminRole } from "@prisma/client";
import { cache } from "react";

const SESSION_COOKIE_NAME = "admin_session";
const SESSION_DURATION_HOURS = 24;

function generateSessionToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
}

export async function createSession(
  adminUserId: string,
  ipAddress?: string,
  userAgent?: string
): Promise<string> {
  const token = generateSessionToken();
  const expiresAt = new Date(
    Date.now() + SESSION_DURATION_HOURS * 60 * 60 * 1000
  );

  await prisma.adminSession.create({
    data: {
      adminUserId,
      token,
      expiresAt,
      ipAddress,
      userAgent,
    },
  });

  // Update last login
  await prisma.adminUser.update({
    where: { id: adminUserId },
    data: { lastLoginAt: new Date() },
  });

  return token;
}

// Cached session validation - deduped per request
const validateSessionCached = cache(async (token: string): Promise<SessionUser | null> => {
  const session = await prisma.adminSession.findUnique({
    where: { token },
    include: { adminUser: true },
  });

  if (!session) return null;
  if (session.expiresAt < new Date()) {
    await prisma.adminSession.delete({ where: { id: session.id } });
    return null;
  }
  if (!session.adminUser.isActive) return null;

  return {
    id: session.adminUser.id,
    email: session.adminUser.email,
    name: session.adminUser.name,
    role: session.adminUser.role,
  };
});

export async function validateSession(
  token: string
): Promise<SessionUser | null> {
  return validateSessionCached(token);
}

export async function destroySession(token: string): Promise<void> {
  await prisma.adminSession.deleteMany({ where: { token } });
}

export async function getSessionFromCookies(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return validateSession(token);
}

export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_DURATION_HOURS * 60 * 60,
    path: "/",
  });
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export { SESSION_COOKIE_NAME };
