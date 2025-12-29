/**
 * Public Homepage Content API Route
 * 
 * Fetches homepage content for public display (no auth required).
 */

import { NextResponse } from "next/server";
import { getHomepageContent } from "@/lib/firebase/firestore";

// GET - Fetch homepage content (public)
export async function GET() {
  try {
    const content = await getHomepageContent();
    return NextResponse.json({ content });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch homepage content" },
      { status: 500 }
    );
  }
}


