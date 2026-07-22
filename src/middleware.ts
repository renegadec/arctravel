import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const STAFF_PASSWORD = process.env.STAFF_PASSWORD || "arctravel2026";
const STAFF_COOKIE = "staff_session";
const STAFF_PATH = "/staff";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /staff/* routes (except the login page itself)
  if (!pathname.startsWith(STAFF_PATH)) {
    return NextResponse.next();
  }

  // Allow login page without auth
  if (pathname === "/staff/login") {
    return NextResponse.next();
  }

  // Allow static files
  if (pathname.includes(".")) {
    return NextResponse.next();
  }

  // Check for valid session cookie
  const session = request.cookies.get(STAFF_COOKIE)?.value;

  if (session === STAFF_PASSWORD) {
    return NextResponse.next();
  }

  // Redirect to login
  const loginUrl = new URL("/staff/login", request.url);
  loginUrl.searchParams.set("redirect", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: "/staff/:path*",
};
