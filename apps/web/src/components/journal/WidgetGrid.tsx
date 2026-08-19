"use client";

import type { JournalWidget, WidgetType } from "@journaling/shared";
import { WeatherWidget } from "./widgets/WeatherWidget";
import { PromptWidget } from "./widgets/PromptWidget";
import { ImageWidget } from "./widgets/ImageWidget";
import { TodoMiniWidget } from "./widgets/TodoMiniWidget";

const SPAN: Record<WidgetType, { col: number; row: number }> = {
  WEATHER: { col: 1, row: 1 },
  PROMPT: { col: 2, row: 1 },
  IMAGE: { col: 1, row: 2 },
  TODO_MINI: { col: 2, row: 2 },
};

export function WidgetGrid({
  widgets,
  onUpdateWidget,
  onDeleteWidget,
}: {
  widgets: JournalWidget[];
  onUpdateWidget: (widgetId: string, payload: Record<string, unknown>) => void;
  onDeleteWidget: (widgetId: string) => void;
}) {
  return (
    <div
      className="grid gap-4"
      style={{
        gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
        gridAutoRows: "130px",
      }}
    >
      {widgets.map((widget) => {
        const span = SPAN[widget.type];
        const style = { gridColumn: `span ${span.col}`, gridRow: `span ${span.row}` };
        const onDelete = () => onDeleteWidget(widget.id);
        const onUpdate = (payload: Record<string, unknown>) => onUpdateWidget(widget.id, payload);

        return (
          <div key={widget.id} style={style}>
            {widget.type === "WEATHER" && (
              <WeatherWidget widget={widget} onUpdate={onUpdate} onDelete={onDelete} />
            )}
            {widget.type === "PROMPT" && (
              <PromptWidget widget={widget} onUpdate={onUpdate} onDelete={onDelete} />
            )}
            {widget.type === "IMAGE" && (
              <ImageWidget widget={widget} onUpdate={onUpdate} onDelete={onDelete} />
            )}
            {widget.type === "TODO_MINI" && <TodoMiniWidget widget={widget} onDelete={onDelete} />}
          </div>
        );
      })}
    </div>
  );
}
