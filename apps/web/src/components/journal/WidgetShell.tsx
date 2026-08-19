"use client";

interface WidgetShellProps {
  icon: string;
  title: string;
  onDelete: () => void;
  className?: string;
  children: React.ReactNode;
}

export function WidgetShell({ icon, title, onDelete, className = "", children }: WidgetShellProps) {
  return (
    <div
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface/90 p-4 shadow-sm ${className}`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-sm font-medium text-ink-soft">
          <span>{icon}</span>
          <span>{title}</span>
        </div>
        <button
          onClick={onDelete}
          aria-label={`Remove ${title} widget`}
          className="rounded-full px-1.5 text-ink-soft opacity-0 transition hover:bg-accent-soft group-hover:opacity-100"
        >
          ×
        </button>
      </div>
      <div className="mt-2 flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
