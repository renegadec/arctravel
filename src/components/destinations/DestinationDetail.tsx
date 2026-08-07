import Link from "next/link";
import { Button } from "@/components/ui/button";
import { packages } from "@/lib/constants";
import type { DestinationContent } from "@/lib/destination-content";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock,
  MapPin,
  Plane,
  Sparkles,
  Users,
} from "lucide-react";

const factIcons = [CalendarDays, Users, Clock, Plane];

export default function DestinationDetail({ data }: { data: DestinationContent }) {
  const related = packages.filter((p) => data.relatedPackages.includes(p.href));

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={data.heroImage}
            alt={data.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#001b42]/90 via-[#002a62]/75 to-[#002a62]/95" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 sm:pb-24 sm:pt-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white/90 backdrop-blur">
              <MapPin className="h-3 w-3" />
              {data.location}
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {data.name}
            </h1>
            <p className="mt-4 text-lg font-medium text-[#ffb25e] sm:text-xl">
              {data.tagline}
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              {data.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href={data.bookUrl}>
                <Button
                  size="xl"
                  variant="accent"
                >
                  Plan Your Visit
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/packages">
                <Button
                  size="xl"
                  variant="glass"
                >
                  Browse Packages
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= QUICK FACTS ================= */}
      <section className="relative z-10 -mt-10 pb-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 rounded-2xl border border-border bg-white p-6 shadow-xl shadow-[#002a62]/10 sm:grid-cols-2 lg:grid-cols-4">
            {data.facts.map((fact, i) => {
              const Icon = factIcons[i % factIcons.length];
              return (
                <div key={fact.label} className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#002a62]/5 text-[#002a62]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {fact.label}
                    </p>
                    <p className="mt-1 text-sm font-medium leading-snug text-foreground">
                      {fact.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= HIGHLIGHTS ================= */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#ff8912]">
              Experiences
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              What to Do in {data.name}
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {data.highlights.map((h) => (
              <div
                key={h.title}
                className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-[#002a62]/10"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={h.image}
                    alt={h.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001b42]/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground">{h.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {h.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= GALLERY ================= */}
      <section className="bg-muted/40 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-[#ff8912]">
                Gallery
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                A Glimpse of {data.name}
              </h2>
            </div>
            <Link
              href={data.bookUrl}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#002a62] hover:text-[#ff8912] transition-colors"
            >
              Plan your trip
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {data.gallery.map((img, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-2xl ${
                  i === 0 ? "sm:col-span-2 sm:row-span-2" : ""
                }`}
              >
                <img
                  src={img}
                  alt={`${data.name} gallery ${i + 1}`}
                  className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                    i === 0 ? "aspect-[4/3] sm:aspect-auto sm:h-full" : "aspect-[4/3]"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TRAVEL TIPS ================= */}
      <section className="relative overflow-hidden bg-[#002a62] py-16 sm:py-20">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#ff8912]/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#ffb25e]">
                Travel Tips
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Plan Smart, Travel Better
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/70">
                A few things worth knowing before you go — from the best seasons
                to the details that make the trip smoother.
              </p>
              <Link href={data.bookUrl} className="mt-8 inline-block">
                <Button
                  size="xl"
                  variant="accent"
                >
                  Get a Custom Itinerary
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <ul className="space-y-4 lg:col-span-7">
              {data.tips.map((tip) => (
                <li
                  key={tip}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#ff8912]" />
                  <span className="text-sm leading-relaxed text-white/85">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ================= RELATED PACKAGES ================= */}
      {related.length > 0 && (
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-[#ff8912]">
                  Packages
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Ready-Made {data.name} Trips
                </h2>
              </div>
              <Link
                href="/packages"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#002a62] hover:text-[#ff8912] transition-colors"
              >
                View all packages
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {related.map((pkg) => (
                <Link
                  key={pkg.href}
                  href={pkg.href}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-[#002a62]/10"
                >
                  {pkg.popular && (
                    <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-[#ff8912]/10 px-3 py-1 text-xs font-semibold text-[#e67a00]">
                      <Sparkles className="h-3 w-3" />
                      Popular
                    </span>
                  )}
                  <h3 className="pr-20 text-xl font-bold text-foreground">{pkg.title}</h3>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-[#ff8912]" />
                      {pkg.duration}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-[#ff8912]" />
                      {pkg.location}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {pkg.description}
                  </p>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-lg font-bold text-[#002a62]">{pkg.price}</span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#002a62] group-hover:text-[#ff8912] transition-colors">
                      View package
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= CTA ================= */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-[#002a62] px-8 py-14 text-center sm:px-16">
            <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#ff8912]/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#ff8912]/10 blur-3xl" />
            <div className="relative">
              <Sparkles className="mx-auto h-10 w-10 text-[#ff8912]" />
              <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {data.ctaTitle}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/75">
                {data.ctaText}
              </p>
              <Link href={data.bookUrl} className="mt-8 inline-block">
                <Button
                  size="xl"
                  variant="accent"
                >
                  {data.ctaButton}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
