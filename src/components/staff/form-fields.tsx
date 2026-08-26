"use client";

import type { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

export function Field({
  label,
  hint,
  className,
  children,
}: {
  label: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`space-y-1.5 ${className ?? ""}`}>
      <label className="text-sm font-medium text-foreground">{label}</label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function StringListEditor({
  value,
  onChange,
  placeholder,
  addLabel = "Add",
}: {
  value: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
  addLabel?: string;
}) {
  return (
    <div className="space-y-2">
      {value.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <Input
            value={item}
            onChange={(e) => {
              const next = [...value];
              next[i] = e.target.value;
              onChange(next);
            }}
            placeholder={placeholder}
          />
          <button
            type="button"
            onClick={() => onChange(value.filter((_, j) => j !== i))}
            aria-label="Remove item"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-destructive/40 hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => onChange([...value, ""])}
      >
        <Plus className="mr-1 h-3.5 w-3.5" />
        {addLabel}
      </Button>
    </div>
  );
}

export function PairsEditor({
  value,
  onChange,
  labelA = "Label",
  labelB = "Value",
  addLabel = "Add row",
}: {
  value: { label: string; value: string }[];
  onChange: (v: { label: string; value: string }[]) => void;
  labelA?: string;
  labelB?: string;
  addLabel?: string;
}) {
  return (
    <div className="space-y-2">
      {value.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <Input
            value={item.label}
            onChange={(e) => {
              const next = [...value];
              next[i] = { ...next[i], label: e.target.value };
              onChange(next);
            }}
            placeholder={labelA}
          />
          <Input
            value={item.value}
            onChange={(e) => {
              const next = [...value];
              next[i] = { ...next[i], value: e.target.value };
              onChange(next);
            }}
            placeholder={labelB}
          />
          <button
            type="button"
            onClick={() => onChange(value.filter((_, j) => j !== i))}
            aria-label="Remove row"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-destructive/40 hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => onChange([...value, { label: "", value: "" }])}
      >
        <Plus className="mr-1 h-3.5 w-3.5" />
        {addLabel}
      </Button>
    </div>
  );
}

export function HighlightsEditor({
  value,
  onChange,
}: {
  value: { title: string; description: string; image: string }[];
  onChange: (v: { title: string; description: string; image: string }[]) => void;
}) {
  return (
    <div className="space-y-3">
      {value.map((item, i) => (
        <div
          key={i}
          className="rounded-xl border border-border bg-muted/30 p-3"
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Highlight {i + 1}
            </span>
            <button
              type="button"
              onClick={() => onChange(value.filter((_, j) => j !== i))}
              aria-label="Remove highlight"
              className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-2">
            <Input
              value={item.title}
              onChange={(e) => {
                const next = [...value];
                next[i] = { ...next[i], title: e.target.value };
                onChange(next);
              }}
              placeholder="Title"
            />
            <Textarea
              value={item.description}
              onChange={(e) => {
                const next = [...value];
                next[i] = { ...next[i], description: e.target.value };
                onChange(next);
              }}
              placeholder="Description"
              className="min-h-[56px] resize-y"
            />
            <Input
              value={item.image}
              onChange={(e) => {
                const next = [...value];
                next[i] = { ...next[i], image: e.target.value };
                onChange(next);
              }}
              placeholder="Image URL or /images/... path"
            />
          </div>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() =>
          onChange([...value, { title: "", description: "", image: "" }])
        }
      >
        <Plus className="mr-1 h-3.5 w-3.5" />
        Add highlight
      </Button>
    </div>
  );
}
