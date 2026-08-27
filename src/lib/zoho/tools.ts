// Shared Zoho Invoices tool registry.
// One definition per tool (name, description, zod input schema, handler) used
// by BOTH the MCP server (/api/mcp/zoho) and the invoice agent's tool calls.

import { z } from "zod";
import {
  createCustomer,
  createInvoice,
  findCustomerByName,
  type LineItemInput,
} from "./invoices";

const lineItemSchema = z.object({
  name: z.string().describe("Line item name, e.g. 'Victoria Falls weekend package'"),
  quantity: z.number().positive(),
  rate: z.number().nonnegative().describe("Unit price in USD"),
  description: z.string().optional(),
});

export const createInvoiceTool = {
  name: "create_invoice",
  description:
    "Create an invoice in Zoho Invoices. Finds or creates the customer by name, adds the line items, and returns the invoice number and id.",
  inputSchema: {
    customerName: z.string().describe("Client's name"),
    customerEmail: z.string().email().optional(),
    lineItems: z.array(lineItemSchema).min(1),
    notes: z.string().optional(),
    terms: z.string().optional(),
  },
  async handler(args: {
    customerName: string;
    customerEmail?: string;
    lineItems: LineItemInput[];
    notes?: string;
    terms?: string;
  }) {
    const existing = await findCustomerByName(args.customerName);
    const customerId =
      existing?.contact_id ??
      (await createCustomer({ name: args.customerName, email: args.customerEmail }));
    const { invoiceId, invoiceNumber } = await createInvoice({
      customerId,
      lineItems: args.lineItems,
      notes: args.notes,
      terms: args.terms,
    });
    const total = args.lineItems.reduce((s, li) => s + li.quantity * li.rate, 0);
    const result = {
      invoiceId,
      invoiceNumber,
      customer: args.customerName,
      total: Number(total.toFixed(2)),
      currency: "USD",
    };
    return {
      content: [{ type: "text" as const, text: JSON.stringify(result) }],
      structuredContent: result,
    };
  },
};

export const listCustomersTool = {
  name: "list_customers",
  description: "Search Zoho Invoices customers by name.",
  inputSchema: {
    query: z.string().optional().describe("Name fragment to search for"),
  },
  async handler(args: { query?: string }) {
    const data = await findCustomerByName(args.query ?? "");
    const result = {
      customers: data ? [data] : [],
      note: "Searched by exact name match; list all customers from the Zoho portal for the full directory.",
    };
    return {
      content: [{ type: "text" as const, text: JSON.stringify(result) }],
      structuredContent: result,
    };
  },
};

export const zohoTools = [createInvoiceTool, listCustomersTool];
