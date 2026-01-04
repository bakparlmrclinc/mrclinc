import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionFromCookies } from "@/lib/auth";
import { PDApplicationStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

// GET - Tek başvuruyu getir
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSessionFromCookies();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const application = await prisma.pDApplication.findUnique({
      where: { id },
    });

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    // Check if PD account already exists for this email
    const existingPD = await prisma.pD.findFirst({
      where: { email: application.email },
    });

    return NextResponse.json({
      application,
      pdAccountExists: !!existingPD,
      pdAccountId: existingPD?.id || null,
    });
  } catch (error) {
    console.error("Error fetching application:", error);
    return NextResponse.json(
      { error: "Failed to fetch application" },
      { status: 500 }
    );
  }
}

// PATCH - Durumu güncelle
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSessionFromCookies();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { status, reviewNotes } = body;

    if (!status || !Object.values(PDApplicationStatus).includes(status)) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      );
    }

    const application = await prisma.pDApplication.update({
      where: { id },
      data: {
        status,
        reviewNotes: reviewNotes || undefined,
        reviewedById: session.id,
        reviewedAt: new Date(),
      },
    });

    return NextResponse.json({ application });
  } catch (error) {
    console.error("Error updating application:", error);
    return NextResponse.json(
      { error: "Failed to update application" },
      { status: 500 }
    );
  }
}

// POST - PD hesabı oluştur (sadece APPROVED başvurular için)
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSessionFromCookies();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const application = await prisma.pDApplication.findUnique({
      where: { id },
    });

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    if (application.status !== "APPROVED") {
      return NextResponse.json(
        { error: "Only approved applications can be converted to PD accounts" },
        { status: 400 }
      );
    }

    // Check if PD already exists with this email
    const existingPD = await prisma.pD.findFirst({
      where: { email: application.email },
    });

    if (existingPD) {
      return NextResponse.json(
        { error: "PD account already exists for this email" },
        { status: 400 }
      );
    }

    // Generate temporary password
    const tempPassword = generateTempPassword();
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    // Generate PD code
    const pdCode = await generatePDCode();

    // Create PD account
    const pdUser = await prisma.pD.create({
      data: {
        email: application.email,
        passwordHash: hashedPassword,
        fullName: application.fullName,
        phone: application.phone,
        country: application.country,
        city: application.city,
        pdCode,
        status: "ACTIVE",
        verificationState: "VERIFIED",
        languages: [],
      },
    });

    return NextResponse.json({
      success: true,
      pdUser: {
        id: pdUser.id,
        email: pdUser.email,
        fullName: pdUser.fullName,
        pdCode: pdUser.pdCode,
      },
      tempPassword, // Admin'e gösterilecek, PD'ye iletilmek üzere
      message: "PD account created successfully. Please share the temporary password with the PD.",
    });
  } catch (error) {
    console.error("Error creating PD account:", error);
    return NextResponse.json(
      { error: "Failed to create PD account" },
      { status: 500 }
    );
  }
}

// Geçici şifre oluştur
function generateTempPassword(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  let password = "";
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

// PD kodu oluştur
async function generatePDCode(): Promise<string> {
  const prefix = "PD";
  let code: string;
  let exists = true;

  while (exists) {
    const random = Math.floor(Math.random() * 900000) + 100000;
    code = `${prefix}${random}`;
    const existing = await prisma.pD.findUnique({
      where: { pdCode: code },
    });
    exists = !!existing;
  }

  return code!;
}
