"use client";

import type { Dictionary, Palette } from "../data/types";
import { asset } from "../lib/asset";
import { useSiteTheme } from "../lib/useSiteTheme";
import { WORK_INDEX_PATH } from "../lib/work";

const PALETTES: Palette[] = ["current", "terracotta", "teal", "gold"];

/**
 * Reduced header for the standalone /work pages.
 *
 * The homepage `TopBar` is built around in-page anchors and a scrollspy, neither
 * of which exists here. This keeps the same chrome and the same theme/palette
 * controls — `useSiteTheme` is shared, so a visitor's choice carries across the
 * navigation — but swaps the section nav for three links that always resolve:
 * home, the work index, and contact back on the homepage. Three items fit on a
 * 320px screen, so there is no hamburger to open.
 */
export function WorkHeader({ t, current }: { t: Dictionary; current: "index" | "detail" }) {
  const { theme, setTheme, palette, setPalette } = useSiteTheme();
  const home = asset("/");
  const index = asset(WORK_INDEX_PATH);
  // Reuse the dictionary's own contact label so the two navs can't drift.
  const contact = t.nav.find(([, href]) => href === "#contact");

  return (
    <header className="topbar">
      <a className="brand" href={home} aria-label={`Abdullah Mohamed — ${t.work.home}`}>
        <span>
          <strong>Abdullah Mohamed</strong>
          <small>{t.role}</small>
        </span>
      </a>

      <div className="topbar-actions">
        <div className="palette-select" role="group" aria-label={t.palette.label}>
          {PALETTES.map((value) => (
            <button
              key={value}
              className={`palette-swatch palette-swatch--${value}${palette === value ? " is-active" : ""}`}
              type="button"
              aria-pressed={palette === value}
              aria-label={t.palette.options[value]}
              title={t.palette.options[value]}
              onClick={() => setPalette(value)}
            >
              <span aria-hidden="true" />
            </button>
          ))}
        </div>
        <button
          className="switch-button"
          type="button"
          aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          aria-pressed={theme === "light"}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? t.themeToggle : t.darkToggle}
        </button>
      </div>

      <nav className="site-nav work-nav" aria-label={t.work.navLabel}>
        <a href={home}>{t.work.home}</a>
        <a
          href={index}
          className={current === "index" ? "is-active" : undefined}
          aria-current={current === "index" ? "page" : undefined}
        >
          {t.work.eyebrow}
        </a>
        {contact ? <a href={`${home}${contact[1]}`}>{contact[0]}</a> : null}
      </nav>
    </header>
  );
}
