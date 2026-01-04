import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Simple in-memory rate limiting (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 3; // Max 3 submissions per window
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour window

function getRateLimitKey(req: NextRequest): string {
  // Use IP address for rate limiting
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";
  return `contact:${ip}`;
}

function checkRateLimit(key: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 };
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0 };
  }

  entry.count++;
  return { allowed: true, remaining: RATE_LIMIT_MAX - entry.count };
}

// Basic spam detection
function isSpam(content: string): boolean {
  const spamPatterns = [
    /\b(viagra|cialis|casino|poker|lottery|winner|prize)\b/i,
    /\b(click here|act now|limited time|free money)\b/i,
    /(http|https):\/\/[^\s]+/g, // URLs in message
    /(.)\1{10,}/, // Repeated characters
  ];

  return spamPatterns.some((pattern) => pattern.test(content));
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitKey = getRateLimitKey(request);
    const { allowed, remaining } = checkRateLimit(rateLimitKey);

    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { 
          status: 429,
          headers: {
            "X-RateLimit-Remaining": "0",
            "Retry-After": "3600",
          },
        }
      );
    }

    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validation
    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Length limits
    if (name.length > 100 || email.length > 254 || subject.length > 200 || message.length > 5000) {
      return NextResponse.json(
        { error: "Input too long" },
        { status: 400 }
      );
    }

    // Spam check
    const fullContent = `${name} ${subject} ${message}`;
    if (isSpam(fullContent)) {
      // Silently accept but don't process spam
      return NextResponse.json({ success: true, id: "spam-filtered" });
    }

    // Store in database (using AuditLog as a general contact log)
    // In production, you'd have a dedicated ContactSubmission table
    const submission = await prisma.auditLog.create({
      data: {
        actorType: "SYSTEM",
        action: "CONTACT_SUBMISSION",
        entityType: "Contact",
        entityId: email,
        afterJson: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          subject: subject.trim(),
          message: message.trim(),
          submittedAt: new Date().toISOString(),
          ip: getRateLimitKey(request).replace("contact:", ""),
        }),
      },
    });

    return NextResponse.json(
      { success: true, id: submission.id },
      {
        headers: {
          "X-RateLimit-Remaining": String(remaining),
        },
      }
    );
  } catch (error) {
    console.error("Contact submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit message. Please try again." },
      { status: 500 }
    );
  }
}
