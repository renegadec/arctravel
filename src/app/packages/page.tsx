import Link from "next/link";
import type { Metadata } from "next";
import { packages } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  Package,
  Clock,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Star,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Travel Packages — ArcTravel",
  description:
    "Curated travel packages across Zimbabwe, Southern Africa, and beyond. All-inclusive weekends, safaris, and holidays at great prices.",
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
            <div className="grid gap-6 lg:grid-cols-2">
              {popular.map((pkg) => (
                <Link key={pkg.href} href={pkg.href} className="group block">
                  <div className="relative overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-lg">
                    {/* Popular badge */}
                    <div className="absolute right-3 top-3 rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-600 backdrop-blur">
                      ⭐ Popular
                    </div>

                    <div className="flex h-44 items-center justify-center bg-gradient-to-br from-accent/15 to-primary/15">
                      <Package className="h-14 w-14 text-accent/30" />
                    </div>

                    <div className="p-6">
                      <h3 className="text-lg font-bold group-hover:text-accent transition-colors">
                        {pkg.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">
                        {pkg.description}
                      </p>

                      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {pkg.duration}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {pkg.location}
                        </span>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-lg font-bold text-accent">
                          {pkg.price}
                        </span>
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-accent">
                          View details
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
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
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {standard.map((pkg) => (
                <Link key={pkg.href} href={pkg.href} className="group block">
                  <div className="overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-md">
                    <div className="flex h-36 items-center justify-center bg-gradient-to-br from-accent/10 to-primary/10">
                      <Package className="h-10 w-10 text-accent/25" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold group-hover:text-accent transition-colors">
                        {pkg.title}
                      </h3>
                      <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2">
                        {pkg.description}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {pkg.duration}
                          </span>
                        </div>
                        <span className="font-semibold text-accent text-sm">
                          {pkg.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Custom CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto max-w-lg">
            <h2 className="text-2xl font-bold">
              Don&apos;t See What You&apos;re Looking For?
            </h2>
            <p className="mt-2 text-muted-foreground">
              We build custom packages for any destination, budget, and group size.
              Tell us what you want and we&apos;ll create it.
            </p>
            <Link href="/book">
              <Button size="lg" className="mt-6 bg-[#ff8912] text-white hover:bg-[#e67a00] shadow-lg shadow-[#ff8912]/25 active:scale-[0.97] transition-all cursor-pointer">
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
