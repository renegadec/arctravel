import Link from "next/link";
import type { Metadata } from "next";
import { services } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Send } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Services — ArcTravel",
  description:
    "Full-service travel agency offering flights, hotels, tours, visas, airport transfers, car rentals, corporate travel, cruises, and more.",
};

const categories = [
  {
    label: "Travel & Transport",
    description:
      "Getting you there — and around — with flights, transfers, and transport for every kind of trip.",
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
    description:
      "The moments that make a trip — tours, packages, events, and cruises, planned to the detail.",
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
    description:
      "The paperwork and protection that keep your trip on track — visas and insurance done right.",
    keys: ["travel-insurance", "visa-assistance"],
  },
];

export default function ServicesPage() {
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

      {/* Services by category */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {categories.map((category, ci) => (
              <div key={category.label}>
                {/* Category header */}
                <div
                  className={`flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end ${
                    ci > 0 ? "border-t border-slate-100 pt-16" : ""
                  }`}
                >
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-widest text-[#ff8912]">
                      {String(ci + 1).padStart(2, "0")}
                    </p>
                    <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-[#002a62] sm:text-3xl">
                      {category.label}
                    </h2>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-500">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Cards */}
                <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {category.keys.map((key) => {
                    const service = services.find(
                      (s) => s.href === `/services/${key}`
                    );
                    if (!service) return null;
                    return (
                      <Link
                        key={service.href}
                        href={service.href}
                        className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#ff8912]/30 hover:shadow-xl hover:shadow-[#002a62]/10"
                      >
                        {/* Hover accent bar */}
                        <div className="absolute inset-x-0 top-0 h-1 bg-[#ff8912] opacity-0 transition-opacity group-hover:opacity-100" />
                        <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-[#002a62] text-white shadow-md shadow-[#002a62]/20 transition-all duration-300 group-hover:bg-[#ff8912] group-hover:shadow-[#ff8912]/30">
                          <service.icon className="size-5" />
                        </div>
                        <h3 className="text-lg font-semibold text-[#002a62] transition-colors group-hover:text-[#ff8912]">
                          {service.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600">
                          {service.description}
                        </p>
                        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#ff8912]">
                          Learn more
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-16 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#001b42] via-[#002a62] to-[#0a2440] px-8 py-14 text-center sm:px-16 sm:py-16">
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#ff8912]/15 blur-3xl" />
            <div className="relative">
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Not sure what you need?
              </h2>
              <p className="mx-auto mt-3 max-w-md text-white/70">
                Tell us where you&apos;re going and we&apos;ll recommend the
                best options for your trip.
              </p>
              <Link href="/contact" className="mt-8 inline-block">
                <Button
                  size="xl"
                  variant="accent"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Get a Free Quote
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
