import Link from "next/link";
import { services } from "@/lib/constants";
import { Card, CardHeader, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { ArrowRight, Sparkles, Search, ClipboardCheck, Plane } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Tell us your plans",
    text: "Share your destination, dates, and preferences — we'll take it from there.",
  },
  {
    icon: ClipboardCheck,
    title: "We design your itinerary",
    text: "Our team curates the best flights, stays, and experiences for your trip.",
  },
  {
    icon: Plane,
    title: "You travel with confidence",
    text: "We handle bookings, documents, and support so you can focus on the journey.",
  },
];

export default function ServicesOverview() {
  const featured = services.slice(0, 6);

  return (
    <>
      {/* Services Grid */}
      <section className="relative py-20">
        <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 bg-accent/[0.02] blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                <Sparkles className="h-5 w-5" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Everything You Need for
                <br />
                <span className="text-accent">Seamless Travel</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                From booking flights to arranging visas — we cover every detail
                so you travel with confidence.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((service, i) => (
              <Reveal key={service.href} delay={i * 80}>
                <Link href={service.href} className="group block">
                  <Card className="relative h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg">
                    {/* Hover accent bar */}
                    <div className="absolute inset-x-0 top-0 h-0.5 bg-accent opacity-0 transition-opacity group-hover:opacity-100" />
                    <CardHeader>
                      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-accent-foreground">
                        <service.icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-semibold leading-tight transition-colors group-hover:text-accent">
                        {service.title}
                      </h3>
                      <CardDescription className="mt-1.5 text-sm leading-relaxed">
                        {service.description}
                      </CardDescription>
                      <span className="mt-2 inline-flex items-center text-xs font-medium text-accent opacity-0 transition-all group-hover:opacity-100">
                        Learn more{" "}
                        <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </CardHeader>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="mt-10 text-center">
              <Link href="/services">
                <Button variant="outline" className="group active:scale-[0.97] transition-all cursor-pointer">
                  View All Services
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t border-border bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                How It <span className="text-accent">Works</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                Three simple steps to your next trip.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 100}>
                <div className="relative text-center">
                  {/* Connector line */}
                  {i < steps.length - 1 && (
                    <div className="absolute left-[calc(50%+2rem)] top-8 hidden h-0.5 w-[calc(100%-4rem)] bg-gradient-to-r from-accent/30 to-accent/10 md:block" />
                  )}
                  {/* Step number */}
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <step.icon className="h-7 w-7" />
                  </div>
                  <div className="mt-4 inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                    {i + 1}
                  </div>
                  <h3 className="mt-3 font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
