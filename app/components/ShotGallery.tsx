"use client";

import { useState } from "react";
import { asset } from "../lib/asset";

/**
 * Screenshot strip used by case studies and app cards. Detects each image's
 * orientation once it loads and adapts the grid:
 * - all portrait  → the classic 3-across strip (default)
 * - mixed         → portrait shots span two rows, landscape shots stack
 *                   beside them under each other
 * - all landscape → one full-width stack
 * Orientation is a property of the image files, so it's measured from
 * naturalWidth/Height instead of being duplicated into the dictionaries.
 */
export function ShotGallery({ shots, title }: { shots: string[]; title: string }) {
  const [landscape, setLandscape] = useState<Record<number, boolean>>({});

  const measured = Object.keys(landscape).length;
  const landscapeCount = Object.values(landscape).filter(Boolean).length;
  const layout =
    measured < shots.length || landscapeCount === 0
      ? ""
      : landscapeCount === shots.length
        ? " shots-landscape"
        : " shots-mixed";

  const record = (index: number, img: HTMLImageElement | null) => {
    // Callback ref + onLoad both funnel here: the ref covers already-cached
    // images (onLoad may never fire for them), onLoad covers fresh loads.
    if (!img || !img.complete || !img.naturalWidth) return;
    const isLandscape = img.naturalWidth > img.naturalHeight;
    setLandscape((prev) => (prev[index] === isLandscape ? prev : { ...prev, [index]: isLandscape }));
  };

  return (
    <div className={`case-shots${layout}`}>
      {shots.map((shot, index) => (
        <img
          key={shot}
          ref={(img) => record(index, img)}
          src={asset(shot)}
          alt={`${title} screenshot`}
          loading="lazy"
          className={landscape[index] ? "is-landscape" : undefined}
          onLoad={(event) => record(index, event.currentTarget)}
        />
      ))}
    </div>
  );
}
