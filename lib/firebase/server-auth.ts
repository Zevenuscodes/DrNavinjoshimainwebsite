/**
 * Server-Side Authentication Utilities
 * 
 * For use in API routes and server components.
 * Verifies Firebase ID tokens from client requests.
 */

import { cookies } from "next/headers";
import { NextRequest } from "next/server";

/**
 * Get admin email from environment or default
 */
function getAdminEmails(): string[] {
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@drnavinjoshi.com";
  const additionalAdmins = process.env.ADMIN_EMAILS?.split(",").map(e => e.trim()) || [];
  return [adminEmail, ...additionalAdmins].map(e => e.toLowerCase().trim());
}

/**
 * Check if email is whitelisted as admin
 */
export function isAdminEmail(email: string): boolean {
  const adminEmails = getAdminEmails();
  return adminEmails.includes(email.toLowerCase().trim());
}

/**
 * Verify admin session from request
 * Returns email if valid admin, null otherwise
 * 
 * Note: This is a simplified check. For production, you should:
 * 1. Store session token in httpOnly cookie
 * 2. Verify Firebase ID token on server
 * 3. Check email against whitelist
 * 
 * For now, we'll rely on client-side auth state and API route protection
 */
export async function verifyAdminSession(request: NextRequest): Promise<string | null> {
  // In a production setup, you would:
  // 1. Get Firebase ID token from cookie/header
  // 2. Verify token with Firebase Admin SDK
  // 3. Extract email and check whitelist
  
  // For this implementation, we'll use a session cookie approach
  const sessionCookie = request.cookies.get("admin-session");
  
  if (!sessionCookie) {
    return null;
  }
  
  // In production, decode and verify the session cookie
  // For now, return the email if session exists
  // This should be replaced with proper token verification
  try {
    const sessionData = JSON.parse(sessionCookie.value);
    const email = sessionData.email;
    
    if (email && isAdminEmail(email)) {
      return email;
    }
  } catch (error) {
    return null;
  }
  
  return null;
}


