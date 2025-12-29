/**
 * Courses API Route
 * 
 * Handles CRUD operations for courses.
 */

import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/firebase/server-auth";
import { getCourses, createCourse, updateCourse, deleteCourse } from "@/lib/firebase/firestore";

// GET - Fetch all courses
export async function GET(request: NextRequest) {
  try {
    const email = await verifyAdminSession(request);
    if (!email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const courses = await getCourses();
    return NextResponse.json({ courses });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch courses" },
      { status: 500 }
    );
  }
}

// POST - Create new course
export async function POST(request: NextRequest) {
  try {
    const email = await verifyAdminSession(request);
    if (!email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const body = await request.json();
    const { title, description, duration, price, imageURL } = body;
    
    if (!title || !description || !duration || price === undefined || !imageURL) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }
    
    const courseId = await createCourse({
      title,
      description,
      duration,
      price: Number(price),
      imageURL,
    });
    
    return NextResponse.json({ success: true, id: courseId });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create course" },
      { status: 500 }
    );
  }
}

// PUT - Update course
export async function PUT(request: NextRequest) {
  try {
    const email = await verifyAdminSession(request);
    if (!email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const body = await request.json();
    const { id, ...updates } = body;
    
    if (!id) {
      return NextResponse.json({ error: "Course ID is required" }, { status: 400 });
    }
    
    await updateCourse(id, updates);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update course" },
      { status: 500 }
    );
  }
}

// DELETE - Delete course
export async function DELETE(request: NextRequest) {
  try {
    const email = await verifyAdminSession(request);
    if (!email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json({ error: "Course ID is required" }, { status: 400 });
    }
    
    await deleteCourse(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to delete course" },
      { status: 500 }
    );
  }
}


