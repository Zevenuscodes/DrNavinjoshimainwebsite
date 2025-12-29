/**
 * Admin Logout API Route
 * 
 * Clears admin session cookie.
 */

import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });
  
  // Clear session cookie
  response.cookies.delete("admin-session");
  
  return response;
}


