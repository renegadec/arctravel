import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const STAFF_PASSWORD = process.env.STAFF_PASSWORD || "arctravel2026";
const STAFF_COOKIE = "staff_session";
const FLIGHTS_HOST = "flights.arctravel.co.zw";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get("host") || "";

  // ─── Subdomain routing ──────────────────────────────────
  // If visiting flights.arctravel.co.zw, rewrite to staff tool
  if (host === FLIGHTS_HOST) {
    // If already on a staff path, let it through (auth check below handles it)
    if (!pathname.startsWith("/staff")) {
      const url = new URL("/staff/flight-pricing", request.url);
      url.search = request.nextUrl.search;
      return NextResponse.rewrite(url);
    }
  }

  // ─── Auth protection for /staff/* ────────────────────────
  if (!pathname.startsWith("/staff")) {
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
  matcher: ["/staff/:path*", "/"],
};
