import { NextRequest, NextResponse } from "next/server";
import { isStaffAuthed } from "@/lib/staff-auth";
import { getPool } from "@/lib/db";

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

/**
 * Staff-only image upload. Images are stored in Postgres and served via the
 * public GET /api/uploads/[id] route, so they survive deploys on any host.
 */
export async function POST(req: NextRequest) {
  if (!isStaffAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const pool = getPool();
  if (!pool) {
    return NextResponse.json(
      { error: "Database not configured." },
      { status: 503 }
    );
  }

  // Ensure the table exists (idempotent) — lets uploads work even before a
  // full re-run of database setup.
  await pool.query(
    `CREATE TABLE IF NOT EXISTS uploads (
       id TEXT PRIMARY KEY,
       filename TEXT NOT NULL,
       mime_type TEXT NOT NULL,
       size_bytes INTEGER NOT NULL DEFAULT 0,
       data BYTEA NOT NULL,
       created_at TIMESTAMPTZ NOT NULL DEFAULT now()
     )`
  );

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json(
      { error: "Only image files are allowed." },
      { status: 400 }
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "Image is too large — max 5 MB." },
      { status: 413 }
    );
  }

  const buf = Buffer.from(await file.arrayBuffer());
  const id = crypto.randomUUID();
  const filename = file.name.replace(/[^a-zA-Z0-9._-]/g, "_") || "image";

  try {
    await pool.query(
      "INSERT INTO uploads (id, filename, mime_type, size_bytes, data) VALUES ($1, $2, $3, $4, $5)",
      [id, filename, file.type, file.size, buf]
    );
  } catch (err) {
    console.error("[uploads] insert failed:", err);
    return NextResponse.json(
      { error: "Failed to save the image." },
      { status: 500 }
    );
  }

  return NextResponse.json({ url: `/api/uploads/${id}` });
}
