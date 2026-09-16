"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

/**
 * Conversion events for every `data-track` element, via one delegated click
 * listener mounted once in the root shell.
 *
 * Links and buttons stay server-rendered: a CTA declares its event with
 * `data-track="<event>"` plus any `data-track-<prop>="<value>"` properties
 * (`data-track-source="hero"` → `{ source: "hero" }`), and this component
 * reports the click. No per-CTA client boundaries, nothing to import at the
 * call site, and the same attribute on a `<button>` or an `<a>` works alike.
 *
 * Events go to Vercel Web Analytics as custom events (`track()`); the
 * catalogue — names and properties — is in docs/analytics.md. A click can
 * only happen after hydration, by which point `<Analytics />` has installed
 * the event queue, so `track()` here never races the script.
 */
export function TrackClicks() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const el = event.target.closest<HTMLElement>("[data-track]");
      const name = el?.dataset.track;
      if (!el || !name) return;
      const props: Record<string, string> = {};
      for (const [key, value] of Object.entries(el.dataset)) {
        // dataset camel-cases `data-track-source` to `trackSource`.
        if (key === "track" || !key.startsWith("track") || value === undefined) continue;
        props[key.slice("track".length).toLowerCase()] = value;
      }
      track(name, props);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
