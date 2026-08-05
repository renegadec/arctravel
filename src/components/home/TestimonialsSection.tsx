import { Quote, Star, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { testimonials, socialLinks } from "@/lib/constants";

export default function TestimonialsSection() {
  const featured = testimonials[0];

  return (
    <section className="bg-[#faf9f6] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex size-11 items-center justify-center rounded-full bg-[#ff8912]/10 text-[#ff8912]">
              <Quote className="size-5" />
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#002a62] sm:text-4xl">
              What Our <span className="text-[#ff8912]">Clients Say</span>
            </h2>

            {/* Star rating */}
            <div className="mt-8 flex justify-center gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="size-5 fill-[#ff8912] text-[#ff8912]"
                />
              ))}
            </div>

            {/* Featured quote */}
            <blockquote className="mt-6">
              <p className="text-xl font-semibold leading-relaxed tracking-tight text-[#002a62] sm:text-2xl">
                &ldquo;{featured.text}&rdquo;
              </p>
            </blockquote>

            {/* Attribution */}
            <figcaption className="mt-8 flex items-center justify-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-full bg-[#002a62] text-sm font-bold text-white ring-4 ring-[#002a62]/10">
                {featured.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </div>
              <div className="text-left">
                <p className="font-semibold text-[#002a62]">{featured.name}</p>
                <p className="text-sm text-slate-500">{featured.location}</p>
              </div>
            </figcaption>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-12 text-center">
            <p className="text-sm text-slate-500">
              See more reviews and share your experience
            </p>
            <a
              href={socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="xl"
                variant="outline"
                className="mt-3 cursor-pointer rounded-xl border-[#002a62]/20 text-[#002a62] transition-all hover:bg-[#002a62]/5"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Share Your Experience
              </Button>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
