"use client";

import { useSyncExternalStore } from "react";
import type { Theme, ThemePreference } from "../data/types";

/**
 * Theme state, shared by every page chrome (the homepage's three Auto / Light /
 * Dark controls and the sub-pages' two-state toggle) so a choice made in one
 * place shows in all of them and survives navigating between pages.
 *
 * The visitor picks a *preference*; the page shows a *theme*. "system" (the
 * default) resolves through `prefers-color-scheme` and follows the OS live.
 * The preference is stored under `portfolio-theme`; the resolved theme is
 * written to `<html data-theme>`. `noFlashScript` (lib/site.tsx) resolves the
 * same way before paint, so colors never flash.
 *
 * One module-level store, read through `useSyncExternalStore`: separate
 * `useState` copies per control would each hold their own answer. The server
 * snapshot is the default ("system", dark), so the first client render matches
 * the SSR HTML; React then re-renders with the stored value after hydration.
 */
const KEY = "portfolio-theme";
const LIGHT_QUERY = "(prefers-color-scheme: light)";

type Snapshot = { preference: ThemePreference; theme: Theme };

const SERVER_SNAPSHOT: Snapshot = { preference: "system", theme: "dark" };
let snapshot: Snapshot | null = null;
const listeners = new Set<() => void>();

function readPreference(): ThemePreference {
  try {
    const stored = window.localStorage.getItem(KEY);
    if (stored === "light" || stored === "dark" || stored === "system") return stored;
  } catch {
    // Storage blocked (private mode, sandboxed frame): fall back to the OS.
  }
  return "system";
}

function resolve(preference: ThemePreference): Theme {
  if (preference !== "system") return preference;
  return window.matchMedia(LIGHT_QUERY).matches ? "light" : "dark";
}

function update(preference: ThemePreference) {
  const theme = resolve(preference);
  if (snapshot?.preference === preference && snapshot.theme === theme) return;
  snapshot = { preference, theme };
  document.documentElement.dataset.theme = theme;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const media = window.matchMedia(LIGHT_QUERY);
  // Only matters while following the OS; an explicit choice ignores it.
  const onChange = () => update(getSnapshot().preference);
  media.addEventListener("change", onChange);
  return () => {
    listeners.delete(listener);
    media.removeEventListener("change", onChange);
  };
}

function getSnapshot(): Snapshot {
  if (!snapshot) {
    const preference = readPreference();
    snapshot = { preference, theme: resolve(preference) };
  }
  return snapshot;
}

function getServerSnapshot(): Snapshot {
  return SERVER_SNAPSHOT;
}

export function useSiteTheme() {
  const { preference, theme } = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setPreference = (next: ThemePreference) => {
    try {
      window.localStorage.setItem(KEY, next);
    } catch {
      // Not persisted, but still applied for this page view.
    }
    update(next);
  };

  return {
    /** What the visitor picked: "system", "light" or "dark". */
    preference,
    /** What the page shows. */
    theme,
    setPreference,
    /** Pick an explicit theme — the sub-pages' two-state toggle. */
    setTheme: (next: Theme) => setPreference(next),
  };
}
