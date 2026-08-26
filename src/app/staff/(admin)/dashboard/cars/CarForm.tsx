"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Car } from "@/lib/car-data";
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
import { Field } from "@/components/staff/form-fields";
import ImageUploader from "@/components/staff/ImageUploader";
import { Save, ArrowLeft, AlertTriangle } from "lucide-react";

const CATEGORIES = ["4x4 & SUV", "Sedan", "Hatchback", "Minibus"] as const;

export default function CarForm({ car }: { car?: Car }) {
  const router = useRouter();
  const isEdit = Boolean(car);

  const [form, setForm] = useState({
    brand: car?.brand ?? "",
    model: car?.model ?? "",
    year: car?.year ?? new Date().getFullYear(),
    pricePerDay: car?.pricePerDay ?? 0,
    includedKmPerDay: car?.includedKmPerDay ?? 0,
    color: car?.color ?? "",
    colorHex: car?.colorHex ?? "#e6e6e6",
    category: car?.category ?? ("Sedan" as const),
    seats: car?.seats ?? 5,
    transmission: car?.transmission ?? ("Automatic" as const),
    fuel: car?.fuel ?? ("Petrol" as const),
    image: car?.image ?? "",
    popular: car?.popular ?? false,
    available: car?.available ?? true,
    description: car?.description ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const url = isEdit
        ? `/api/admin/cars/${encodeURIComponent(car!.id)}`
        : "/api/admin/cars";
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      router.push("/staff/dashboard/cars");
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
        <Field label="Brand *">
          <Input
            value={form.brand}
            onChange={(e) => set("brand", e.target.value)}
            placeholder="Toyota"
            required
          />
        </Field>
        <Field label="Model *">
          <Input
            value={form.model}
            onChange={(e) => set("model", e.target.value)}
            placeholder="Hilux D4D"
            required
          />
        </Field>
        <Field label="Year">
          <Input
            type="number"
            value={form.year}
            onChange={(e) => set("year", Number(e.target.value))}
          />
        </Field>
        <Field label="Price per day (US$) *">
          <Input
            type="number"
            min={0}
            value={form.pricePerDay}
            onChange={(e) => set("pricePerDay", Number(e.target.value))}
            required
          />
        </Field>
        <Field label="Included km per day">
          <Input
            type="number"
            min={0}
            value={form.includedKmPerDay}
            onChange={(e) => set("includedKmPerDay", Number(e.target.value))}
          />
        </Field>
        <Field label="Category">
          <Select
            value={form.category}
            onValueChange={(v) => v && set("category", v as (typeof form)["category"])}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Seats">
          <Input
            type="number"
            min={1}
            value={form.seats}
            onChange={(e) => set("seats", Number(e.target.value))}
          />
        </Field>
        <Field label="Transmission">
          <Select
            value={form.transmission}
            onValueChange={(v) =>
              v && set("transmission", v as (typeof form)["transmission"])
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Automatic">Automatic</SelectItem>
              <SelectItem value="Manual">Manual</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Fuel">
          <Select
            value={form.fuel}
            onValueChange={(v) => v && set("fuel", v as (typeof form)["fuel"])}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Petrol">Petrol</SelectItem>
              <SelectItem value="Diesel">Diesel</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Colour name">
          <Input
            value={form.color}
            onChange={(e) => set("color", e.target.value)}
            placeholder="White"
          />
        </Field>
        <Field label="Colour swatch">
          <input
            type="color"
            value={form.colorHex}
            onChange={(e) => set("colorHex", e.target.value)}
            className="h-10 w-full cursor-pointer rounded-lg border border-input bg-transparent px-1"
          />
        </Field>
        <div className="sm:col-span-2 lg:col-span-3">
          <ImageUploader
            value={form.image}
            onChange={(v) => set("image", v)}
            label="Photo"
            hint="Upload a photo of the vehicle, or paste a URL / /images/... path."
          />
        </div>
      </div>

      <Field label="Description">
        <Textarea
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          className="min-h-[80px] resize-y"
          placeholder="Short description shown on the fleet card"
        />
      </Field>

      <div className="flex flex-wrap gap-x-8 gap-y-2">
        <label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            checked={form.available}
            onChange={(e) => set("available", e.target.checked)}
            className="h-4 w-4 rounded border-border accent-[#ff8912]"
          />
          Available — shown in the public fleet
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            checked={form.popular}
            onChange={(e) => set("popular", e.target.checked)}
            className="h-4 w-4 rounded border-border accent-[#ff8912]"
          />
          Popular badge
        </label>
      </div>

      <div className="flex items-center gap-3 border-t border-border pt-5">
        <Button type="submit" variant="accent" size="xl" disabled={saving}>
          <Save className="mr-2 h-4 w-4" />
          {saving ? "Saving..." : isEdit ? "Save Changes" : "Add Car"}
        </Button>
        <Link href="/staff/dashboard/cars">
          <Button type="button" variant="outline" size="xl">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Cancel
          </Button>
        </Link>
      </div>
    </form>
  );
}
