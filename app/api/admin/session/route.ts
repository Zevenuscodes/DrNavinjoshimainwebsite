import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ ok: false, disabled: true });
}

export async function DELETE() {
  return NextResponse.json({ ok: true });
}


