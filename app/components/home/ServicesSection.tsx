import type { Dictionary, Lang } from "../../data/types";
import { asset } from "../../lib/asset";
import { inquiryPath } from "../../lib/inquiry";
import { servicePages, servicePath, servicePrice } from "../../lib/services";
import { SectionLabel, pad } from "./parts";

/**
 * "What do you need built?": one row per service page — its name, the
 * visitor's situation in their own words, and the starting price — each into
 * its /services page. Then a way in for anyone who can't place themselves,
 * and how an engagement runs.
 *
 * The rows carry situations ("I have an idea and need a first version
 * built") because the visitor this section is for often doesn't know what
 * the thing they need is called. Prices come from `servicePrice` — the same
 * figure the Offer structured data carries as `minPrice`.
 */
export function ServicesSection({ t, lang, n }: { t: Dictionary; lang: Lang; n: string }) {
  const heading = t.servicesHeading;
  const notSure = t.servicePages.notSure;

  return (
    <section id="services" className="home-section home-wrap" aria-labelledby="svc-title">
      <SectionLabel n={n}>{heading.eyebrow}</SectionLabel>
      <div className="home-head">
        <h2 id="svc-title">{heading.title}</h2>
        {heading.body ? <p>{heading.body}</p> : null}
      </div>

      <ul className="home-rows plan-rows" data-stagger="">
        {servicePages(lang).map((page) => (
          <li key={page.slug}>
            <a className="home-row plan-row" href={asset(servicePath(page.slug, lang))}>
              <span className="plan-row-name">{page.name}</span>{" "}
              <span className="plan-row-body">{page.situation}</span>{" "}
              <span className="plan-row-price">{servicePrice(page, lang).price}</span>
              <span className="home-row-arrow glyph-dir" aria-hidden="true">
                →
              </span>
            </a>
          </li>
        ))}
      </ul>
      {t.plansHeading.body ? <p className="plan-note">{t.plansHeading.body}</p> : null}

      <div className="plan-unsure" data-reveal="">
        <p>
          <strong>{notSure.title}</strong> {notSure.body}
        </p>
        <a
          className="button secondary"
          href={asset(inquiryPath(lang))}
          data-magnetic
          data-track="start_project_click"
          data-track-source="services"
        >
          {t.hero.start}
          <span className="button-icon button-icon--go" aria-hidden="true">
            →
          </span>
        </a>
      </div>

      <div className="process" data-reveal="">
        <h3>{t.processHeading.title}</h3>
        {t.processHeading.body ? <p className="process-lead">{t.processHeading.body}</p> : null}
        <ol data-stagger="">
          {t.process.map((step, index) => (
            <li key={step.title}>
              <span className="process-dot" aria-hidden="true" />
              <span className="process-n" aria-hidden="true">
                {pad(index + 1)}
              </span>
              <h4>{step.title}</h4>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
