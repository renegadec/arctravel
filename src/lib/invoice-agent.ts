// Invoice agent: turns a staff instruction into a confirmed Zoho invoice.
// Flow:  freeform message → DeepSeek extracts a structured draft → staff
// confirms → the draft is executed deterministically against Zoho (no LLM in
// the money path) → PDF bytes are returned for delivery.

import {
  createCustomer,
  createInvoice,
  findCustomerByName,
  getInvoicePdfBytes,
} from "@/lib/zoho/invoices";
import { createInvoiceViaMcp, zohoMcpUrl } from "@/lib/zoho-mcp";

export interface InvoiceDraft {
  customerName: string;
  customerEmail?: string;
  currency?: string;
  lineItems: { name: string; quantity: number; rate: number }[];
  notes?: string;
}

const EXTRACT_TOOL = {
  type: "function",
  function: {
    name: "extract_invoice_draft",
    description: "Extract an invoice draft from a staff instruction message.",
    parameters: {
      type: "object",
      properties: {
        customerName: {
          type: "string",
          description: "The client's name.",
        },
        customerEmail: {
          type: "string",
          description: "Client email if provided.",
        },
        currency: { type: "string", description: "Currency, usually USD." },
        lineItems: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: { type: "string", description: "What is being billed." },
              quantity: { type: "number", description: "Number of units." },
              rate: { type: "number", description: "Unit price in the currency." },
            },
            required: ["name", "quantity", "rate"],
          },
        },
        notes: { type: "string", description: "Payment terms or other notes." },
      },
      required: ["customerName", "lineItems"],
    },
  },
} as const;

const SYSTEM_PROMPT =
  "You are the Arc Travel & Tours invoicing assistant. Convert the staff " +
  "message into a structured invoice draft. If the message says a total " +
  "without a unit quantity, use quantity 1 with rate = total. Never invent " +
  "customers or amounts not mentioned. If the instruction is not about an " +
  "invoice, still return a draft with the details you can find.";

export async function extractInvoiceDraft(instruction: string): Promise<InvoiceDraft> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey || apiKey === "your_deepseek_api_key_here") {
    throw new Error("DeepSeek API key not configured.");
  }

  const res = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: instruction },
      ],
      tools: [EXTRACT_TOOL],
      tool_choice: "required",
      temperature: 0,
    }),
  });

  const data = (await res.json().catch(() => ({}))) as {
    choices?: { message?: { tool_calls?: { function?: { arguments?: string } }[] } }[];
  };
  if (!res.ok || !data.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments) {
    throw new Error("The assistant could not parse the instruction.");
  }

  const raw = JSON.parse(data.choices[0].message.tool_calls[0].function.arguments) as Partial<InvoiceDraft>;
  const lineItems = (raw.lineItems ?? []).filter(
    (li) => li && typeof li.name === "string" && li.name.trim() && li.quantity > 0 && li.rate >= 0
  );
  if (!raw.customerName?.trim() || lineItems.length === 0) {
    throw new Error("Could not find a customer and at least one line item.");
  }
  return {
    customerName: raw.customerName.trim(),
    customerEmail: raw.customerEmail?.trim() || undefined,
    currency: raw.currency?.trim() || "USD",
    lineItems,
    notes: raw.notes?.trim() || undefined,
  };
}

// ─── Confirmation store (per chat, single-use) ────────────────────────────

const DRAFT_TTL_MS = 10 * 60 * 1000; // 10 minutes

const globalForAgent = globalThis as unknown as {
  __invoiceDrafts?: Map<string, { draft: InvoiceDraft; expires: number }>;
};

const drafts =
  globalForAgent.__invoiceDrafts ??
  (globalForAgent.__invoiceDrafts = new Map());

export function storeDraft(chatId: string, draft: InvoiceDraft): void {
  drafts.set(chatId, { draft, expires: Date.now() + DRAFT_TTL_MS });
}

/** Removes and returns the pending draft for a chat, if any. */
export function takeDraft(chatId: string): InvoiceDraft | null {
  const entry = drafts.get(chatId);
  if (!entry) return null;
  drafts.delete(chatId);
  if (entry.expires < Date.now()) return null;
  return entry.draft;
}

export function formatDraftSummary(draft: InvoiceDraft): string {
  const lines = draft.lineItems
    .map(
      (li) =>
        `• ${li.name} × ${li.quantity} @ ${draft.currency ?? "USD"}${li.rate.toFixed(2)}`
    )
    .join("\n");
  const total = draft.lineItems.reduce((s, li) => s + li.quantity * li.rate, 0);
  return [
    `📄 <b>Invoice draft</b>`,
    ``,
    `Client: <b>${draft.customerName}</b>${draft.customerEmail ? ` (${draft.customerEmail})` : ""}`,
    `${lines}`,
    ``,
    `<b>Total: ${draft.currency ?? "USD"}${total.toFixed(2)}</b>`,
    draft.notes ? `\nNotes: ${draft.notes}` : "",
  ].join("\n");
}

// ─── Execution (deterministic, no LLM) ────────────────────────────────────

export interface ExecuteResult {
  invoiceNumber: string;
  total: number;
  currency: string;
  /** Present when the PDF could be fetched — otherwise text-only delivery. */
  pdf?: { bytes: Buffer; filename: string; contentType: string };
  /** Hosted invoice page (view/download PDF). */
  invoiceUrl?: string;
}

export async function executeDraft(draft: InvoiceDraft): Promise<ExecuteResult> {
  const currency = draft.currency ?? "USD";

  // Preferred path: Zoho's hosted MCP server (ZOHO_MCP_URL).
  if (zohoMcpUrl()) {
    const { invoiceNumber, total, invoiceUrl } = await createInvoiceViaMcp(draft);
    return { invoiceNumber, total, currency, invoiceUrl };
  }

  // Fallback: direct Zoho REST (needs the refresh-token credentials).
  const existing = await findCustomerByName(draft.customerName);
  const customerId =
    existing?.contact_id ??
    (await createCustomer({ name: draft.customerName, email: draft.customerEmail }));

  const { invoiceId, invoiceNumber } = await createInvoice({
    customerId,
    lineItems: draft.lineItems,
    notes: draft.notes,
  });

  // Zoho Invoice's REST API has no PDF-download endpoint — PDFs arrive via
  // email or the hosted invoice link.
  const pdfFetch = await getInvoicePdfBytes(invoiceId).catch(() => null);
  const total = draft.lineItems.reduce((s, li) => s + li.quantity * li.rate, 0);
  return {
    invoiceNumber,
    total,
    currency,
    pdf: pdfFetch
      ? {
          bytes: pdfFetch.bytes,
          filename: pdfFetch.filename,
          contentType: pdfFetch.contentType,
        }
      : undefined,
  };
}
