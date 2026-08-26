import { queryRows, queryOne, runQuery } from "@/lib/db";
import { cached, invalidateAll } from "@/lib/cache";
import { destinations as seedDestinations } from "@/lib/constants";
import {
  destinationContent,
  type DestinationContent,
} from "@/lib/destination-content";
import { slugify } from "@/lib/stores/cars";

export interface DestinationListing {
  slug: string;
  name: string;
  country: string;
  region: string;
  description: string;
  image: string;
  href: string;
  published: boolean;
}

// Card image per listing href — single source of truth for the listing page.
export const CARD_IMAGES: Record<string, string> = {
  "/destinations/victoria-falls": "/images/destinations/victoria-falls.jpg",
  "/destinations/great-zimbabwe": "/images/destinations/great-zimbabwe.jpg",
  "/destinations/eastern-highlands": "/images/destinations/eastern-highlands.jpg",
  "/destinations/hwange-national-park": "/images/destinations/hwange.jpg",
  "/destinations/kariba": "/images/destinations/kariba.jpg",
  "/destinations/cape-town":
    "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=800&q=80",
  "/destinations/okavango-delta":
    "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80",
  "/destinations/zanzibar":
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  "/destinations/johannesburg-kruger":
    "https://images.unsplash.com/photo-1536081784351-6a2f2ba35b57?auto=format&fit=crop&w=800&q=80",
  "/destinations/dubai":
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
  "/destinations/london":
    "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80",
  "/destinations/bali":
    "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
  "/destinations/nairobi-maasai-mara":
    "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?auto=format&fit=crop&w=800&q=80",
  "/destinations/diani-beach": "/images/hero/diani-beach.jpg",
};

interface DestinationRow {
  slug: string;
  name: string;
  country: string | null;
  region: string;
  short_description: string | null;
  image: string | null;
  location: string | null;
  tagline: string | null;
  description: string | null;
  hero_image: string | null;
  book_url: string | null;
  facts: { label: string; value: string }[] | null;
  highlights: { title: string; description: string; image: string }[] | null;
  gallery: string[] | null;
  tips: string[] | null;
  related_packages: string[] | null;
  cta_title: string | null;
  cta_text: string | null;
  cta_button: string | null;
  published: boolean | null;
  sort_order: number | null;
}

function rowToListing(row: DestinationRow): DestinationListing {
  return {
    slug: row.slug,
    name: row.name,
    country: row.country ?? "",
    region: row.region,
    description: row.short_description ?? "",
    image: row.image ?? "",
    href: `/destinations/${row.slug}`,
    published: row.published !== false,
  };
}

function rowToContent(row: DestinationRow): DestinationContent {
  return {
    slug: row.slug,
    name: row.name,
    location: row.location ?? row.country ?? "",
    tagline: row.tagline ?? "",
    description: row.description ?? "",
    heroImage: row.hero_image ?? row.image ?? "",
    bookUrl: row.book_url ?? `/book?destination=${encodeURIComponent(row.name)}`,
    facts: row.facts ?? [],
    highlights: row.highlights ?? [],
    gallery: row.gallery ?? [],
    tips: row.tips ?? [],
    relatedPackages: row.related_packages ?? [],
    ctaTitle: row.cta_title ?? "Plan Your Trip",
    ctaText: row.cta_text ?? "",
    ctaButton: row.cta_button ?? "Get a Quote",
  };
}

const fallbackListings: DestinationListing[] = seedDestinations.map((d) => ({
  slug: d.href.replace("/destinations/", ""),
  name: d.name,
  country: d.country,
  region: d.region,
  description: d.description,
  image: CARD_IMAGES[d.href] ?? d.image,
  href: d.href,
  published: true,
}));

/**
 * Public destination listing. DB-backed with static fallback while the
 * database is unavailable.
 */
export async function getDestinations(): Promise<DestinationListing[]> {
  return cached("destinations:public", 15_000, async () => {
    const rows = await queryRows<DestinationRow>(
      "SELECT * FROM destinations WHERE published = TRUE ORDER BY sort_order ASC, name ASC"
    );
    if (!rows) return fallbackListings;
    return rows.map(rowToListing);
  });
}

/** Admin: DB only (includes unpublished). Returns null when the DB is unavailable. */
export async function adminListDestinations(): Promise<DestinationListing[] | null> {
  return cached("destinations:list", 15_000, async () => {
    const rows = await queryRows<DestinationRow>(
      "SELECT * FROM destinations ORDER BY sort_order ASC, name ASC"
    );
    if (!rows) return null;
    return rows.map(rowToListing);
  });
}

/**
 * Public destination detail. When the DB is unavailable the static content is
 * returned; once the DB is live it is authoritative (missing row → null).
 */
