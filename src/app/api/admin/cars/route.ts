import { NextRequest, NextResponse } from "next/server";
import { isStaffAuthed } from "@/lib/staff-auth";
import { adminListCars, sanitizeCar, upsertCar } from "@/lib/stores/cars";

export async function GET(req: NextRequest) {
  if (!isStaffAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const cars = await adminListCars();
  if (!cars) {
    return NextResponse.json(
      { error: "Database not configured or unavailable." },
      { status: 503 }
    );
  }
  return NextResponse.json({ cars });
}

export async function POST(req: NextRequest) {
  if (!isStaffAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json().catch(() => ({}));
  const input = sanitizeCar(body);
  if (!input.brand || !input.model) {
    return NextResponse.json(
      { error: "Brand and model are required." },
      { status: 400 }
    );
  }
  const ok = await upsertCar(input);
  if (!ok) {
    return NextResponse.json(
      { error: "Database not configured or unavailable." },
      { status: 503 }
    );
  }
  return NextResponse.json({ success: true, id: input.id });
}
