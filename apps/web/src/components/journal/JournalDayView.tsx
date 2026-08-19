"use client";

import { DateHeader } from "./DateHeader";
import { WidgetGrid } from "./WidgetGrid";
import { AddWidgetMenu } from "./AddWidgetMenu";
import {
  useAddWidget,
  useDeleteWidget,
  useJournalEntry,
  useUpdateWidget,
} from "@/hooks/useJournalEntry";

export function JournalDayView({ dateISO }: { dateISO: string }) {
  const { data: entry, isPending, isError } = useJournalEntry(dateISO);
  const addWidget = useAddWidget(dateISO);
  const updateWidget = useUpdateWidget(dateISO);
  const deleteWidget = useDeleteWidget(dateISO);

  return (
    <div className="dotted-grid min-h-screen p-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          <DateHeader dateISO={dateISO} />
          <AddWidgetMenu onAdd={(type) => addWidget.mutate(type)} />
        </div>

        <div className="mt-8">
          {isPending && <p className="text-ink-soft">Loading…</p>}
          {isError && (
            <p className="text-ink-soft">{"Couldn't load this page. Try refreshing."}</p>
          )}
          {entry && entry.widgets.length === 0 && (
            <p className="text-ink-soft">
              {"A blank page today. Add a widget above whenever you're ready."}
            </p>
          )}
          {entry && entry.widgets.length > 0 && (
            <WidgetGrid
              widgets={entry.widgets}
              onUpdateWidget={(widgetId, payload) => updateWidget.mutate({ widgetId, payload })}
              onDeleteWidget={(widgetId) => deleteWidget.mutate(widgetId)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
