"use client";

import { useEffect, useState } from "react";
import { WidgetShell } from "../WidgetShell";
import type { ImagePayload, JournalWidget } from "@journaling/shared";

interface ImageAsset {
  id: string;
  filename: string;
  label: string;
}

export function ImageWidget({
  widget,
  onUpdate,
  onDelete,
}: {
  widget: JournalWidget;
  onUpdate: (payload: Record<string, unknown>) => void;
  onDelete: () => void;
}) {
  const payload = widget.payload as ImagePayload;
  const [assets, setAssets] = useState<ImageAsset[]>([]);

  useEffect(() => {
    fetch("/widget-assets/images/manifest.json")
      .then((res) => res.json())
      .then(setAssets)
      .catch(() => setAssets([]));
  }, []);

  const selected = assets.find((asset) => asset.id === payload.assetId);

  return (
    <WidgetShell icon="🖼️" title="Image" onDelete={onDelete}>
      {selected ? (
        <button
          onClick={() => onUpdate({ assetId: undefined })}
          className="group/img relative h-full w-full overflow-hidden rounded-lg"
          title="Click to change image"
        >
          <img
            src={`/widget-assets/images/${selected.filename}`}
            alt={selected.label}
            className="h-full w-full object-cover"
          />
          <span className="absolute inset-0 hidden items-center justify-center bg-ink/40 text-xs font-medium text-white group-hover/img:flex">
            Change image
          </span>
        </button>
      ) : (
        <div className="grid h-full grid-cols-2 gap-1.5">
          {assets.map((asset) => (
            <button
              key={asset.id}
              onClick={() => onUpdate({ assetId: asset.id })}
              className="overflow-hidden rounded-lg border border-border hover:opacity-80"
            >
              <img
                src={`/widget-assets/images/${asset.filename}`}
                alt={asset.label}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </WidgetShell>
  );
}
