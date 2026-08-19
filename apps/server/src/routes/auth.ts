import { Router } from "express";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { env } from "../env";
import { verifyPassword } from "../lib/password";
import { requireAuth } from "../middleware/auth";
import { asyncHandler } from "../lib/asyncHandler";

export const authRouter = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
});

const loginSchema = z.object({
  password: z.string().min(1),
});

authRouter.post("/login", loginLimiter, asyncHandler(async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Password is required" });
    return;
  }

  const valid = await verifyPassword(
    parsed.data.password,
    env.AUTH_PASSWORD_HASH
  );

  if (!valid) {
    res.status(401).json({ error: "Incorrect password" });
    return;
  }

  const token = jwt.sign({ authenticated: true }, env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // web and server are always separate origins (two Railway services), so the
  // cookie must be sameSite: "none" to be sent on cross-origin fetches from the web app.
  res.cookie(env.COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.json({ authenticated: true });
}));

authRouter.post("/logout", (_req, res) => {
  res.clearCookie(env.COOKIE_NAME, { sameSite: "none", secure: true });
  res.json({ authenticated: false });
});

authRouter.get("/session", requireAuth, (_req, res) => {
  res.json({ authenticated: true });
});
