import type { NextRequest } from "next/server";

export const STAFF_COOKIE = "staff_session";

export function getStaffPassword(): string {
  return process.env.STAFF_PASSWORD || "arctravel2026";
}

/** True when the request carries a valid staff session cookie. */
export function isStaffAuthed(request: NextRequest): boolean {
  return request.cookies.get(STAFF_COOKIE)?.value === getStaffPassword();
}