export async function getDestination(slug: string): Promise<DestinationContent | null> {
  const rows = await queryRows<DestinationRow>(
    "SELECT * FROM destinations WHERE slug = $1",
    [slug]
  );
  if (rows === null) return destinationContent[slug] ?? null;
  return rows.length > 0 ? rowToContent(rows[0]) : null;
}

/** Admin: DB only. Returns null when the row is missing or the DB is unavailable. */
export async function adminGetDestination(slug: string): Promise<DestinationContent | null> {
  const row = await queryOne<DestinationRow>(
    "SELECT * FROM destinations WHERE slug = $1",
    [slug]
  );
  return row ? rowToContent(row) : null;
}

// ─── Admin writes ────────────────────────────────────────

export interface DestinationInput {
  slug: string;
  name: string;
  country: string;
  region: string;
  shortDescription: string;
  image: string;
  location: string;
  tagline: string;
  description: string;
  heroImage: string;
  bookUrl: string;
  facts: { label: string; value: string }[];
  highlights: { title: string; description: string; image: string }[];
  gallery: string[];
  tips: string[];
  relatedPackages: string[];
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
  published: boolean;
}

const DEST_REGIONS = ["domestic", "regional", "international"];

export function sanitizeDestination(body: Record<string, unknown>): DestinationInput {
  const str = (v: unknown, fallback = "") => (typeof v === "string" ? v : fallback);
  const arr = <T,>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);
  const name = str(body.name).trim();
  const region = str(body.region) as DestinationInput["region"];
  return {
    slug: str(body.slug).trim() || slugify(name),
    name,
    country: str(body.country),
    region: DEST_REGIONS.includes(region) ? region : "domestic",
    shortDescription: str(body.shortDescription),
    image: str(body.image),
    location: str(body.location),
    tagline: str(body.tagline),
    description: str(body.description),
    heroImage: str(body.heroImage),
    bookUrl: str(body.bookUrl),
    facts: arr<{ label: string; value: string }>(body.facts),
    highlights: arr<{ title: string; description: string; image: string }>(body.highlights),
    gallery: arr<string>(body.gallery),
    tips: arr<string>(body.tips),
    relatedPackages: arr<string>(body.relatedPackages),
    ctaTitle: str(body.ctaTitle),
    ctaText: str(body.ctaText),
    ctaButton: str(body.ctaButton),
    published: body.published !== false,
  };
}

export async function upsertDestination(input: DestinationInput): Promise<boolean> {
  const ok = await runQuery(
    `INSERT INTO destinations (slug, name, country, region, short_description, image, location, tagline, description, hero_image, book_url, facts, highlights, gallery, tips, related_packages, cta_title, cta_text, cta_button, published)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20)
     ON CONFLICT (slug) DO UPDATE SET
       name=EXCLUDED.name, country=EXCLUDED.country, region=EXCLUDED.region,
       short_description=EXCLUDED.short_description, image=EXCLUDED.image,
       location=EXCLUDED.location, tagline=EXCLUDED.tagline, description=EXCLUDED.description,
       hero_image=EXCLUDED.hero_image, book_url=EXCLUDED.book_url,
       facts=EXCLUDED.facts, highlights=EXCLUDED.highlights, gallery=EXCLUDED.gallery,
       tips=EXCLUDED.tips, related_packages=EXCLUDED.related_packages,
       cta_title=EXCLUDED.cta_title, cta_text=EXCLUDED.cta_text, cta_button=EXCLUDED.cta_button,
       published=EXCLUDED.published, updated_at=now()`,
    [
      input.slug,
      input.name,
      input.country || null,
      input.region,
      input.shortDescription || null,
      input.image || null,
      input.location || null,
      input.tagline || null,
      input.description || null,
      input.heroImage || null,
      input.bookUrl || null,
      JSON.stringify(input.facts),
      JSON.stringify(input.highlights),
      JSON.stringify(input.gallery),
      JSON.stringify(input.tips),
      JSON.stringify(input.relatedPackages),
      input.ctaTitle || null,
      input.ctaText || null,
      input.ctaButton || null,
      input.published,
    ]
  );
  if (ok) invalidateAll();
  return ok;
}

export async function deleteDestination(slug: string): Promise<boolean> {
  const ok = await runQuery("DELETE FROM destinations WHERE slug = $1", [slug]);
  if (ok) invalidateAll();
  return ok;
}

/** Full edit-page payload for one destination — content + listing fields in a single query. */
export async function adminGetDestinationWithListing(slug: string): Promise<{
  content: DestinationContent;
  listing: {
    shortDescription: string;
    country: string;
    region: string;
    image: string;
    published: boolean;
  };
} | null> {
  const row = await queryOne<DestinationRow>(
    "SELECT * FROM destinations WHERE slug = $1",
    [slug]
  );
  if (!row) return null;
  return {
    content: rowToContent(row),
    listing: {
      shortDescription: row.short_description ?? "",
      country: row.country ?? "",
      region: row.region,
      image: row.image ?? "",
      published: row.published !== false,
    },
  };
}
