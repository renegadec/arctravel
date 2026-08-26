import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

// Public image endpoint — serves images uploaded through the dashboard.
// IDs are unguessable UUIDs; responses are immutable and cached aggressively.
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const pool = getPool();
  if (!pool) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const res = await pool.query(
      "SELECT filename, mime_type, data FROM uploads WHERE id = $1",
      [id]
    );
    if (res.rows.length === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const { filename, mime_type, data } = res.rows[0];
    // `data` is a bytea Buffer from pg; Blob accepts it directly.
    const blob = new Blob([data], { type: mime_type });
    return new NextResponse(blob, {
      headers: {
        "Content-Type": mime_type,
        "Content-Disposition": `inline; filename="${filename}"`,
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (err) {
    console.error("[uploads] read failed:", err);
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
