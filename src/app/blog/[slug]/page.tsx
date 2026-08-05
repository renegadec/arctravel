import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CalendarDays, Clock, ArrowLeft, ArrowRight, User } from "lucide-react";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { SITE_URL } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      {/* Hero image */}
      <section className="relative">
        <div className="relative h-[320px] w-full overflow-hidden sm:h-[420px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#002a62]/90 via-[#002a62]/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-4xl px-4 pb-8 sm:px-6 sm:pb-12">
            <Link
              href="/blog"
              className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              All articles
            </Link>
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
              {post.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/75">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.readingTime} min read
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Article body */}
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-[#002a62] prose-a:text-[#e67a00] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#002a62] prose-img:rounded-xl">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#002a62]/5 px-3 py-1.5 text-xs font-medium text-[#002a62]/70"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 rounded-2xl bg-gradient-to-br from-[#002a62] to-[#1a3a5c] p-8 text-center sm:p-10">
          <h2 className="text-xl font-bold text-white sm:text-2xl">
            Ready to plan this trip?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/70 sm:text-base">
            Tell us where you&apos;re going and we&apos;ll handle the flights,
            accommodation, visas and everything in between.
          </p>
          <Link
            href="/book"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#ff8912] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#ff8912]/30 transition-all hover:bg-[#e67a00]"
          >
            Start Planning
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </article>
    </>
  );
}
