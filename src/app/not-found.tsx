import Link from "next/link";
import type { Metadata } from "next";
import { Compass, ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The page you're looking for doesn't exist. Let's get you back on track to your next adventure.",
  robots: { index: false },
};

const popularPages = [
  { label: "Destinations", href: "/destinations" },
  { label: "Packages", href: "/packages" },
  { label: "Book a Trip", href: "/book" },
  { label: "Blog", href: "/blog" },
];

export default function NotFound() {
  return (
    <main className="relative flex min-h-[70vh] items-center overflow-hidden bg-[#faf9f6]">
      {/* Decorative glows */}
      <div className="pointer-events-none absolute -top-24 right-[-10%] hidden h-96 w-96 rounded-full bg-[#ff8912]/10 blur-3xl lg:block" />
      <div className="pointer-events-none absolute bottom-[-20%] left-[-10%] hidden h-96 w-96 rounded-full bg-[#002a62]/10 blur-3xl lg:block" />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#002a62]/5">
            <Compass className="h-8 w-8 text-[#ff8912]" />
          </div>

          <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-[#ff8912]">
            Error 404
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#002a62] sm:text-5xl lg:text-6xl">
            Looks like we took a wrong turn
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            The page you&apos;re looking for has wandered off — maybe it was
            moved, renamed, or never existed. Let&apos;s get you back to the
            good stuff.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link href="/">
              <Button variant="accent" size="xl">
                Back to Home
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/book">
              <Button variant="outline" size="xl">
                Book a Trip
              </Button>
            </Link>
          </div>

          <div className="mx-auto mt-12 max-w-md">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Popular places to start
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {popularPages.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="group flex items-center justify-between rounded-xl border border-border bg-white px-4 py-3 text-sm font-medium text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#ff8912]/30 hover:shadow-md"
                >
                  <span className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#ff8912]" />
                    {p.label}
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-[#ff8912]" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
