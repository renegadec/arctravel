import { NextResponse } from "next/server";
import { handleZohoMcpCallback } from "@/lib/zoho-mcp-auth";

// OAuth redirect target: exchanges the code, stores the refresh token, and
// returns the staff member to the dashboard.
export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  try {
    if (!code || !state) throw new Error("Missing code or state.");
    await handleZohoMcpCallback(code, state);
    return NextResponse.redirect(
      new URL("/staff/dashboard?zoho=connected", process.env.ZOHO_MCP_CALLBACK_URL || "https://www.arctravel.co.zw")
    );
  } catch (err) {
    console.error("[zoho-mcp] callback failed:", err);
    return NextResponse.redirect(
      new URL("/staff/dashboard?zoho=error", process.env.ZOHO_MCP_CALLBACK_URL || "https://www.arctravel.co.zw")
    );
  }
}
