import type { CaseStudy, Dictionary } from "../data/types";

function CaseStudyCard({ study, labels }: { study: CaseStudy; labels: Dictionary["caseLabels"] }) {
  const gallery = study.shots?.slice(0, 3) ?? [];

  return (
    <article className="case-card" id={`case-${study.slug}`}>
      <header className="case-header">
        {study.image ? (
          <img className="case-avatar" src={study.image} alt={`${study.title} app icon`} loading="lazy" />
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

      {gallery.length > 0 ? (
        <div className="case-shots">
          {gallery.map((shot) => (
            <img key={shot} src={shot} alt={`${study.title} screenshot`} loading="lazy" />
          ))}
        </div>
      ) : null}

      {study.links && study.links.length > 0 ? (
        <div className="case-links">
          {study.links.map((link) => (
            <a key={link.href} className="button ghost" href={link.href} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          ))}
        </div>
      ) : null}
    </article>
  );
}

export function CaseStudies({ t }: { t: Dictionary }) {
  if (t.caseStudies.length === 0) return null;

  return (
    <section id="cases" className="section">
      <div className="section-heading">
        <p className="eyebrow">{t.caseStudiesHeading.eyebrow}</p>
        <h2>{t.caseStudiesHeading.title}</h2>
        {t.caseStudiesHeading.body ? <p>{t.caseStudiesHeading.body}</p> : null}
      </div>

      <div className="case-grid">
        {t.caseStudies.map((study) => (
          <CaseStudyCard key={study.slug} study={study} labels={t.caseLabels} />
        ))}
      </div>
    </section>
  );
}
