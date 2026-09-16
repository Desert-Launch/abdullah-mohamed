"use client";

import { useEffect, useState } from "react";
import type { Theme } from "../data/types";

/**
 * Dark/light state, shared by every page chrome (the homepage `Portfolio` and
 * the reduced header on the /work pages) so a visitor's choice survives
 * navigating between them.
 *
 * State starts from the same default the server renders, so the first client
 * render matches the SSR HTML. `noFlashScript` (lib/site.tsx) has already
 * applied the real stored value to <html> before paint, so colors never flash;
 * we only adopt it into React state on mount, which settles the toggle after
 * hydration. Writing back is gated on `mounted` so the mount pass cannot
 * clobber localStorage with the default.
 */
export function useSiteTheme() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const el = document.documentElement;
    if (el.dataset.theme === "light" || el.dataset.theme === "dark") setTheme(el.dataset.theme);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("portfolio-theme", theme);
  }, [mounted, theme]);

  return { theme, setTheme };
}
