import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// The real session cookie is httpOnly and scoped to the API's origin (separate
// Railway service), so it's never sent to the Next.js server on page navigation.
// After login, the client also sets this plain marker cookie on the web app's
// own origin so this proxy can do a cheap, optimistic redirect. It carries no
// secret — the actual auth check happens against the API on every request via
// requireAuth, and (app)/layout.tsx double-checks GET /api/session to catch a
// stale marker (e.g. an expired API session with the marker still present).
const SESSION_MARKER = "has_session";

export function proxy(request: NextRequest) {
  const hasSession = request.cookies.has(SESSION_MARKER);
  const { pathname } = request.nextUrl;

  if (!hasSession && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (hasSession && pathname === "/login") {
    return NextResponse.redirect(new URL("/journal", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
