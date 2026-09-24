import { shared } from "../../data/shared";
import type { Dictionary } from "../../data/types";
import { asset } from "../../lib/asset";
import { SectionLabel } from "./parts";

/**
 * "In production": the proof numbers, then who they were shipped with. The
 * first `proof` entry is set huge with its sentence under it; the rest are a
 * ruled list beside it. The company strip is built from `experiences`, so it
 * says exactly what the experience section says.
 */
export function ProofSection({ t, n }: { t: Dictionary; n: string }) {
  const [lead, ...rest] = t.proof;

  return (
    <section id="proof" className="home-section home-wrap" aria-labelledby="proof-title">
      <SectionLabel n={n} id="proof-title" heading>
        {t.home.proof.eyebrow}
      </SectionLabel>

      <div className="proof-numbers" data-reveal="">
        {lead ? (
          <div className="proof-lead">
            <p className="proof-big" data-count="">
              {lead[0]}
            </p>
            <p className="proof-body">{t.home.proof.body}</p>
          </div>
        ) : null}
        <dl className="proof-list">
          {rest.map(([value, label]) => (
            <div key={label}>
              <dt data-count="">{value}</dt>
              <dd>{label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="proof-teams" data-reveal="">
        <p className="home-kicker">{t.logosLabel}</p>
        <ul className="proof-companies" data-stagger="">
          {t.experiences.map((role) => (
            <li key={role.company}>
              <img src={asset(role.logo)} alt="" width="40" height="40" loading="lazy" />
              <div>
                <p className="proof-company">{role.company}</p>
                <p className="proof-company-meta">
                  {role.role} · {role.date} · {role.location}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <div className="proof-products">
          <p className="home-kicker">{t.home.proof.products}</p>
          <ul>
            {shared.products.map((product) => (
              <li key={product.name}>
                {product.src ? (
                  <img src={asset(product.src)} alt="" width="22" height="22" loading="lazy" />
                ) : null}
                {product.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
