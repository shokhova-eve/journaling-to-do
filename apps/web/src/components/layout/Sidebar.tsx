"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { apiClient } from "@/lib/apiClient";
import { clearSessionMarker } from "@/lib/sessionMarker";

const NAV_ITEMS = [
  { href: "/journal", label: "Journal", icon: "📔" },
  { href: "/todo", label: "To-do", icon: "✅" },
  { href: "/toolbox", label: "Toolbox", icon: "🧰" },
  { href: "/archive", label: "Archive", icon: "🗂️" },
];

const STORAGE_KEY = "sidebar-collapsed";

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) setCollapsed(stored === "1");
  }, []);

  function toggleCollapsed() {
    setCollapsed((prev) => {
      const next = !prev;
      window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      return next;
    });
  }

  async function handleLogout() {
    await apiClient.post("/api/logout");
    clearSessionMarker();
    router.push("/login");
    router.refresh();
  }

  return (
    <aside
      className={`flex h-screen flex-col justify-between border-r border-border bg-surface transition-all ${
        collapsed ? "w-16" : "w-56"
      }`}
    >
      <div>
        <div className="flex items-center justify-between px-3 py-4">
          {!collapsed && <span className="font-semibold text-ink">Journal</span>}
          <button
            onClick={toggleCollapsed}
            aria-label="Toggle sidebar"
            className="rounded p-1 text-ink-soft hover:bg-accent-soft"
          >
            {collapsed ? "»" : "«"}
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-2">
          {NAV_ITEMS.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-accent-soft text-ink"
                    : "text-ink-soft hover:bg-accent-soft/60"
                }`}
              >
                <span>{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="px-2 pb-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-ink-soft hover:bg-accent-soft/60"
        >
          <span>👋</span>
          {!collapsed && <span>Log out</span>}
        </button>
      </div>
    </aside>
  );
}
