import Link from "next/link";
import type { Metadata } from "next";
import { services } from "@/lib/constants";
import { Card, CardHeader, CardDescription } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Services — ArcTravel",
  description:
    "Full-service travel agency offering flights, hotels, tours, visas, airport transfers, car rentals, corporate travel, cruises, and more.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-border bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Our Services
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything you need for a seamless travel experience — all under
              one roof.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group block"
              >
                <Card className="h-full transition-all hover:border-accent/40 hover:shadow-md">
                  <CardHeader>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <service.icon className="h-5 w-5" />
                    </div>
                    <h2 className="font-semibold leading-tight group-hover:text-accent transition-colors">
                      {service.title}
                    </h2>
                    <CardDescription className="mt-1.5 text-sm leading-relaxed">
                      {service.description}
                    </CardDescription>
                    <span className="mt-3 inline-flex items-center text-sm font-medium text-accent opacity-0 transition-all group-hover:opacity-100">
                      Learn more <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </span>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
