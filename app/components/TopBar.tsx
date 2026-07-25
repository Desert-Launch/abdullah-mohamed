import type { Dictionary, Lang, Palette, Theme } from "../data/types";
import { asset } from "../lib/asset";

const PALETTES: Palette[] = ["current", "terracotta", "teal", "gold"];

interface TopBarProps {
  t: Dictionary;
  lang: Lang;
  theme: Theme;
  palette: Palette;
  menuOpen: boolean;
  activeSection: string;
  onToggleTheme: () => void;
  /** URL of the other locale. A real link, so the language switch is
   *  crawlable and shareable rather than a client-side state flip. */
  langHref: string;
  onSelectPalette: (palette: Palette) => void;
  onToggleMenu: () => void;
  onNavClick: () => void;
}

export function TopBar({
  t,
  lang,
  theme,
  palette,
  menuOpen,
  activeSection,
  onToggleTheme,
  langHref,
  onSelectPalette,
  onToggleMenu,
  onNavClick,
}: TopBarProps) {
  return (
    <header className="topbar">
      <a className="brand" href="#home" aria-label="Abdullah Mohamed home">
        <span>
          <strong>{lang === "ar" ? "عبدالله محمد" : "Abdullah Mohamed"}</strong>
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
              onClick={() => onSelectPalette(value)}
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
          onClick={onToggleTheme}
        >
          {theme === "dark" ? t.themeToggle : t.darkToggle}
        </button>
        <a
          className="switch-button"
          href={langHref}
          hrefLang={lang === "en" ? "ar" : "en"}
          lang={lang === "en" ? "ar" : "en"}
          aria-label={lang === "en" ? "التبديل إلى العربية" : "Switch to English"}
        >
          {t.langToggle}
        </a>
      </div>

      <button
        className="menu-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="site-nav"
        onClick={onToggleMenu}
      >
        <span />
        <span />
        <span />
        <span className="sr-only">{t.menuLabel}</span>
      </button>

      <nav id="site-nav" className={`site-nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary">
        {t.nav.map(([label, href]) => {
          const isActive = activeSection !== "" && href === `#${activeSection}`;
          return (
            <a
              key={href}
              // Anchors resolve against the current document; a real route
              // (e.g. "/work/") needs the deploy basePath, which Next only
              // applies to <Link>, not to raw hrefs.
              href={href.startsWith("#") ? href : asset(href)}
              className={isActive ? "is-active" : undefined}
              aria-current={isActive ? "true" : undefined}
              onClick={onNavClick}
            >
              {label}
            </a>
          );
        })}
      </nav>
    </header>
  );
}
