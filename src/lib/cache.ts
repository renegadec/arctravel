// Tiny in-process TTL cache for dashboard + public reads.
// Per-instance by design: it keeps Supabase round-trips out of every page
// navigation, which is what made the dashboard feel slow. Mutations call
// invalidateAll() so edits show up immediately. On serverless hosting this
// cache is per-instance — fine for a single-admin dashboard.
//
// The Map lives on globalThis so route handlers and pages share one instance
// (dev/Turbopack can otherwise duplicate server modules).

type CacheEntry = { value: unknown; expires: number };

const globalForCache = globalThis as unknown as {
  __arctravelCache?: Map<string, CacheEntry>;
};

const store: Map<string, CacheEntry> =
  globalForCache.__arctravelCache ??
  (globalForCache.__arctravelCache = new Map());

export async function cached<T>(
  key: string,
  ttlMs: number,
  loader: () => Promise<T>
): Promise<T> {
  const hit = store.get(key);
  if (hit && hit.expires > Date.now()) return hit.value as T;
  const value = await loader();
  store.set(key, { value, expires: Date.now() + ttlMs });
  return value;
}

export function invalidateAll(): void {
  store.clear();
}
