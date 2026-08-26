import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { CarFront, ArrowRight, CheckCircle2 } from "lucide-react";
import FleetExplorer from "./FleetExplorer";
import { getCars } from "@/lib/stores/cars";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Car Rentals",
  description:
    "Hire a car in Zimbabwe — self-drive or chauffeur-driven. Browse our fleet of SUVs, 4x4s, sedans, hatchbacks, and minibuses with daily rates.",
};

const features = [
  "Free airport pickup with bookings of 3+ days",
  "GPS navigation included",
  "24/7 roadside assistance",
  "Delivery and collection anywhere in Harare",
  "Child seats available on request",
  "Comprehensive insurance included",
  "Daily mileage included (200–300 km)",
  "Cross-border travel available (conditions apply)",
];

export default async function CarRentalsPage() {
  const cars = await getCars();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#001b42] via-[#002a62] to-[#0a2440] py-20 sm:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#ff8912]/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white/85">
              <CarFront className="h-3.5 w-3.5 text-[#ff8912]" />
              Self-drive &amp; chauffeur-driven
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Car Rentals
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-lg text-white/70">
              Hire a reliable vehicle for your trip — from city runabouts to
              safari-ready 4x4s and group minibuses.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="#fleet">
                <Button size="xl" variant="accent">
                  Browse the Fleet
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/book?service=Car%20Rentals">
                <Button size="xl" variant="glass">
                  Book a Car
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet (interactive: category filters + per-car enquiry) */}
      <FleetExplorer cars={cars} />

      {/* Features */}
      <section className="bg-[#faf9f6] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-center">What&apos;s Included</h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {features.map((f) => (
                <div key={f} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span className="text-sm text-muted-foreground">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">
            Need a Vehicle for Your Trip?
          </h2>
          <p className="mt-2 text-muted-foreground">
            Tell us your dates and requirements — we&apos;ll find the right car.
          </p>
          <Link href="#fleet">
            <Button size="xl" variant="accent" className="mt-6">
              Browse the Fleet
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
