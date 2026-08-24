import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { cars } from "@/lib/car-data";
import { Button } from "@/components/ui/button";
import {
  CarFront,
  ArrowRight,
  CheckCircle2,
  Gauge,
  Calendar,
  Users,
  Settings2,
} from "lucide-react";

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
  "Unlimited mileage on most vehicles",
  "Cross-border travel available (conditions apply)",
];

export default function CarRentalsPage() {
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
              <Link href="/contact">
                <Button size="xl" variant="glass">
                  Book a Car
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet */}
      <section id="fleet" className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10">
              <CarFront className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Our Hire Fleet</h2>
              <p className="text-sm text-muted-foreground">
                {cars.length} vehicles available — prices are per day and include
                comprehensive insurance.
              </p>
            </div>
            <div className="hidden h-px flex-1 bg-gradient-to-r from-border to-transparent sm:block" />
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-3 xl:gap-x-8">
            {cars.map((car) => (
              <div key={car.id} className="group relative">
                {/* Image */}
                <div className="relative aspect-4/3 w-full">
                  <Image
                    alt={`${car.brand} ${car.model}`}
                    src={car.image}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="rounded-2xl bg-muted object-cover transition-opacity duration-300 group-hover:opacity-90"
                  />
                  {/* Category badge */}
                  <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-[#002a62]/85 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                    <CarFront className="h-3 w-3" />
                    {car.category}
                  </div>
                  {/* Popular badge */}
                  {car.popular && (
                    <div className="absolute left-3 top-12 inline-flex items-center gap-1 rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-[#002a62] shadow-md">
                      Popular
                    </div>
                  )}
                  {/* Price badge */}
                  <div className="absolute right-3 top-3 rounded-full bg-[#ff8912] px-3 py-1 text-xs font-bold text-white shadow-md">
                    US${car.pricePerDay}
                    <span className="font-normal">/day</span>
                  </div>
                  {/* Hover overlay */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 flex items-end rounded-2xl p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  >
                    <div className="w-full rounded-xl bg-[#002a62]/85 px-4 py-2.5 text-center text-sm font-semibold text-white backdrop-blur-sm">
                      Enquire about this car
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="mt-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="text-base font-bold text-foreground">
                        <Link href="/contact">
                          <span aria-hidden="true" className="absolute inset-0" />
                          {car.brand} {car.model}
                        </Link>
                      </h3>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {car.fuel} · {car.transmission}
                      </p>
                    </div>
                    <p className="shrink-0 text-sm font-bold text-accent">
                      US${car.pricePerDay}
                      <span className="text-xs font-normal text-muted-foreground">/day</span>
                    </p>
                  </div>

                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {car.description}
                  </p>

                  {/* Specs */}
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Gauge className="h-3.5 w-3.5 text-accent" />
                      {car.mileage.toLocaleString()} km
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-accent" />
                      {car.year}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <span
                        className="h-3 w-3 rounded-full border border-border"
                        style={{ backgroundColor: car.colorHex }}
                      />
                      {car.color}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-accent" />
                      {car.seats} seats
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Settings2 className="h-3.5 w-3.5 text-accent" />
                      {car.transmission}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
          <Link href="/contact">
            <Button size="xl" variant="accent" className="mt-6">
              Request a Vehicle
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
