import {
  Globe,
  HeadphonesIcon,
  Clock,
  ThumbsUp,
  ShieldCheck,
  Map,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const reasons = [
  {
    icon: Globe,
    title: "Local Knowledge",
    description:
      "We know Zimbabwe and Southern Africa intimately. Hidden gems, best routes, trusted partners — we've got the ground truth.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description:
      "Travel doesn't stick to office hours. Reach us anytime during your trip — we're always available.",
  },
  {
    icon: Clock,
    title: "Hassle-Free Planning",
    description:
      "We handle the research, bookings, follow-ups, and paperwork. You just show up and enjoy.",
  },
  {
    icon: ThumbsUp,
    title: "Tailored Experiences",
    description:
      "No cookie-cutter packages. Every trip is built around your preferences, budget, and schedule.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Partners",
    description:
      "We work only with vetted airlines, hotels, and tour operators — so you get quality and reliability every time.",
  },
  {
    icon: Map,
    title: "Zimbabwe-Based",
    description:
      "We're local. We understand the terrain, the routes, the seasons, and what works best for travellers in this region.",
  },
];

const highlights = [
  { number: "500+", label: "Trips Planned" },
  { number: "30+", label: "Destinations" },
  { number: "98%", label: "Happy Clients" },
  { number: "24/7", label: "Support" },
];

export default function WhyChooseUs() {
  return (
    <section className="relative bg-muted/50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Why Choose <span className="text-accent">ArcTravel</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              We&apos;re not a booking platform — we&apos;re your travel
              partners from start to finish.
            </p>
          </div>
        </Reveal>

        {/* Highlights strip */}
        <Reveal delay={100}>
          <div className="mt-10 grid grid-cols-2 gap-6 rounded-2xl border border-accent/10 bg-gradient-to-br from-accent/5 to-transparent p-8 sm:grid-cols-4">
            {highlights.map((h) => (
              <div key={h.label} className="text-center">
                <p className="text-2xl font-bold text-accent sm:text-3xl">
                  {h.number}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{h.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Reasons grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, i) => (
            <Reveal key={reason.title} delay={i * 80}>
              <div className="group rounded-xl border border-border/50 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-md">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-accent-foreground">
                  <reason.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold">{reason.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {reason.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
