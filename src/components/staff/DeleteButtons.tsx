"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

type DeleteButtonProps = {
  endpoint: string;
  returnPath: string;
  label: string;
};

function DeleteButton({ endpoint, returnPath, label }: DeleteButtonProps) {
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (!window.confirm(`Delete this ${label}? This cannot be undone.`)) return;
    setBusy(true);
    try {
      const res = await fetch(endpoint, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error || "Delete failed.");
        setBusy(false);
        return;
      }
      router.push(returnPath);
      router.refresh();
    } catch {
      alert("Delete failed — check your connection.");
      setBusy(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={busy}
      className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:border-destructive/40 hover:bg-destructive/5 hover:text-destructive disabled:opacity-60"
    >
      <Trash2 className="h-3.5 w-3.5" />
      {busy ? "Deleting..." : "Delete"}
    </button>
  );
}

export function DeleteCarButton({ id }: { id: string }) {
  return (
    <DeleteButton
      endpoint={`/api/admin/cars/${encodeURIComponent(id)}`}
      returnPath="/staff/dashboard/cars"
      label="car"
    />
  );
}

export function DeleteDestinationButton({ slug }: { slug: string }) {
  return (
    <DeleteButton
      endpoint={`/api/admin/destinations/${encodeURIComponent(slug)}`}
      returnPath="/staff/dashboard/destinations"
      label="destination"
    />
  );
}

export function DeleteVisaButton({ id }: { id: string }) {
  return (
    <DeleteButton
      endpoint={`/api/admin/visas/${encodeURIComponent(id)}`}
      returnPath="/staff/dashboard/visas"
      label="visa country"
    />
  );
}
