/**
 * POST/GET/DELETE /api/pd/auth
 * 
 * PD authentication endpoint - Prisma version
 * - POST: Login (creates session, sets cookie)
 * - GET: Check auth status
 * - DELETE: Logout
 */

import { NextRequest } from "next/server";
import {
  successResponse,
  validationErrorResponse,
  unauthorizedResponse,
  serverErrorResponse,
  PD_MESSAGES,
} from "@/lib/api/responses";
import { pdLoginSchema } from "@/lib/validators";
import {
  validatePDCredentials,
  createPDSession,
  setPDSessionCookie,
  getPDSessionFromCookies,
  clearPDSessionCookie,
  destroyPDSession,
  PD_SESSION_COOKIE_NAME,
} from "@/lib/auth/pd-session";
import { cookies } from "next/headers";

// =============================================================================
// POST - Login
// =============================================================================

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Check if logout request
    if (body.action === "logout") {
      const cookieStore = await cookies();
      const token = cookieStore.get(PD_SESSION_COOKIE_NAME)?.value;
      if (token) {
        await destroyPDSession(token);
      }
      await clearPDSessionCookie();
      return successResponse({ message: "Logged out successfully." });
    }

    // Validate login input
    const parseResult = pdLoginSchema.safeParse(body);
    if (!parseResult.success) {
      return validationErrorResponse(parseResult.error);
    }

    const { email, accessCode } = parseResult.data;

    // Validate credentials
    const pd = await validatePDCredentials(email, accessCode);
    if (!pd) {
      return unauthorizedResponse(PD_MESSAGES.loginFailed);
    }

    // Create session
    const token = await createPDSession(
      pd.id,
      req.headers.get("x-forwarded-for") || undefined,
      req.headers.get("user-agent") || undefined
    );

    // Set cookie
    await setPDSessionCookie(token);

    // Return safe PD info
    return successResponse({
      message: PD_MESSAGES.loginSuccess,
      pd: {
        code: pd.pdCode,
        name: pd.fullName,
        city: pd.city,
      },
    });

  } catch (error) {
    console.error("PD auth error:", error);
    return serverErrorResponse("Authentication failed. Please try again.");
  }
}

// =============================================================================
// GET - Check auth status
// =============================================================================

export async function GET() {
  try {
    const pd = await getPDSessionFromCookies();

    if (!pd) {
      return unauthorizedResponse(PD_MESSAGES.sessionExpired);
    }

    return successResponse({
      authenticated: true,
      pd: {
        code: pd.pdCode,
        name: pd.fullName,
        city: pd.city,
      },
    });

  } catch (error) {
    console.error("PD auth check error:", error);
    return serverErrorResponse("Failed to verify authentication.");
  }
}

// =============================================================================
// DELETE - Logout
// =============================================================================

export async function DELETE() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(PD_SESSION_COOKIE_NAME)?.value;
    
    if (token) {
      await destroyPDSession(token);
    }
    await clearPDSessionCookie();
    
    return successResponse({ message: "Logged out successfully." });
  } catch (error) {
    console.error("PD logout error:", error);
    return serverErrorResponse("Failed to log out.");
  }
}
