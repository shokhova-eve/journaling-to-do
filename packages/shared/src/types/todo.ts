export interface Task {
  id: string;
  todoTileId: string | null;
  journalWidgetId: string | null;
  parentTaskId: string | null;
  text: string;
  completed: boolean;
  completionDate: string | null; // ISO date, e.g. "2026-08-19"
  position: number;
  recurrenceKey: string | null;
  createdAt: string;
  updatedAt: string;
  subtasks: Task[];
}

export interface TodoTile {
  id: string;
  title: string;
  position: number;
  archivedAt: string | null;
  createdAt: string;
  updatedAt: string;
  tasks: Task[];
}
