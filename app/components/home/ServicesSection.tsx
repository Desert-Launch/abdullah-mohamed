import type { Dictionary, Lang } from "../../data/types";
import { asset } from "../../lib/asset";
import { servicePath } from "../../lib/services";
import { SectionLabel, pad } from "./parts";

/** "Ways I can help": one row per plan, each into its /services page, then
 *  how an engagement runs. Prices come from `Plan.price` — the same figure
 *  the Offer structured data carries as `minPrice`. */
export function ServicesSection({ t, lang, n }: { t: Dictionary; lang: Lang; n: string }) {
  const heading = t.servicesHeading;

  return (
    <section id="services" className="home-section home-wrap" aria-labelledby="svc-title">
      <SectionLabel n={n}>{heading.eyebrow}</SectionLabel>
      <div className="home-head">
        <h2 id="svc-title">{heading.title}</h2>
        {heading.body ? <p>{heading.body}</p> : null}
      </div>

      <ul className="home-rows plan-rows" data-stagger="">
        {t.plans.map((plan) => (
          <li key={plan.slug}>
            <a className="home-row plan-row" href={asset(servicePath(plan.slug, lang))}>
              <span className="plan-row-name">{plan.name}</span>{" "}
              <span className="plan-row-body">{plan.body}</span>{" "}
              <span className="plan-row-price">{plan.price}</span>
              <span className="home-row-arrow glyph-dir" aria-hidden="true">
                →
              </span>
            </a>
          </li>
        ))}
      </ul>
      {t.plansHeading.body ? <p className="plan-note">{t.plansHeading.body}</p> : null}

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
