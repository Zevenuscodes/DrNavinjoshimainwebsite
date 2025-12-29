/**
 * Admin Session Verification API Route
 * 
 * Verifies if current session is valid admin session.
 */

import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/firebase/server-auth";

export async function GET(request: NextRequest) {
  const email = await verifyAdminSession(request);
  
  if (email) {
    return NextResponse.json({ 
      authenticated: true,
      email 
    });
  }
  
  return NextResponse.json(
    { authenticated: false },
    { status: 401 }
  );
}


