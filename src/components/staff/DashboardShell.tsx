"use client";

import { useState, useEffect, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  CarFront,
  MapPin,
  FileText,
  Plane,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";
import { SITE_URL } from "@/lib/constants";

const NAV = [
  { href: "/staff/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/staff/dashboard/cars", label: "Cars", icon: CarFront },
  { href: "/staff/dashboard/destinations", label: "Destinations", icon: MapPin },
  { href: "/staff/dashboard/visas", label: "Visas", icon: FileText },
  { href: "/staff/flight-pricing", label: "Flight Pricing", icon: Plane },
];

export default function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // Warm the server render for the nav destinations so switching pages feels
  // instant instead of waiting on a fresh server round-trip.
  useEffect(() => {
    for (const item of NAV) router.prefetch(item.href);
  }, [router]);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch("/api/staff/logout", { method: "POST" });
    } catch {
      // ignore — clear and redirect regardless
    }
    router.push("/staff/login");
  }

  const navItems = NAV.map((item) => {
    const active =
      pathname === item.href || pathname.startsWith(item.href + "/");
    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={() => setOpen(false)}
        className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
          active
            ? "bg-[#ff8912]/10 text-[#e67a00]"
            : "text-slate-600 hover:bg-slate-100 hover:text-[#002a62]"
        }`}
      >
        <item.icon className="h-4 w-4 shrink-0" />
        {item.label}
      </Link>
    );
  });

  return (
    <div className="min-h-screen bg-[#f5f6fa]">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-primary/10 bg-gradient-to-r from-primary to-[#003d7a] shadow-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              className="rounded-lg p-1.5 text-white/80 transition-colors hover:bg-white/10 lg:hidden"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 text-xs font-bold text-white ring-1 ring-white/20">
              AT
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                Arc Travel &amp; Tours — Admin
              </p>
              <p className="hidden text-[11px] text-white/70 sm:block">
                Content Dashboard
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={SITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-8 items-center justify-center gap-1 rounded-lg border border-white/20 bg-white/10 px-2.5 text-xs font-medium whitespace-nowrap text-white/90 transition-all hover:bg-white/20"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Back to Site</span>
            </a>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="inline-flex h-8 items-center justify-center gap-1 rounded-lg border border-white/20 bg-white/10 px-2.5 text-xs font-medium whitespace-nowrap text-white/90 transition-all hover:bg-white/20 disabled:opacity-60"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">
                {loggingOut ? "Signing out..." : "Logout"}
              </span>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl">
        {/* Desktop sidebar */}
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-56 shrink-0 border-r border-slate-200 bg-white px-3 py-6 lg:block">
          <nav className="space-y-1">{navItems}</nav>
        </aside>

        {/* Mobile drawer */}
        {open && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setOpen(false)}
            />
            <div className="absolute inset-y-0 left-0 w-64 bg-white p-3 pt-5 shadow-xl">
              <nav className="space-y-1">{navItems}</nav>
            </div>
          </div>
        )}

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
