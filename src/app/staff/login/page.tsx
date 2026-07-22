"use client";

import { useState, FormEvent, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function StaffLogin() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-[#f5f6fa]"><p className="text-sm text-muted-foreground">Loading...</p></div>}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/staff/flight-pricing";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/staff/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Invalid password");
        return;
      }

      router.push(redirect);
    } catch {
      setError("Network error — try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f6fa] px-4">
      <div className="w-full max-w-sm">
        <div className="rounded-xl border border-border bg-white p-8 shadow-sm">
          {/* Logo area */}
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Plane className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-lg font-semibold text-foreground">ArcTravel Staff</h1>
            <p className="text-xs text-muted-foreground">Internal tools · Authorised only</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-foreground">
                Staff password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter staff password"
                autoFocus
                className="h-10"
              />
            </div>

            {error && (
              <p className="text-xs text-red-600">{error}</p>
            )}

            <Button
              type="submit"
              disabled={loading || !password}
              className="w-full h-10"
            >
              {loading ? "Verifying..." : "Sign In"}
            </Button>
          </form>

          <p className="mt-4 text-center text-[10px] text-muted-foreground">
            This area is for ArcTravel staff only.
          </p>
        </div>
      </div>
    </div>
  );
}

