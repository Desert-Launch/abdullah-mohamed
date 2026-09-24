"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { HomeCopy } from "../../data/types";

type Stack = HomeCopy["stack"];

/**
 * Products × layers. Each column is a product, each row a layer; a point is a
 * layer that product needed. Picking a product (hover, focus or click on its
 * name) lights its column and lists what it took underneath.
 *
 * The dot grid is decoration — `aria-hidden` — because the same information
 * is the list below it, which is what a screen reader gets (and a phone,
 * where the grid is dropped for a row of chips). The points scale in once
 * when the map scrolls into view; server-rendered, they are simply there.
 */
export function StackMap({
  stack,
  readCase,
  hrefs,
}: {
  stack: Stack;
  readCase: string;
  /** Case-study URL per slug, resolved on the server. */
  hrefs: Record<string, string>;
}) {
  const [selected, setSelected] = useState(0);
  const [stage, setStage] = useState<"idle" | "armed" | "in">("idle");
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mapRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Only animate a map that is still below the fold.
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    setStage("armed");
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setStage("in");
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const product = stack.products[selected];
  const used = stack.layers.filter((layer) => product.layers[layer.key]);

  return (
    <>
      <div
        className="stack-map"
        ref={mapRef}
        data-stage={stage === "idle" ? undefined : stage}
        style={{ "--products": stack.products.length } as CSSProperties}
      >
        <div className="stack-map-head" role="group" aria-label={stack.pickerLabel}>
          <span className="stack-map-corner" aria-hidden="true">
            {stack.layerLabel}
          </span>
          {stack.products.map((item, index) => (
            <button
              key={item.name}
              type="button"
              aria-pressed={index === selected}
              onClick={() => setSelected(index)}
              onFocus={() => setSelected(index)}
              onMouseEnter={() => setSelected(index)}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className="stack-map-rows" aria-hidden="true">
          {stack.layers.map((layer, layerIndex) => (
            <div
              className="stack-map-row"
              key={layer.key}
              data-used={product.layers[layer.key] ? "" : undefined}
            >
              <span className="stack-map-layer">
                <span className="stack-map-n">L{layerIndex + 1}</span>
                {layer.name}
              </span>
              {stack.products.map((item, index) => (
                <span
                  className="stack-map-cell"
                  key={item.name}
                  data-on={index === selected ? "" : undefined}
                  data-used={item.layers[layer.key] ? "" : undefined}
                  onMouseEnter={() => setSelected(index)}
                  style={{ "--d": `${layerIndex * 70 + index * 45}ms` } as CSSProperties}
                >
                  <span className="stack-map-dot" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="stack-detail" aria-live="polite">
        <div className="stack-detail-name">
          <p className="stack-detail-context">{product.context}</p>
          <p className="stack-detail-title">{product.name}</p>
          {product.slug && hrefs[product.slug] ? (
            <a className="home-link" href={hrefs[product.slug]}>
              {readCase}
              <span className="glyph-dir" aria-hidden="true">
                →
              </span>
              <span className="sr-only"> — {product.name}</span>
            </a>
          ) : null}
        </div>
        <dl className="stack-detail-layers">
          {used.map((layer) => (
            <div key={layer.key}>
              <dt>{layer.name}</dt>
              <dd>{product.layers[layer.key]}</dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
}
