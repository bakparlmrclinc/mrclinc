import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionFromCookies, canEditPDs } from "@/lib/auth";

function generatePDCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "PD-";
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export async function POST(request: NextRequest) {
  try {
    const user = await getSessionFromCookies();
    if (!user || !canEditPDs(user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      fullName,
      profession,
      country,
      city,
      languages,
      email,
      phone,
      notes,
      status,
      verificationState,
    } = body;

    if (!fullName?.trim() || !country?.trim() || !city?.trim()) {
      return NextResponse.json(
        { error: "Full name, country, and city are required" },
        { status: 400 }
      );
    }

    // Generate unique PD code
    let pdCode = generatePDCode();
    let attempts = 0;
    while (attempts < 10) {
      const existing = await prisma.pD.findUnique({ where: { pdCode } });
      if (!existing) break;
      pdCode = generatePDCode();
      attempts++;
    }

    const pd = await prisma.pD.create({
      data: {
        pdCode,
        fullName: fullName.trim(),
        profession: profession?.trim() || null,
        country: country.trim(),
        city: city.trim(),
        languages: languages || [],
        email: email?.trim() || null,
        phone: phone?.trim() || null,
        notes: notes?.trim() || null,
        status: status || "ACTIVE",
        verificationState: verificationState || "PENDING",
      },
    });

    await prisma.auditLog.create({
      data: {
        actorId: user.id,
        actorType: "ADMIN",
        action: "PD_CREATED",
        entityType: "PD",
        entityId: pd.id,
        afterJson: JSON.stringify({ pdCode: pd.pdCode, fullName: pd.fullName }),
      },
    });

    return NextResponse.json({ success: true, id: pd.id, pdCode: pd.pdCode });
  } catch (error) {
    console.error("PD create error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
