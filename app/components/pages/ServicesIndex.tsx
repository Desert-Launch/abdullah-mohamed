import { JsonLd } from "../JsonLd";
import { WorkHeader } from "../WorkHeader";
import { Footer } from "../Footer";
import { copy } from "../../data/copy";
import { shared, bookingHref } from "../../data/shared";
import type { Lang } from "../../data/types";
import { asset } from "../../lib/asset";
import { servicesIndexJsonLd } from "../../lib/jsonld";
import { planFor, servicePages, servicePath } from "../../lib/services";
import { localePath } from "../../lib/site";

/**
 * `/services/` and `/ar/services/` — one card per service, in pricing-card
 * order.
 *
 * The homepage already shows the same four plans as price cards; this page is
 * the crawlable hub for the landing pages behind them, so a search or an
 * assistant can land on "what does he build and for how much" without the
 * rest of the homepage. Cards carry the price from the plan, never a copy.
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
            const plan = planFor(page.slug, lang);
            return (
              <article className="work-project-card service-card-link" key={page.slug}>
                <div>
                  <p className="eyebrow">{page.eyebrow}</p>
                  <h2>{page.name}</h2>
                </div>

                <p>{page.lead}</p>

                {plan ? (
                  <p className="service-price">
                    <strong>{plan.price}</strong>
                    <span>{plan.priceNote}</span>
                  </p>
                ) : null}

                {/* Stretched link — one tab stop, whole card clickable. */}
                <a className="work-project-cta" href={asset(servicePath(page.slug, lang))}>
                  {labels.readMore}
                  <span className="glyph-dir" aria-hidden="true">→</span>
                  <span className="sr-only"> — {page.name}</span>
                </a>
              </article>
            );
          })}
        </div>

        <section className="work-cta service-index-cta" aria-labelledby="services-cta">
          <h2 id="services-cta">{labels.cta.title}</h2>
          <p>{labels.cta.body}</p>
          <a
            className="button primary"
            href={bookingHref}
            data-track="book_call_click"
            data-track-source="services-index"
          >
            {labels.cta.button}
          </a>
        </section>
      </main>

      <Footer t={t} lang={lang} socials={shared.socials} linkBase={localePath[lang]} />
    </div>
  );
}
