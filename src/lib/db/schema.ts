// Postgres schema for the content-management tables.
// Run via POST /api/admin/migrate (idempotent).

export const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS cars (
  id TEXT PRIMARY KEY,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER,
  price_per_day INTEGER NOT NULL DEFAULT 0,
  included_km_per_day INTEGER NOT NULL DEFAULT 0,
  color TEXT,
  color_hex TEXT,
  category TEXT NOT NULL DEFAULT 'Sedan',
  seats INTEGER NOT NULL DEFAULT 5,
  transmission TEXT NOT NULL DEFAULT 'Automatic',
  fuel TEXT NOT NULL DEFAULT 'Petrol',
  image TEXT NOT NULL DEFAULT '',
  popular BOOLEAN NOT NULL DEFAULT FALSE,
  available BOOLEAN NOT NULL DEFAULT TRUE,
  description TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS destinations (
  slug TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT,
  region TEXT NOT NULL DEFAULT 'domestic',
  short_description TEXT,
  image TEXT,
  location TEXT,
  tagline TEXT,
  description TEXT,
  hero_image TEXT,
  book_url TEXT,
  facts JSONB NOT NULL DEFAULT '[]'::jsonb,
  highlights JSONB NOT NULL DEFAULT '[]'::jsonb,
  gallery JSONB NOT NULL DEFAULT '[]'::jsonb,
  tips JSONB NOT NULL DEFAULT '[]'::jsonb,
  related_packages JSONB NOT NULL DEFAULT '[]'::jsonb,
  cta_title TEXT,
  cta_text TEXT,
  cta_button TEXT,
  published BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS visas (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL DEFAULT 'visa-required',
  visa_category TEXT,
  max_stay TEXT,
  processing_time TEXT,
  visa_fee TEXT,
  service_fee TEXT,
  requirements JSONB NOT NULL DEFAULT '[]'::jsonb,
  notes TEXT,
  region TEXT NOT NULL DEFAULT 'Africa',
  sort_order INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
`;
