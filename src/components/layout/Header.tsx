"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Phone,
  Mail,
  Clock,
  ChevronDown,
  ArrowRight,
  MessageCircle,
  CarFront,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { navLinks, contactInfo, socialLinks, type NavLink } from "@/lib/constants";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close dropdown on click outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close dropdown on route change
  // (adjust state during render — avoids cascading setState-in-effect)
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setDropdown(null);
    setOpen(false);
  }

  function isActive(link: NavLink) {
    if (link.href === "/") return pathname === "/";
    return pathname === link.href || pathname.startsWith(link.href + "/");
  }

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* ============ TOP UTILITY BAR ============ */}
      <div className="hidden bg-[#002a62] text-white/80 md:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 text-xs">
            <a
              href={`tel:${contactInfo.phone}`}
              className="flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <Phone className="h-3 w-3 text-[#ff8912]" />
              {contactInfo.phone}
            </a>
            <a
              href={`mailto:${contactInfo.email}`}
              className="hidden items-center gap-1.5 transition-colors hover:text-white sm:flex"
            >
              <Mail className="h-3 w-3 text-[#ff8912]" />
              {contactInfo.email}
            </a>
          </div>
          <div className="flex items-center gap-6 text-xs">
            <span className="hidden items-center gap-1.5 lg:flex">
              <Clock className="h-3 w-3 text-[#ff8912]" />
              Mon–Sat · 8:00–18:00 CAT
            </span>
            <a
              href={socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-medium text-white transition-colors hover:text-[#ffb25e]"
            >
              <MessageCircle className="h-3 w-3 text-[#ff8912]" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* ============ MAIN NAV BAR ============ */}
      <div className="border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-24 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src="/arctravel_logo.svg"
              alt="Arc Travel & Tours"
              width={120}
              height={120}
              priority
              className="h-14 w-auto sm:h-16 lg:h-20"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 lg:flex" ref={dropdownRef}>
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.href} className="relative">
                  <button
                    onClick={() => setDropdown(dropdown === link.label ? null : link.label)}
                    className={`group flex items-center gap-1 rounded-lg px-3.5 py-2.5 text-[15px] font-medium transition-colors cursor-pointer ${
                      isActive(link)
                        ? "text-[#002a62]"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-all ${
                        dropdown === link.label
                          ? "rotate-180 text-[#ff8912]"
                          : "text-muted-foreground group-hover:text-[#ff8912]"
                      }`}
                    />
                  </button>
                  {/* Underline indicator */}
                  <span
                    className={`absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-[#ff8912] transition-all duration-300 ${
                      isActive(link) || dropdown === link.label
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  />
                  {dropdown === link.label && (
                    <div className="absolute left-0 top-full z-50 mt-2 w-[620px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-border bg-white shadow-2xl shadow-[#002a62]/15">
                      <div className="grid gap-4 p-4 lg:grid-cols-[minmax(0,1fr)_200px]">
                        {/* Links: multi-column so the menu grows sideways, not just downward */}
                        <div className="min-w-0">
                          <p className="px-2.5 pb-1 pt-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                            {link.label}
                          </p>
                          <div className="grid gap-1 sm:grid-cols-2">
                            {link.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => setDropdown(null)}
                                className={`group flex items-center justify-between gap-2 rounded-xl px-2.5 py-2.5 text-sm transition-all ${
                                  pathname === child.href
                                    ? "bg-[#ff8912]/5"
                                    : "hover:bg-[#ff8912]/5"
                                }`}
                              >
                                <span className="min-w-0">
                                  <span
                                    className={`block font-medium ${
                                      pathname === child.href
                                        ? "text-[#e67a00]"
                                        : "text-foreground group-hover:text-[#002a62]"
                                    }`}
                                  >
                                    {child.label}
                                  </span>
                                  {child.description && (
                                    <span className="mt-0.5 block text-[11px] leading-tight text-muted-foreground">
                                      {child.description}
                                    </span>
                                  )}
                                </span>
                                <ArrowRight className="h-4 w-4 shrink-0 text-[#ff8912] opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Featured promo card */}
                        <Link
                          href="/services/car-rentals"
                          onClick={() => setDropdown(null)}
                          className="group relative hidden flex-col justify-between overflow-hidden rounded-xl bg-gradient-to-br from-[#002a62] via-[#00337f] to-[#0a2440] p-4 lg:flex"
                        >
                          <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#ff8912]/20 blur-2xl" />
                          <div className="relative">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ff8912]/15">
                              <CarFront className="h-4 w-4 text-[#ffb25e]" />
                            </div>
                            <p className="mt-3 text-sm font-bold text-white">
                              Car Hire Fleet
                            </p>
                            <p className="mt-1 text-[11px] leading-relaxed text-white/70">
                              Our real fleet of 4x4s, sedans &amp; minibuses with
                              daily rates.
                            </p>
                          </div>
                          <span className="relative mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#ffb25e] transition-colors group-hover:text-[#ff8912]">
                            Browse the fleet
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                          </span>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative rounded-lg px-3.5 py-2.5 text-[15px] font-medium transition-colors ${
                    isActive(link)
                      ? "text-[#002a62]"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  {/* Underline indicator */}
                  <span
                    className={`absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-[#ff8912] transition-all duration-300 ${
                      isActive(link)
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  />
                </Link>
              )
            )}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-3 lg:flex">
            <Link href="/book">
              <Button variant="accent" size="xl">
                Book Your Trip
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? (
              <X className="h-7 w-7 text-foreground" />
            ) : (
              <Menu className="h-7 w-7 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-b border-border bg-background lg:hidden">
          <nav className="flex flex-col gap-1 px-4 py-4">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.href}>
                  <p className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold text-foreground">
                    {link.label}
                  </p>
                  <div className="ml-3 flex flex-col gap-0.5 border-l border-border pl-3">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setOpen(false)}
                        className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                          pathname === child.href
                            ? "bg-[#ff8912]/5 font-medium text-[#e67a00]"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(link)
                      ? "bg-[#ff8912]/5 text-[#002a62]"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="mt-3 space-y-3 border-t border-border pt-4">
              <Link href="/book" onClick={() => setOpen(false)}>
                <Button variant="accent" size="xl" className="w-full">
                  Book Your Trip
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              </Link>
              <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-[#ff8912]" />
                  {contactInfo.phone}
                </a>
                <a
                  href={socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5"
                >
                  <MessageCircle className="h-3.5 w-3.5 text-[#ff8912]" />
                  WhatsApp
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
