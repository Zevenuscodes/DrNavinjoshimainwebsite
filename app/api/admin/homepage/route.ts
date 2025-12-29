/**
 * Homepage Content API Route
 * 
 * Handles fetching and updating homepage content.
 */

import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/firebase/server-auth";
import { getHomepageContent, updateHomepageContent } from "@/lib/firebase/firestore";

// GET - Fetch homepage content
export async function GET(request: NextRequest) {
  try {
    const email = await verifyAdminSession(request);
    if (!email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const content = await getHomepageContent();
    return NextResponse.json({ content });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch homepage content" },
      { status: 500 }
    );
  }
}

// PUT - Update homepage content
export async function PUT(request: NextRequest) {
  try {
    const email = await verifyAdminSession(request);
    if (!email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const body = await request.json();
    const { heroTitle, heroSubtitle, heroImage, aboutText, slideshowImages } = body;
    
    await updateHomepageContent({
      ...(heroTitle !== undefined && { heroTitle }),
      ...(heroSubtitle !== undefined && { heroSubtitle }),
      ...(heroImage !== undefined && { heroImage }),
      ...(aboutText !== undefined && { aboutText }),
      ...(slideshowImages !== undefined && { slideshowImages }),
    });
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update homepage content" },
      { status: 500 }
    );
  }
}

