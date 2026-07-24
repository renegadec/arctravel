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
  BadgeCheck,
} from "lucide-react";
import VisaPageClient from "./VisaPageClient";

export const metadata: Metadata = {
  title: "Visa Directory — ArcTravel",
  description:
    "Search our complete visa directory for Zimbabwean passport holders. Find visa requirements, fees, processing times, and required documents for over 90 countries.",
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
      {/* Visa Directory — searchable list */}
      <VisaPageClient />

      {/* Services */}
      <section className="border-t border-border bg-muted/30 py-16">
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
      <section className="py-16">
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
      <section className="border-t border-border bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-accent/20 bg-accent/[0.02] p-8 text-center sm:p-12">
            <BadgeCheck className="mx-auto h-10 w-10 text-accent" />
            <h2 className="mt-4 text-2xl font-bold">
              Ready to Start Your Visa Application?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              Tell us your destination, passport details, and travel dates. We&apos;ll send a full checklist and quote within 24 hours.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3 flex-wrap">
              <Link href="/contact">
                <Button size="lg" className="bg-[#ff8912] text-white hover:bg-[#e67a00] shadow-lg shadow-[#ff8912]/25 active:scale-[0.97] transition-all cursor-pointer">
                  Start Your Visa Application
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
