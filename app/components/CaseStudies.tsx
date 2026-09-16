import type { CaseStudy, Dictionary, Lang } from "../data/types";
import { asset } from "../lib/asset";
import { workIndexPath, workPath, workProjects } from "../lib/work";
import { ShotGallery } from "./ShotGallery";

/** How many studies the homepage shows. Each card is a full write-up, so the
 *  whole set would add several thousand words to a page that is already long
 *  — and the point of the section is the strongest three, not the archive.
 *  `/work/` is the archive, and the section links to it. */
const HOME_CASE_COUNT = 3;

function CaseStudyCard({
  study,
  labels,
  readCase,
  lang,
}: {
  study: CaseStudy;
  labels: Dictionary["caseLabels"];
  /** Label for the link into this project's own page. */
  readCase: string;
  lang: Lang;
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

      <div className="case-links">
        <a className="button primary" href={asset(workPath(study.slug, lang))}>
          {readCase}
          <span className="glyph-dir" aria-hidden="true">→</span>
          <span className="sr-only"> — {study.title}</span>
        </a>
        {study.links?.map((link) => (
          <a key={link.href} className="button ghost" href={link.href} target="_blank" rel="noreferrer">
            {link.label}
          </a>
        ))}
      </div>
    </article>
  );
}

export function CaseStudies({ t, lang }: { t: Dictionary; lang: Lang }) {
  if (t.caseStudies.length === 0) return null;
  // Featured first, then dictionary order — the same sort /work uses, so the
  // homepage's three and the index's first three can never disagree.
  const studies = workProjects(lang).slice(0, HOME_CASE_COUNT);

  return (
    <section id="cases" className="section">
      <div className="section-heading section-heading--linked" data-reveal>
        <div>
          <p className="eyebrow">{t.caseStudiesHeading.eyebrow}</p>
          <h2>{t.caseStudiesHeading.title}</h2>
          {t.caseStudiesHeading.body ? <p>{t.caseStudiesHeading.body}</p> : null}
        </div>
        {/* Into this locale's /work index — both locales have one. */}
        <a className="section-link" href={asset(workIndexPath(lang))}>
          {t.work.viewAll}
          <span className="glyph-dir" aria-hidden="true">→</span>
        </a>
      </div>

      <div className="case-grid">
        {studies.map((study) => (
          <CaseStudyCard
            key={study.slug}
            study={study}
            labels={t.caseLabels}
            readCase={t.work.readCase}
            lang={lang}
          />
        ))}
      </div>
    </section>
  );
}
