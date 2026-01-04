import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionFromCookies, canEditPDs } from "@/lib/auth";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getSessionFromCookies();
    if (!user || !canEditPDs(user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
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

    const currentPD = await prisma.pD.findUnique({ where: { id } });
    if (!currentPD) {
      return NextResponse.json({ error: "PD not found" }, { status: 404 });
    }

    const updatedPD = await prisma.pD.update({
      where: { id },
      data: {
        fullName: fullName?.trim() || currentPD.fullName,
        profession: profession?.trim() || null,
        country: country?.trim() || currentPD.country,
        city: city?.trim() || currentPD.city,
        languages: languages || currentPD.languages,
        email: email?.trim() || null,
        phone: phone?.trim() || null,
        notes: notes?.trim() || null,
        status: status || currentPD.status,
        verificationState: verificationState || currentPD.verificationState,
      },
    });

    await prisma.auditLog.create({
      data: {
        actorId: user.id,
        actorType: "ADMIN",
        action: "PD_UPDATED",
        entityType: "PD",
        entityId: id,
        beforeJson: JSON.stringify({
          fullName: currentPD.fullName,
          status: currentPD.status,
          verificationState: currentPD.verificationState,
        }),
        afterJson: JSON.stringify({
          fullName: updatedPD.fullName,
          status: updatedPD.status,
          verificationState: updatedPD.verificationState,
        }),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PD update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
