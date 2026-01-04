import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      "fullName", "country", "city", "email", "phone", "preferredContact",
      "currentProfession", "organisationType", "yearsExperience", "professionalActivity",
      "networkTypes", "networkCountries", "introductionApproach",
      "availabilityLevel", "workingMode",
      "signatureName"
    ];

    for (const field of requiredFields) {
      if (!body[field] || (Array.isArray(body[field]) && body[field].length === 0)) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate compliance acknowledgements
    const complianceFields = [
      "ackFreelance", "ackNoSales", "ackNotClinic", "ackTraceable", "ackCaseBased"
    ];
    
    for (const field of complianceFields) {
      if (body[field] !== true) {
        return NextResponse.json(
          { error: "All compliance acknowledgements must be accepted" },
          { status: 400 }
        );
      }
    }

    // Validate declarations
    if (body.declareAccurate !== true || body.acceptPDAgreement !== true) {
      return NextResponse.json(
        { error: "Both declarations must be accepted" },
        { status: 400 }
      );
    }

    // Validate data processing consent (GDPR requirement)
    if (body.acceptDataProcessing !== true) {
      return NextResponse.json(
        { error: "Data processing consent is required to submit this application" },
        { status: 400 }
      );
    }

    // Check if email already submitted
    const existing = await prisma.pDApplication.findFirst({
      where: { email: body.email.toLowerCase().trim() }
    });

    if (existing) {
      return NextResponse.json(
        { error: "An application with this email address has already been submitted" },
        { status: 409 }
      );
    }

    // Create the application
    const application = await prisma.pDApplication.create({
      data: {
        fullName: body.fullName.trim(),
        country: body.country.trim(),
        city: body.city.trim(),
        email: body.email.toLowerCase().trim(),
        phone: body.phone.trim(),
        preferredContact: body.preferredContact,

        currentProfession: body.currentProfession.trim(),
        organisationType: body.organisationType,
        yearsExperience: body.yearsExperience,
        professionalActivity: body.professionalActivity.trim(),

        networkTypes: body.networkTypes,
        networkTypesOther: body.networkTypesOther?.trim() || null,
        networkCountries: Array.isArray(body.networkCountries) 
          ? body.networkCountries 
          : body.networkCountries.split(",").map((c: string) => c.trim()).filter(Boolean),
        introductionApproach: body.introductionApproach.trim(),

        availabilityLevel: body.availabilityLevel,
        workingMode: body.workingMode,

        ackFreelance: true,
        ackNoSales: true,
        ackNotClinic: true,
        ackTraceable: true,
        ackCaseBased: true,

        declareAccurate: true,
        declareAcceptFramework: true,
        consentDataProcessing: true,
        consentTimestamp: body.consentTimestamp ? new Date(body.consentTimestamp) : new Date(),
        signatureName: body.signatureName.trim(),
        signatureDate: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      applicationId: application.id,
      message: "Application submitted successfully"
    });

  } catch (error) {
    console.error("PD Application error:", error);
    return NextResponse.json(
      { error: "Failed to submit application. Please try again." },
      { status: 500 }
    );
  }
}
