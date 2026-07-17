import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  FileText,
  FileCheck,
  Clock,
  Globe,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Visa Assistance — ArcTravel",
  description:
    "End-to-end visa application support including document review, appointment booking, and submission guidance.",
};

const services = [
  {
    icon: FileText,
    title: "Document Review",
    description:
      "We check your application forms and supporting documents before submission to catch errors and avoid rejections.",
  },
  {
    icon: FileCheck,
    title: "Appointment Booking",
    description:
      "We secure visa appointment slots at embassies, consulates, and visa application centres — even hard-to-get ones.",
  },
  {
    icon: Globe,
    title: "Destination Guidance",
    description:
      "Advice on visa types, requirements, processing times, and the best strategy for your travel purpose.",
  },
  {
    icon: Clock,
    title: "Urgent & Expedited",
    description:
      "Need a visa fast? We coordinate rush processing where available and prioritise your application.",
  },
];

const benefits = [
  "Experienced with Schengen, UK, US, Canada, UAE, China, and more",
  "Avoid common rejection pitfalls",
  "Clear checklist — no surprises",
  "Application tracking until passport is returned",
  "Support for business, tourist, transit, and family visit visas",
  "Transparent fees — no hidden charges",
];

export default function VisaAssistancePage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-br from-primary to-primary/90 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15">
              <FileText className="h-6 w-6 text-accent" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Visa Assistance
            </h1>
            <p className="mt-4 text-lg text-white/75">
              End-to-end visa application support including document review,
              appointment booking, and submission guidance.
            </p>
            <Link href="/contact" className="mt-8 inline-block">
              <Button size="lg" className="bg-[#ff8912] text-white hover:bg-[#e67a00] shadow-lg shadow-[#ff8912]/25 active:scale-[0.97] transition-all cursor-pointer">
                Start Your Visa Application
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center">
            How We Help
          </h2>
          <p className="mt-2 text-center text-muted-foreground">
            From document prep to passport collection
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {services.map((s) => (
              <div
                key={s.title}
                className="group rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent/30 hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-muted/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="h-5 w-5 text-accent" />
              <h2 className="text-2xl font-bold">
                Why Use Our Visa Service?
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {benefits.map((b) => (
                <div key={b} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span className="text-sm text-muted-foreground">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-accent/20 bg-accent/[0.02] p-8 text-center sm:p-12">
            <FileCheck className="mx-auto h-10 w-10 text-accent" />
            <h2 className="mt-4 text-2xl font-bold">
              Need a Visa for Your Trip?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              Tell us your destination, nationality, and travel dates.
              We&apos;ll tell you exactly what&apos;s needed.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-[#ff8912] text-white hover:bg-[#e67a00] shadow-lg shadow-[#ff8912]/25 active:scale-[0.97] transition-all cursor-pointer mt-6">
                Get Visa Help
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
