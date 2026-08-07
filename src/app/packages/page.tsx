import Link from "next/link";
import type { Metadata } from "next";
import { packages } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  Package,
  Clock,
  MapPin,
  ArrowRight,
  Sparkles,
  Star,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Travel Packages — ArcTravel",
  description:
    "Curated travel packages across Zimbabwe, Southern Africa, and beyond. All-inclusive weekends, safaris, and holidays at great prices.",
};

// ============================================================
// PACKAGE CARD IMAGES
// 🔁 SWAP THESE with your own destination photos.
// Best crops: 4:3 landscape. Drop files in /public/images/
// and use e.g. image: "/images/vic-falls.jpg"
// ============================================================
const packageImages: Record<string, string> = {
  "/packages/vic-falls-weekend":
    "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80",
  "/packages/hwange-safari":
    "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80",
  "/packages/eastern-highlands-getaway":
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
  "/packages/cape-town-explorer":
    "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=800&q=80",
  "/packages/zanzibar-beach":
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  "/packages/dubai-stopover":
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
};

export default function PackagesPage() {
  const popular = packages.filter((p) => p.popular);
  const standard = packages.filter((p) => !p.popular);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#002a62] via-[#002a62]/95 to-[#1a3a5c] py-20 sm:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white/85">
              <Sparkles className="h-3.5 w-3.5" />
              Curated travel experiences
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Travel Packages
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-lg text-white/70">
              Pre-designed trips that save you time and money. From weekend
              getaways to full holidays — everything included.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {popular.map((p) => (
                <Link key={p.href} href={p.href}>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs text-white/80 transition-colors hover:bg-white/20">
                    <Star className="h-3 w-3 text-yellow-400" />
                    {p.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popular packages */}
      {popular.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <h2 className="text-2xl font-bold">Popular Packages</h2>
            </div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-3 xl:gap-x-8">
              {popular.map((pkg) => (
                <div key={pkg.href} className="group relative">
                  {/* Image */}
                  <div className="relative">
                    <img
                      alt={pkg.title}
                      src={packageImages[pkg.href]}
                      className="aspect-4/3 w-full rounded-2xl bg-muted object-cover transition-opacity duration-300 group-hover:opacity-90"
                    />
                    {/* Popular badge */}
                    <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-[#002a62] shadow-md">
                      <Star className="h-3 w-3 fill-[#002a62]" />
                      Popular
                    </div>
                    {/* Hover overlay */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 flex items-end rounded-2xl p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    >
                      <div className="w-full rounded-xl bg-[#002a62]/85 px-4 py-2.5 text-center text-sm font-semibold text-white backdrop-blur-sm">
                        View package details
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="mt-4 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="text-base font-bold text-foreground">
                        <Link href={pkg.href}>
                          <span aria-hidden="true" className="absolute inset-0" />
                          {pkg.title}
                        </Link>
                      </h3>
                      <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {pkg.duration}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {pkg.location}
                        </span>
                      </div>
                    </div>
                    <p className="shrink-0 text-sm font-bold text-accent">
                      {pkg.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Standard packages */}
      {standard.length > 0 && (
        <section className="bg-muted/30 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-2xl font-bold">More Packages</h2>
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-3 xl:gap-x-8">
              {standard.map((pkg) => (
                <div key={pkg.href} className="group relative">
                  {/* Image */}
                  <div className="relative">
                    <img
                      alt={pkg.title}
                      src={packageImages[pkg.href]}
                      className="aspect-4/3 w-full rounded-2xl bg-muted object-cover transition-opacity duration-300 group-hover:opacity-90"
                    />
                    {/* Hover overlay */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 flex items-end rounded-2xl p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    >
                      <div className="w-full rounded-xl bg-[#002a62]/85 px-4 py-2.5 text-center text-sm font-semibold text-white backdrop-blur-sm">
                        View package details
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="mt-4 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="text-base font-bold text-foreground">
                        <Link href={pkg.href}>
                          <span aria-hidden="true" className="absolute inset-0" />
                          {pkg.title}
                        </Link>
                      </h3>
                      <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {pkg.duration}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {pkg.location}
                        </span>
                      </div>
                    </div>
                    <p className="shrink-0 text-sm font-bold text-accent">
                      {pkg.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Custom CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto max-w-lg">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
              <Package className="h-3.5 w-3.5" />
              Made to measure
            </div>
            <h2 className="mt-4 text-2xl font-bold">
              Don&apos;t See What You&apos;re Looking For?
            </h2>
            <p className="mt-2 text-muted-foreground">
              We build custom packages for any destination, budget, and group size.
              Tell us what you want and we&apos;ll create it.
            </p>
            <Link href="/book">
              <Button
                size="lg"
                className="mt-6 bg-[#ff8912] text-white shadow-lg shadow-[#ff8912]/25 transition-all hover:bg-[#e67a00] active:scale-[0.97] cursor-pointer"
              >
                Build a Custom Package
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
