import { queryRows, queryOne, runQuery } from "@/lib/db";
import { cached, invalidateAll } from "@/lib/cache";
import { visaCountries, type VisaCountry } from "@/lib/visa-data";
import { slugify } from "@/lib/stores/cars";

interface VisaRow {
  id: string;
  name: string;
  slug: string;
  type: string;
  visa_category: string | null;
  max_stay: string | null;
  processing_time: string | null;
  visa_fee: string | null;
  service_fee: string | null;
  requirements: string[] | null;
  notes: string | null;
  region: string;
  sort_order: number | null;
}

function rowToVisa(row: VisaRow): VisaCountry {
  return {
    name: row.name,
    slug: row.slug,
    type: row.type as VisaCountry["type"],
    visaCategory: row.visa_category ?? "",
    maxStay: row.max_stay ?? "",
    processingTime: row.processing_time ?? "",
    visaFee: row.visa_fee ?? "",
    serviceFee: row.service_fee ?? "",
    requirements: row.requirements ?? [],
    notes: row.notes ?? undefined,
    region: row.region,
  };
}

/**
 * Public visa directory. DB-backed with static fallback while the database
 * is unavailable.
 */
export async function getVisas(): Promise<VisaCountry[]> {
  return cached("visas:public", 15_000, async () => {
    const rows = await queryRows<VisaRow>(
      "SELECT * FROM visas ORDER BY sort_order ASC, name ASC"
    );
    if (!rows) return visaCountries;
    return rows.map(rowToVisa);
  });
}

/** Admin: DB only. Returns null when the DB is unavailable. */
export async function adminListVisas(): Promise<VisaCountry[] | null> {
  return cached("visas:list", 15_000, async () => {
    const rows = await queryRows<VisaRow>(
      "SELECT * FROM visas ORDER BY sort_order ASC, name ASC"
    );
    if (!rows) return null;
    return rows.map(rowToVisa);
  });
}

export async function adminGetVisa(id: string): Promise<VisaCountry | null> {
  const row = await queryOne<VisaRow>("SELECT * FROM visas WHERE id = $1", [id]);
  return row ? rowToVisa(row) : null;
}

// ─── Admin writes ────────────────────────────────────────

export interface VisaInput {
  id: string;
  name: string;
  slug: string;
  type: VisaCountry["type"];
  visaCategory: string;
  maxStay: string;
  processingTime: string;
  visaFee: string;
  serviceFee: string;
  requirements: string[];
  notes: string;
  region: string;
}

const VISA_TYPES: VisaCountry["type"][] = ["evisa", "eta", "visa-required"];
const VISA_REGIONS = ["Africa", "Asia", "Europe", "Americas", "Oceania"];

export function sanitizeVisa(body: Record<string, unknown>): VisaInput {
  const str = (v: unknown, fallback = "") => (typeof v === "string" ? v : fallback);
  const arr = (v: unknown): string[] =>
    Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
  const name = str(body.name).trim();
  const type = str(body.type) as VisaCountry["type"];
  const region = str(body.region);
  return {
    id: str(body.id).trim() || slugify(name),
    name,
    slug: str(body.slug).trim() || slugify(name),
    type: VISA_TYPES.includes(type) ? type : "visa-required",
    visaCategory: str(body.visaCategory),
    maxStay: str(body.maxStay),
    processingTime: str(body.processingTime),
    visaFee: str(body.visaFee),
    serviceFee: str(body.serviceFee),
    requirements: arr(body.requirements),
    notes: str(body.notes),
    region: VISA_REGIONS.includes(region) ? region : "Africa",
  };
}

export async function upsertVisa(input: VisaInput): Promise<boolean> {
  const ok = await runQuery(
    `INSERT INTO visas (id, name, slug, type, visa_category, max_stay, processing_time, visa_fee, service_fee, requirements, notes, region)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
     ON CONFLICT (id) DO UPDATE SET
       name=EXCLUDED.name, slug=EXCLUDED.slug, type=EXCLUDED.type,
       visa_category=EXCLUDED.visa_category, max_stay=EXCLUDED.max_stay,
       processing_time=EXCLUDED.processing_time, visa_fee=EXCLUDED.visa_fee,
       service_fee=EXCLUDED.service_fee, requirements=EXCLUDED.requirements,
       notes=EXCLUDED.notes, region=EXCLUDED.region, updated_at=now()`,
    [
      input.id,
      input.name,
      input.slug,
      input.type,
      input.visaCategory || null,
      input.maxStay || null,
      input.processingTime || null,
      input.visaFee || null,
      input.serviceFee || null,
      JSON.stringify(input.requirements),
      input.notes || null,
      input.region,
    ]
  );
  if (ok) invalidateAll();
  return ok;
}

export async function deleteVisa(id: string): Promise<boolean> {
  const ok = await runQuery("DELETE FROM visas WHERE id = $1", [id]);
  if (ok) invalidateAll();
  return ok;
}
