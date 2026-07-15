import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  CarFront,
  Fuel,
  ShieldCheck,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Car Rentals — ArcTravel",
  description:
    "Self-drive or chauffeur-driven car rentals in Zimbabwe. Sedans, SUVs, 4x4s, and minibuses for any itinerary.",
};

const vehicles = [
  { type: "Economy Sedan", passengers: 4, luggage: "2 bags", suitable: "City driving, short trips" },
  { type: "SUV", passengers: 5, luggage: "4 bags", suitable: "Family travel, highway" },
  { type: "4x4", passengers: 5, luggage: "3 bags", suitable: "Off-road, game parks, rough terrain" },
  { type: "Minibus", passengers: 8-12, luggage: "Varies", suitable: "Group travel, airport transfers" },
  { type: "Chauffeur-driven", passengers: "Up to 4", luggage: "Full", suitable: "Executive travel, airport pickup" },
];

const features = [
  "Free airport pickup with bookings of 3+ days",
  "GPS navigation included",
  "24/7 roadside assistance",
  "Delivery and collection anywhere in Harare",
  "Child seats available on request",
  "Comprehensive insurance included",
  "Unlimited mileage on most vehicles",
  "Cross-border travel available (conditions apply)",
];

export default function CarRentalsPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-br from-primary to-primary/90 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15">
              <CarFront className="h-6 w-6 text-accent" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Car Rentals
            </h1>
            <p className="mt-4 text-lg text-white/75">
              Reliable self-drive or chauffeur-driven vehicles for your trip.
              Flexible options for any itinerary.
            </p>
            <Link href="/contact" className="mt-8 inline-block">
              <Button size="lg" className="bg-[#ff8912] text-white hover:bg-[#e67a00] cursor-pointer">
                Book a Car
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Vehicles */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center">Our Fleet</h2>
          <p className="mt-2 text-center text-muted-foreground">
            Choose from a range of well-maintained vehicles
          </p>
          <div className="mt-8 overflow-hidden rounded-xl border border-border">
            <div className="grid grid-cols-2 gap-px bg-border sm:grid-cols-4 lg:grid-cols-5">
              {/* Header row - only visible on sm+ */}
              {["Vehicle Type", "Passengers", "Luggage", "Best For", ""].map((h) => (
                <div
                  key={h}
                  className="hidden bg-muted px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:block"
                >
                  {h}
                </div>
              ))}
              {vehicles.map((v) => (
                <>
                  <div className="bg-card px-4 py-3 font-medium">{v.type}</div>
                  <div className="bg-card px-4 py-3 text-sm text-muted-foreground">
                    Up to {v.passengers}
                  </div>
                  <div className="hidden bg-card px-4 py-3 text-sm text-muted-foreground sm:block">
                    {v.luggage}
                  </div>
                  <div className="hidden bg-card px-4 py-3 text-sm text-muted-foreground lg:block">
                    {v.suitable}
                  </div>
                  <div className="bg-card px-4 py-3">
                    <Link
                      href="/contact"
                      className="text-sm font-medium text-accent hover:underline"
                    >
                      Inquire →
                    </Link>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted/50 py-16">
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
          <Link href="/contact">
            <Button size="lg" className="bg-[#ff8912] text-white hover:bg-[#e67a00] cursor-pointer mt-6">
              Request a Vehicle
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
