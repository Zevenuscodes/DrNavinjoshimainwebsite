
import { NextResponse } from "next/server";

// Static payment link flow: no server-side booking logic needed now.
// Keeping an endpoint for future extension; currently returns 404.

export async function POST() {
  return NextResponse.json({ error: "Disabled: Using Razorpay Payment Link" }, { status: 404 });
}

export async function PUT() {
  return NextResponse.json({ error: "Disabled: Using Razorpay Payment Link" }, { status: 404 });
}

export async function GET() {
  return NextResponse.json({ error: "Disabled" }, { status: 404 });
}
