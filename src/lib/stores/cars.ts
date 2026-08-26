import { queryRows, queryOne, runQuery } from "@/lib/db";
import { cached, invalidateAll } from "@/lib/cache";
import { cars as seedCars, type Car } from "@/lib/car-data";

interface CarRow {
  id: string;
  brand: string;
  model: string;
  year: number | null;
  price_per_day: number;
  included_km_per_day: number | null;
  color: string | null;
  color_hex: string | null;
  category: string;
  seats: number | null;
  transmission: string | null;
  fuel: string | null;
  image: string;
  popular: boolean | null;
  available: boolean | null;
  description: string | null;
  sort_order: number | null;
}

function rowToCar(row: CarRow): Car {
  return {
    id: row.id,
    brand: row.brand,
    model: row.model,
    year: row.year ?? new Date().getFullYear(),
    pricePerDay: row.price_per_day,
    includedKmPerDay: row.included_km_per_day ?? 0,
    color: row.color ?? "",
    colorHex: row.color_hex ?? "#cccccc",
    category: row.category as Car["category"],
    seats: row.seats ?? 5,
    transmission: row.transmission === "Manual" ? "Manual" : "Automatic",
    fuel: row.fuel === "Diesel" ? "Diesel" : "Petrol",
    image: row.image,
    popular: row.popular === true,
    available: row.available !== false,
    description: row.description ?? "",
  };
}

/**
 * Public fleet. DB-backed; falls back to the static seed while the database
 * is unavailable (no DATABASE_URL or tables missing). Once the DB is live it
 * is authoritative — including an empty fleet.
 */
export async function getCars(): Promise<Car[]> {
  return cached("cars:public", 15_000, async () => {
    const rows = await queryRows<CarRow>(
      "SELECT * FROM cars ORDER BY sort_order ASC, brand ASC, model ASC"
    );
    if (!rows) return seedCars;
    return rows.map(rowToCar);
  });
}

/** Admin: DB only. Returns null when the DB is unavailable (caller shows a setup notice). */
export async function adminListCars(): Promise<Car[] | null> {
  return cached("cars:list", 15_000, async () => {
    const rows = await queryRows<CarRow>(
      "SELECT * FROM cars ORDER BY sort_order ASC, brand ASC, model ASC"
    );
    if (!rows) return null;
    return rows.map(rowToCar);
  });
}

export async function adminGetCar(id: string): Promise<Car | null> {
  const row = await queryOne<CarRow>("SELECT * FROM cars WHERE id = $1", [id]);
  return row ? rowToCar(row) : null;
}

// ─── Admin writes ────────────────────────────────────────

export interface CarInput {
  id: string;
  brand: string;
  model: string;
  year: number;
  pricePerDay: number;
  includedKmPerDay: number;
  color: string;
  colorHex: string;
  category: Car["category"];
  seats: number;
  transmission: Car["transmission"];
  fuel: Car["fuel"];
  image: string;
  popular: boolean;
  available: boolean;
  description: string;
}

const CAR_CATEGORIES: Car["category"][] = ["4x4 & SUV", "Sedan", "Hatchback", "Minibus"];

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function sanitizeCar(body: Record<string, unknown>): CarInput {
  const str = (v: unknown, fallback = "") => (typeof v === "string" ? v : fallback);
  const num = (v: unknown, fallback = 0) => {
    const n = Number(v);
    return Number.isFinite(n) ? Math.round(n) : fallback;
  };
  const brand = str(body.brand).trim();
  const model = str(body.model).trim();
  const category = str(body.category) as Car["category"];
  return {
    id: str(body.id).trim() || slugify(`${brand} ${model}`),
    brand,
    model,
    year: num(body.year, new Date().getFullYear()),
    pricePerDay: num(body.pricePerDay),
    includedKmPerDay: num(body.includedKmPerDay),
    color: str(body.color),
    colorHex: str(body.colorHex),
    category: CAR_CATEGORIES.includes(category) ? category : "Sedan",
    seats: num(body.seats, 5),
    transmission: str(body.transmission) === "Manual" ? "Manual" : "Automatic",
    fuel: str(body.fuel) === "Diesel" ? "Diesel" : "Petrol",
    image: str(body.image),
    popular: Boolean(body.popular),
    available: body.available !== false,
    description: str(body.description),
  };
}

export async function upsertCar(input: CarInput): Promise<boolean> {
  const ok = await runQuery(
    `INSERT INTO cars (id, brand, model, year, price_per_day, included_km_per_day, color, color_hex, category, seats, transmission, fuel, image, popular, available, description)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
     ON CONFLICT (id) DO UPDATE SET
       brand=EXCLUDED.brand, model=EXCLUDED.model, year=EXCLUDED.year,
       price_per_day=EXCLUDED.price_per_day, included_km_per_day=EXCLUDED.included_km_per_day,
       color=EXCLUDED.color, color_hex=EXCLUDED.color_hex, category=EXCLUDED.category,
       seats=EXCLUDED.seats, transmission=EXCLUDED.transmission, fuel=EXCLUDED.fuel,
       image=EXCLUDED.image, popular=EXCLUDED.popular, available=EXCLUDED.available,
       description=EXCLUDED.description, updated_at=now()`,
    [
      input.id,
      input.brand,
      input.model,
      input.year,
      input.pricePerDay,
      input.includedKmPerDay,
      input.color || null,
      input.colorHex || null,
      input.category,
      input.seats,
      input.transmission,
      input.fuel,
      input.image,
      input.popular,
      input.available,
      input.description || null,
    ]
  );
  if (ok) invalidateAll();
  return ok;
}

export async function deleteCar(id: string): Promise<boolean> {
  const ok = await runQuery("DELETE FROM cars WHERE id = $1", [id]);
  if (ok) invalidateAll();
  return ok;
}
