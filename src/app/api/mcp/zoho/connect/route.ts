import { NextResponse } from "next/server";
import { startZohoMcpConnect } from "@/lib/zoho-mcp-auth";

// Starts the one-time Zoho MCP consent flow: redirects the staff member to
// Zoho's authorization page. The callback route finishes the handshake.
export async function GET() {
  try {
    const authUrl = await startZohoMcpConnect();
    return NextResponse.redirect(authUrl);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to start Zoho connection." },
      { status: 500 }
    );
  }
}
