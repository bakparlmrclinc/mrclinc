import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionFromCookies, canEditCases } from "@/lib/auth";

const VALID_FIELDS = [
  "clinicRequestedDocsAt",
  "patientSentDocsAt",
  "clinicConfirmedDocsAt",
];

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
    const { field } = body;

    if (!VALID_FIELDS.includes(field)) {
      return NextResponse.json({ error: "Invalid field" }, { status: 400 });
    }

    // Get current value
    const currentCase = await prisma.case.findUnique({
      where: { id },
      select: { [field]: true },
    });

    if (!currentCase) {
      return NextResponse.json({ error: "Case not found" }, { status: 404 });
    }

    // Toggle: if set, unset; if unset, set to now
    const currentValue = currentCase[field as keyof typeof currentCase];
    const newValue = currentValue ? null : new Date();

    await prisma.case.update({
      where: { id },
      data: { [field]: newValue },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Document flow error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
