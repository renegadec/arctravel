import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const STAFF_PASSWORD = process.env.STAFF_PASSWORD || "arctravel2026";
const STAFF_COOKIE = "staff_session";
const FLIGHTS_HOST = "flights.arctravel.co.zw";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get("host") || "";
  const isFlightsSubdomain = host === FLIGHTS_HOST || host === `www.${FLIGHTS_HOST}`;

  // ─── Subdomain routing ──────────────────────────────────
  // If visiting flights subdomain, determine the target staff path
  let effectivePath = pathname;

  if (isFlightsSubdomain && !pathname.startsWith("/staff")) {
    effectivePath = "/staff/flight-pricing";
  }

  // ─── Auth protection ─────────────────────────────────────
  // Only protect staff paths
  if (!effectivePath.startsWith("/staff")) {
    return NextResponse.next();
  }

  // Allow login page without auth
  if (effectivePath === "/staff/login") {
    // If coming from flights subdomain, rewrite but don't protect login
    if (pathname !== effectivePath) {
      const url = new URL(effectivePath, request.url);
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  // Allow static files
  if (effectivePath.includes(".")) {
    return NextResponse.next();
  }

  // Check for valid session cookie
  const session = request.cookies.get(STAFF_COOKIE)?.value;

  if (session === STAFF_PASSWORD) {
    // Authenticated — rewrite to staff path if needed
    if (pathname !== effectivePath) {
      const url = new URL(effectivePath, request.url);
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  // Not authenticated — redirect to login
  // Preserve the original host so the user logs in on the same domain
  const loginUrl = new URL("/staff/login", request.url);
  loginUrl.searchParams.set("redirect", effectivePath);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/staff/:path*", "/"],
};
