import { JsonLd } from "../JsonLd";
import { TrackPageView } from "../TrackPageView";
import { WorkHeader } from "../WorkHeader";
import { Footer } from "../Footer";
import { copy } from "../../data/copy";
import { shared, bookingHref } from "../../data/shared";
import type { Lang, ServicePage } from "../../data/types";
import { asset } from "../../lib/asset";
import { inquiryPath } from "../../lib/inquiry";
import { servicePageJsonLd } from "../../lib/jsonld";
import {
  proofFor,
  servicePages,
  servicePath,
  servicePrice,
  servicesIndexPath,
} from "../../lib/services";
import { localePath } from "../../lib/site";
import { workPath } from "../../lib/work";

/**
 * `/services/<slug>/` and `/ar/services/<slug>/` — one landing page per
 * visitor situation.
 *
 * Reads top to bottom the way a buyer evaluates: what it is, what it costs,
 * whether it fits them, what they get, how it's built, what it looked like on
 * real products, what proves it, how a project runs, and the questions they'd
 * ask on the call. Two ways in at the price and at the end: the written brief
 * (lower commitment, and the one a non-technical visitor can manage) and the
 * booking link. Prices come from `servicePrice`, never retyped here.
 */
export function ServiceDetail({ page, lang }: { page: ServicePage; lang: Lang }) {
  const t = copy[lang];
  const price = servicePrice(page, lang);
  const proof = proofFor(page, lang);
  const others = servicePages(lang).filter((item) => item.slug !== page.slug);
  const labels = t.servicePages.labels;
  const id = (part: string) => `heading-${page.slug}-${part}`;
  const brief = asset(inquiryPath(lang, page.slug));

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

          <div className="service-pricing" aria-labelledby={id("pricing")}>
            <div>
              <h2 className="case-label" id={id("pricing")}>
                {labels.pricing}
              </h2>
              <p className="service-pricing-price">{price.price}</p>
              <p className="service-pricing-note">
                {price.plans.length > 1 ? `${price.note} · ${price.plans[0].priceNote}` : price.note}
              </p>
            </div>
            <div className="service-actions">
              <a
                className="button primary"
                href={brief}
                data-track="start_project_click"
                data-track-source="service-pricing"
                data-track-slug={page.slug}
              >
                {t.servicePages.cta.start}
                <span className="glyph-dir" aria-hidden="true">→</span>
              </a>
              <a
                className="button ghost"
                href={bookingHref}
                data-track="book_call_click"
                data-track-source="service-pricing"
                data-track-slug={page.slug}
              >
                {t.servicePages.cta.button}
              </a>
            </div>
          </div>

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

          {page.examples.length > 0 ? (
            <section className="work-block" aria-labelledby={id("examples")}>
              <h2 className="case-label" id={id("examples")}>
                {labels.examples}
              </h2>
              <ul className="service-examples">
                {page.examples.map((item) => {
                  // "Xera Lab — …": the product name reads as the item's
                  // label. Split on the first dash; a line without one
                  // renders whole.
                  const cut = item.indexOf(" — ");
                  return (
                    <li key={item}>
                      {cut > 0 ? (
                        <>
                          <strong>{item.slice(0, cut)}</strong>
                          <span>{item.slice(cut + 3)}</span>
                        </>
                      ) : (
                        <span>{item}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          ) : null}

          {page.stack.length > 0 ? (
            <section className="work-block" aria-labelledby={id("stack")}>
              <h2 className="case-label" id={id("stack")}>
                {labels.stack}
              </h2>
              <ul className="tag-row compact work-tags" role="list">
                {page.stack.map((item) => (
                  <li key={item}>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

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

          <section className="work-block" aria-labelledby={id("process")}>
            <h2 className="case-label" id={id("process")}>
              {labels.process}
            </h2>
            <ol className="service-steps">
              {t.process.map((step) => (
                <li key={step.title}>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
          </section>

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
            <div className="service-actions">
              <a
                className="button primary"
                href={brief}
                data-track="start_project_click"
                data-track-source="service-cta"
                data-track-slug={page.slug}
              >
                {t.servicePages.cta.start}
                <span className="glyph-dir" aria-hidden="true">→</span>
              </a>
              <a
                className="button ghost"
                href={bookingHref}
                data-track="book_call_click"
                data-track-source="service-cta"
                data-track-slug={page.slug}
              >
                {t.servicePages.cta.button}
              </a>
            </div>
          </section>
        </article>

        {others.length > 0 ? (
          <nav className="work-more" aria-labelledby={id("more")}>
            <h2 className="case-label" id={id("more")}>
              {labels.more}
            </h2>
            <div className="work-more-links">
              {others.map((item) => (
                <a
                  className="work-more-link"
                  key={item.slug}
                  href={asset(servicePath(item.slug, lang))}
                >
                  <strong>{item.name}</strong>
                  <span>{servicePrice(item, lang).price}</span>
                </a>
              ))}
            </div>
          </nav>
        ) : null}
      </main>

      <Footer t={t} lang={lang} socials={shared.socials} linkBase={localePath[lang]} />
    </div>
  );
}
