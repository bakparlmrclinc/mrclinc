import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Simple in-memory rate limiting store
// In production, use Redis or similar persistent store
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMITS: Record<string, { maxRequests: number; windowMs: number }> = {
  "/api/requests": { maxRequests: 5, windowMs: 60 * 60 * 1000 }, // 5 per hour
  "/api/pd/application": { maxRequests: 3, windowMs: 60 * 60 * 1000 }, // 3 per hour
  "/api/pd/auth": { maxRequests: 10, windowMs: 15 * 60 * 1000 }, // 10 per 15 min
  "/api/admin/auth/login": { maxRequests: 5, windowMs: 15 * 60 * 1000 }, // 5 per 15 min
  "/api/contact": { maxRequests: 3, windowMs: 60 * 60 * 1000 }, // 3 per hour
};

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return "unknown";
}

function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1, resetIn: windowMs };
  }

  if (entry.count >= maxRequests) {
    return { 
      allowed: false, 
      remaining: 0, 
      resetIn: entry.resetTime - now 
    };
  }

  entry.count++;
  return { 
    allowed: true, 
    remaining: maxRequests - entry.count, 
    resetIn: entry.resetTime - now 
  };
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only apply rate limiting to POST requests on specific endpoints
  if (request.method !== "POST") {
    return NextResponse.next();
  }

  // Check if this endpoint has rate limiting configured
  const rateLimit = RATE_LIMITS[pathname];
  if (!rateLimit) {
    return NextResponse.next();
  }

  const clientIP = getClientIP(request);
  const rateLimitKey = `${pathname}:${clientIP}`;

  const { allowed, remaining, resetIn } = checkRateLimit(
    rateLimitKey,
    rateLimit.maxRequests,
    rateLimit.windowMs
  );

  if (!allowed) {
    return NextResponse.json(
      { 
        error: "Too many requests. Please try again later.",
        retryAfter: Math.ceil(resetIn / 1000),
      },
      { 
        status: 429,
        headers: {
          "X-RateLimit-Remaining": "0",
          "Retry-After": String(Math.ceil(resetIn / 1000)),
        },
      }
    );
  }

  // Add rate limit headers to response
  const response = NextResponse.next();
  response.headers.set("X-RateLimit-Remaining", String(remaining));
  return response;
}

export const config = {
  matcher: [
    "/api/requests",
    "/api/pd/application",
    "/api/pd/auth",
    "/api/admin/auth/login",
    "/api/contact",
  ],
};
