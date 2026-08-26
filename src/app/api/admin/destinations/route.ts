import { NextRequest, NextResponse } from "next/server";
import { isStaffAuthed } from "@/lib/staff-auth";
import {
  adminListDestinations,
  sanitizeDestination,
  upsertDestination,
} from "@/lib/stores/destinations";

export async function GET(req: NextRequest) {
  if (!isStaffAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const destinations = await adminListDestinations();
  if (!destinations) {
    return NextResponse.json(
      { error: "Database not configured or unavailable." },
      { status: 503 }
    );
  }
  return NextResponse.json({ destinations });
}

export async function POST(req: NextRequest) {
  if (!isStaffAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json().catch(() => ({}));
  const input = sanitizeDestination(body);
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
