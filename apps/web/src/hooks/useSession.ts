"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient, ApiError } from "@/lib/apiClient";

interface SessionResponse {
  authenticated: boolean;
}

export function useSession() {
  return useQuery({
    queryKey: ["session"],
    queryFn: () => apiClient.get<SessionResponse>("/api/session"),
    retry: false,
    staleTime: 60_000,
    throwOnError: (error) => !(error instanceof ApiError && error.status === 401),
  });
}
