import { NextRequest, NextResponse } from "next/server";
import { isStaffAuthed } from "@/lib/staff-auth";
import { getPool, runQuery } from "@/lib/db";
import { SCHEMA_SQL } from "@/lib/db/schema";
import { cars as seedCars } from "@/lib/car-data";
import { destinations as seedDestinations } from "@/lib/constants";
import { destinationContent } from "@/lib/destination-content";
import { visaCountries } from "@/lib/visa-data";
import { CARD_IMAGES } from "@/lib/stores/destinations";

/**
 * Creates the content tables (idempotent) and seeds them from the current
 * static data. Existing rows are preserved (ON CONFLICT DO NOTHING) so staff
 * edits are never clobbered by re-running setup.
 */
export async function POST(req: NextRequest) {
  if (!isStaffAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const pool = getPool();
  if (!pool) {
    return NextResponse.json(
      { error: "DATABASE_URL is not configured. Add it to .env.local first." },
      { status: 503 }
    );
  }

  try {
    await pool.query(SCHEMA_SQL);
  } catch (err) {
    console.error("[migrate] schema failed:", err);
    return NextResponse.json(
      { error: "Failed to create tables — check DATABASE_URL and permissions." },
      { status: 500 }
    );
  }

  // ── Cars ────────────────────────────────────────────────
  let cars = 0;
  for (const [i, c] of seedCars.entries()) {
    const ok = await runQuery(
      `INSERT INTO cars (id, brand, model, year, price_per_day, included_km_per_day, color, color_hex, category, seats, transmission, fuel, image, popular, available, description, sort_order)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)
       ON CONFLICT (id) DO NOTHING`,
      [
        c.id,
        c.brand,
        c.model,
        c.year,
        c.pricePerDay,
        c.includedKmPerDay,
        c.color || null,
        c.colorHex || null,
        c.category,
        c.seats,
        c.transmission,
        c.fuel,
        c.image,
        c.popular ?? false,
        c.available !== false,
        c.description || null,
        i,
      ]
    );
    if (ok) cars++;
  }

  // ── Destinations ────────────────────────────────────────
  let destinations = 0;
  for (const [i, d] of seedDestinations.entries()) {
    const slug = d.href.replace("/destinations/", "");
    const detail = destinationContent[slug];
    const ok = await runQuery(
      `INSERT INTO destinations (slug, name, country, region, short_description, image, location, tagline, description, hero_image, book_url, facts, highlights, gallery, tips, related_packages, cta_title, cta_text, cta_button, published, sort_order)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21)
       ON CONFLICT (slug) DO NOTHING`,
      [
        slug,
        detail?.name ?? d.name,
        d.country,
        d.region,
        d.description,
        CARD_IMAGES[d.href] ?? d.image,
        detail?.location ?? "",
        detail?.tagline ?? "",
        detail?.description ?? "",
        detail?.heroImage ?? d.image,
        detail?.bookUrl ?? `/book?destination=${encodeURIComponent(d.name)}`,
        JSON.stringify(detail?.facts ?? []),
        JSON.stringify(detail?.highlights ?? []),
        JSON.stringify(detail?.gallery ?? []),
        JSON.stringify(detail?.tips ?? []),
        JSON.stringify(detail?.relatedPackages ?? []),
        detail?.ctaTitle ?? "Plan Your Trip",
        detail?.ctaText ?? "",
        detail?.ctaButton ?? "Get a Quote",
        true,
        i,
      ]
    );
    if (ok) destinations++;
  }

  // ── Visas ───────────────────────────────────────────────
  let visas = 0;
  for (const [i, v] of visaCountries.entries()) {
    const ok = await runQuery(
      `INSERT INTO visas (id, name, slug, type, visa_category, max_stay, processing_time, visa_fee, service_fee, requirements, notes, region, sort_order)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
       ON CONFLICT (id) DO NOTHING`,
      [
        v.slug,
        v.name,
        v.slug,
        v.type,
        v.visaCategory,
        v.maxStay,
        v.processingTime,
        v.visaFee,
        v.serviceFee,
        JSON.stringify(v.requirements),
        v.notes ?? null,
        v.region,
        i,
      ]
    );
    if (ok) visas++;
  }

  return NextResponse.json({
    success: true,
    seeded: { cars, destinations, visas },
  });
}
