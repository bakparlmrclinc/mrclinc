import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionFromCookies, canEditCases } from "@/lib/auth";
import { ContactDirection, ContactMethod } from "@prisma/client";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getSessionFromCookies();
    if (!user || !canEditCases(user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { direction, method, summary } = body;

    if (!summary?.trim()) {
      return NextResponse.json({ error: "Summary required" }, { status: 400 });
    }

    const validDirections: ContactDirection[] = ["OUTBOUND", "INBOUND"];
    const validMethods: ContactMethod[] = ["PHONE", "EMAIL", "WHATSAPP", "OTHER"];

    if (!validDirections.includes(direction) || !validMethods.includes(method)) {
      return NextResponse.json({ error: "Invalid direction or method" }, { status: 400 });
    }

    await prisma.contactLog.create({
      data: {
        caseId: id,
        actorType: "ADMIN",
        actorId: user.id,
        direction,
        method,
        summary: summary.trim(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact log error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
