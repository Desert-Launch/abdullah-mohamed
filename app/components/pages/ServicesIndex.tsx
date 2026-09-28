import { JsonLd } from "../JsonLd";
import { WorkHeader } from "../WorkHeader";
import { Footer } from "../Footer";
import { copy } from "../../data/copy";
import { shared, bookingHref } from "../../data/shared";
import type { Lang } from "../../data/types";
import { asset } from "../../lib/asset";
import { inquiryPath } from "../../lib/inquiry";
import { servicesIndexJsonLd } from "../../lib/jsonld";
import { servicePages, servicePath, servicePrice } from "../../lib/services";
import { localePath } from "../../lib/site";

/**
 * `/services/` and `/ar/services/` — the hub for every service page.
 *
 * Each card leads with the visitor's situation in their own words ("I have an
 * idea and need a first version built"), then the service's name and price,
 * so someone who doesn't know what the thing they need is called can still
 * find it. Below the cards: a way in for anyone who can't place themselves,
 * how a project runs, and the engagement FAQ (pricing, ownership, timezone,
 * fit) — which is also this page's FAQPage markup.
 */
export function ServicesIndex({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const pages = servicePages(lang);
  const labels = t.servicePages;

  return (
    <div className="site-shell work-shell" dir={t.dir}>
      <JsonLd data={servicesIndexJsonLd(lang)} />
      <div className="aurora-field" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <WorkHeader t={t} lang={lang} section="services" current="index" />

      {/* id="home" is the skip-link target rendered by RootHtml. */}
      <main id="home" className="work-main">
        <div className="section-heading">
          <p className="eyebrow">{labels.eyebrow}</p>
          <h1>{labels.title}</h1>
          <p>{labels.body}</p>
        </div>

        <div className="work-index-grid service-index-grid">
          {pages.map((page) => {
            const price = servicePrice(page, lang);
            return (
              <article className="work-project-card service-card-link" key={page.slug}>
                <div>
                  <p className="service-situation">{page.situation}</p>
                  <h2>{page.name}</h2>
                </div>

                <p>{page.lead}</p>

                <p className="service-price">
                  <strong>{price.price}</strong>
                  <span>{price.note}</span>
                </p>

                {/* Stretched link — one tab stop, whole card clickable. */}
                <a className="work-project-cta" href={asset(servicePath(page.slug, lang))}>
                  {labels.readMore}
                  <span className="glyph-dir" aria-hidden="true">→</span>
                  <span className="sr-only"> — {page.name}</span>
                </a>
              </article>
            );
          })}

          {/* The eighth card: for a visitor who can't place themselves in the
              seven. It also keeps the two-column grid from ending on an
              orphan. */}
          <section
            className="work-project-card service-card-unsure"
            aria-labelledby="services-not-sure"
          >
            <h2 id="services-not-sure">{labels.notSure.title}</h2>
            <p>{labels.notSure.body}</p>
            <div className="service-actions">
              <a
                className="button primary"
                href={asset(inquiryPath(lang))}
                data-track="start_project_click"
                data-track-source="services-index"
              >
                {labels.cta.start}
                <span className="glyph-dir" aria-hidden="true">→</span>
              </a>
              <a
                className="button ghost"
                href={bookingHref}
                data-track="book_call_click"
                data-track-source="services-index"
              >
                {labels.cta.button}
              </a>
            </div>
          </section>
        </div>

        <section className="service-index-block" aria-labelledby="services-process">
          <h2 className="case-label" id="services-process">
            {labels.labels.process}
          </h2>
          <ol className="service-steps">
            {t.process.map((step) => (
              <li key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
          {t.plansHeading.body ? <p className="service-index-note">{t.plansHeading.body}</p> : null}
        </section>

        <section className="service-index-block" aria-labelledby="services-faq">
          <h2 className="case-label" id="services-faq">
            {labels.faqTitle}
          </h2>
          <div className="faq-list service-faq">
            {labels.faq.map((item) => (
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
      </main>

      <Footer t={t} lang={lang} socials={shared.socials} linkBase={localePath[lang]} />
    </div>
  );
}
