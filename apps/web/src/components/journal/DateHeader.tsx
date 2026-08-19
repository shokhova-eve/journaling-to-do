"use client";

import { useRouter } from "next/navigation";
import { addDaysISO, formatDateHeader, todayISO } from "@/lib/date";

export function DateHeader({ dateISO }: { dateISO: string }) {
  const router = useRouter();

  function goTo(delta: number) {
    router.push(`/journal/${addDaysISO(dateISO, delta)}`);
  }

  const isToday = dateISO === todayISO();

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => goTo(-1)}
        aria-label="Previous day"
        className="rounded-full p-2 text-ink-soft hover:bg-accent-soft"
      >
        ←
      </button>

      <h1 className="text-2xl font-semibold text-ink">{formatDateHeader(dateISO)}</h1>

      <button
        onClick={() => goTo(1)}
        aria-label="Next day"
        className="rounded-full p-2 text-ink-soft hover:bg-accent-soft"
      >
        →
      </button>

      {!isToday && (
        <button
          onClick={() => router.push(`/journal/${todayISO()}`)}
          className="ml-2 rounded-full border border-border px-3 py-1 text-sm text-ink-soft hover:bg-accent-soft"
        >
          Today
        </button>
      )}
    </div>
  );
}
