import type { Task } from "./todo";

export type WidgetType = "WEATHER" | "TODO_MINI" | "PROMPT" | "IMAGE";

export interface WeatherPayload {
  condition: string;
  iconKey: string;
  temperature: string;
}

export interface TodoMiniPayload {
  // intentionally empty — content lives in Task rows via journalWidgetId
}

export interface PromptPayload {
  text: string;
}

export interface ImagePayload {
  assetId: string;
}

export type WidgetPayload =
  | { type: "WEATHER"; payload: WeatherPayload }
  | { type: "TODO_MINI"; payload: TodoMiniPayload }
  | { type: "PROMPT"; payload: PromptPayload }
  | { type: "IMAGE"; payload: ImagePayload };

export interface JournalWidget {
  id: string;
  journalEntryId: string;
  type: WidgetType;
  position: number;
  payload: WeatherPayload | TodoMiniPayload | PromptPayload | ImagePayload;
  tasks: Task[]; // only populated when type === "TODO_MINI"
  createdAt: string;
  updatedAt: string;
}

export interface JournalEntry {
  id: string;
  entryDate: string; // "YYYY-MM-DD"
  widgets: JournalWidget[];
  createdAt: string;
  updatedAt: string;
}
