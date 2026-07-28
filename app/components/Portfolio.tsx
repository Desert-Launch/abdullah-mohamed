"use client";

import { useEffect, useRef, useState } from "react";
import { copy } from "../data/copy";
import { shared, bookingHref, profilePhoto } from "../data/shared";
import { asset } from "../lib/asset";
import { localePath, otherLang } from "../lib/site";
import { useSiteTheme } from "../lib/useSiteTheme";
import type { Lang, PlanIcon } from "../data/types";
import { AgentTools } from "./AgentTools";
import { TopBar } from "./TopBar";
import { Hero } from "./Hero";
import { CaseStudies } from "./CaseStudies";
import { ExperienceTimeline } from "./ExperienceTimeline";
import { SelectedWork } from "./SelectedWork";
import { ContactForm } from "./ContactForm";
import { CountUp } from "./CountUp";
import { Footer } from "./Footer";

/** Header glyph for each plan tier, keyed by `Plan.icon`. */
function PlanGlyph({ icon }: { icon: PlanIcon }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (icon === "layers") {
    return (
      <svg {...common}>
        <path d="M12 3 3 7.5l9 4.5 9-4.5L12 3Z" />
        <path d="M3 12.5 12 17l9-4.5" />
        <path d="M3 17 12 21.5 21 17" />
      </svg>
    );
  }
  if (icon === "browser") {
    return (
      <svg {...common}>
        <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
        <path d="M3 9h18" />
        <path d="M6.5 6.75h.01M9.25 6.75h.01" />
      </svg>
    );
  }
  if (icon === "spark") {
    return (
      <svg {...common}>
        <path d="M12 3.5c.9 3.6 2 4.7 5.6 5.6-3.6.9-4.7 2-5.6 5.6-.9-3.6-2-4.7-5.6-5.6 3.6-.9 4.7-2 5.6-5.6Z" />
        <path d="M17.5 15.5c.45 1.8 1 2.35 2.8 2.8-1.8.45-2.35 1-2.8 2.8-.45-1.8-1-2.35-2.8-2.8 1.8-.45 2.35-1 2.8-2.8Z" />
      </svg>
    );
  }
  // mobile
  return (
    <svg {...common}>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M10.5 5.25h3" />
      <path d="M10.75 18.5h2.5" />
    </svg>
  );
}

