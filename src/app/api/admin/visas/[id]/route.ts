import { NextRequest, NextResponse } from "next/server";
import { isStaffAuthed } from "@/lib/staff-auth";
import { sanitizeVisa, upsertVisa, deleteVisa } from "@/lib/stores/visas";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isStaffAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const input = sanitizeVisa({ ...body, id });
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isStaffAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const ok = await deleteVisa(id);
  if (!ok) {
    return NextResponse.json(
      { error: "Database not configured or unavailable." },
      { status: 503 }
    );
  }
  return NextResponse.json({ success: true });
}
