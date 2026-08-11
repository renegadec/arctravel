import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  CalendarDays,
  Clock,
  ArrowRight,
  Sparkles,
  BookOpen,
  Mail,
} from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import NewsletterSignup from "@/components/blog/NewsletterSignup";

export const metadata: Metadata = {
  title: "Travel Blog — Guides, Tips & Destination Stories",
  description:
    "Practical travel guides and tips from the Arc Travel & Tours team — destination guides, visa advice, flight booking tips, and more for travellers from Zimbabwe and beyond.",
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-[#002a62] py-16 sm:py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#ff8912]/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#ffb25e]">
              The Arc Travel & Tours Journal
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Travel Guides &amp; Tips
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
              Practical, honest advice from a team that books travel every day —
              destination guides, visa help, and how to get more for your money.
            </p>
          </div>
        </div>
      </section>

      {/* ================= FEATURED POST ================= */}
      {featured && (
        <section className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 sm:pt-20 lg:px-8">
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid overflow-hidden rounded-3xl border border-border bg-white shadow-lg shadow-[#002a62]/5 transition-all hover:shadow-2xl hover:shadow-[#002a62]/15 lg:grid-cols-2"
          >
            {/* Image side */}
            <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[420px]">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-[#ff8912] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-lg">
                <Sparkles className="h-3 w-3" />
                Featured
              </div>
            </div>

            {/* Content side */}
            <div className="flex flex-col justify-center p-8 sm:p-12">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5 text-[#ff8912]" />
                  {formatDate(featured.date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-[#ff8912]" />
                  {featured.readingTime} min read
                </span>
              </div>
              <h2 className="mt-4 text-2xl font-bold leading-tight tracking-tight text-[#002a62] transition-colors group-hover:text-[#e67a00] sm:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                {featured.excerpt}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {featured.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#002a62]/5 px-2.5 py-1 text-xs font-medium text-[#002a62]/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#ff8912]">
                Read the full article
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </section>
      )}

      {/* ================= POSTS GRID ================= */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        {rest.length > 0 && (
          <>
            <div className="flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-[#ff8912]" />
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Latest Articles
              </h2>
            </div>
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-[#002a62]/10"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="h-3.5 w-3.5 text-[#ff8912]" />
                        {formatDate(post.date)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-[#ff8912]" />
                        {post.readingTime} min read
                      </span>
                    </div>
                    <h2 className="text-lg font-semibold leading-snug text-[#002a62] transition-colors group-hover:text-[#e67a00]">
                      {post.title}
                    </h2>
                    <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-[#002a62]/5 px-2.5 py-1 text-xs font-medium text-[#002a62]/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#ff8912]">
                      Read article
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
        {posts.length === 0 && (
          <p className="text-center text-slate-500">
            No posts yet — check back soon.
          </p>
        )}
      </section>

      {/* ================= NEWSLETTER ================= */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-[#002a62] px-8 py-14 sm:px-16">
            <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#ff8912]/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#ff8912]/10 blur-3xl" />
            <div className="relative mx-auto max-w-2xl text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ff8912]/15">
                <Mail className="h-6 w-6 text-[#ffb25e]" />
              </div>
              <h2 className="mt-5 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Travel tips worth reading
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base">
                One email a month — new destination guides, visa updates, and
                flight deals from Harare. No spam, unsubscribe anytime.
              </p>
              <div className="mx-auto mt-8 max-w-md">
                <NewsletterSignup source="Blog" />
              </div>
              <p className="mt-4 text-[11px] text-white/50">
                Join the readers already getting our monthly travel briefing
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
