"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Globe,
  FileCheck,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  BadgeCheck,
  CheckCircle2,
  Clock,
  DollarSign,
  MapPin,
  FileText,
  Plane,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { visaCountries, regions, visaTypeLabels, type VisaType } from "@/lib/visa-data";

export default function VisaPageClient() {
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState<VisaType | "all">("all");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [showContact, setShowContact] = useState(false);

  const filtered = useMemo(() => {
    return visaCountries.filter((c) => {
      const matchesSearch =
        !search ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.region.toLowerCase().includes(search.toLowerCase());
      const matchesRegion = regionFilter === "All" || c.region === regionFilter;
      const matchesType = typeFilter === "all" || c.type === typeFilter;
      return matchesSearch && matchesRegion && matchesType;
    });
  }, [search, regionFilter, typeFilter]);

  const toggleExpand = (slug: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = { all: visaCountries.length };
    for (const c of visaCountries) {
      counts[c.type] = (counts[c.type] || 0) + 1;
    }
    // Add region counts
    for (const r of regions) {
      if (r !== "All") counts[`region-${r}`] = visaCountries.filter((c) => c.region === r).length;
    }
    return counts;
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-br from-primary to-primary/90 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15">
              <BadgeCheck className="h-6 w-6 text-accent" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Visa Directory
            </h1>
            <p className="mt-4 text-lg text-white/75 max-w-2xl mx-auto">
              Search our complete visa directory for Zimbabwean passport holders. Find out if you need a visa, what it costs, and what documents are required.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="border-b border-border bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {/* Search */}
          <div className="relative max-w-xl">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by country name or region..."
              className="h-11 rounded-xl border-border/70 pl-10 text-sm focus-visible:ring-accent"
            />
          </div>

          {/* Type pills */}
          <div className="mt-4 flex flex-wrap gap-2">
            {(["all", "visa-free", "evisa", "eta", "visa-required"] as const).map((t) => {
              const active = typeFilter === t;
              const label = t === "all" ? "All" : visaTypeLabels[t as VisaType].label;
              const count = t === "all" ? typeCounts.all : typeCounts[t];
              const colorMap: Record<string, string> = {
                all: "bg-primary/10 text-primary border-primary/20 hover:bg-primary/15",
                "visa-free": "bg-green-50 text-green-700 border-green-200 hover:bg-green-100",
                evisa: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
                eta: "bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100",
                "visa-required": "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100",
              };
              return (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-1.5 text-xs font-medium transition-all ${
                    active
                      ? colorMap[t].replace("hover:", "") + " shadow-sm"
                      : "border-border/60 text-muted-foreground hover:text-foreground hover:border-border"
                  }`}
                >
                  {t === "visa-free" && <CheckCircle2 className="h-3 w-3" />}
                  {t === "evisa" && <FileText className="h-3 w-3" />}
                  {t === "eta" && <Globe className="h-3 w-3" />}
                  {t === "visa-required" && <FileText className="h-3 w-3" />}
                  {label}
                  <span className="ml-0.5 rounded-full bg-white/60 px-1.5 py-0 text-[10px] font-medium opacity-70">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Region pills */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {regions.map((r) => (
              <button
                key={r}
                onClick={() => setRegionFilter(r)}
                className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-[10px] font-medium transition-all ${
                  regionFilter === r
                    ? "bg-primary/10 text-primary border-primary/20 shadow-sm"
                    : "border-border/50 text-muted-foreground hover:text-foreground hover:border-border"
                }`}
              >
                <MapPin className="h-2.5 w-2.5" />
                {r}
                {r !== "All" && (
                  <span className="opacity-60">({typeCounts[`region-${r}`] || 0})</span>
                )}
              </button>
            ))}
          </div>

          {/* Results count */}
          <p className="mt-4 text-xs text-muted-foreground">
            Showing <span className="font-medium text-foreground">{filtered.length}</span> of{" "}
            <span className="font-medium text-foreground">{visaCountries.length}</span> countries
          </p>
        </div>
      </section>

      {/* Results */}
      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Search className="mb-3 h-8 w-8 text-muted-foreground" />
              <p className="text-sm font-medium text-foreground">No countries match your search</p>
              <p className="text-xs text-muted-foreground mt-1">
                Try a different keyword or clear your filters
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => {
                  setSearch("");
                  setRegionFilter("All");
                  setTypeFilter("all");
                }}
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="grid gap-3">
              {filtered.map((country) => {
                const isExpanded = expanded.has(country.slug);
                const badge = visaTypeLabels[country.type];
                return (
                  <div
                    key={country.slug}
                    className={`rounded-xl border bg-white shadow-sm transition-all hover:shadow-md ${
                      isExpanded ? "border-primary/20 shadow-md" : "border-border"
                    }`}
                  >
                    {/* Card header */}
                    <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Country icon */}
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-primary">
                          <Globe className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-foreground">{country.name}</h3>
                            <span
                              className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${badge.badge}`}
                            >
                              {badge.label}
                            </span>
                          </div>
                          <p className="mt-0.5 text-xs text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {country.region}
                            <span className="text-border">·</span>
                            {country.visaCategory}
                          </p>
                        </div>
                      </div>

                      {/* Quick info */}
                      <div className="flex items-center gap-4 flex-wrap">
                        <div className="text-right">
                          <p className="text-[10px] text-muted-foreground">Max stay</p>
                          <p className="text-sm font-semibold text-foreground">{country.maxStay}</p>
                        </div>
                        {country.processingTime !== "—" && (
                          <div className="text-right">
                            <p className="text-[10px] text-muted-foreground">Processing</p>
                            <p className="text-sm font-semibold text-foreground">
                              {country.processingTime}
                            </p>
                          </div>
                        )}
                        <button
                          onClick={() => toggleExpand(country.slug)}
                          className="inline-flex items-center gap-1 rounded-lg border border-border/60 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:bg-muted hover:text-foreground active:scale-95"
                        >
                          {isExpanded ? "Less" : "Details"}
                          {isExpanded ? (
                            <ChevronUp className="h-3 w-3" />
                          ) : (
                            <ChevronDown className="h-3 w-3" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Expanded details */}
                    {isExpanded && (
                      <div className="border-t border-border px-4 pb-5 pt-4 sm:px-5">
                        {/* Summary row */}
                        <div className="mb-4 grid gap-3 sm:grid-cols-3">
                          <div className="rounded-lg bg-muted/50 p-3">
                            <p className="text-[10px] font-medium text-muted-foreground flex items-center gap-1">
                              <DollarSign className="h-3 w-3" />
                              Visa Fee
                            </p>
                            <p className="mt-0.5 text-sm font-semibold text-foreground">
                              {country.visaFee}
                            </p>
                          </div>
                          {country.serviceFee !== "—" && (
                            <div className="rounded-lg bg-muted/50 p-3">
                              <p className="text-[10px] font-medium text-muted-foreground flex items-center gap-1">
                                <Sparkles className="h-3 w-3" />
                                Service Fee
                              </p>
                              <p className="mt-0.5 text-sm font-semibold text-foreground">
                                {country.serviceFee}
                              </p>
                            </div>
                          )}
                          <div className="rounded-lg bg-muted/50 p-3">
                            <p className="text-[10px] font-medium text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Processing
                            </p>
                            <p className="mt-0.5 text-sm font-semibold text-foreground">
                              {country.processingTime}
                            </p>
                          </div>
                        </div>

                        {/* Requirements */}
                        <div>
                          <p className="text-xs font-semibold text-foreground flex items-center gap-1.5 mb-2">
                            <FileCheck className="h-3.5 w-3.5 text-accent" />
                            Required Documents
                          </p>
                          <ul className="space-y-1.5">
                            {country.requirements.map((req, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                                <div className="mt-1 h-1 w-1 shrink-0 rounded-full bg-accent/40" />
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Notes */}
                        {country.notes && (
                          <div className="mt-3 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-xs text-blue-700">
                            <p className="font-medium">Note:</p>
                            <p className="mt-0.5">{country.notes}</p>
                          </div>
                        )}

                        {/* CTA */}
                        <div className="mt-4 flex items-center gap-3">
                          <Button
                            size="sm"
                            className="bg-[#ff8912] text-white hover:bg-[#e67a00] shadow-sm active:scale-[0.97] transition-all cursor-pointer text-xs"
                            onClick={() => setShowContact(true)}
                          >
                            <FileCheck className="mr-1 h-3.5 w-3.5" />
                            Apply for This Visa
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Bottom CTA on longer pages */}
          {filtered.length > 10 && (
            <div className="mt-10 rounded-xl border border-accent/20 bg-accent/[0.02] p-6 text-center sm:p-8">
              <ShieldCheck className="mx-auto h-8 w-8 text-accent" />
              <h3 className="mt-3 text-lg font-bold">Not sure which visa you need?</h3>
              <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
                Tell us your destination, travel purpose, and dates. We&apos;ll tell you exactly what&apos;s required.
              </p>
              <div className="mt-4 flex items-center justify-center gap-3 flex-wrap">
                <Link href="/contact">
                  <Button className="bg-[#ff8912] text-white hover:bg-[#e67a00] shadow-lg shadow-[#ff8912]/25 active:scale-[0.97] transition-all cursor-pointer">
                    Get Visa Help
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact Modal / Inline (simplified) */}
      {showContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="max-w-lg rounded-2xl border border-border bg-white p-6 shadow-2xl w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                <FileCheck className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Start Your Visa Application</h3>
                <p className="text-xs text-muted-foreground">
                  We&apos;ll get back to you within 24 hours
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="rounded-lg border border-border bg-muted/30 p-3 text-xs text-muted-foreground">
                <p className="font-medium text-foreground">How to proceed:</p>
                <ol className="mt-2 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-accent/10 text-center text-[9px] font-bold text-accent leading-4">1</span>
                    <span>Contact us via the form below or on WhatsApp</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-accent/10 text-center text-[9px] font-bold text-accent leading-4">2</span>
                    <span>Tell us your destination, passport details, and travel dates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-accent/10 text-center text-[9px] font-bold text-accent leading-4">3</span>
                    <span>We&apos;ll send a full checklist and quote within 24 hours</span>
                  </li>
                </ol>
              </div>

              <div className="flex flex-col gap-2">
                <Link href="/contact">
                  <Button className="w-full bg-[#ff8912] text-white hover:bg-[#e67a00] shadow-lg shadow-[#ff8912]/25 active:scale-[0.97] transition-all cursor-pointer">
                    <FileText className="mr-2 h-4 w-4" />
                    Contact Us
                  </Button>
                </Link>
                <Link href="https://wa.me/263786577594" target="_blank">
                  <Button variant="outline" className="w-full border-green-300 text-green-700 hover:bg-green-50 cursor-pointer">
                    <svg viewBox="0 0 24 24" className="mr-2 h-4 w-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp Us
                  </Button>
                </Link>
              </div>
            </div>

            <button
              onClick={() => setShowContact(false)}
              className="mt-4 w-full text-center text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
