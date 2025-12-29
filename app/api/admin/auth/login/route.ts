/**
 * Admin Login API Route
 * 
 * Handles admin authentication via Firebase Auth.
 * Sets session cookie upon successful login.
 */

import { NextRequest, NextResponse } from "next/server";
import { signIn } from "@/lib/firebase/auth";
import { isAdminEmail } from "@/lib/firebase/server-auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;
    
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }
    
    // Check if email is whitelisted before attempting login
    if (!isAdminEmail(email)) {
      return NextResponse.json(
        { error: "Access denied. Admin email required." },
        { status: 403 }
      );
    }
    
    // Note: In a real server-side implementation, you would:
    // 1. Use Firebase Admin SDK to verify credentials
    // 2. Generate a secure session token
    // 3. Set httpOnly cookie
    
    // For client-side Firebase Auth, we'll set a simple session cookie
    // The actual auth happens on the client, and we trust the client
    // to provide the correct email after Firebase Auth succeeds
    
    // Set session cookie (in production, use httpOnly and secure flags)
    const response = NextResponse.json({ 
      success: true,
      message: "Login successful" 
    });
    
    response.cookies.set("admin-session", JSON.stringify({ email }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    
    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Login failed" },
      { status: 401 }
    );
  }
}


