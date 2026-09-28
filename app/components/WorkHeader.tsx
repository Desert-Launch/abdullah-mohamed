"use client";

import type { Dictionary, Lang } from "../data/types";
import { asset } from "../lib/asset";
import { useSiteTheme } from "../lib/useSiteTheme";
import { cvPath } from "../lib/cv";
import { inquiryPath } from "../lib/inquiry";
import { servicesIndexPath } from "../lib/services";
import { localePath } from "../lib/site";
import { workIndexPath } from "../lib/work";
import { LanguageMenu } from "./LanguageMenu";

/**
 * Reduced header for the standalone /work and /services pages.
 *
 * The homepage header (`home/HomeChrome.tsx`) is built around in-page anchors
 * and a scrollspy, neither of which exists here. This keeps the same chrome, the same theme toggle
 * (`useSiteTheme` is shared, so a visitor's choice carries across the
 * navigation) and the same language menu — without it the Arabic version of
 * these pages was reachable only from `<head>` — but swaps the section nav for
 * four links that always resolve: home, the services index, the work index,
 * and contact back on the homepage. Four short words still fit on a 320px
 * screen, so there is no hamburger.
 *
 * `section` names the index this page belongs to (marked active); `current`
 * says whether this *is* that index, which is what `aria-current` reflects.
 *
 * The last item is the one conversion action every sub-page shares: the
 * project brief. Search traffic lands on these pages, not on the homepage,
 * so the "tell me what you're building" door has to be in their header.
 */
export function WorkHeader({
  t,
  lang,
  section,
  current,
}: {
  t: Dictionary;
  lang: Lang;
  section: "work" | "services" | "cv" | "start";
  current: "index" | "detail";
}) {
  const { theme, setTheme } = useSiteTheme();
  // Home is this locale's root, so the Arabic sub-pages lead back to /ar/.
  const home = asset(localePath[lang]);
  const name = lang === "ar" ? "عبدالله محمد" : "Abdullah Mohamed";
  // Reuse the dictionary's own contact label so the two navs can't drift.
  const contact = t.nav.find(([, href]) => href === "#contact");
  const navLabel = {
    work: t.work.navLabel,
    cv: t.cv.navLabel,
    services: t.servicePages.navLabel,
    start: t.inquiry.navLabel,
  }[section];

  const indexes: { key: "services" | "work" | "cv"; href: string; label: string }[] = [
    { key: "services", href: asset(servicesIndexPath(lang)), label: t.servicePages.indexLabel },
    { key: "work", href: asset(workIndexPath(lang)), label: t.work.eyebrow },
    { key: "cv", href: asset(cvPath(lang)), label: t.cv.indexLabel },
  ];

  return (
    <header className="topbar">
      <a className="brand" href={home} aria-label={`${name} — ${t.work.home}`}>
        <span>
          <strong>{name}</strong>
          <small>{t.role}</small>
        </span>
      </a>

      <div className="topbar-actions">
        <button
          className="switch-button"
          type="button"
          aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          aria-pressed={theme === "light"}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? t.themeToggle : t.darkToggle}
        </button>
        <LanguageMenu t={t} lang={lang} />
      </div>

      <nav className="site-nav work-nav" aria-label={navLabel}>
        <a href={home}>{t.work.home}</a>
        {indexes.map((index) => {
          const isSection = index.key === section;
          return (
            <a
              key={index.key}
              href={index.href}
              className={isSection ? "is-active" : undefined}
              aria-current={isSection && current === "index" ? "page" : undefined}
            >
              {index.label}
            </a>
          );
        })}
        {contact ? <a href={`${home}${contact[1]}`}>{contact[0]}</a> : null}
        <a
          className="work-nav-cta"
          href={asset(inquiryPath(lang))}
          aria-current={section === "start" ? "page" : undefined}
          data-track="start_project_click"
          data-track-source="header"
        >
          {t.inquiry.indexLabel}
        </a>
      </nav>
    </header>
  );
}
