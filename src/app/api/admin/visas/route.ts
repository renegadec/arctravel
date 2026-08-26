import { NextRequest, NextResponse } from "next/server";
import { isStaffAuthed } from "@/lib/staff-auth";
import { adminListVisas, sanitizeVisa, upsertVisa } from "@/lib/stores/visas";

export async function GET(req: NextRequest) {
  if (!isStaffAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const visas = await adminListVisas();
  if (!visas) {
    return NextResponse.json(
      { error: "Database not configured or unavailable." },
      { status: 503 }
    );
  }
  return NextResponse.json({ visas });
}

export async function POST(req: NextRequest) {
  if (!isStaffAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json().catch(() => ({}));
  const input = sanitizeVisa(body);
  if (!input.name) {
    return NextResponse.json(
      { error: "Country name is required." },
      { status: 400 }
    );
  }
  const ok = await upsertVisa(input);
  if (!ok) {
    return NextResponse.json(
      { error: "Database not configured or unavailable." },
      { status: 503 }
    );
  }
  return NextResponse.json({ success: true, id: input.id });
}
