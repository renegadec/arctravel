// MCP client for Zoho's hosted Invoice MCP server.
// Connects to the URL from mcp.zoho.com (ZOHO_MCP_URL) and calls its tools
// adaptively — we look up tool names/schemas at runtime instead of hardcoding
// Zoho's argument shapes, so it keeps working as they evolve.

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import type { Tool } from "@modelcontextprotocol/sdk/types.js";

const globalForMcp = globalThis as unknown as {
  __zohoMcpClient?: Client;
  __zohoMcpTools?: Tool[];
  __zohoMcpUrl?: string;
};

export function zohoMcpUrl(): string | null {
  return process.env.ZOHO_MCP_URL || null;
}

async function getClient(): Promise<Client> {
  const url = zohoMcpUrl();
  if (!url) {
    throw new Error("Zoho MCP not configured — set ZOHO_MCP_URL in .env.local.");
  }
  if (globalForMcp.__zohoMcpClient && globalForMcp.__zohoMcpUrl === url) {
    return globalForMcp.__zohoMcpClient;
  }
  const client = new Client({ name: "arctravel-invoice-bot", version: "1.0.0" });
  const transport = new StreamableHTTPClientTransport(new URL(url));
  await client.connect(transport);
  globalForMcp.__zohoMcpClient = client;
  globalForMcp.__zohoMcpUrl = url;
  return client;
}

export async function zohoMcpListTools(): Promise<Tool[]> {
  const client = await getClient();
  if (!globalForMcp.__zohoMcpTools) {
    const res = await client.listTools();
    globalForMcp.__zohoMcpTools = res.tools;
    // First connect: log available tools + their input schemas so we can map
    // our operations to Zoho's exact argument shapes.
    console.log(
      "[zoho-mcp] available tools:",
      res.tools.map((t) => ({
        name: t.name,
        inputSchema: t.inputSchema,
      }))
    );
  }
  return globalForMcp.__zohoMcpTools;
}

/** Find a Zoho MCP tool by fuzzy name and call it with the given arguments. */
export async function callZohoMcpTool(
  nameLike: string,
  args: Record<string, unknown>
): Promise<unknown> {
  const client = await getClient();
  const tools = await zohoMcpListTools();
  const tool = tools.find((t) =>
    t.name.toLowerCase().includes(nameLike.toLowerCase())
  );
  if (!tool) {
    const names = tools.map((t) => t.name).join(", ");
    throw new Error(
      `Zoho MCP tool matching "${nameLike}" not found. Available: ${names}`
    );
  }
  const result = await client.callTool({ name: tool.name, arguments: args });
  if (result.isError) {
    throw new Error(`Zoho MCP tool "${tool.name}" returned an error.`);
  }
  const blocks = (result.content ?? []) as { type?: string; text?: string }[];
  const text = blocks
    .filter((c) => c.type === "text" && typeof c.text === "string")
    .map((c) => c.text as string)
    .join("\n");
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export interface McpInvoiceResult {
  invoiceId: string;
  invoiceNumber: string;
  total: number;
  raw: unknown;
}

/**
 * Create an invoice through Zoho's MCP server.
 * Strategy: find-or-create the contact, then create the invoice.
 * Argument shapes are best-effort; we tune them from the logged schemas
 * after the first live call.
 */
export async function createInvoiceViaMcp(draft: {
  customerName: string;
  customerEmail?: string;
  lineItems: { name: string; quantity: number; rate: number }[];
  notes?: string;
}): Promise<McpInvoiceResult> {
  // 1. Find the contact (try a few common search argument names).
  let contactId: string | null = null;
  try {
    const found = (await callZohoMcpTool("List all Contacts", {
      search_text: draft.customerName,
      page: 1,
      per_page: 10,
    })) as { contacts?: { contact_id?: string; contact_name?: string }[]; data?: unknown[] };
    const list = Array.isArray(found)
      ? found
      : (found as { contacts?: unknown[] }).contacts ?? [];
    const match = (list as { contact_id?: string; contact_name?: string }[]).find(
      (c) =>
        (c.contact_name ?? "").toLowerCase() === draft.customerName.toLowerCase()
    );
    contactId = match?.contact_id ?? null;
  } catch {
    // fall through — we'll try to create the contact instead
  }

  // 2. Create the contact if we couldn't find one.
  if (!contactId) {
    const created = (await callZohoMcpTool("Create a Contact", {
      contact_name: draft.customerName,
      email: draft.customerEmail ?? "",
    })) as { contact?: { contact_id?: string }; contact_id?: string; data?: { contact_id?: string } };
    contactId =
      created?.contact?.contact_id ??
      created?.contact_id ??
      (created?.data as { contact_id?: string } | undefined)?.contact_id ??
      null;
    if (!contactId) {
      throw new Error("Zoho MCP did not return a contact id after creating the contact.");
    }
  }

  // 3. Create the invoice.
  const invoice = (await callZohoMcpTool("Create an Invoice", {
    customer_id: contactId,
    contact_id: contactId,
    line_items: draft.lineItems.map((li) => ({
      name: li.name,
      quantity: li.quantity,
      rate: li.rate,
    })),
    notes: draft.notes ?? "",
  })) as {
    invoice?: { invoice_id?: string; invoice_number?: string };
    invoice_id?: string;
    invoice_number?: string;
    data?: { invoice_id?: string; invoice_number?: string };
  };

  const invoiceId =
    invoice?.invoice?.invoice_id ??
    invoice?.invoice_id ??
    (invoice?.data as { invoice_id?: string } | undefined)?.invoice_id;
  const invoiceNumber =
    invoice?.invoice?.invoice_number ??
    invoice?.invoice_number ??
    (invoice?.data as { invoice_number?: string } | undefined)?.invoice_number ??
    invoiceId;

  if (!invoiceId) {
    throw new Error("Zoho MCP did not return an invoice id.");
  }

  const total = draft.lineItems.reduce((s, li) => s + li.quantity * li.rate, 0);
  return { invoiceId, invoiceNumber: invoiceNumber ?? invoiceId, total, raw: invoice };
}
