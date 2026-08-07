import Link from "next/link";
import type { Metadata } from "next";
import { destinations } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Globe,
  Mountain,
  Plane,
  MapPin,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Destinations — ArcTravel",
  description:
    "Explore Zimbabwe, Southern Africa, and beyond — Victoria Falls, Hwange, Cape Town, Zanzibar, Dubai, and more.",
};

// ============================================================
// DESTINATION CARD IMAGES
// 🔁 SWAP THESE with your own destination photos.
// Best crops: 3:4 portrait. Drop files in /public/images/
// and use e.g. image: "/images/vic-falls.jpg"
// ============================================================
const destImages: Record<string, string> = {
  "/destinations/victoria-falls":
    "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80",
  "/destinations/great-zimbabwe":
    "https://images.unsplash.com/photo-1509233725247-49e657c54213?auto=format&fit=crop&w=800&q=80",
  "/destinations/eastern-highlands":
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
  "/destinations/hwange-national-park":
    "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80",
  "/destinations/cape-town":
    "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=800&q=80",
  "/destinations/okavango-delta":
    "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80",
  "/destinations/zanzibar":
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  "/destinations/johannesburg-kruger":
    "https://images.unsplash.com/photo-1536081784351-6a2f2ba35b57?auto=format&fit=crop&w=800&q=80",
  "/destinations/dubai":
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
  "/destinations/london":
    "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80",
  "/destinations/bali":
    "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
  "/destinations/nairobi-maasai-mara":
    "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?auto=format&fit=crop&w=800&q=80",
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
              <div key={region.key} className="mb-16 last:mb-0">
                <div className="mb-8 flex items-end justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10">
                      <region.icon className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight">
                        {region.label}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {regionDests.length}{" "}
                        {regionDests.length === 1 ? "destination" : "destinations"}
                      </p>
                    </div>
                  </div>
                  <div className="hidden h-px flex-1 bg-gradient-to-r from-border to-transparent sm:block" />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                  {regionDests.map((dest) => (
                    <Link
                      key={dest.name}
                      href={dest.href}
                      className="group relative aspect-3/4 overflow-hidden rounded-2xl bg-muted"
                    >
                      {/* Background image */}
                      <img
                        alt={dest.name}
                        src={destImages[dest.href]}
                        className="absolute inset-0 size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                      {/* Gradient overlay */}
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-[#002a62]/90 via-[#002a62]/20 to-transparent transition-opacity duration-300 group-hover:from-[#002a62]/95"
                      />

                      {/* Content */}
                      <div className="absolute inset-x-0 bottom-0 p-5">
                        <div className="mb-2 inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                          <MapPin className="h-3 w-3" />
                          {dest.country}
                        </div>
                        <h3 className="text-lg font-bold text-white">
                          {dest.name}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/75">
                          {dest.description}
                        </p>
                        <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#ff8912]">
                          Explore destination
                          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
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
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
            <Sparkles className="h-3.5 w-3.5" />
            Custom itineraries
          </div>
          <h2 className="mt-4 text-2xl font-bold">
            Don&apos;t See Your Destination?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-muted-foreground">
            We arrange travel to destinations across Africa and beyond. Tell us
            where you want to go.
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              variant="accent" className="mt-6"
            >
              Ask About a Destination
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
