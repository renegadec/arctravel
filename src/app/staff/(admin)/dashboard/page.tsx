import Link from "next/link";
import { getDbStatus, getTableCounts } from "@/lib/db";
import DbSetupBanner from "@/components/staff/DbSetupBanner";
import {
  CarFront,
  MapPin,
  FileText,
  ArrowRight,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardOverviewPage() {
  const status = await getDbStatus();
  const counts = status === "ok" ? await getTableCounts() : null;

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

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-[#002a62]">Good to know</h2>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
          <li>
            • Cars, destinations and visas are stored in Postgres (
            <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">DATABASE_URL</code>
            ).
          </li>
          <li>
            • While the database isn&apos;t configured, the public site shows the
            built-in content — the dashboard needs it to save changes.
          </li>
          <li>
            • The{" "}
            <Link href="/staff/flight-pricing" className="font-medium text-[#e67a00] hover:underline">
              Flight Pricing Tool
            </Link>{" "}
            is still available under Staff Tools.
          </li>
        </ul>
      </div>
    </div>
  );
}
