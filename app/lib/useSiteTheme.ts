"use client";

import { useEffect, useState } from "react";
import type { Palette, Theme } from "../data/types";

/**
 * Theme + palette state, shared by every page chrome (the homepage `Portfolio`
 * and the reduced header on the /work pages) so a visitor's choice survives
 * navigating between them.
 *
 * State starts from the same defaults the server renders, so the first client
 * render matches the SSR HTML. `noFlashScript` (lib/site.tsx) has already
 * applied the real stored values to <html> before paint, so colors never flash;
 * we only adopt those values into React state on mount, which settles the
 * toggles after hydration. Writing back is gated on `mounted` so the mount pass
 * cannot clobber localStorage with the defaults.
 */
export function useSiteTheme() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>("dark");
  const [palette, setPalette] = useState<Palette>("current");

  useEffect(() => {
    const el = document.documentElement;
    if (el.dataset.theme === "light" || el.dataset.theme === "dark") setTheme(el.dataset.theme);
    const p = el.dataset.palette;
    if (p === "current" || p === "terracotta" || p === "teal" || p === "gold") setPalette(p);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("portfolio-theme", theme);
  }, [mounted, theme]);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.dataset.palette = palette;
    window.localStorage.setItem("portfolio-palette", palette);
  }, [mounted, palette]);

  return { theme, setTheme, palette, setPalette };
}
