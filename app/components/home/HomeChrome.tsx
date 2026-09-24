"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { Dictionary, HomeCopy, Lang } from "../../data/types";
import { LanguageMenu } from "../LanguageMenu";
import { ThemeSwitch } from "./ThemeSwitch";
import { pad } from "./parts";

export interface ChromeProps {
  lang: Lang;
  name: string;
  /** Accessible name of the brand link. */
  homeLabel: string;
  backToTop: string;
  /** Section anchors, in page order; `id` is the target without the "#". */
  nav: { label: string; href: string; id: string }[];
  cv: { href: string; label: string };
  talk: string;
  chrome: HomeCopy["chrome"];
  theme: HomeCopy["theme"];
  language: Dictionary["language"];
  /** The other locale's homepage, for the menu's language link. */
  alternate: { href: string; lang: Lang };
}

/** How far the header has to scroll away before the floating nav comes in. */
const FLOAT_AFTER = 140;

/**
 * The homepage chrome: the static header, the floating pill nav that replaces
 * it once it scrolls away, and the full-screen menu on phones.
 *
 * The floating nav is `inert` while hidden, so its links are out of the tab
 * order until it is on screen. The menu is a modal dialog: focus moves into
 * it, Tab stays inside, Escape closes it, and focus returns to the button that
 * opened it.
 */
export function HomeChrome(props: ChromeProps) {
  const { lang, name, homeLabel, backToTop, nav, cv, talk, chrome, theme, language, alternate } =
    props;
  const [floating, setFloating] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setFloating(window.scrollY > FLOAT_AFTER);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy. A section without a nav entry of its own (the stack map, the
  // recommendations, the plans) keeps the nav entry of the section it follows.
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section[id]"));
    const navIds = new Set(nav.map((item) => item.id));
    const owner = new Map<string, string>();
    let current = "";
    for (const section of sections) {
      if (navIds.has(section.id)) current = section.id;
      owner.set(section.id, current);
    }
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((entry) => entry.isIntersecting);
        if (hit) setActive(owner.get(hit.target.id) ?? "");
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => io.observe(section));
    return () => io.disconnect();
  }, [nav]);

  useEffect(() => {
    if (!menuOpen) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      root.style.overflow = previous;
    };
  }, [menuOpen]);

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    openerRef.current = event.currentTarget;
    setMenuOpen(true);
  };

  const closeMenu = (returnFocus: boolean) => {
    setMenuOpen(false);
    if (returnFocus) openerRef.current?.focus();
  };

  const onDialogKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      closeMenu(true);
      return;
    }
    if (event.key !== "Tab") return;
    const focusable = Array.from(
      dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ) ?? [],
    ).filter((el) => el.offsetParent !== null);
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <>
      <header className="home-header">
        <a className="home-brand" href="#top" aria-label={homeLabel}>
          <span className="home-mark" aria-hidden="true">
            AM
          </span>
          <span className="home-brand-name">{name}</span>
        </a>
        <nav className="home-nav" aria-label={chrome.primaryNav}>
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="home-header-tools">
          <a className="home-header-link" href={cv.href}>
            {cv.label}
          </a>
          <LanguageMenu t={{ language }} lang={lang} />
          <ThemeSwitch copy={theme} />
          <button
            className="home-menu-button"
            type="button"
            aria-label={chrome.openMenu}
            aria-expanded={menuOpen}
            aria-controls="home-menu"
            onClick={openMenu}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </header>

      <div className="home-float" data-visible={floating || undefined} inert={!floating}>
        <nav className="home-float-nav" aria-label={chrome.stickyNav}>
          <a className="home-float-brand" href="#top" aria-label={backToTop}>
            <span className="home-mark home-mark--small" aria-hidden="true">
              AM
            </span>
            <span className="home-float-name" aria-hidden="true">
              {name}
            </span>
          </a>
          <div className="home-float-links">
            {nav.map((item) => {
              const isActive = active === item.id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={isActive ? "is-active" : undefined}
                  aria-current={isActive ? "true" : undefined}
                >
                  {item.label}
                </a>
              );
            })}
            <a className="home-float-cta" href="#contact">
              {talk}
            </a>
          </div>
          <button
            className="home-float-menu"
            type="button"
            aria-label={chrome.openMenu}
            aria-expanded={menuOpen}
            aria-controls="home-menu"
            onClick={openMenu}
          >
            {chrome.menu}
          </button>
        </nav>
      </div>

      {menuOpen ? (
        <div
          className="home-menu"
          id="home-menu"
          role="dialog"
          aria-modal="true"
          aria-label={chrome.menu}
          ref={dialogRef}
          onKeyDown={onDialogKeyDown}
        >
          <div className="home-menu-head">
            <span className="home-menu-name">{name}</span>
            <button
              className="home-menu-close"
              type="button"
              aria-label={chrome.closeMenu}
              ref={closeRef}
              onClick={() => closeMenu(true)}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <nav className="home-menu-nav" aria-label={chrome.menu}>
            {nav.map((item, index) => (
              <a key={item.href} href={item.href} onClick={() => closeMenu(false)}>
                <span>{item.label}</span>
                <span className="home-menu-n" aria-hidden="true">
                  {pad(index + 1)}
                </span>
              </a>
            ))}
          </nav>
          <div className="home-menu-foot">
            <div className="home-menu-actions">
              <a className="button primary" href="#contact" onClick={() => closeMenu(false)}>
                {talk}
              </a>
              <a className="button ghost" href={cv.href}>
                {cv.label}
              </a>
            </div>
            <div className="home-menu-prefs">
              <ThemeSwitch copy={theme} large />
              <a
                className="home-menu-lang"
                href={alternate.href}
                hrefLang={alternate.lang}
                lang={alternate.lang}
              >
                {language.options[alternate.lang]}
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
