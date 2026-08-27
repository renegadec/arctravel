// Zoho Invoices operations — customers, invoices, and PDF download.
// Endpoint shapes follow the Zoho Invoices v3 API:
//   https://www.zoho.com/invoice/api/v3/
// ⚠️ First live test: verify the /pdf endpoint against your org (see INVOICE_BOT.md).

import { getZohoAccessToken, zohoApiBase, zohoFetch } from "./client";

export interface LineItemInput {
  name: string;
  quantity: number;
  rate: number;
  description?: string;
}

export interface CustomerRef {
  contact_id: string;
  contact_name: string;
}

export async function findCustomerByName(name: string): Promise<CustomerRef | null> {
  const data = await zohoFetch(`/customers?search_text=${encodeURIComponent(name)}`);
  const customers = (data.customers ?? []) as CustomerRef[];
  const match = customers.find(
    (c) => c.contact_name.toLowerCase() === name.toLowerCase()
  );
  return match ?? null;
}

export async function createCustomer(input: {
  name: string;
  email?: string;
}): Promise<string> {
  const data = await zohoFetch("/customers", {
    method: "POST",
    body: { contact_name: input.name, email: input.email ?? "" },
  });
  const customer = data.customer as { contact_id?: string };
  if (!customer?.contact_id) {
    throw new Error("Zoho did not return a customer id.");
  }
  return customer.contact_id;
}

export async function createInvoice(input: {
  customerId: string;
  lineItems: LineItemInput[];
  notes?: string;
  terms?: string;
}): Promise<{ invoiceId: string; invoiceNumber: string }> {
  const data = await zohoFetch("/invoices", {
    method: "POST",
    body: {
      customer_id: input.customerId,
      line_items: input.lineItems.map((li) => ({
        name: li.name,
        description: li.description ?? "",
        rate: li.rate,
        quantity: li.quantity,
      })),
      notes: input.notes ?? "",
      terms: input.terms ?? "",
    },
  });
  const invoice = data.invoice as { invoice_id?: string; invoice_number?: string };
  if (!invoice?.invoice_id) {
    throw new Error("Zoho did not return an invoice id.");
  }
  return {
    invoiceId: invoice.invoice_id,
    invoiceNumber: invoice.invoice_number ?? invoice.invoice_id,
  };
}

export async function getInvoicePdfBytes(invoiceId: string): Promise<{
  bytes: Buffer;
  filename: string;
  contentType: string;
}> {
  const token = await getZohoAccessToken();
  const res = await fetch(
    `${zohoApiBase()}/invoices/${invoiceId}/pdf?accept=application/pdf`,
    { headers: { Authorization: `Zoho-oauthtoken ${token}` } }
  );
  if (!res.ok) {
    throw new Error(`Zoho PDF fetch failed: ${res.status}`);
  }
  const bytes = Buffer.from(await res.arrayBuffer());
  const disposition = res.headers.get("content-disposition") ?? "";
  const match = disposition.match(/filename="?([^";]+)"?/i);
  const filename = match?.[1] ?? `${invoiceId}.pdf`;
  return {
    bytes,
    filename,
    contentType: res.headers.get("content-type") ?? "application/pdf",
  };
}
