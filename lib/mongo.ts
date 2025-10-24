
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI; // may be undefined in local fallback mode

let cached = (global as any)._mongoose;
if (!cached) cached = (global as any)._mongoose = { conn: null, promise: null };

export async function dbConnect() {
  if (!MONGODB_URI) return null; // allow filesystem fallback when not configured
  if (cached.conn) return cached.conn;
  if (!cached.promise) cached.promise = mongoose.connect(MONGODB_URI).then((m: any) => m);
  cached.conn = await cached.promise;
  return cached.conn;
}

export function generateBookingCode(): string {
  const now = new Date();
  const y = String(now.getFullYear()).slice(2);
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `NJ${y}${m}${d}-${rand}`;
}
