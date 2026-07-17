import Link from "next/link";
import type { Metadata } from "next";
import { destinations } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  ArrowRight,
  Sparkles,
  Globe,
  Mountain,
  Plane,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Destinations — ArcTravel",
  description:
    "Explore Zimbabwe, Southern Africa, and beyond — Victoria Falls, Hwange, Cape Town, Zanzibar, Dubai, and more.",
};

const regions = [
  { key: "domestic", label: "Zimbabwe", icon: Mountain },
  { key: "regional", label: "Southern Africa", icon: Globe },
  { key: "international", label: "International", icon: Plane },
];

export default function DestinationsPage() {
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
              <Globe className="h-3.5 w-3.5" />
              Discover extraordinary places
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Destinations
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-lg text-white/70">
              From Zimbabwe&apos;s natural wonders to Africa&apos;s iconic
              cities and global hotspots — wherever you want to go, we&apos;ll
              take you there.
            </p>
          </div>
        </div>
      </section>

      {/* Destinations by region */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {regions.map((region) => {
            const regionDests = destinations.filter(
              (d) => d.region === region.key
            );
            if (regionDests.length === 0) return null;

            return (
              <div key={region.key} className="mb-14 last:mb-0">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                    <region.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{region.label}</h2>
                    <p className="text-sm text-muted-foreground">
                      {regionDests.length}{" "}
                      {regionDests.length === 1 ? "destination" : "destinations"}
                    </p>
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {regionDests.map((dest) => (
                    <Link
                      key={dest.name}
                      href={dest.href}
                      className="group block"
                    >
                      <div className="overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-lg">
                        <div className="flex h-36 items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                          <MapPin className="h-10 w-10 text-accent/40" />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold group-hover:text-accent transition-colors">
                            {dest.name}
                          </h3>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {dest.country}
                          </p>
                          <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                            {dest.description}
                          </p>
                          <span className="mt-3 inline-flex items-center text-xs font-medium text-accent opacity-0 transition-all group-hover:opacity-100">
                            Explore{" "}
                            <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">Don&apos;t See Your Destination?</h2>
          <p className="mx-auto mt-2 max-w-md text-muted-foreground">
            We arrange travel to destinations across Africa and beyond. Tell us
            where you want to go.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-[#ff8912] text-white hover:bg-[#e67a00] shadow-lg shadow-[#ff8912]/25 active:scale-[0.97] transition-all cursor-pointer mt-6">
              Ask About a Destination
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
