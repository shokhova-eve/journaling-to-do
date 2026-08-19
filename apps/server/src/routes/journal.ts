import { Router } from "express";
import { z } from "zod";
import * as journalService from "../services/journalService";
import { asyncHandler } from "../lib/asyncHandler";

export const journalRouter = Router();

const dateParamSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Expected YYYY-MM-DD");
const widgetTypeSchema = z.enum(["WEATHER", "TODO_MINI", "PROMPT", "IMAGE"]);

const createWidgetSchema = z.object({
  type: widgetTypeSchema,
  payload: z.record(z.string(), z.unknown()).optional(),
});

const updateWidgetSchema = z.object({
  payload: z.record(z.string(), z.unknown()),
});

journalRouter.get(
  "/journal/:date",
  asyncHandler(async (req, res) => {
    const date = dateParamSchema.safeParse(req.params.date);
    if (!date.success) {
      res.status(400).json({ error: "Invalid date format, expected YYYY-MM-DD" });
      return;
    }

    const entry = await journalService.getOrCreateEntry(date.data);
    res.json(entry);
  })
);

journalRouter.post(
  "/journal/:date/widgets",
  asyncHandler(async (req, res) => {
    const date = dateParamSchema.safeParse(req.params.date);
    if (!date.success) {
      res.status(400).json({ error: "Invalid date format, expected YYYY-MM-DD" });
      return;
    }

    const body = createWidgetSchema.safeParse(req.body);
    if (!body.success) {
      res.status(400).json({ error: "Invalid widget payload" });
      return;
    }

    const widget = await journalService.createWidget(date.data, body.data.type, body.data.payload ?? {});
    res.status(201).json(widget);
  })
);

journalRouter.patch(
  "/journal/widgets/:id",
  asyncHandler(async (req, res) => {
    const body = updateWidgetSchema.safeParse(req.body);
    if (!body.success) {
      res.status(400).json({ error: "Invalid payload" });
      return;
    }

    const widget = await journalService.updateWidgetPayload(req.params.id, body.data.payload);
    res.json(widget);
  })
);

journalRouter.delete(
  "/journal/widgets/:id",
  asyncHandler(async (req, res) => {
    await journalService.deleteWidget(req.params.id);
    res.status(204).send();
  })
);
