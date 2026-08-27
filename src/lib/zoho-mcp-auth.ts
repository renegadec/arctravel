// One-time OAuth connection to Zoho's hosted MCP server.
// Flow: discover metadata → dynamic client registration → PKCE authorization
// (user consents in the browser) → token exchange → refresh token stored in
// the settings table. The bot then mints access tokens automatically.

import { getSetting, setSetting, ensureSettingsTable } from "@/lib/settings";
import { zohoMcpUrl } from "@/lib/zoho-mcp";

interface McpMetadata {
  issuer: string;
  authorization_endpoint: string;
  token_endpoint: string;
  registration_endpoint?: string;
  scopes_supported?: string[];
}

const globalForAuth = globalThis as unknown as {
  __zohoMcpMetadata?: McpMetadata;
  __zohoAccessToken?: { token: string; expires: number };
};

export function zohoMcpCallbackUrl(): string {
  const base = process.env.ZOHO_MCP_CALLBACK_URL || "https://arctravel.co.zw";
  return `${base.replace(/\/+$/, "")}/api/mcp/zoho/callback`;
}

export async function discoverMetadata(): Promise<McpMetadata> {
  if (globalForAuth.__zohoMcpMetadata) return globalForAuth.__zohoMcpMetadata;
  const url = zohoMcpUrl();
  if (!url) throw new Error("Zoho MCP not configured — set ZOHO_MCP_URL in .env.local.");
  const origin = new URL(url).origin;
  const res = await fetch(new URL("/.well-known/oauth-authorization-server", origin));
  if (!res.ok) throw new Error(`Zoho MCP discovery failed: ${res.status}`);
  const meta = (await res.json()) as McpMetadata;
  globalForAuth.__zohoMcpMetadata = meta;
  return meta;
}

export async function getRegisteredClient(): Promise<{
  clientId: string;
  clientSecret?: string;
}> {
  await ensureSettingsTable();
  const storedId = await getSetting("zoho_mcp_client_id");
  if (storedId) {
    return { clientId: storedId, clientSecret: (await getSetting("zoho_mcp_client_secret")) ?? undefined };
  }
  const meta = await discoverMetadata();
  if (!meta.registration_endpoint) {
    throw new Error("Zoho MCP server does not support dynamic client registration.");
  }
  const res = await fetch(meta.registration_endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_name: "Arc Travel Invoice Bot",
      redirect_uris: [zohoMcpCallbackUrl()],
      grant_types: ["authorization_code", "refresh_token"],
      response_types: ["code"],
      token_endpoint_auth_method: "none",
    }),
  });
  const data = (await res.json().catch(() => ({}))) as {
    client_id?: string;
    client_secret?: string;
  };
  if (!res.ok || !data.client_id) {
    throw new Error(`Zoho MCP client registration failed: ${res.status} ${JSON.stringify(data)}`);
  }
  await setSetting("zoho_mcp_client_id", data.client_id);
  if (data.client_secret) await setSetting("zoho_mcp_client_secret", data.client_secret);
  return { clientId: data.client_id, clientSecret: data.client_secret };
}

function base64url(input: ArrayBuffer | Uint8Array): string {
  const bytes = input instanceof Uint8Array ? input : new Uint8Array(input);
  return Buffer.from(bytes).toString("base64url");
}

/** Builds the authorization URL for the user's one-time consent. */
export async function startZohoMcpConnect(): Promise<string> {
  await ensureSettingsTable();
  const meta = await discoverMetadata();
  const { clientId } = await getRegisteredClient();

  const verifier = base64url(crypto.getRandomValues(new Uint8Array(48)));
  const challenge = base64url(
    await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier))
  );
  const state = crypto.randomUUID();
  await setSetting(
    "zoho_mcp_state",
    JSON.stringify({ state, verifier, expires: Date.now() + 10 * 60 * 1000 })
  );

  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    redirect_uri: zohoMcpCallbackUrl(),
    scope: (meta.scopes_supported ?? []).join(" "),
    code_challenge: challenge,
    code_challenge_method: "S256",
    state,
    access_type: "offline",
    prompt: "consent",
  });
  return `${meta.authorization_endpoint}?${params.toString()}`;
}

/** Exchanges the authorization code and stores the refresh token. */
export async function handleZohoMcpCallback(
  code: string,
  state: string
): Promise<void> {
  await ensureSettingsTable();
  const stored = JSON.parse((await getSetting("zoho_mcp_state")) ?? "null") as {
    state?: string;
    verifier?: string;
    expires?: number;
  } | null;
  if (!stored || stored.state !== state || !stored.verifier || (stored.expires ?? 0) < Date.now()) {
    throw new Error("Invalid or expired OAuth state.");
  }

  const meta = await discoverMetadata();
  const { clientId } = await getRegisteredClient();
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: zohoMcpCallbackUrl(),
    client_id: clientId,
    code_verifier: stored.verifier,
  });
  const res = await fetch(meta.token_endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  const data = (await res.json().catch(() => ({}))) as { refresh_token?: string };
  if (!res.ok || !data.refresh_token) {
    throw new Error(`Zoho token exchange failed: ${res.status} ${JSON.stringify(data)}`);
  }
  await setSetting("zoho_mcp_refresh_token", data.refresh_token);
  await setSetting("zoho_mcp_state", "");
}

/** Mints a fresh access token from the stored refresh token. */
export async function getMcpAccessToken(): Promise<string> {
  await ensureSettingsTable();
  const cached = globalForAuth.__zohoAccessToken;
  if (cached && cached.expires > Date.now() + 60_000) return cached.token;

  const refreshToken = await getSetting("zoho_mcp_refresh_token");
  if (!refreshToken) {
    throw new Error(
      "Zoho MCP is not connected yet — run the connect flow (dashboard → Invoice bot → Connect)."
    );
  }
  const meta = await discoverMetadata();
  const { clientId, clientSecret } = await getRegisteredClient();
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: clientId,
  });
  if (clientSecret) body.set("client_secret", clientSecret);

  const res = await fetch(meta.token_endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  const data = (await res.json().catch(() => ({}))) as {
    access_token?: string;
    expires_in?: number;
  };
  if (!res.ok || !data.access_token) {
    throw new Error(`Zoho MCP token refresh failed: ${res.status} ${JSON.stringify(data)}`);
  }
  const expiresIn = Number(data.expires_in ?? 3600);
  globalForAuth.__zohoAccessToken = {
    token: data.access_token,
    expires: Date.now() + Math.max(60, expiresIn - 60) * 1000,
  };
  return data.access_token;
}

export function isZohoMcpConnected(): Promise<boolean> {
  return getSetting("zoho_mcp_refresh_token").then((t) => Boolean(t));
}

/**
 * A fetch wrapper that injects the Zoho MCP bearer token on every request —
 * passed to the SDK transport so the bot authenticates automatically.
 */
export function createZohoMcpFetch(): typeof fetch {
  return async (input, init) => {
    const headers = new Headers(init?.headers);
    headers.set("Authorization", `Bearer ${await getMcpAccessToken()}`);
    return fetch(input, { ...init, headers });
  };
}
