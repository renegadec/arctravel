// Tiny key/value settings store (Postgres) — used for OAuth tokens and
// connection state that must survive restarts/deploys.

import { runQuery, queryOne } from "@/lib/db";

export async function ensureSettingsTable(): Promise<void> {
  await runQuery(
    `CREATE TABLE IF NOT EXISTS settings (
       key TEXT PRIMARY KEY,
       value TEXT,
       updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
     )`
  );
}

export async function getSetting(key: string): Promise<string | null> {
  const row = await queryOne<{ value: string | null }>(
    "SELECT value FROM settings WHERE key = $1",
    [key]
  );
  return row?.value ?? null;
}

export async function setSetting(key: string, value: string): Promise<boolean> {
  return runQuery(
    `INSERT INTO settings (key, value) VALUES ($1, $2)
     ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()`,
    [key, value]
  );
}
