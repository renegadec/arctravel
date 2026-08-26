"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { DbStatus } from "@/lib/db";
import { Database, RefreshCw, CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Shown on admin pages when the database is missing or not yet seeded.
 * "no-db"     → DATABASE_URL not set in .env.local
 * "not-ready" → DATABASE_URL set but tables missing → run the migration
 */
export default function DbSetupBanner({ status }: { status: DbStatus }) {
  const [state, setState] = useState<"idle" | "running" | "done" | "error">(
    "idle"
  );
  const router = useRouter();

  if (status === "ok") return null;

  async function runSetup() {
    setState("running");
    try {
      const res = await fetch("/api/admin/migrate", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        console.error("[setup]", data);
        setState("error");
        return;
      }
      setState("done");
      router.refresh();
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
        <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" />
        Database ready — seeded from the current site content.
      </div>
    );
  }

  const isMissing = status === "no-db";

  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-4">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-100">
          <Database className="h-4.5 w-4.5 text-amber-700" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-amber-900">
            {isMissing ? "Database not configured" : "Database not set up yet"}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-amber-800">
            {isMissing
              ? "Add a DATABASE_URL (e.g. a Neon or Supabase Postgres connection string) to .env.local, restart the dev server, then run setup below. Until then the public site keeps showing the built-in content."
              : "The tables are missing. Run setup to create them and seed them with the current cars, destinations, and visas. Existing edits are preserved — setup only adds what&apos;s missing."}
          </p>
          {state === "error" && (
            <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-red-700">
              <AlertTriangle className="h-3.5 w-3.5" />
              Setup failed — check the server logs.
            </p>
          )}
          <Button
            size="sm"
            variant="accent"
            onClick={runSetup}
            disabled={state === "running"}
            className="mt-3"
          >
            {state === "running" ? (
              <>
                <RefreshCw className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                Setting up...
              </>
            ) : (
              <>
                <Database className="mr-1.5 h-3.5 w-3.5" />
                Run Database Setup
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
