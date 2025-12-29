/**
 * Image Upload API Route
 * 
 * Handles image uploads to Firebase Storage.
 */

import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/firebase/server-auth";
import { uploadCourseImage, uploadHomepageImage, uploadMediaImage } from "@/lib/firebase/storage";

export async function POST(request: NextRequest) {
  try {
    const email = await verifyAdminSession(request);
    if (!email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const type = formData.get("type") as string; // "course", "homepage", "media"
    const courseId = formData.get("courseId") as string | null;
    const imageType = formData.get("imageType") as string | null; // "hero" or "about"
    
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    
    let url: string;
    
    switch (type) {
      case "course":
        url = await uploadCourseImage(file, courseId || undefined);
        break;
      case "homepage":
        if (!imageType || (imageType !== "hero" && imageType !== "about")) {
          return NextResponse.json(
            { error: "Invalid imageType. Must be 'hero' or 'about'" },
            { status: 400 }
          );
        }
        url = await uploadHomepageImage(file, imageType as "hero" | "about");
        break;
      case "media":
        url = await uploadMediaImage(file);
        break;
      default:
        return NextResponse.json(
          { error: "Invalid type. Must be 'course', 'homepage', or 'media'" },
          { status: 400 }
        );
    }
    
    return NextResponse.json({ success: true, url });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to upload image" },
      { status: 500 }
    );
  }
}


