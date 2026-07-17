import type { Dictionary, Product } from "../data/types";
import { asset } from "../lib/asset";
import { ShotGallery } from "./ShotGallery";

function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="nested-app-grid">
      {products.map((app) => (
        <article className="app-card" key={app.title} data-glow>
          <span className="card-spotlight" aria-hidden="true" />
          <span className="card-edge" aria-hidden="true" />
          <div className="app-card-head">
            {app.image ? (
              <img src={asset(app.image)} alt="" loading="lazy" />
            ) : (
              <span className="project-initial" aria-hidden="true">
                {app.title.charAt(0)}
              </span>
            )}
            <div>
              <p>{app.type}</p>
              <h3>{app.title}</h3>
            </div>
          </div>

          <p>{app.body}</p>

          {app.metrics?.length ? (
            <div className="card-metrics">
              {app.metrics.map((metric) => (
                <div className="card-metric" key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>
          ) : null}

          {app.shots?.length ? <ShotGallery shots={app.shots.slice(0, 3)} title={app.title} /> : null}

          <div className="tag-row compact">
            {app.stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

export function ExperienceTimeline({ t }: { t: Dictionary }) {
  if (t.experiences.length === 0 && t.freelanceProjects.length === 0) return null;

  return (
    <section id="experience" className="section career-section">
      <div className="section-heading" data-reveal>
        <p className="eyebrow">{t.workHeading.eyebrow}</p>
        <h2>{t.workHeading.title}</h2>
        {t.workHeading.body ? <p>{t.workHeading.body}</p> : null}
      </div>

      <div className="experience-groups">
        {t.experiences.map((experience) => (
          <article
            className="experience-group"
            key={`${experience.company}-${experience.date}`}
            data-reveal
          >
            <span className="experience-node" aria-hidden="true" />

            <header className="experience-company">
              <img src={asset(experience.logo)} alt="" loading="lazy" />
              <div>
                <p className="eyebrow">{experience.date}</p>
                <h3>{experience.company}</h3>
                <strong>{experience.role}</strong>
                <span>{experience.location}</span>
              </div>
            </header>

            <p className="experience-summary">{experience.summary}</p>

            <ul className="experience-points">
              {experience.achievements.map((achievement) => (
                <li key={achievement}>{achievement}</li>
              ))}
            </ul>

            {experience.apps.length > 0 ? (
              <div className="experience-apps">
                <p className="experience-apps-label">{t.appsLabel}</p>
                <ProductGrid products={experience.apps} />
              </div>
            ) : null}
          </article>
        ))}

        {t.freelanceProjects.length > 0 ? (
          <article className="experience-group freelance-experience-group" data-reveal>
            <span className="experience-node" aria-hidden="true" />

            <header className="experience-company">
              <div className="experience-freelance-mark" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" />
                </svg>
              </div>
              <div>
                <p className="eyebrow">{t.freelanceHeading.eyebrow}</p>
                <h3>{t.freelanceHeading.title}</h3>
              </div>
            </header>

            {t.freelanceHeading.body ? (
              <p className="experience-summary">{t.freelanceHeading.body}</p>
            ) : null}

            <div className="experience-apps">
              <p className="experience-apps-label">{t.appsLabel}</p>
              <ProductGrid products={t.freelanceProjects} />
            </div>
          </article>
        ) : null}
      </div>
    </section>
  );
}
