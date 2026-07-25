"use client";

import { useState } from "react";
import type { Shot } from "../data/types";
import { asset } from "../lib/asset";

/**
 * Captioned screenshot figures for a /work detail page.
 *
 * The homepage `ShotGallery` is a compact three-across strip with no room for
 * text. Here the caption is the point: several of these products have an
 * Arabic-only interface, so the caption is what lets an English reader follow
 * the screen. Orientation is measured from the file rather than duplicated into
 * the dictionaries, and a portrait shot is capped narrower than a landscape one
 * so phone screens don't blow up to full width.
 */
export function WorkShots({ shots }: { shots: Shot[] }) {
  const [landscape, setLandscape] = useState<Record<number, boolean>>({});

  const record = (index: number, img: HTMLImageElement | null) => {
    // Callback ref + onLoad both funnel here: the ref covers already-cached
    // images (onLoad may never fire for them), onLoad covers fresh loads.
    if (!img || !img.complete || !img.naturalWidth) return;
    const isLandscape = img.naturalWidth > img.naturalHeight;
    setLandscape((prev) => (prev[index] === isLandscape ? prev : { ...prev, [index]: isLandscape }));
  };

  return (
    <div className="work-shots">
      {shots.map((shot, index) => (
        <figure
          className={`work-shot${landscape[index] ? " is-landscape" : ""}`}
          key={shot.src}
        >
          <img
            ref={(img) => record(index, img)}
            src={asset(shot.src)}
            alt={shot.alt}
            loading="lazy"
            onLoad={(event) => record(index, event.currentTarget)}
          />
          {shot.caption ? <figcaption>{shot.caption}</figcaption> : null}
        </figure>
      ))}
    </div>
  );
}
