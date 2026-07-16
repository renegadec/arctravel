import { Quote, Star, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { testimonials, socialLinks } from "@/lib/constants";

export default function TestimonialsSection() {
  return (
    <section className="relative py-20">
      {/* Background accent */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 bg-accent/[0.02] blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
              <Quote className="h-5 w-5" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              What Our
              <br />
              <span className="text-accent">Clients Say</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Don&apos;t just take our word for it — here&apos;s what travellers
              have to say about ArcTravel.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 120}>
              <Card className="group border-accent/10 bg-accent/[0.02] transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <CardContent className="p-6">
                  {/* Stars */}
                  <div className="mb-3 flex gap-1">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star
                        key={si}
                        className="h-4 w-4 fill-accent text-accent"
                      />
                    ))}
                  </div>

                  <Quote className="mb-2 h-6 w-6 text-accent/30" />
                  <p className="text-sm leading-relaxed italic text-muted-foreground">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="mt-4 flex items-center gap-3 border-t border-border pt-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/20 text-xs font-bold text-accent">
                      {t.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {t.location}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>

        {/* Social proof CTA */}
        <Reveal delay={200}>
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              See more reviews and share your experience
            </p>
            <a
              href={socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="sm"
                className="mt-3 cursor-pointer"
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
