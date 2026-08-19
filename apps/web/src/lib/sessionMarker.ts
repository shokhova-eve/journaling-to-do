// Plain (non-httpOnly) marker cookie on the web app's own origin, read by
// proxy.ts for an optimistic redirect. See proxy.ts for why this exists.
const SESSION_MARKER = "has_session";

export function setSessionMarker() {
  document.cookie = `${SESSION_MARKER}=1; path=/; max-age=${30 * 24 * 60 * 60}; samesite=lax`;
}

export function clearSessionMarker() {
  document.cookie = `${SESSION_MARKER}=; path=/; max-age=0`;
}
