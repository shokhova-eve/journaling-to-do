"use client";

import { WidgetShell } from "../WidgetShell";
import { InlineEditableText } from "@/components/shared/InlineEditableText";
import type { JournalWidget, WeatherPayload } from "@journaling/shared";

const ICON_OPTIONS = ["☀️", "⛅", "☁️", "🌧️", "⛈️", "❄️", "🌬️", "🌫️"];

export function WeatherWidget({
  widget,
  onUpdate,
  onDelete,
}: {
  widget: JournalWidget;
  onUpdate: (payload: Record<string, unknown>) => void;
  onDelete: () => void;
}) {
  const payload = widget.payload as WeatherPayload;
  const iconKey = payload.iconKey || "☀️";

  return (
    <WidgetShell icon="🌤️" title="Weather" onDelete={onDelete}>
      <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
        <div className="flex flex-wrap justify-center gap-1">
          {ICON_OPTIONS.map((icon) => (
            <button
              key={icon}
              onClick={() => onUpdate({ ...payload, iconKey: icon })}
              className={`rounded-lg px-1.5 py-0.5 text-lg transition ${
                icon === iconKey ? "bg-accent-soft" : "hover:bg-accent-soft/50"
              }`}
              aria-label={`Set weather icon to ${icon}`}
            >
              {icon}
            </button>
          ))}
        </div>

        <InlineEditableText
          value={payload.temperature ?? ""}
          onSave={(temperature) => onUpdate({ ...payload, temperature })}
          placeholder="Temp"
          className="text-center text-lg font-semibold text-ink"
        />

        <InlineEditableText
          value={payload.condition ?? ""}
          onSave={(condition) => onUpdate({ ...payload, condition })}
          placeholder="Condition"
          className="text-center text-sm text-ink-soft"
        />
      </div>
    </WidgetShell>
  );
}
