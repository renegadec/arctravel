import { NextRequest, NextResponse } from "next/server";
import { isStaffAuthed } from "@/lib/staff-auth";
import { getDbStatus, getTableCounts } from "@/lib/db";

export async function GET(req: NextRequest) {
  if (!isStaffAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const status = await getDbStatus();
  const counts = status === "ok" ? await getTableCounts() : null;

  return NextResponse.json({ status, counts });
}
