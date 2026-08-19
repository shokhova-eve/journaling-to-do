import type { TodoTile } from "./todo";

export interface ArchiveJournalItem {
  kind: "journalEntry";
  entryDate: string; // "YYYY-MM-DD"
}

export interface ArchiveTileItem {
  kind: "todoTile";
  tile: TodoTile;
}

export type ArchiveItem = ArchiveJournalItem | ArchiveTileItem;

export interface ArchiveWeekGroup {
  label: string; // e.g. "First week of August"
  weekStartISO: string;
  items: ArchiveItem[];
}
