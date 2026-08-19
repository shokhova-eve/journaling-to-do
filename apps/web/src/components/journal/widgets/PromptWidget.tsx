"use client";

import { WidgetShell } from "../WidgetShell";
import { InlineEditableText } from "@/components/shared/InlineEditableText";
import type { JournalWidget, PromptPayload } from "@journaling/shared";

export function PromptWidget({
  widget,
  onUpdate,
  onDelete,
}: {
  widget: JournalWidget;
  onUpdate: (payload: Record<string, unknown>) => void;
  onDelete: () => void;
}) {
  const payload = widget.payload as PromptPayload;

  return (
    <WidgetShell icon="💭" title="What's on your mind" onDelete={onDelete}>
      <InlineEditableText
        value={payload.text ?? ""}
        onSave={(text) => onUpdate({ text })}
        placeholder="Write a little something…"
        multiline
        className="h-full text-sm text-ink"
      />
    </WidgetShell>
  );
}
