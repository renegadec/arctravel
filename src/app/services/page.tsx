import Link from "next/link";
import type { Metadata } from "next";
import { services } from "@/lib/constants";
import { Card, CardHeader, CardDescription } from "@/components/ui/card";
import { ArrowRight, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Services — ArcTravel",
  description:
    "Full-service travel agency offering flights, hotels, tours, visas, airport transfers, car rentals, corporate travel, cruises, and more.",
};

const categories = [
  {
    label: "Travel & Transport",
    keys: [
      "flight-booking",
      "accommodation",
      "car-rentals",
      "ground-transportation",
      "private-charter",
      "airport-transfers",
    ],
  },
  {
    label: "Experiences & Support",
    keys: [
      "guided-tours",
      "day-trips",
      "group-tours",
      "corporate-events",
      "cruise-booking",
    ],
  },
  {
    label: "Logistics & Planning",
    keys: ["travel-insurance", "visa-assistance"],
  },
];

export default function ServicesPage() {
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
              End-to-end travel services
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Our Services
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-lg text-white/70">
              Everything you need for a seamless travel experience — all under
              one roof.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group block"
              >
                <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                      <service.icon className="h-5 w-5" />
                    </div>
                    <h2 className="font-semibold leading-tight transition-colors group-hover:text-accent">
                      {service.title}
                    </h2>
                    <CardDescription className="mt-1.5 text-sm leading-relaxed">
                      {service.description}
                    </CardDescription>
                    <span className="mt-3 inline-flex items-center text-sm font-medium text-accent opacity-0 transition-all group-hover:opacity-100">
                      Learn more{" "}
                      <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">
            Not sure what you need?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-muted-foreground">
            Tell us where you&apos;re going and we&apos;ll recommend the best
            options for your trip.
          </p>
          <Link href="/contact">
            <span className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#ff8912] px-6 py-3 text-sm font-medium text-white shadow-lg shadow-[#ff8912]/25 hover:bg-[#e67a00] active:scale-[0.97] transition-all">
              Get a Free Quote
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
