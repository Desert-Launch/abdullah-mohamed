import type { CaseStudy, Dictionary, Lang } from "../data/types";
import { asset } from "../lib/asset";
import { WORK_INDEX_PATH, WORK_LANG, workPath } from "../lib/work";
import { ShotGallery } from "./ShotGallery";

function CaseStudyCard({
  study,
  labels,
  readCase,
}: {
  study: CaseStudy;
  labels: Dictionary["caseLabels"];
  /** Label for the link into this project's own page, or null when the
   *  standalone pages don't exist for this locale. */
  readCase: string | null;
}) {
  const gallery = study.shots?.slice(0, 3) ?? [];

  return (
    <article className="case-card" id={`case-${study.slug}`} data-reveal>
      <header className="case-header">
        {study.image ? (
          <img className="case-avatar" src={asset(study.image)} alt={`${study.title} app icon`} loading="lazy" />
        ) : (
          <span className="case-avatar">{study.title.slice(0, 1)}</span>
        )}
        <div className="case-heading">
          <p className="eyebrow">{study.type}</p>
          <h3>{study.title}</h3>
        </div>
        {study.context ? <span className="case-context">{study.context}</span> : null}
      </header>

      <p className="case-summary">{study.summary}</p>

      <div className="case-meta">
        <div className="case-block">
          <p className="case-label">{labels.challenge}</p>
          <p className="case-text">{study.challenge}</p>
        </div>

        <div className="case-block">
          <p className="case-label">{labels.role}</p>
          <p className="case-text">{study.role}</p>
        </div>
      </div>

      <div className="case-block">
        <p className="case-label">{labels.process}</p>
        <ul className="case-process">
          {study.process.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </div>

      <div className="case-block">
        <p className="case-label">{labels.results}</p>
        <div className="case-results">
          {study.results.map((result) => (
            <div className="case-result" key={result.label}>
              <strong>{result.value}</strong>
              <span>{result.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="tag-row compact">
        {study.stack.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      {gallery.length > 0 ? <ShotGallery shots={gallery} title={study.title} /> : null}

      {readCase || (study.links && study.links.length > 0) ? (
        <div className="case-links">
          {readCase ? (
            <a className="button primary" href={asset(workPath(study.slug))}>
              {readCase}
              <span aria-hidden="true">→</span>
              <span className="sr-only"> — {study.title}</span>
            </a>
          ) : null}
          {study.links?.map((link) => (
            <a key={link.href} className="button ghost" href={link.href} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          ))}
        </div>
      ) : null}
    </article>
  );
}

export function CaseStudies({ t, lang }: { t: Dictionary; lang: Lang }) {
  if (t.caseStudies.length === 0) return null;

  // The standalone /work pages are English-only for now, so the Arabic page
  // keeps the self-contained cards rather than linking readers to a locale
  // they didn't ask for. See the deferred /ar/work mirror.
  const hasWorkPages = lang === WORK_LANG;

  return (
    <section id="cases" className="section">
      <div className="section-heading section-heading--linked" data-reveal>
        <div>
          <p className="eyebrow">{t.caseStudiesHeading.eyebrow}</p>
          <h2>{t.caseStudiesHeading.title}</h2>
          {t.caseStudiesHeading.body ? <p>{t.caseStudiesHeading.body}</p> : null}
        </div>
        {hasWorkPages ? (
          <a className="section-link" href={asset(WORK_INDEX_PATH)}>
            {t.work.viewAll}
            <span aria-hidden="true">→</span>
          </a>
        ) : null}
      </div>

      <div className="case-grid">
        {t.caseStudies.map((study) => (
          <CaseStudyCard
            key={study.slug}
            study={study}
            labels={t.caseLabels}
            readCase={hasWorkPages ? t.work.readCase : null}
          />
        ))}
      </div>
    </section>
  );
}
