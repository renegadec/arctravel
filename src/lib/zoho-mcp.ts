// MCP client for Zoho's hosted Invoice MCP server.
// Connects to the URL from mcp.zoho.com (ZOHO_MCP_URL) and calls its tools
// adaptively — we look up tool names/schemas at runtime instead of hardcoding
// Zoho's argument shapes, so it keeps working as they evolve.

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import type { Tool } from "@modelcontextprotocol/sdk/types.js";
import { createZohoMcpFetch } from "@/lib/zoho-mcp-auth";

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
  const transport = new StreamableHTTPClientTransport(new URL(url), {
    fetch: createZohoMcpFetch(),
  });
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
  // Zoho names tools like "ZohoInvoice_Create_a_Contact" — compare on
  // normalized (lowercased, non-alphanumeric-stripped) names.
  const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  const needle = normalize(nameLike);
  const tool = tools.find((t) => normalize(t.name).includes(needle));
  if (!tool) {
    const names = tools.map((t) => t.name).join(", ");
    throw new Error(
      `Zoho MCP tool matching "${nameLike}" not found. Available: ${names}`
    );
  }
  const result = await client.callTool({ name: tool.name, arguments: args });
  if (result.isError) {
    const blocks = (result.content ?? []) as { type?: string; text?: string }[];
    const errText = blocks
      .filter((c) => c.type === "text" && typeof c.text === "string")
      .map((c) => c.text as string)
      .join(" ");
    throw new Error(
      `Zoho MCP tool "${tool.name}" failed: ${errText || "(no details)"}`
    );
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
 * Zoho's tools expect { headers: { X-com-zoho-invoice-organizationid }, body } /
 * { headers, query_params } — argument shapes confirmed from the live schemas.
 */
export async function createInvoiceViaMcp(draft: {
  customerName: string;
  customerEmail?: string;
  lineItems: { name: string; quantity: number; rate: number }[];
  notes?: string;
}): Promise<McpInvoiceResult> {
  const orgId = process.env.ZOHO_INVOICE_ORG_ID;
  if (!orgId) {
    throw new Error(
      "Set ZOHO_INVOICE_ORG_ID in .env.local / the deployed env (your Zoho org id, e.g. 936540707)."
    );
  }
  const headers = { "X-com-zoho-invoice-organizationid": orgId };

  // 1. Find the contact by name.
  let contactId: string | null = null;
  try {
    const found = (await callZohoMcpTool("List all Contacts", {
      headers,
      query_params: { contact_name: draft.customerName, page: 1 },
    })) as { contacts?: unknown[]; data?: unknown[] } | unknown[];
    const list = Array.isArray(found) ? found : ((found as { contacts?: unknown[] }).contacts ?? (found as { data?: unknown[] }).data ?? []);
    const name = draft.customerName.toLowerCase();
    contactId = (
      list as { contact_id?: string; contact_name?: string; first_name?: string; last_name?: string }[]
    ).find(
      (c) =>
        (c.contact_name ?? "").toLowerCase() === name ||
        `${c.first_name ?? ""} ${c.last_name ?? ""}`.trim().toLowerCase() === name
    )?.contact_id ?? null;
  } catch (err) {
    console.error("[zoho-mcp] contact lookup failed:", err);
  }

  // 2. Create the contact if we couldn't find one.
  if (!contactId) {
    const created = (await callZohoMcpTool("Create a Contact", {
      headers,
      body: {
        contact_name: draft.customerName,
        email: draft.customerEmail ?? "",
      },
    })) as {
      customer?: { contact_id?: string };
      contact?: { contact_id?: string };
      contact_id?: string;
      data?: { contact_id?: string };
    };
    contactId =
      created?.customer?.contact_id ??
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
    headers,
    body: {
      customer_id: contactId,
      line_items: draft.lineItems.map((li) => ({
        name: li.name,
        quantity: li.quantity,
        rate: li.rate,
      })),
      notes: draft.notes ?? "",
    },
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
