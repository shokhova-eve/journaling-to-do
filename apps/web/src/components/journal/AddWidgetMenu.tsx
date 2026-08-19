"use client";

import { useState } from "react";
import type { WidgetType } from "@journaling/shared";

const OPTIONS: { type: WidgetType; icon: string; label: string }[] = [
  { type: "WEATHER", icon: "🌤️", label: "Weather" },
  { type: "TODO_MINI", icon: "✅", label: "To-do" },
  { type: "PROMPT", icon: "💭", label: "What's on your mind" },
  { type: "IMAGE", icon: "🖼️", label: "Image" },
];

export function AddWidgetMenu({ onAdd }: { onAdd: (type: WidgetType) => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-ink-soft shadow-sm hover:bg-accent-soft"
      >
        + Add widget
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-20 mt-2 w-56 rounded-xl border border-border bg-surface p-1.5 shadow-lg">
            {OPTIONS.map((option) => (
              <button
                key={option.type}
                onClick={() => {
                  onAdd(option.type);
                  setOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-ink hover:bg-accent-soft"
              >
                <span>{option.icon}</span>
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
