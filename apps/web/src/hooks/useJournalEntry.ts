"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import type { JournalEntry, WidgetType } from "@journaling/shared";

export function useJournalEntry(dateISO: string) {
  return useQuery({
    queryKey: ["journal", dateISO],
    queryFn: () => apiClient.get<JournalEntry>(`/api/journal/${dateISO}`),
  });
}

export function useAddWidget(dateISO: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (type: WidgetType) =>
      apiClient.post(`/api/journal/${dateISO}/widgets`, { type }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["journal", dateISO] });
    },
  });
}

export function useUpdateWidget(dateISO: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ widgetId, payload }: { widgetId: string; payload: Record<string, unknown> }) =>
      apiClient.patch(`/api/journal/widgets/${widgetId}`, { payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["journal", dateISO] });
    },
  });
}

export function useDeleteWidget(dateISO: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (widgetId: string) => apiClient.delete(`/api/journal/widgets/${widgetId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["journal", dateISO] });
    },
  });
}
