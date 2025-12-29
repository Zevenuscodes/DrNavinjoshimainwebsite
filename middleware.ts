/**
 * Next.js Middleware
 * 
 * Protects /admin routes from unauthorized access.
 * Redirects non-authenticated users to /admin/login
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Protect all /admin routes except /admin/login
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    // Check for admin session cookie
    const sessionCookie = request.cookies.get("admin-session");
    
    if (!sessionCookie) {
      // Redirect to login if no session
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
    
    // Session exists, allow access
    // In production, you should verify the token here
    return NextResponse.next();
  }
  
  // Allow access to login page and non-admin routes
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
  ],
};

