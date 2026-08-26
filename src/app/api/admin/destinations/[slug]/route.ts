import { NextRequest, NextResponse } from "next/server";
import { isStaffAuthed } from "@/lib/staff-auth";
import {
  adminGetDestination,
  sanitizeDestination,
  upsertDestination,
  deleteDestination,
} from "@/lib/stores/destinations";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!isStaffAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { slug } = await params;
  const destination = await adminGetDestination(slug);
  if (!destination) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ destination });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!isStaffAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { slug } = await params;
  const body = await req.json().catch(() => ({}));
  const input = sanitizeDestination({ ...body, slug });
  if (!input.name) {
    return NextResponse.json(
      { error: "Name is required." },
      { status: 400 }
    );
  }
  const ok = await upsertDestination(input);
  if (!ok) {
    return NextResponse.json(
      { error: "Database not configured or unavailable." },
      { status: 503 }
    );
  }
  return NextResponse.json({ success: true, slug: input.slug });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!isStaffAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { slug } = await params;
  const ok = await deleteDestination(slug);
  if (!ok) {
    return NextResponse.json(
      { error: "Database not configured or unavailable." },
      { status: 503 }
    );
  }
  return NextResponse.json({ success: true });
}
