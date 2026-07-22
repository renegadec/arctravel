import { NextRequest, NextResponse } from "next/server";

const STAFF_PASSWORD = process.env.STAFF_PASSWORD || "arctravel2026";
const COOKIE_NAME = "staff_session";
const COOKIE_MAX_AGE = 60 * 60 * 24; // 24 hours

export async function POST(request: NextRequest) {
  const { password } = await request.json();

  if (!password) {
    return NextResponse.json({ error: "Password required" }, { status: 400 });
  }

  if (password !== STAFF_PASSWORD) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });

  response.cookies.set(COOKIE_NAME, password, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/staff",
  });

  return response;
}
