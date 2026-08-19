-- CreateEnum
CREATE TYPE "WidgetType" AS ENUM ('WEATHER', 'TODO_MINI', 'PROMPT', 'IMAGE');

-- CreateTable
CREATE TABLE "journal_entries" (
    "id" TEXT NOT NULL,
    "entryDate" DATE NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "journal_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "journal_widgets" (
    "id" TEXT NOT NULL,
    "journalEntryId" TEXT NOT NULL,
    "type" "WidgetType" NOT NULL,
    "position" INTEGER NOT NULL,
    "payload" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "journal_widgets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "todo_tiles" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "archivedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "todo_tiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks" (
    "id" TEXT NOT NULL,
    "todoTileId" TEXT,
    "journalWidgetId" TEXT,
    "parentTaskId" TEXT,
    "text" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "completionDate" DATE,
    "position" INTEGER NOT NULL,
    "recurrenceKey" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "toolbox_note" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL DEFAULT '',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "toolbox_note_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "journal_entries_entryDate_key" ON "journal_entries"("entryDate");

-- CreateIndex
CREATE INDEX "journal_widgets_journalEntryId_idx" ON "journal_widgets"("journalEntryId");

-- CreateIndex
CREATE INDEX "todo_tiles_archivedAt_idx" ON "todo_tiles"("archivedAt");

-- CreateIndex
CREATE INDEX "tasks_todoTileId_idx" ON "tasks"("todoTileId");

-- CreateIndex
CREATE INDEX "tasks_journalWidgetId_idx" ON "tasks"("journalWidgetId");

-- CreateIndex
CREATE INDEX "tasks_parentTaskId_idx" ON "tasks"("parentTaskId");

-- CreateIndex
CREATE INDEX "tasks_recurrenceKey_idx" ON "tasks"("recurrenceKey");

-- AddForeignKey
ALTER TABLE "journal_widgets" ADD CONSTRAINT "journal_widgets_journalEntryId_fkey" FOREIGN KEY ("journalEntryId") REFERENCES "journal_entries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_todoTileId_fkey" FOREIGN KEY ("todoTileId") REFERENCES "todo_tiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_journalWidgetId_fkey" FOREIGN KEY ("journalWidgetId") REFERENCES "journal_widgets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_parentTaskId_fkey" FOREIGN KEY ("parentTaskId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
