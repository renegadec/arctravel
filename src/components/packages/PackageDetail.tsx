import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Package } from "@/lib/constants";
import type { PackageContent } from "@/lib/package-content";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  Clock,
  MapPin,
  Sparkles,
  Ticket,
  Users,
} from "lucide-react";

export default function PackageDetail({
  pkg,
  content,
}: {
  pkg: Package;
  content: PackageContent;
}) {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={content.heroImage}
            alt={pkg.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#001b42]/90 via-[#002a62]/75 to-[#002a62]/95" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 sm:pb-24 sm:pt-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            {pkg.popular && (
              <div className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-[#ff8912]/40 bg-[#ff8912]/15 px-4 py-1.5 text-xs font-semibold text-[#ffb25e] backdrop-blur">
                <Sparkles className="h-3 w-3" />
                Popular Package
              </div>
            )}
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {pkg.title}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              {pkg.description}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-white/75">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-[#ff8912]" />
                {pkg.duration}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-[#ff8912]" />
                {pkg.location}
              </span>
              <span className="inline-flex items-center gap-1.5 font-bold text-[#ffb25e]">
                {pkg.price} per person
              </span>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href={content.bookUrl}>
                <Button
                  size="xl"
                  className="bg-[#ff8912] text-white shadow-lg shadow-[#ff8912]/30 hover:bg-[#e67a00] active:scale-[0.97]"
                >
                  Book This Package
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/packages">
                <Button
                  size="xl"
                  variant="outline"
                  className="border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20 hover:text-white"
                >
                  View All Packages
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
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#002a62]/5 text-[#002a62]">
                <CalendarDays className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Duration
                </p>
                <p className="mt-1 text-sm font-medium leading-snug text-foreground">
                  {pkg.duration}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#002a62]/5 text-[#002a62]">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Location
                </p>
                <p className="mt-1 text-sm font-medium leading-snug text-foreground">
                  {pkg.location}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#002a62]/5 text-[#002a62]">
                <Ticket className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Price
                </p>
                <p className="mt-1 text-sm font-medium leading-snug text-foreground">
                  {pkg.price} per person
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#002a62]/5 text-[#002a62]">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Group Size
                </p>
                <p className="mt-1 text-sm font-medium leading-snug text-foreground">
                  From 2 people — private & customisable
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HIGHLIGHTS ================= */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#ff8912]">
              Highlights
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Trip Highlights
            </h2>
          </div>
          <div className="mx-auto mt-10 grid max-w-4xl gap-4">
            {pkg.highlights.map((h, i) => (
              <div
                key={h}
                className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#ff8912]/30 hover:shadow-lg hover:shadow-[#002a62]/5"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#ff8912]/10 text-sm font-bold text-[#e67a00]">
                  {i + 1}
                </div>
                <span className="pt-1.5 text-sm font-medium leading-relaxed text-foreground">
                  {h}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ITINERARY ================= */}
      <section className="bg-muted/40 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#ff8912]">
                Itinerary
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Day by Day
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                A suggested flow — every package is fully customisable. Tell us
                your pace, interests, and must-dos and we&apos;ll adjust it.
              </p>
              <Link href={content.bookUrl} className="mt-8 inline-block">
                <Button
                  size="xl"
                  className="bg-[#002a62] text-white shadow-lg shadow-[#002a62]/20 hover:bg-[#001b42] active:scale-[0.97]"
                >
                  Customise This Trip
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="lg:col-span-8">
              <ol className="relative space-y-6 border-l-2 border-[#ff8912]/30 pl-8">
                {content.itinerary.map((d) => (
                  <li key={d.day} className="relative">
                    <span className="absolute -left-[41px] flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#ff8912] bg-white">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#ff8912]" />
                    </span>
                    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                      <p className="text-xs font-bold uppercase tracking-widest text-[#ff8912]">
                        {d.day}
                      </p>
                      <h3 className="mt-1.5 text-lg font-semibold text-foreground">
                        {d.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {d.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHAT'S INCLUDED + GALLERY ================= */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#ff8912]">
                Included
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                What&apos;s Included
              </h2>
              <ul className="mt-8 space-y-3">
                {pkg.included.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#ff8912]" />
                    <span className="text-sm font-medium text-foreground">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex items-start gap-3 rounded-2xl border border-[#ff8912]/20 bg-[#ff8912]/5 p-5">
                <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#e67a00]" />
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Flights, extra nights, and optional activities can be added —
                  ask us for a full quote.
                </p>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="grid gap-4 sm:grid-cols-2">
                {content.gallery.map((img, i) => (
                  <div
                    key={i}
                    className={`group relative overflow-hidden rounded-2xl ${
                      i === 0 ? "sm:col-span-2" : ""
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${pkg.title} gallery ${i + 1}`}
                      className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                        i === 0 ? "aspect-[16/9]" : "aspect-[4/3]"
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= RELATED DESTINATION ================= */}
      {content.relatedDestination && (
        <section className="pb-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link
              href={content.relatedDestination}
              className="group relative block overflow-hidden rounded-3xl"
            >
              <img
                src={content.heroImage}
                alt="Explore the destination"
                className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-80"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#001b42]/95 via-[#002a62]/80 to-transparent" />
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-lg p-8 sm:p-12">
                  <p className="text-sm font-semibold uppercase tracking-widest text-[#ffb25e]">
                    Explore the Destination
                  </p>
                  <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Discover {pkg.location.split(",")[0]}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/75">
                    More things to do, travel tips, and experiences — see the
                    full destination guide.
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#ffb25e] group-hover:gap-2.5 transition-all">
                    View destination guide
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
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
                Ready to Book {pkg.title}?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/75">
                Fill in a quick booking request and we&apos;ll confirm
                availability and details within 24 hours.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link href={content.bookUrl}>
                  <Button
                    size="xl"
                    className="bg-[#ff8912] text-white shadow-lg shadow-[#ff8912]/30 hover:bg-[#e67a00] active:scale-[0.97]"
                  >
                    Book Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/packages">
                  <Button
                    size="xl"
                    variant="outline"
                    className="border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20 hover:text-white"
                  >
                    View All Packages
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
