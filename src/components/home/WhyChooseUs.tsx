import Image from "next/image";
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
      "We work only with vetted airlines, hotels, and tour operators — so you get quality every time.",
  },
];

// Real photos (3:4 portrait).
const tallCards = [
  {
    icon: Globe,
    title: "Deep Industry Know-How",
    description:
      "Years of working with airlines, lodges, and ground operators mean we know who delivers — and who to avoid. If we wouldn't book it for ourselves, we won't book it for you.",
    image: "/images/why-us/business.jpg",
    alt: "Arc Travel & Tours team planning a journey",
  },
  {
    icon: Map,
    title: "Passion, Not Just Business",
    description:
      "We're in this because we love travel — and we plan every trip like it's our own. The long hours, the last-minute fixes, the extra care: that's not a service tier, it's just how we work.",
    image: "/images/why-us/passion.jpg",
    alt: "Road trip through Southern Africa",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#ff8912]">
              The Arc Travel & Tours difference
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#002a62] sm:text-4xl">
              Why Choose <span className="text-[#ff8912]">Arc Travel & Tours</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              We&apos;re not a booking platform — we&apos;re your travel
              partners from start to finish.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:mt-16 lg:grid-cols-4 lg:grid-rows-2">
          {/* Tall image cards */}
          {tallCards.map((card) => (
            <div
              key={card.title}
              className="group relative overflow-hidden rounded-3xl lg:row-span-2"
            >
              <Image
                src={card.image}
                alt={card.alt}
                fill
                sizes="(min-width: 1024px) 25vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002a62]/95 via-[#002a62]/40 to-transparent" />
              <div className="relative flex h-full min-h-[22rem] flex-col justify-end p-8">
                <div className="flex size-11 items-center justify-center rounded-xl bg-[#ff8912] text-white shadow-lg shadow-[#ff8912]/30">
                  <card.icon className="size-5" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-white">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80">
                  {card.description}
                </p>
              </div>
            </div>
          ))}

          {/* Standard reason cards */}
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="group rounded-3xl border border-slate-100 bg-[#faf9f6] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#ff8912]/30 hover:shadow-lg hover:shadow-[#002a62]/5"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-[#002a62]/5 text-[#002a62] transition-all duration-300 group-hover:bg-[#ff8912] group-hover:text-white">
                <reason.icon className="size-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-[#002a62]">
                {reason.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
