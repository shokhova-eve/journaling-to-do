import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { env } from "./env";
import { authRouter } from "./routes/auth";
import { errorHandler } from "./middleware/errorHandler";

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: env.WEB_ORIGIN,
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(cookieParser());

  app.get("/health", (_req, res) => {
    res.json({ ok: true });
  });

  app.use("/api", authRouter);

  app.use(errorHandler);

  return app;
}
