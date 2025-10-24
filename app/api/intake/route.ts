import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongo";
import Intake from "@/models/Intake";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function normalizeToken(s: string) {
  return (s || "").normalize("NFKC").trim();
}

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json({ error: "Expected multipart/form-data" }, { status: 400 });
    }

    const formData = await (req as any).formData();
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const phone = String(formData.get("phone") || "");
    const mode = String(formData.get("mode") || "");
    const date = String(formData.get("date") || "");
    const time = String(formData.get("time") || "");
    const notes = String(formData.get("notes") || "");

    if (!name || !email) {
      return NextResponse.json({ error: "Missing name or email" }, { status: 400 });
    }

    const uploadsDir = path.join(process.cwd(), "public", "reports");
    await fs.mkdir(uploadsDir, { recursive: true });

    const reportFiles: string[] = [];
    const files = formData.getAll("reports") as File[];
    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const safeName = `${Date.now()}-${Math.random().toString(36).slice(2)}-${file.name}`.replace(/[^a-zA-Z0-9_.-]/g, "_");
      const outPath = path.join(uploadsDir, safeName);
      await fs.writeFile(outPath, buffer);
      reportFiles.push(`/reports/${safeName}`);
    }

    // Try MongoDB first; if not available, fallback to filesystem JSON store
    let savedVia = "mongo";
    let id: string | null = null;
    try {
      await dbConnect();
      const intake = await (Intake as any).create({ name, email, phone, mode, date, time, notes, reports: reportFiles });
      id = String(intake._id);
    } catch (e) {
      savedVia = "file";
      const dataDir = path.join(process.cwd(), "data");
      const jsonPath = path.join(dataDir, "intakes.json");
      await fs.mkdir(dataDir, { recursive: true });
      let arr: any[] = [];
      try {
        const existing = await fs.readFile(jsonPath, "utf8");
        arr = JSON.parse(existing);
        if (!Array.isArray(arr)) arr = [];
      } catch {}
      const record = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        name, email, phone, mode, date, time, notes, reports: reportFiles,
        createdAt: new Date().toISOString(),
      };
      arr.push(record);
      await fs.writeFile(jsonPath, JSON.stringify(arr, null, 2), "utf8");
      id = record.id;
    }

    return NextResponse.json({ id, reports: reportFiles, savedVia });
  } catch (e) {
    console.error("POST /api/intake error", e);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const envToken = normalizeToken(process.env.ADMIN_TOKEN || "");
    if (!envToken) return NextResponse.json({ error: "Server not configured (ADMIN_TOKEN missing)" }, { status: 500 });

    const rawAuth = req.headers.get("authorization") || "";
    const bearerMatch = /^Bearer\s+(.+)$/i.exec(rawAuth);
    const provided = normalizeToken(bearerMatch ? bearerMatch[1] : rawAuth);

    if (provided !== envToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      await dbConnect();
      const items = await (Intake as any)
        .find({})
        .sort({ createdAt: -1 })
        .select("name email phone mode date time notes reports createdAt");
      return NextResponse.json({ items, source: "mongo" });
    } catch {
      const jsonPath = path.join(process.cwd(), "data", "intakes.json");
      let arr: any[] = [];
      try {
        const existing = await fs.readFile(jsonPath, "utf8");
        arr = JSON.parse(existing);
        if (!Array.isArray(arr)) arr = [];
      } catch {}
      arr.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
      return NextResponse.json({ items: arr, source: "file" });
    }
  } catch (e) {
    console.error("GET /api/intake error", e);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
