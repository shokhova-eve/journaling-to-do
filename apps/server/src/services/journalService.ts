import { prisma } from "../prisma";
import type { WidgetType } from "@journaling/shared";

function parseDate(dateStr: string): Date {
  return new Date(`${dateStr}T00:00:00.000Z`);
}

const widgetInclude = {
  widgets: {
    orderBy: { position: "asc" as const },
    include: {
      tasks: {
        where: { parentTaskId: null },
        orderBy: { position: "asc" as const },
        include: { subtasks: { orderBy: { position: "asc" as const } } },
      },
    },
  },
};

export async function getOrCreateEntry(dateStr: string) {
  const entryDate = parseDate(dateStr);
  return prisma.journalEntry.upsert({
    where: { entryDate },
    update: {},
    create: { entryDate },
    include: widgetInclude,
  });
}

export async function createWidget(dateStr: string, type: WidgetType, payload: unknown) {
  const entry = await getOrCreateEntry(dateStr);

  const maxPosition = await prisma.journalWidget.aggregate({
    where: { journalEntryId: entry.id },
    _max: { position: true },
  });
  const position = (maxPosition._max.position ?? -1) + 1;

  return prisma.journalWidget.create({
    data: {
      journalEntryId: entry.id,
      type,
      position,
      payload: (payload ?? {}) as object,
    },
  });
}

export async function updateWidgetPayload(widgetId: string, payload: unknown) {
  return prisma.journalWidget.update({
    where: { id: widgetId },
    data: { payload: (payload ?? {}) as object },
  });
}

export async function deleteWidget(widgetId: string) {
  await prisma.journalWidget.delete({ where: { id: widgetId } });
}
