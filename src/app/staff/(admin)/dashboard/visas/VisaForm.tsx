"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { VisaCountry } from "@/lib/visa-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, StringListEditor } from "@/components/staff/form-fields";
import { Save, ArrowLeft, AlertTriangle } from "lucide-react";

const REGIONS = ["Africa", "Asia", "Europe", "Americas", "Oceania"] as const;

type FormState = {
  name: string;
  slug: string;
  type: VisaCountry["type"];
  visaCategory: string;
  maxStay: string;
  processingTime: string;
  visaFee: string;
  serviceFee: string;
  requirements: string[];
  notes: string;
  region: string;
};

export default function VisaForm({ visa }: { visa?: VisaCountry }) {
  const router = useRouter();
  const isEdit = Boolean(visa);

  const [form, setForm] = useState<FormState>({
    name: visa?.name ?? "",
    slug: visa?.slug ?? "",
    type: visa?.type ?? "visa-required",
    visaCategory: visa?.visaCategory ?? "",
    maxStay: visa?.maxStay ?? "",
    processingTime: visa?.processingTime ?? "",
    visaFee: visa?.visaFee ?? "",
    serviceFee: visa?.serviceFee ?? "",
    requirements: visa?.requirements ?? [],
    notes: visa?.notes ?? "",
    region: visa?.region ?? "Africa",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const url = isEdit
        ? `/api/admin/visas/${encodeURIComponent(visa!.slug)}`
        : "/api/admin/visas";
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      router.push("/staff/dashboard/visas");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <p className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          {error}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Country name *">
          <Input
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Kenya"
            required
          />
        </Field>
        <Field label="Slug" hint="Auto-filled from name if empty">
          <Input
            value={form.slug}
            onChange={(e) => set("slug", e.target.value)}
            placeholder="kenya"
          />
        </Field>
        <Field label="Type">
          <Select
            value={form.type}
            onValueChange={(v) => v && set("type", v as FormState["type"])}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="evisa">e-Visa</SelectItem>
              <SelectItem value="eta">ETA</SelectItem>
              <SelectItem value="visa-required">Visa Required</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Visa category">
          <Input
            value={form.visaCategory}
            onChange={(e) => set("visaCategory", e.target.value)}
            placeholder="e.g. Tourist Visa"
          />
        </Field>
        <Field label="Max stay">
          <Input
            value={form.maxStay}
            onChange={(e) => set("maxStay", e.target.value)}
            placeholder="90 days"
          />
        </Field>
        <Field label="Processing time">
          <Input
            value={form.processingTime}
            onChange={(e) => set("processingTime", e.target.value)}
            placeholder="3-5 working days"
          />
        </Field>
        <Field label="Visa fee">
          <Input
            value={form.visaFee}
            onChange={(e) => set("visaFee", e.target.value)}
            placeholder="US$50"
          />
        </Field>
        <Field label="Service fee">
          <Input
            value={form.serviceFee}
            onChange={(e) => set("serviceFee", e.target.value)}
            placeholder="Contact us"
          />
        </Field>
        <Field label="Region">
          <Select
            value={form.region}
            onValueChange={(v) => v && set("region", v)}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {REGIONS.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>

      <Field label="Requirements">
        <StringListEditor
          value={form.requirements}
          onChange={(v) => set("requirements", v)}
          placeholder="e.g. Valid passport (6+ months)"
          addLabel="Add requirement"
        />
      </Field>

      <Field label="Notes" hint="Optional extra details shown on the visa card">
        <Textarea
          value={form.notes}
          onChange={(e) => set("notes", e.target.value)}
          className="min-h-[72px] resize-y"
          placeholder="e.g. Apply at least 30 days before travel"
        />
      </Field>

      <div className="flex items-center gap-3 border-t border-border pt-5">
        <Button type="submit" variant="accent" size="xl" disabled={saving}>
          <Save className="mr-2 h-4 w-4" />
          {saving ? "Saving..." : isEdit ? "Save Changes" : "Add Country"}
        </Button>
        <Link href="/staff/dashboard/visas">
          <Button type="button" variant="outline" size="xl">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Cancel
          </Button>
        </Link>
      </div>
    </form>
  );
}
