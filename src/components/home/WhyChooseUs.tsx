import { Globe, HeadphonesIcon, Clock, ThumbsUp, ShieldCheck } from "lucide-react";
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

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, i) => (
            <Reveal key={reason.title} delay={i * 100}>
              <div className="group rounded-xl border border-border/50 bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-md">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-accent-foreground">
                  <reason.icon className="h-6 w-6" />
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
