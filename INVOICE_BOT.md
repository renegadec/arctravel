# 🧾 Invoice Bot — Telegram → Zoho Invoices (MCP)

Staff message an instruction to the Arc Travel bot, confirm a summary, and
receive the invoice PDF back on the chat. The Zoho integration is also
exposed as an MCP server.

```
Telegram message → DeepSeek extracts a draft → staff replies YES
→ Zoho Invoices creates the invoice → PDF sent back on Telegram
```

## 1. Environment variables

Add these to `.env.local` (local) **and** to Vercel → Settings → Environment
Variables (Production) for the deployed site:

| Variable | Required | Notes |
|---|---|---|
| `ZOHO_CLIENT_ID` | ✅ | From Zoho Developer Console |
| `ZOHO_CLIENT_SECRET` | ✅ | From Zoho Developer Console |
| `ZOHO_REFRESH_TOKEN` | ✅ | One-time OAuth grant (below) |
| `ZOHO_BASE_URL` | – | Default `https://invoice.zoho.com/api/v3` (EU/IN/AU regions differ) |
| `ZOHO_ACCOUNTS_URL` | – | Default `https://accounts.zoho.com/oauth/v2/token` (use `accounts.zoho.eu` etc. for non-US) |
| `MCP_API_KEY` | ✅ | Bearer token for the MCP endpoint |
| `TELEGRAM_WEBHOOK_SECRET` | recommended | Secret passed to `setWebhook`; the webhook rejects requests without it |
| `INVOICE_ALLOWED_CHAT_IDS` | – | Comma-separated Telegram chat IDs allowed to create invoices. Defaults to `TELEGRAM_CHAT_ID` |

Existing keys already used: `TELEGRAM_BOT_TOKEN`, `DEEPSEEK_API_KEY`.

## 2. Zoho credentials (one time)

1. Go to [Zoho API Console](https://api-console.zoho.com/) → **Create a self client**
   → choose **Server-based Applications**.
2. Note the Client ID and Client Secret.
3. Generate a refresh token with the scopes:
   `ZohoInvoice.invoices.READ`, `ZohoInvoice.invoices.CREATE`, `ZohoInvoice.invoices.UPDATE`,
   `ZohoInvoice.contacts.READ`, `ZohoInvoice.contacts.CREATE`.
   (Use the console's built-in "Generate Token" for the `ZohoInvoice` scope and copy
   the refresh token.)
4. Test in the Zoho **sandbox** first if you have access.

## 3. Telegram bot

1. Create/obtain the bot token from [@BotFather](https://t.me/BotFather).
2. Point the webhook at the deployed site (replace token/secret):
   ```bash
   curl "https://api.telegram.org/bot<BOT_TOKEN>/setWebhook?url=https://arctravel.co.zw/api/telegram/webhook&secret_token=<TELEGRAM_WEBHOOK_SECRET>"
   ```
   To confirm: `curl "https://api.telegram.org/bot<BOT_TOKEN>/getWebhookInfo"`
3. Find the staff chat ID (the bot's own chat with you, or use `getUpdates` after
   messaging the bot once) and add it to `INVOICE_ALLOWED_CHAT_IDS` (or reuse
   `TELEGRAM_CHAT_ID`).

**Local testing:** Telegram can't reach `localhost`. Use a tunnel (e.g. `ngrok http 3000`)
and point the webhook at the ngrok URL, or test with `getUpdates` polling during dev.

## 4. Using it

- `Invoice Tendai US$150 for the Victoria Falls weekend deposit`
- `Invoice Rachel K — $45/day car hire for 3 days`
- Reply `YES` to the summary to create the invoice; `NO` cancels.
- `help` shows examples.

The agent only accepts instructions from allow-listed chats, and always asks for
confirmation before anything is created in Zoho.

## 5. MCP endpoint

The same Zoho tools are served over MCP (Streamable HTTP) at
`https://arctravel.co.zw/api/mcp/zoho`. Connect any MCP client (Claude Desktop,
Cursor, ...) with:

- URL: `https://arctravel.co.zw/api/mcp/zoho`
- Header: `Authorization: Bearer <MCP_API_KEY>`

Tools: `create_invoice` (finds-or-creates the customer), `list_customers`.

## 6. Caveats

- ⚠️ The invoice PDF endpoint (`GET /api/v3/invoices/{id}/pdf`) should be verified
  against your org on the first live test; some regions return a PDF URL instead.
- Currency defaults to USD — the extraction passes `currency` if you mention it.
- Invoices are created in your Zoho org's default template/settings (tax, numbering).
