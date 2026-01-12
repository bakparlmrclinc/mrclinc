/**
 * POST /api/pd/password
 *
 * PD password change endpoint
 * Requires active session, validates current password before updating
 */
import { NextRequest } from "next/server";
import {
  successResponse,
  validationErrorResponse,
  unauthorizedResponse,
  errorResponse,
  serverErrorResponse,
} from "@/lib/api/responses";
import { pdChangePasswordSchema } from "@/lib/validators";
import { getPDSessionFromCookies } from "@/lib/auth/pd-session";
import { verifyPassword, hashPassword } from "@/lib/auth/password";
import { prisma } from "@/lib/db/prisma";

export async function POST(req: NextRequest) {
  try {
    // Validate session
    const session = await getPDSessionFromCookies();
    if (!session) {
      return unauthorizedResponse("Please log in to change your password.");
    }

    // Parse request body
    const body = await req.json();
    const parseResult = pdChangePasswordSchema.safeParse(body);
    if (!parseResult.success) {
      return validationErrorResponse(parseResult.error);
    }

    const { currentPassword, newPassword } = parseResult.data;

    // Fetch PD to get current password hash
    const pd = await prisma.pD.findUnique({
      where: { id: session.id },
      select: { id: true, passwordHash: true, status: true },
    });

    if (!pd || pd.status !== "ACTIVE") {
      return unauthorizedResponse("Account not found or inactive.");
    }

    if (!pd.passwordHash) {
      return errorResponse("NO_PASSWORD", "No password set for this account.", 400);
    }

    // Verify current password
    const isValid = await verifyPassword(currentPassword, pd.passwordHash);
    if (!isValid) {
      return errorResponse("INVALID_PASSWORD", "Current password is incorrect.", 400);
    }

    // Hash new password
    const newPasswordHash = await hashPassword(newPassword);

    // Update password in database
    await prisma.pD.update({
      where: { id: session.id },
      data: { passwordHash: newPasswordHash },
    });

    return successResponse({ message: "Password changed successfully." });
  } catch (error) {
    console.error("PD password change error:", error);
    return serverErrorResponse("Failed to change password. Please try again.");
  }
}
