import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  AUTH_PASSWORD_HASH: z.string().min(1),
  JWT_SECRET: z.string().min(16),
  COOKIE_NAME: z.string().default("journal_session"),
  WEB_ORIGIN: z.string().min(1),
  PORT: z.string().default("4000"),
});

export const env = envSchema.parse(process.env);
