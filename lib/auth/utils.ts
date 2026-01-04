// lib/auth/utils.ts
// Authentication utilities for MrClinc Admin Panel

import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/db';
import type { AdminUser, AdminRole } from '@prisma/client';

const SESSION_COOKIE_NAME = 'mrclinc_admin_session';
const SESSION_DURATION_HOURS = 24;

// ============================================
// PASSWORD UTILITIES
// ============================================

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// ============================================
// SESSION TOKEN
// ============================================

export function generateSessionToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

// ============================================
// SESSION MANAGEMENT
// ============================================

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
};

export async function createSession(
  userId: string,
  ipAddress?: string,
  userAgent?: string
): Promise<string> {
  const token = generateSessionToken();
  const expiresAt = new Date(Date.now() + SESSION_DURATION_HOURS * 60 * 60 * 1000);

  await prisma.adminSession.create({
    data: {
      adminUserId: userId,
      token,
      expiresAt,
      ipAddress,
      userAgent,
    },
  });

  return token;
}

export async function getSessionUser(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!sessionToken) {
      return null;
    }

    const session = await prisma.adminSession.findUnique({
      where: { token: sessionToken },
      include: { adminUser: true },
    });

    if (!session) {
      return null;
    }

    // Check if session expired
    if (session.expiresAt < new Date()) {
      await prisma.adminSession.delete({ where: { id: session.id } });
      return null;
    }

    // Check if user is active
    if (!session.adminUser.isActive) {
      return null;
    }

    return {
      id: session.adminUser.id,
      email: session.adminUser.email,
      name: session.adminUser.name,
      role: session.adminUser.role,
    };
  } catch {
    return null;
  }
}

export async function deleteSession(token: string): Promise<void> {
  await prisma.adminSession.deleteMany({
    where: { token },
  });
}

export async function deleteAllUserSessions(userId: string): Promise<void> {
  await prisma.adminSession.deleteMany({
    where: { adminUserId: userId },
  });
}

// ============================================
// COOKIE MANAGEMENT
// ============================================

export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION_HOURS * 60 * 60,
    path: '/',
  });
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function getSessionToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE_NAME)?.value;
}

// ============================================
// ROLE PERMISSIONS
// ============================================

export type Permission = 
  | 'cases:read'
  | 'cases:write'
  | 'cases:delete'
  | 'pds:read'
  | 'pds:write'
  | 'pds:delete'
  | 'pools:read'
  | 'pools:write'
  | 'channels:read'
  | 'channels:write'
  | 'earnings:read'
  | 'earnings:write'
  | 'audit:read'
  | 'settings:read'
  | 'settings:write'
  | 'admin:manage';

const ROLE_PERMISSIONS: Record<AdminRole, Permission[]> = {
  SUPER_ADMIN: [
    'cases:read', 'cases:write', 'cases:delete',
    'pds:read', 'pds:write', 'pds:delete',
    'pools:read', 'pools:write',
    'channels:read', 'channels:write',
    'earnings:read', 'earnings:write',
    'audit:read',
    'settings:read', 'settings:write',
    'admin:manage',
  ],
  OPS_ADMIN: [
    'cases:read', 'cases:write',
    'pds:read', 'pds:write',
    'pools:read', 'pools:write',
    'channels:read', 'channels:write',
    'audit:read',
  ],
  FINANCE_ADMIN: [
    'cases:read',
    'pds:read',
    'earnings:read', 'earnings:write',
    'audit:read',
  ],
  AUDITOR: [
    'cases:read',
    'pds:read',
    'pools:read',
    'channels:read',
    'earnings:read',
    'audit:read',
  ],
};

export function hasPermission(role: AdminRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export function getUserPermissions(role: AdminRole): Permission[] {
  return ROLE_PERMISSIONS[role] ?? [];
}
