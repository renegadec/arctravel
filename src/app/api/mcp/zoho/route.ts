// MCP Streamable-HTTP server exposing Zoho Invoices tools.
// Any MCP client (Claude Desktop, Cursor, our agent, ...) can connect to
// /api/mcp/zoho with a bearer token (MCP_API_KEY env).
//
// The Telegram invoice bot does NOT use this endpoint — it calls the same
// tool handlers in-process. This route exists so Zoho is reachable through
// the standard MCP protocol too.

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { createInvoiceTool, listCustomersTool } from "@/lib/zoho/tools";

function createServer(): McpServer {
  const server = new McpServer({
    name: "zoho-invoices",
    version: "1.0.0",
    description:
      "Tools for creating invoices in Arc Travel & Tours' Zoho Invoices account. " +
      "Use create_invoice to find-or-create a customer and generate an invoice; " +
      "the invoice PDF is delivered by the requesting chat app.",
  });
  server.registerTool(
    createInvoiceTool.name,
    {
      title: createInvoiceTool.name,
      description: createInvoiceTool.description,
      inputSchema: createInvoiceTool.inputSchema,
    },
    createInvoiceTool.handler
  );
  server.registerTool(
    listCustomersTool.name,
    {
      title: listCustomersTool.name,
      description: listCustomersTool.description,
      inputSchema: listCustomersTool.inputSchema,
    },
    listCustomersTool.handler
  );
  return server;
}

function checkApiKey(request: Request): Response | null {
  const expected = process.env.MCP_API_KEY;
  if (!expected) {
    return Response.json(
      { error: "MCP endpoint not configured — set MCP_API_KEY in .env.local." },
      { status: 503 }
    );
  }
  const auth = request.headers.get("authorization") ?? "";
  const key = request.headers.get("x-api-key") ?? "";
  const bearer = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (bearer !== expected && key !== expected) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

async function handle(request: Request): Promise<Response> {
  const denied = checkApiKey(request);
  if (denied) return denied;

  const server = createServer();
  const transport = new WebStandardStreamableHTTPServerTransport({
    // Stateless mode: no persisted sessions (fine for request/response tool calls).
    sessionIdGenerator: undefined,
  });
  await server.connect(transport);
  return transport.handleRequest(request);
}

export async function GET(request: Request): Promise<Response> {
  return handle(request);
}

export async function POST(request: Request): Promise<Response> {
  return handle(request);
}

export async function DELETE(request: Request): Promise<Response> {
  return handle(request);
}
