import Link from "next/link";
import { services } from "@/lib/constants";
import { Card, CardHeader, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { ArrowRight, Sparkles } from "lucide-react";

export default function ServicesOverview() {
  const featured = services.slice(0, 6);

  return (
    <section className="relative py-20">
      {/* Subtle background accent */}
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
              From booking flights to arranging visas — we cover every detail so
              you travel with confidence.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((service, i) => (
            <Reveal key={service.href} delay={i * 80}>
              <Link href={service.href} className="group block">
                <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                      <service.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold leading-tight transition-colors group-hover:text-accent">
                      {service.title}
                    </h3>
                    <CardDescription className="mt-1.5 text-sm leading-relaxed">
                      {service.description}
                    </CardDescription>
                    <span className="mt-2 inline-flex items-center text-xs font-medium text-accent opacity-0 transition-all group-hover:opacity-100">
                      Learn more <ArrowRight className="ml-1 h-3 w-3" />
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
              <Button variant="outline" className="group">
                View All Services
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
