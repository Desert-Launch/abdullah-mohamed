import type { Dictionary, Lang, Theme } from "../data/types";
import { asset } from "../lib/asset";
import { LanguageMenu } from "./LanguageMenu";

interface TopBarProps {
  t: Dictionary;
  lang: Lang;
  theme: Theme;
  menuOpen: boolean;
  activeSection: string;
  onToggleTheme: () => void;
  onToggleMenu: () => void;
  onNavClick: () => void;
}

export function TopBar({
  t,
  lang,
  theme,
  menuOpen,
  activeSection,
  onToggleTheme,
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
        <button
          className="switch-button"
          type="button"
          aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          aria-pressed={theme === "light"}
          onClick={onToggleTheme}
        >
          {theme === "dark" ? t.themeToggle : t.darkToggle}
        </button>
        {/* Both locale URLs live in the menu, so the header no longer needs a
            langHref prop threaded down from Portfolio. */}
        <LanguageMenu t={t} lang={lang} />
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
