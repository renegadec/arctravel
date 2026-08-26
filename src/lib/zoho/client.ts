// Zoho OAuth + Invoices API client.
// Credentials (all in .env.local):
//   ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN
//   ZOHO_BASE_URL      (default https://invoice.zoho.com/api/v3)
//   ZOHO_ACCOUNTS_URL  (default https://accounts.zoho.com/oauth/v2/token)

const globalForZoho = globalThis as unknown as {
  __zohoAccessToken?: { token: string; expires: number };
};

export function isZohoConfigured(): boolean {
  return Boolean(
    process.env.ZOHO_CLIENT_ID &&
      process.env.ZOHO_CLIENT_SECRET &&
      process.env.ZOHO_REFRESH_TOKEN
  );
}

export function zohoApiBase(): string {
  return (process.env.ZOHO_BASE_URL || "https://invoice.zoho.com/api/v3").replace(/\/+$/, "");
}

function zohoAccountsUrl(): string {
  return process.env.ZOHO_ACCOUNTS_URL || "https://accounts.zoho.com/oauth/v2/token";
}

async function refreshAccessToken(): Promise<string> {
  const res = await fetch(zohoAccountsUrl(), {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      refresh_token: process.env.ZOHO_REFRESH_TOKEN as string,
      client_id: process.env.ZOHO_CLIENT_ID as string,
      client_secret: process.env.ZOHO_CLIENT_SECRET as string,
      grant_type: "refresh_token",
    }),
  });
  const data = (await res.json().catch(() => ({}))) as {
    access_token?: string;
    error?: string;
  };
  if (!res.ok || !data.access_token) {
    throw new Error(`Zoho token refresh failed: ${data.error ?? res.status}`);
  }
  return data.access_token;
}

export async function getZohoAccessToken(): Promise<string> {
  const cached = globalForZoho.__zohoAccessToken;
  if (cached && cached.expires > Date.now() + 60_000) return cached.token;
  const token = await refreshAccessToken();
  // Access tokens last ~1 hour; refresh ~5 minutes early.
  globalForZoho.__zohoAccessToken = { token, expires: Date.now() + 55 * 60 * 1000 };
  return token;
}

type ZohoResponse = {
  code?: number;
  message?: string;
  [key: string]: unknown;
};

/**
 * Authenticated fetch against the Zoho Invoices API. Retries once on a 401 in
 * case the cached token was revoked or expired early.
 */
export async function zohoFetch(
  path: string,
  options: { method?: string; body?: unknown } = {}
): Promise<ZohoResponse> {
  if (!isZohoConfigured()) {
    throw new Error(
      "Zoho is not configured. Add ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET and ZOHO_REFRESH_TOKEN to .env.local."
    );
  }

  const doFetch = async (token: string) => {
    const headers: Record<string, string> = {
      Authorization: `Zoho-oauthtoken ${token}`,
    };
    if (options.body !== undefined) headers["Content-Type"] = "application/json";
    return fetch(`${zohoApiBase()}${path}`, {
      method: options.method ?? "GET",
      headers,
      body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    });
  };

  let res = await doFetch(await getZohoAccessToken());

  if (res.status === 401) {
    // Force a fresh token and retry once.
    globalForZoho.__zohoAccessToken = undefined;
    res = await doFetch(await getZohoAccessToken());
  }

  const data = (await res.json().catch(() => ({}))) as ZohoResponse;
  if (!res.ok || data.code !== 0) {
    throw new Error(`Zoho API error (${res.status}): ${JSON.stringify(data)}`);
  }
  return data;
}
