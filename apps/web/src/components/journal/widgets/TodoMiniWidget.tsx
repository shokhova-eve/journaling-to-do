"use client";

import { WidgetShell } from "../WidgetShell";
import type { JournalWidget } from "@journaling/shared";

export function TodoMiniWidget({
  onDelete,
}: {
  widget: JournalWidget;
  onDelete: () => void;
}) {
  return (
    <WidgetShell icon="✅" title="To-do" onDelete={onDelete}>
      <div className="flex h-full items-center justify-center text-center text-sm text-ink-soft">
        Task lists are landing here soon — check back after the To-do page ships.
      </div>
    </WidgetShell>
  );
}
