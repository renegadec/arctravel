import Link from "next/link";
import { isDbConfigured, getTableCounts, type DbStatus } from "@/lib/db";
import { zohoMcpUrl } from "@/lib/zoho-mcp";
import { isZohoMcpConnected } from "@/lib/zoho-mcp-auth";
import DbSetupBanner from "@/components/staff/DbSetupBanner";
import {
  CarFront,
  MapPin,
  FileText,
  ArrowRight,
  Zap,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardOverviewPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const zohoStatus = typeof sp.zoho === "string" ? sp.zoho : null;

  // One query covers both the counts and the status: counts are null when
  // the DB is unavailable, and the config flag tells us why.
  const counts = await getTableCounts();
  const status: DbStatus = counts
    ? "ok"
    : isDbConfigured()
      ? "not-ready"
      : "no-db";
  const mcpConfigured = Boolean(zohoMcpUrl());
  const mcpConnected = mcpConfigured ? await isZohoMcpConnected() : false;

  const cards = [
    {
      label: "Cars in fleet",
      value: counts ? String(counts.cars) : "—",
      href: "/staff/dashboard/cars",
      icon: CarFront,
      desc: "Fleet vehicles, pricing & availability",
    },
    {
      label: "Destinations",
      value: counts ? String(counts.destinations) : "—",
      href: "/staff/dashboard/destinations",
      icon: MapPin,
      desc: "Destination pages & content",
    },
    {
      label: "Visa countries",
      value: counts ? String(counts.visas) : "—",
      href: "/staff/dashboard/visas",
      icon: FileText,
      desc: "Visa directory entries",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-[#002a62]">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage the content that powers the website.
        </p>
      </div>

      {status !== "ok" && <DbSetupBanner status={status} />}

      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#ff8912]/30 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#002a62] text-white shadow-sm">
                <card.icon className="h-5 w-5" />
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-[#ff8912]" />
            </div>
            <p className="mt-4 text-2xl font-bold text-[#002a62]">{card.value}</p>
            <p className="text-sm font-semibold">{card.label}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{card.desc}</p>
          </Link>
        ))}
      </div>

      {mcpConfigured && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#002a62] text-white">
                <Zap className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-[#002a62]">
                  Invoice Bot — Zoho MCP
                </h2>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {mcpConnected
                    ? "Connected to Zoho Invoices — staff can create invoices via Telegram."
                    : "Link your Zoho Invoices account so staff can create invoices via Telegram."}
                </p>
              </div>
            </div>
            {mcpConnected ? (
              <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                Connected ✓
              </span>
            ) : (
              <a
                href="/api/mcp/zoho/connect"
                className="inline-flex h-9 items-center rounded-xl bg-[#ff8912] px-4 text-sm font-semibold text-white shadow-md shadow-[#ff8912]/25 transition-colors hover:bg-[#e67a00]"
              >
                Connect Zoho Invoice
              </a>
            )}
          </div>
          {zohoStatus === "connected" && (
            <p className="mt-3 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-xs font-medium text-green-700">
              Zoho Invoices connected successfully — try an invoice from Telegram.
            </p>
          )}
          {zohoStatus === "error" && (
            <p className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
              Zoho connection failed — check the server logs and try again.
            </p>
          )}
        </div>
      )}

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-[#002a62]">Quick guide</h2>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
          <li>
            • Every change you save here goes live on the website immediately
          </li>
          <li>
            • To take a vehicle out of the public fleet, uncheck{" "}
            <span className="font-medium text-foreground">Available</span> on
            the car rather than deleting it.
          </li>
          <li>
            • Use the{" "}
            <span className="font-medium text-foreground">Upload image</span>{" "}
            button on forms to add photos directly — no need for image URLs.
          </li>
          <li>
            • For client flight quotes, use the{" "}
            <Link href="/staff/flight-pricing" className="font-medium text-[#e67a00] hover:underline">
              Flight Pricing Tool
            </Link>.
          </li>
        </ul>
        <div className="mt-4 border-t border-slate-100 pt-4">
          <p className="text-sm font-semibold text-[#002a62]">View the live site</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Link
              href="/services/car-rentals"
              target="_blank"
              className="inline-flex h-8 items-center rounded-lg border border-border px-3 text-xs font-medium transition-colors hover:border-[#ff8912]/40 hover:text-[#e67a00]"
            >
              Car Rentals
            </Link>
            <Link
              href="/destinations"
              target="_blank"
              className="inline-flex h-8 items-center rounded-lg border border-border px-3 text-xs font-medium transition-colors hover:border-[#ff8912]/40 hover:text-[#e67a00]"
            >
              Destinations
            </Link>
            <Link
              href="/services/visa-assistance"
              target="_blank"
              className="inline-flex h-8 items-center rounded-lg border border-border px-3 text-xs font-medium transition-colors hover:border-[#ff8912]/40 hover:text-[#e67a00]"
            >
              Visa Directory
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
