"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

/**
 * Reports one custom event when the page mounts — `case_study_view { slug }`
 * on `/work/<slug>/`, `service_page_view { slug }` on `/services/<slug>/`.
 *
 * Plain pageviews already reach Vercel Web Analytics; this exists so the
 * question "which case study do people actually read?" is answerable next to
 * the click events, in the same dashboard, filtered by the same properties.
 * Renders nothing.
 */
export function TrackPageView({
  name,
  properties,
}: {
  name: string;
  properties: Record<string, string>;
}) {
  // Once per mount, on purpose: the props are static per page, and re-firing
  // on a prop identity change would double-count a single read.
  useEffect(() => {
    // This effect runs before `<Analytics />` has injected its script: that
    // component sits behind a Suspense boundary that a static export only
    // resolves client-side, in a later render pass — so `track()` alone
    // would be a silent no-op here. Seeding the SDK's own queue first (the
    // same `window.va` shim its HTML snippet installs) makes the call buffer
    // instead; `inject()` keeps an existing `va`, and the script drains
    // `vaq` when it loads.
    const w = window as Window & { va?: (...args: unknown[]) => void; vaq?: unknown[][] };
    w.va ??= (...args) => {
      (w.vaq ??= []).push(args);
    };
    track(name, properties);
  }, []);
  return null;
}
