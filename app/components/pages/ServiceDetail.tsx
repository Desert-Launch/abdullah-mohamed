import { JsonLd } from "../JsonLd";
import { TrackPageView } from "../TrackPageView";
import { WorkHeader } from "../WorkHeader";
import { Footer } from "../Footer";
import { copy } from "../../data/copy";
import { shared, bookingHref } from "../../data/shared";
import type { Lang, ServicePage } from "../../data/types";
import { asset } from "../../lib/asset";
import { servicePageJsonLd } from "../../lib/jsonld";
import {
  planFor,
  proofFor,
  servicePages,
  servicePath,
  servicesIndexPath,
} from "../../lib/services";
import { localePath } from "../../lib/site";
import { workPath } from "../../lib/work";

/**
 * `/services/<slug>/` and `/ar/services/<slug>/` — one landing page per
 * pricing card.
 *
 * Reads top to bottom the way a buyer evaluates: what it is, whether it fits
 * them, what they get, how it's built, what proves it, what it costs, and the
 * questions they'd ask on the call. The price and its small print come from
 * the matching `Plan`, never retyped here.
 */
export function ServiceDetail({ page, lang }: { page: ServicePage; lang: Lang }) {
  const t = copy[lang];
  const plan = planFor(page.slug, lang);
  const proof = proofFor(page, lang);
  const others = servicePages(lang).filter((item) => item.slug !== page.slug);
  const labels = t.servicePages.labels;
  const id = (part: string) => `heading-${page.slug}-${part}`;

  return (
    <div className="site-shell work-shell" dir={t.dir}>
      <JsonLd data={servicePageJsonLd(page, lang)} />
      <TrackPageView name="service_page_view" properties={{ slug: page.slug }} />
      <div className="aurora-field" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <WorkHeader t={t} lang={lang} section="services" current="detail" />

      {/* id="home" is the skip-link target rendered by RootHtml. */}
      <main id="home" className="work-main">
        <article className="work-detail">
          <a className="work-back" href={asset(servicesIndexPath(lang))}>
            <span className="glyph-dir" aria-hidden="true">←</span>
            {t.servicePages.backToIndex}
          </a>

          <header className="service-head">
            <p className="eyebrow">{page.eyebrow}</p>
            <h1>{page.title}</h1>
          </header>

          <p className="work-lead">{page.lead}</p>

          {plan ? (
            <div className="service-pricing" aria-labelledby={id("pricing")}>
              <div>
                <h2 className="case-label" id={id("pricing")}>
                  {labels.pricing}
                </h2>
                <p className="service-pricing-price">{plan.price}</p>
                <p className="service-pricing-note">{plan.priceNote}</p>
              </div>
              <a
                className="button primary"
                href={bookingHref}
                data-track="book_call_click"
                data-track-source="service-pricing"
                data-track-slug={page.slug}
              >
                {plan.cta}
              </a>
            </div>
          ) : null}

          <div className="work-narrative">
            <section className="work-block" aria-labelledby={id("fit")}>
              <h2 className="case-label" id={id("fit")}>
                {labels.fit}
              </h2>
              <ul className="case-process">
                {page.fit.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="work-block" aria-labelledby={id("deliverables")}>
              <h2 className="case-label" id={id("deliverables")}>
                {labels.deliverables}
              </h2>
              <ul className="case-process">
                {page.deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>

          <section className="work-block" aria-labelledby={id("approach")}>
            <h2 className="case-label" id={id("approach")}>
              {labels.approach}
            </h2>
            <ul className="case-process">
              {page.approach.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          {proof.length > 0 ? (
            <section className="work-block" aria-labelledby={id("proof")}>
              <h2 className="case-label" id={id("proof")}>
                {labels.proof}
              </h2>
              <div className="work-more-links">
                {proof.map((study) => (
                  <a
                    className="work-more-link"
                    key={study.slug}
                    href={asset(workPath(study.slug, lang))}
                  >
                    <strong>{study.title}</strong>
                    <span>{study.type}</span>
                  </a>
                ))}
              </div>
            </section>
          ) : null}

          {page.faq.length > 0 ? (
            <section className="work-block" aria-labelledby={id("faq")}>
              <h2 className="case-label" id={id("faq")}>
                {labels.faq}
              </h2>
              <div className="faq-list service-faq">
                {page.faq.map((item) => (
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
          ) : null}

          <section className="work-cta" aria-labelledby={id("cta")}>
            <h2 id={id("cta")}>{t.servicePages.cta.title}</h2>
            <p>{t.servicePages.cta.body}</p>
            <a
              className="button primary"
              href={bookingHref}
              data-track="book_call_click"
              data-track-source="service-cta"
              data-track-slug={page.slug}
            >
              {t.servicePages.cta.button}
            </a>
          </section>
        </article>

        {others.length > 0 ? (
          <nav className="work-more" aria-labelledby={id("more")}>
            <h2 className="case-label" id={id("more")}>
              {labels.more}
            </h2>
            <div className="work-more-links">
              {others.map((item) => {
                const itemPlan = planFor(item.slug, lang);
                return (
                  <a
                    className="work-more-link"
                    key={item.slug}
                    href={asset(servicePath(item.slug, lang))}
                  >
                    <strong>{item.name}</strong>
                    {itemPlan ? <span>{itemPlan.price}</span> : null}
                  </a>
                );
              })}
            </div>
          </nav>
        ) : null}
      </main>

      <Footer t={t} lang={lang} socials={shared.socials} linkBase={localePath[lang]} />
    </div>
  );
}
