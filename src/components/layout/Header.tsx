"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navLinks, contactInfo, type NavLink } from "@/lib/constants";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img
            src="/arctravel_logo.svg"
            alt="ArcTravel"
            className="h-auto"
            style={{ width: "auto", height: "100px" }}
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex" ref={dropdownRef}>
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.href} className="relative">
                <button
                  onClick={() => setDropdown(dropdown === link.label ? null : link.label)}
                  className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
                >
                  {link.label}
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform ${
                      dropdown === link.label ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {dropdown === link.label && (
                  <div className="absolute left-0 top-full mt-1 min-w-[220px] rounded-xl border border-border bg-white p-1.5 shadow-xl z-50">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setDropdown(null)}
                        className="flex flex-col rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-accent/5"
                      >
                        <span className="font-medium text-foreground">{child.label}</span>
                        {child.description && (
                          <span className="mt-0.5 text-[11px] text-muted-foreground leading-tight">
                            {child.description}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href={`tel:${contactInfo.phone}`}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Phone className="h-4 w-4" />
            <span>{contactInfo.phone}</span>
          </a>
          <Link href="/contact">
            <Button>Get a Quote</Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t border-border md:hidden">
          <nav className="flex flex-col gap-2 px-4 py-4">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.href}>
                  <p className="rounded-lg px-3 py-2 text-sm font-semibold text-foreground">
                    {link.label}
                  </p>
                  <div className="ml-3 flex flex-col gap-1 border-l border-border pl-3">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setOpen(false)}
                        className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
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
                  className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="mt-2 border-t border-border pt-4">
              <Link href="/contact" onClick={() => setOpen(false)}>
                <Button className="w-full">Get a Quote</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
