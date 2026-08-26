"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { DestinationContent } from "@/lib/destination-content";
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
import {
  Field,
  StringListEditor,
  PairsEditor,
  HighlightsEditor,
} from "@/components/staff/form-fields";
import ImageUploader from "@/components/staff/ImageUploader";
import { Save, ArrowLeft, AlertTriangle } from "lucide-react";

type FormState = {
  slug: string;
  name: string;
  country: string;
  region: "domestic" | "regional" | "international";
  shortDescription: string;
  image: string;
  location: string;
  tagline: string;
  description: string;
  heroImage: string;
  bookUrl: string;
  facts: { label: string; value: string }[];
  highlights: { title: string; description: string; image: string }[];
  gallery: string[];
  tips: string[];
  relatedPackages: string[];
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
  published: boolean;
};

function toForm(data?: DestinationContent, extra?: {
  shortDescription: string;
  country: string;
  region: string;
  image: string;
  published: boolean;
}): FormState {
  return {
    slug: data?.slug ?? "",
    name: data?.name ?? "",
    country: extra?.country ?? "",
    region: (extra?.region as FormState["region"]) ?? "domestic",
    shortDescription: extra?.shortDescription ?? "",
    image: extra?.image ?? "",
    location: data?.location ?? "",
    tagline: data?.tagline ?? "",
    description: data?.description ?? "",
    heroImage: data?.heroImage ?? "",
    bookUrl: data?.bookUrl ?? "",
    facts: data?.facts ?? [],
    highlights: data?.highlights ?? [],
    gallery: data?.gallery ?? [],
    tips: data?.tips ?? [],
    relatedPackages: data?.relatedPackages ?? [],
    ctaTitle: data?.ctaTitle ?? "Plan Your Trip",
    ctaText: data?.ctaText ?? "",
    ctaButton: data?.ctaButton ?? "Get a Quote",
    published: extra?.published ?? true,
  };
}

export default function DestinationForm({
  data,
  extra,
}: {
  data?: DestinationContent;
  extra?: {
    shortDescription: string;
    country: string;
    region: string;
    image: string;
    published: boolean;
  };
}) {
  const router = useRouter();
  const isEdit = Boolean(data);
  const [form, setForm] = useState<FormState>(() => toForm(data, extra));
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
        ? `/api/admin/destinations/${encodeURIComponent(form.slug)}`
        : "/api/admin/destinations";
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const response = await res.json();
      if (!res.ok) throw new Error(response.error || "Save failed");
      router.push("/staff/dashboard/destinations");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <p className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          {error}
        </p>
      )}

      {/* Listing */}
      <section className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
          Listing
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Name *">
            <Input
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Victoria Falls"
              required
            />
          </Field>
          <Field label="Slug" hint="URL identifier — auto-filled from name if empty">
            <Input
              value={form.slug}
              onChange={(e) => set("slug", e.target.value)}
              placeholder="victoria-falls"
            />
          </Field>
          <Field label="Country">
            <Input
              value={form.country}
              onChange={(e) => set("country", e.target.value)}
              placeholder="Zimbabwe"
            />
          </Field>
          <Field label="Region">
            <Select
              value={form.region}
              onValueChange={(v) =>
                v && set("region", v as FormState["region"])
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="domestic">Zimbabwe</SelectItem>
                <SelectItem value="regional">Southern Africa</SelectItem>
                <SelectItem value="international">International</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <div className="sm:col-span-2 lg:col-span-3">
            <ImageUploader
              value={form.image}
              onChange={(v) => set("image", v)}
              label="Card image"
              hint="Shown on the destinations listing card."
            />
          </div>
          <Field label="Card description">
            <Input
              value={form.shortDescription}
              onChange={(e) => set("shortDescription", e.target.value)}
              placeholder="One of the Seven Natural Wonders of the World..."
            />
          </Field>
        </div>
      </section>

      {/* Hero */}
      <section className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
          Hero
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Location line">
            <Input
              value={form.location}
              onChange={(e) => set("location", e.target.value)}
              placeholder="Zimbabwe — Matabeleland North"
            />
          </Field>
          <Field label="Tagline">
            <Input
              value={form.tagline}
              onChange={(e) => set("tagline", e.target.value)}
              placeholder="One of the Seven Natural Wonders of the World"
            />
          </Field>
          <div className="sm:col-span-2">
            <ImageUploader
              value={form.heroImage}
              onChange={(v) => set("heroImage", v)}
              label="Hero image"
              hint="Full-width background for the destination page."
            />
          </div>
          <Field label="Description" className="sm:col-span-2">
            <Textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              className="min-h-[90px] resize-y"
              placeholder="Main description shown on the destination page"
            />
          </Field>
          <Field label="Book URL" className="sm:col-span-2">
            <Input
              value={form.bookUrl}
              onChange={(e) => set("bookUrl", e.target.value)}
              placeholder="/book?destination=Victoria+Falls"
            />
          </Field>
        </div>
      </section>

      {/* Facts */}
      <section className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
          Quick facts
        </h2>
        <PairsEditor
          value={form.facts}
          onChange={(v) => set("facts", v)}
          labelA="Label (e.g. Best time to visit)"
          labelB="Value"
          addLabel="Add fact"
        />
      </section>

      {/* Highlights */}
      <section className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
          Highlights
        </h2>
        <HighlightsEditor
          value={form.highlights}
          onChange={(v) => set("highlights", v)}
        />
      </section>

      {/* Gallery */}
      <section className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
          Gallery
        </h2>
        <StringListEditor
          value={form.gallery}
          onChange={(v) => set("gallery", v)}
          placeholder="Image URL or /images/... path"
          addLabel="Add image"
        />
      </section>

      {/* Tips */}
      <section className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
          Travel tips
        </h2>
        <StringListEditor
          value={form.tips}
          onChange={(v) => set("tips", v)}
          placeholder="e.g. Best months to visit"
          addLabel="Add tip"
        />
      </section>

      {/* Related packages */}
      <section className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
          Related packages
        </h2>
        <StringListEditor
          value={form.relatedPackages}
          onChange={(v) => set("relatedPackages", v)}
          placeholder="/packages/vic-falls-weekend"
          addLabel="Add package"
        />
      </section>

      {/* CTA */}
      <section className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
          Call to action
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Title">
            <Input
              value={form.ctaTitle}
              onChange={(e) => set("ctaTitle", e.target.value)}
            />
          </Field>
          <Field label="Button label">
            <Input
              value={form.ctaButton}
              onChange={(e) => set("ctaButton", e.target.value)}
            />
          </Field>
          <Field label="Text" className="sm:col-span-3">
            <Textarea
              value={form.ctaText}
              onChange={(e) => set("ctaText", e.target.value)}
              className="min-h-[60px] resize-y"
            />
          </Field>
        </div>
      </section>

      <label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
        <input
          type="checkbox"
          checked={form.published}
          onChange={(e) => set("published", e.target.checked)}
          className="h-4 w-4 rounded border-border accent-[#ff8912]"
        />
        Published — shown in the public destinations listing
      </label>

      <div className="flex items-center gap-3 border-t border-border pt-5">
        <Button type="submit" variant="accent" size="xl" disabled={saving}>
          <Save className="mr-2 h-4 w-4" />
          {saving ? "Saving..." : isEdit ? "Save Changes" : "Add Destination"}
        </Button>
        <Link href="/staff/dashboard/destinations">
          <Button type="button" variant="outline" size="xl">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Cancel
          </Button>
        </Link>
      </div>
    </form>
  );
}
