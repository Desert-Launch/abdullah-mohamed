"use client";

import { useEffect, useRef, useState } from "react";
import { copy } from "../data/copy";
import { shared, bookingHref, profilePhoto } from "../data/shared";
import { asset } from "../lib/asset";
import type { Lang, Palette, Theme } from "../data/types";
import { TopBar } from "./TopBar";
import { Hero } from "./Hero";
import { CaseStudies } from "./CaseStudies";
import { ExperienceTimeline } from "./ExperienceTimeline";
import { SelectedWork } from "./SelectedWork";
import { ContactForm } from "./ContactForm";
import { CountUp } from "./CountUp";
import { Footer } from "./Footer";

export function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  // Start from the same defaults the server renders, so the first client render
  // matches the SSR HTML and hydration doesn't mismatch. The pre-paint script in
  // layout.tsx has already applied the real theme/lang/palette to <html> (from
  // localStorage), so page colors never flash — we only adopt those values into
  // React state on mount, which settles the toggle indicators after hydration.
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>("dark");
  const [lang, setLang] = useState<Lang>("en");
  const [palette, setPalette] = useState<Palette>("current");
  const [activeSection, setActiveSection] = useState("");
  const progressRef = useRef<HTMLDivElement>(null);
  const t = copy[lang];

  useEffect(() => {
    const el = document.documentElement;
    if (el.dataset.theme === "light" || el.dataset.theme === "dark") setTheme(el.dataset.theme);
    if (el.lang === "ar" || el.lang === "en") setLang(el.lang);
    const p = el.dataset.palette;
    if (p === "current" || p === "terracotta" || p === "teal") setPalette(p);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("portfolio-theme", theme);
  }, [mounted, theme]);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
    window.localStorage.setItem("portfolio-lang", lang);
  }, [mounted, lang, t.dir]);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.dataset.palette = palette;
    window.localStorage.setItem("portfolio-palette", palette);
  }, [mounted, palette]);

  // Scroll reveal: fade + rise each [data-reveal] block in as it enters view.
  // Reveal once, then stop observing. Falls back to showing everything if the
  // browser lacks IntersectionObserver.
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (els.length === 0) return;
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const revealLine = window.innerHeight * 0.9;
    const pending = els.filter((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < revealLine) {
        el.classList.add("is-visible");
        return false;
      }
      return true;
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );
    pending.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [lang]);

  // Cursor glow: cards with [data-glow] get --mx/--my custom properties that
  // drive the .card-spotlight / .card-edge radial gradients. One delegated
  // listener instead of per-card handlers; pointer devices only, and skipped
  // entirely for reduced-motion users (the glow layers stay at opacity 0
  // without hover anyway, this just avoids the per-frame style writes).
  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const card = target.closest<HTMLElement>("[data-glow]");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      card.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);

  // Reading progress: scale the fixed top bar with scroll position. Direct
  // transform writes (rAF-throttled), so no layout/transition cost.
  useEffect(() => {
    const el = progressRef.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.style.setProperty("--progress", String(progress));
    };
    const request = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request, { passive: true });
    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Scrollspy: highlight the nav link for the section currently in the band
  // around the top third of the viewport.
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const sections = t.nav
      .map(([, href]) => document.getElementById(href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    sections.forEach((section) => io.observe(section));
    return () => io.disconnect();
  }, [t.nav]);

  return (
    <div className="site-shell" data-theme={theme} data-palette={palette} data-lang={lang} dir={t.dir}>
      <div className="scroll-progress" ref={progressRef} aria-hidden="true" />
      <TopBar
        t={t}
        lang={lang}
        theme={theme}
        palette={palette}
        menuOpen={menuOpen}
        activeSection={activeSection}
        onToggleTheme={() => setTheme((value) => (value === "dark" ? "light" : "dark"))}
        onToggleLang={() => setLang((value) => (value === "en" ? "ar" : "en"))}
        onSelectPalette={setPalette}
        onToggleMenu={() => setMenuOpen((value) => !value)}
        onNavClick={() => setMenuOpen(false)}
      />

      <main id="home">
        <Hero t={t} socials={shared.socials} />

        <section className="proof-grid" aria-label="Proof points">
          {t.proof.map(([value, label]) => (
            <article key={label} data-reveal>
              <strong>
                <CountUp value={value} />
              </strong>
              <span>{label}</span>
            </article>
          ))}
        </section>

        <section className="logo-section" aria-label="Brands and products" data-reveal>
          <div className="logo-section-heading">
            <div>
              <span className="eyebrow">{t.companiesLabel} + {t.appsLabel}</span>
              <h2>{t.logosLabel}</h2>
            </div>
            <p>{t.logosIntro}</p>
          </div>

          <div className="logo-group">
            <div className="logo-group-heading">
              <h3>{t.companiesLabel}</h3>
              <span>{shared.companies.length}</span>
            </div>
            <div className="company-logo-grid">
              {shared.companies.map((item) => (
                <article className="brand-card company-brand-card" key={item.name}>
                  <img src={asset(item.src)} alt="" loading="lazy" />
                  <strong>{item.name}</strong>
                </article>
              ))}
            </div>
          </div>

          <div className="logo-group">
            <div className="logo-group-heading">
              <h3>{t.appsLabel}</h3>
              <span>{shared.products.length}</span>
            </div>
            <div className="product-logo-grid">
              {shared.products.map((item) => (
                <article className="brand-card product-brand-card" key={item.name}>
                  {item.src ? (
                    <img src={asset(item.src)} alt="" loading="lazy" />
                  ) : (
                    <span className="brand-fallback" aria-hidden="true">{item.name.charAt(0)}</span>
                  )}
                  <strong>{item.name}</strong>
                </article>
              ))}
            </div>
          </div>
        </section>

        <CaseStudies t={t} />

        <ExperienceTimeline t={t} />

        <section id="services" className="section split-section">
          <div className="section-heading sticky-heading" data-reveal>
            <p className="eyebrow">{t.servicesHeading.eyebrow}</p>
            <h2>{t.servicesHeading.title}</h2>
            <p>{t.servicesHeading.body}</p>
          </div>

          <div className="service-grid">
            {t.services.map((service, index) => (
              <article className="service-card" key={service.title} data-reveal data-glow>
                <span className="card-spotlight" aria-hidden="true" />
                <span className="card-edge" aria-hidden="true" />
                <span className="service-card-number">{String(index + 1).padStart(2, "0")}</span>
                <h3>{service.title}</h3>
                <p>{service.body}</p>
              </article>
            ))}
          </div>
        </section>

        <SelectedWork t={t} />

        <section id="about" className="section about-section">
          <div className="section-heading" data-reveal>
            <p className="eyebrow">{t.about.eyebrow}</p>
            <h2>{t.about.title}</h2>
          </div>
          <div className={`about-layout ${profilePhoto ? "has-photo" : ""}`} data-reveal>
            {profilePhoto ? (
              <img
                className="about-photo"
                src={asset(profilePhoto)}
                alt="Abdullah Mohamed"
                loading="lazy"
              />
            ) : null}
            <div className="about-body">
              {t.about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section" data-reveal>
          <div>
            <p className="eyebrow">{t.contact.eyebrow}</p>
            <h2>{t.contact.title}</h2>
            <p>{t.contact.body}</p>
            <a className="button primary contact-book" href={bookingHref}>
              {t.contact.book}
            </a>
          </div>

          <ContactForm form={t.contact.form} socials={shared.socials} />
        </section>
      </main>

      <Footer t={t} lang={lang} socials={shared.socials} />
    </div>
  );
}
