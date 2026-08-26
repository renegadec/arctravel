import { Pool } from "pg";

// Reuse a single pool across hot reloads and serverless warm instances.
const globalForPool = globalThis as unknown as { __arctravelPool?: Pool };

export function getPool(): Pool | null {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) return null;
  if (!globalForPool.__arctravelPool) {
    globalForPool.__arctravelPool = new Pool({ connectionString, max: 5 });
  }
  return globalForPool.__arctravelPool;
}

export function isDbConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export type DbStatus = "ok" | "no-db" | "not-ready";

/**
 * ok          — DATABASE_URL set + all core tables exist
 * no-db       — DATABASE_URL missing (public pages fall back to static content)
 * not-ready   — DATABASE_URL set but tables missing (run the migration/seed)
 */
export async function getDbStatus(): Promise<DbStatus> {
  const pool = getPool();
  if (!pool) return "no-db";
  try {
    const res = await pool.query(
      "SELECT to_regclass('public.cars') AS cars, to_regclass('public.destinations') AS dest, to_regclass('public.visas') AS visas"
    );
    const row = res.rows[0];
    return row?.cars && row?.dest && row?.visas ? "ok" : "not-ready";
  } catch {
    return "not-ready";
  }
}

/** Run a SELECT and return rows, or null when the DB is unavailable. */
export async function queryRows<T>(text: string, values?: unknown[]): Promise<T[] | null> {
  const pool = getPool();
  if (!pool) return null;
  try {
    const res = await pool.query(text, values);
    return res.rows as unknown as T[];
  } catch (err) {
    console.error("[db] query failed:", err instanceof Error ? err.message : err);
    return null;
  }
}

/** Run a single-row SELECT and return the row, or null when absent/unavailable. */
export async function queryOne<T>(text: string, values?: unknown[]): Promise<T | null> {
  const rows = await queryRows<T>(text, values);
  return rows && rows.length > 0 ? rows[0] : null;
}

/** Run a write query; returns true on success, false when the DB is unavailable or errors. */
export async function runQuery(text: string, values?: unknown[]): Promise<boolean> {
  const pool = getPool();
  if (!pool) return false;
  try {
    await pool.query(text, values);
    return true;
  } catch (err) {
    console.error("[db] write failed:", err instanceof Error ? err.message : err);
    return false;
  }
}

export async function getTableCounts(): Promise<{
  cars: number;
  destinations: number;
  visas: number;
} | null> {
  const rows = await queryRows<{ cars: number; destinations: number; visas: number }>(
    `SELECT
       (SELECT count(*) FROM cars) AS cars,
       (SELECT count(*) FROM destinations) AS destinations,
       (SELECT count(*) FROM visas) AS visas`
  );
  if (!rows || rows.length === 0) return null;
  const r = rows[0];
  return {
    cars: Number(r.cars),
    destinations: Number(r.destinations),
    visas: Number(r.visas),
  };
}