/** Inline check mark reused across plan feature lists. */
function PlanCheck() {
  return (
    <svg
      className="plan-check"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function Portfolio({ lang }: { lang: Lang }) {
  const [menuOpen, setMenuOpen] = useState(false);
  // Language comes from the route, not from state — each locale is its own URL
  // with its own server-rendered HTML, so there is nothing to toggle client-side.
  // Theme and palette stay client state, shared with the /work pages' header via
  // useSiteTheme so the choice survives navigating off the homepage.
  const { theme, setTheme, palette, setPalette } = useSiteTheme();
  const [activeSection, setActiveSection] = useState("");
  const progressRef = useRef<HTMLDivElement>(null);
  const backToTopRef = useRef<HTMLAnchorElement>(null);
  const t = copy[lang];
  // Every quote in the dictionaries is a real LinkedIn recommendation. The
  // section still hides itself if the list is ever emptied.
  const testimonials = t.testimonials;

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
      // Cards that opt into [data-tilt] also lean toward the cursor (subtle
      // 3D tilt, max ±4deg — clamped by the 0.5 range of px/py).
      if (card.hasAttribute("data-tilt")) {
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.setProperty("--rx", `${(-py * 8).toFixed(2)}deg`);
        card.style.setProperty("--ry", `${(px * 8).toFixed(2)}deg`);
      }
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);

  // Magnetic CTAs: buttons with [data-magnetic] drift a few pixels toward the
  // cursor while hovered and spring back on leave. Pointer devices only.
  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"));
    if (els.length === 0) return;
    const pull = 0.22;
    const onMove = (event: PointerEvent) => {
      const el = event.currentTarget as HTMLElement;
      const rect = el.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      el.style.setProperty("--tx", `${(dx * pull).toFixed(1)}px`);
      el.style.setProperty("--ty", `${(dy * pull).toFixed(1)}px`);
    };
    const onLeave = (event: PointerEvent) => {
      const el = event.currentTarget as HTMLElement;
      el.style.setProperty("--tx", "0px");
      el.style.setProperty("--ty", "0px");
    };
    els.forEach((el) => {
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
    });
    return () =>
      els.forEach((el) => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      });
  }, [lang]);

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
      backToTopRef.current?.classList.toggle("is-visible", window.scrollY > 600);
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
      {/* Renders nothing. Offers this page's content to an AI agent driving the
          browser, via WebMCP — see AgentTools.tsx. */}
      <AgentTools t={t} lang={lang} />
      {/* Living aurora — three blurred orbs drifting at glacial speed over the
          static gradient wash. Pure transform animation on pre-painted layers
          (compositor work, not repaints); static under reduced motion. */}
      <div className="aurora-field" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="scroll-progress" ref={progressRef} aria-hidden="true" />
      <TopBar
        t={t}
        lang={lang}
        theme={theme}
        palette={palette}
        menuOpen={menuOpen}
        activeSection={activeSection}
        onToggleTheme={() => setTheme((value) => (value === "dark" ? "light" : "dark"))}
        langHref={asset(localePath[otherLang[lang]])}
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
            {/* Auto-scrolling marquee (paused on hover/focus; falls back to a
                wrapped static row for reduced-motion users). dir=ltr keeps the
                loop math identical in Arabic — brand names are not translated. */}
            <div className="logo-marquee" dir="ltr">
              <div className="logo-marquee-track">
                {[false, true].map((isDuplicate) => (
                  <div
                    className="logo-marquee-group"
                    key={isDuplicate ? "dup" : "main"}
                    aria-hidden={isDuplicate || undefined}
                  >
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
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Commercial content first: a cold visitor sees what I build and what
            it costs before the credential history. Case studies then justify the
            price, testimonials sit beside that proof, and Experience follows as
            the appendix it is. Section ids are unchanged — only order moved. */}
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

        <section id="plans" className="section">
          <div className="section-heading" data-reveal>
            <p className="eyebrow">{t.plansHeading.eyebrow}</p>
            <h2>{t.plansHeading.title}</h2>
            {t.plansHeading.body ? <p>{t.plansHeading.body}</p> : null}
          </div>
          <div className="plans-grid">
            {t.plans.map((plan) => (
              <article
                className={`plan-card${plan.featured ? " featured" : ""}`}
                key={plan.name}
                data-reveal
                data-glow
              >
                <span className="card-spotlight" aria-hidden="true" />
                <span className="card-edge" aria-hidden="true" />
                {plan.badge ? <span className="plan-badge">{plan.badge}</span> : null}
                <span className="plan-icon" aria-hidden="true">
                  <PlanGlyph icon={plan.icon} />
                </span>
                <h3 className="plan-name">{plan.name}</h3>
                <p className="plan-lead">{plan.body}</p>
                <p className="plan-price">{plan.price}</p>
                <p className="plan-price-note">{plan.priceNote}</p>
                <a
                  className={`button ${plan.featured ? "primary" : "ghost"} plan-cta`}
                  href="#contact"
                >
                  {plan.cta}
                </a>
                {plan.itemsIntro ? (
                  <p className="plan-items-intro">{plan.itemsIntro}</p>
                ) : null}
                <ul className="plan-items">
                  {plan.items.map((item) => (
                    <li key={item}>
                      <PlanCheck />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <CaseStudies t={t} lang={lang} />

        {testimonials.length > 0 ? (
          <section id="testimonials" className="section">
            <div className="section-heading" data-reveal>
              <p className="eyebrow">{t.testimonialsHeading.eyebrow}</p>
              <h2>{t.testimonialsHeading.title}</h2>
              {t.testimonialsHeading.body ? <p>{t.testimonialsHeading.body}</p> : null}
            </div>
            <div className="testimonial-grid">
              {testimonials.map((item) => (
                <figure className="testimonial-card" key={item.name} data-reveal data-glow>
                  <span className="card-spotlight" aria-hidden="true" />
                  <span className="card-edge" aria-hidden="true" />
                  {item.linkedin ? (
                    <span className="testimonial-verified">
                      <svg
                        className="testimonial-verified-check"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      {t.testimonialLabels.verified}
                    </span>
                  ) : null}
                  <blockquote>{item.quote}</blockquote>
                  <figcaption>
                    {item.image ? (
                      <img
                        className="testimonial-avatar"
                        src={asset(item.image)}
                        alt=""
                        loading="lazy"
                      />
                    ) : null}
                    <div>
                      <strong>{item.name}</strong>
                      <span>{item.role}</span>
                    </div>
                    {item.linkedin ? (
                      <a
                        className="testimonial-linkedin"
                        href={item.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={t.testimonialLabels.view}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 9.67H5.67V18h2.67V9.67zM7 5.67a1.55 1.55 0 1 0 0 3.1 1.55 1.55 0 0 0 0-3.1zM18.33 18v-4.57c0-2.45-1.31-3.59-3.06-3.59a2.64 2.64 0 0 0-2.39 1.31h-.03V9.67h-2.56V18h2.67v-4.12c0-1.09.2-2.14 1.55-2.14 1.33 0 1.35 1.24 1.35 2.22V18h2.75z" />
                        </svg>
                      </a>
                    ) : null}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        ) : null}

        <section id="process" className="section">
          <div className="section-heading" data-reveal>
            <p className="eyebrow">{t.processHeading.eyebrow}</p>
            <h2>{t.processHeading.title}</h2>
            {t.processHeading.body ? <p>{t.processHeading.body}</p> : null}
          </div>
          <ol className="process-grid">
            {t.process.map((step, index) => (
              <li className="process-step" key={step.title} data-reveal>
                <span className="process-number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <ExperienceTimeline t={t} />

        <SelectedWork t={t} lang={lang} />

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

        <section id="faq" className="section">
          <div className="section-heading" data-reveal>
            <p className="eyebrow">{t.faqHeading.eyebrow}</p>
            <h2>{t.faqHeading.title}</h2>
            {t.faqHeading.body ? <p>{t.faqHeading.body}</p> : null}
          </div>
          <div className="faq-list" data-reveal>
            {t.faq.map((item) => (
              <details className="faq-item" key={item.q}>
                <summary>
                  {item.q}
                  <span className="faq-chevron" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="contact" className="contact-section" data-reveal>
          <div>
            <p className="eyebrow">{t.contact.eyebrow}</p>
            <h2>{t.contact.title}</h2>
            <p>{t.contact.body}</p>
            <a className="button primary contact-book" href={bookingHref} data-magnetic>
              {t.contact.book}
            </a>
          </div>

          <ContactForm form={t.contact.form} socials={shared.socials} />
        </section>
      </main>

      <a className="back-to-top" href="#home" ref={backToTopRef} aria-label={t.backToTop}>
        <span aria-hidden="true">↑</span>
      </a>

      <Footer t={t} lang={lang} socials={shared.socials} />
    </div>
  );
}
