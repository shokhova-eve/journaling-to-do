"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/hooks/useSession";
import { clearSessionMarker } from "@/lib/sessionMarker";

export function SessionGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data, isPending, isError } = useSession();

  useEffect(() => {
    if (isError) {
      clearSessionMarker();
      router.replace("/login");
    }
  }, [isError, router]);

  if (isPending) {
    return (
      <div className="flex flex-1 items-center justify-center text-ink-soft">
        Loading…
      </div>
    );
  }

  if (isError || !data?.authenticated) {
    return null;
  }

  return <>{children}</>;
}
