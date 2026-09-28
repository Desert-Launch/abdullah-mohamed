import { JsonLd } from "../JsonLd";
import { TrackPageView } from "../TrackPageView";
import { WorkHeader } from "../WorkHeader";
import { WorkShots } from "../WorkShots";
import { Footer } from "../Footer";
import { copy } from "../../data/copy";
import { shared, bookingHref } from "../../data/shared";
import type { CaseStudy, Lang } from "../../data/types";
import { asset } from "../../lib/asset";
import { caseStudyJsonLd } from "../../lib/jsonld";
import { inquiryPath } from "../../lib/inquiry";
import { servicePath, servicePrice, servicesCiting } from "../../lib/services";
import { localePath } from "../../lib/site";
import { workIndexPath, workPath, workProjects } from "../../lib/work";

/** Which store a case-study link points at, for `store_link_click`. The
 *  links are plain {label, href} so the host is the only stable signal. */
function storeName(href: string): string {
  if (href.includes("apps.apple.com")) return "app-store";
  if (href.includes("play.google.com")) return "google-play";
  return "web";
}

/** `/work/<slug>/` and `/ar/work/<slug>/` — one full case study. */
export function WorkDetail({ study, lang }: { study: CaseStudy; lang: Lang }) {
  const t = copy[lang];
  const others = workProjects(lang).filter((item) => item.slug !== study.slug);
  // The services this study is cited as proof for — the page's way of
  // turning "that's impressive" into "hire me for the same thing".
  const related = servicesCiting(study.slug, lang);

  return (
    <div className="site-shell work-shell" dir={t.dir}>
      <JsonLd data={caseStudyJsonLd(study, lang)} />
      <TrackPageView name="case_study_view" properties={{ slug: study.slug }} />
      <div className="aurora-field" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <WorkHeader t={t} lang={lang} section="work" current="detail" />

      {/* id="home" is the skip-link target rendered by RootHtml. */}
      <main id="home" className="work-main">
        <article className="work-detail">
          <a className="work-back" href={asset(workIndexPath(lang))}>
            <span className="glyph-dir" aria-hidden="true">←</span>
            {t.work.backToIndex}
          </a>

          <header className="work-detail-head">
            {study.image ? (
              // Decorative: the project name is the <h1> immediately beside it.
              <img className="case-avatar" src={asset(study.image)} alt="" width="56" height="56" />
            ) : (
              <span className="case-avatar" aria-hidden="true">
                {study.title.slice(0, 1)}
              </span>
            )}
            <div>
              <p className="eyebrow">{study.type}</p>
              <h1>{study.title}</h1>
            </div>
            {study.context ? <span className="case-context">{study.context}</span> : null}
          </header>

          <p className="work-lead">{study.summary}</p>

          <div className="work-results">
            {study.results.map((result) => (
              <div className="case-result" key={result.label}>
                <strong>{result.value}</strong>
                <span>{result.label}</span>
              </div>
            ))}
          </div>

          <div className="work-narrative">
            <section className="work-block" aria-labelledby={`heading-${study.slug}-challenge`}>
              <h2 className="case-label" id={`heading-${study.slug}-challenge`}>
                {t.caseLabels.challenge}
              </h2>
              <p className="case-text">{study.challenge}</p>
            </section>

            {/* Problem → requirements: what the build was held to, before
                what was built. */}
            {study.requirements.length > 0 ? (
              <section
                className="work-block"
                aria-labelledby={`heading-${study.slug}-requirements`}
              >
                <h2 className="case-label" id={`heading-${study.slug}-requirements`}>
                  {t.caseLabels.requirements}
                </h2>
                <ul className="case-process">
                  {study.requirements.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>

          <section className="work-block" aria-labelledby={`heading-${study.slug}-role`}>
            <h2 className="case-label" id={`heading-${study.slug}-role`}>
              {t.caseLabels.role}
            </h2>
            <p className="case-text">{study.role}</p>
          </section>

          <section className="work-block" aria-labelledby={`heading-${study.slug}-process`}>
            <h2 className="case-label" id={`heading-${study.slug}-process`}>
              {t.caseLabels.process}
            </h2>
            <ul className="case-process">
              {study.process.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </section>

          {/* The decisions block. Process says what was built; this says what
              was chosen over what, and why — which is the part that reads as
              senior. Rendered only where a study has them. */}
          {study.decisions && study.decisions.length > 0 ? (
            <section className="work-block" aria-labelledby={`heading-${study.slug}-decisions`}>
              <h2 className="case-label" id={`heading-${study.slug}-decisions`}>
                {t.caseLabels.decisions}
              </h2>
              <div className="case-decisions">
                {study.decisions.map((decision) => (
                  <article className="case-decision" key={decision.title}>
                    <h3>{decision.title}</h3>
                    <p>{decision.body}</p>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          <section className="work-block" aria-labelledby={`heading-${study.slug}-stack`}>
            <h2 className="case-label" id={`heading-${study.slug}-stack`}>
              {t.markdown.stack}
            </h2>
            <ul className="tag-row compact work-tags" role="list">
              {study.stack.map((item) => (
                <li key={item}>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {study.shots && study.shots.length > 0 ? (
            <section className="work-block" aria-labelledby={`heading-${study.slug}-shots`}>
              <h2 className="case-label" id={`heading-${study.slug}-shots`}>
                {t.work.screenshots}
              </h2>
              <p className="work-shots-note">{t.work.screenshotsNote}</p>
              <WorkShots shots={study.shots} />
            </section>
          ) : null}

          {study.links && study.links.length > 0 ? (
            <section className="work-block" aria-labelledby={`heading-${study.slug}-links`}>
              <h2 className="case-label" id={`heading-${study.slug}-links`}>
                {t.work.links}
              </h2>
              <div className="case-links">
                {study.links.map((link) => (
                  <a
                    key={link.href}
                    className="button ghost"
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    data-track="store_link_click"
                    data-track-app={study.slug}
                    data-track-store={storeName(link.href)}
                  >
                    {link.label}
                    <span className="glyph-dir" aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            </section>
          ) : null}

          <section className="work-cta" aria-labelledby={`heading-${study.slug}-cta`}>
            <h2 id={`heading-${study.slug}-cta`}>{t.work.cta.title}</h2>
            <p>{t.work.cta.body}</p>
            <div className="service-actions">
              <a
                className="button primary"
                href={asset(inquiryPath(lang))}
                data-track="start_project_click"
                data-track-source="work-detail"
                data-track-slug={study.slug}
              >
                {t.work.cta.button}
                <span className="glyph-dir" aria-hidden="true">→</span>
              </a>
              <a
                className="button ghost"
                href={bookingHref}
                data-track="book_call_click"
                data-track-source="work-detail"
                data-track-slug={study.slug}
              >
                {t.servicePages.cta.button}
              </a>
            </div>
            {related.length > 0 ? (
              <div className="work-cta-services">
                <p className="case-label">{t.work.relatedServices}</p>
                <div className="work-more-links">
                  {related.map((page) => (
                    <a
                      className="work-more-link"
                      key={page.slug}
                      href={asset(servicePath(page.slug, lang))}
                    >
                      <strong>{page.name}</strong>
                      <span>{servicePrice(page, lang).price}</span>
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </section>
        </article>

        {others.length > 0 ? (
          // Its own label, not the header nav's — two landmarks sharing one
          // accessible name is a maze to navigate by landmark.
          <nav className="work-more" aria-labelledby={`heading-${study.slug}-more`}>
            <h2 className="case-label" id={`heading-${study.slug}-more`}>
              {t.work.more}
            </h2>
            <div className="work-more-links">
              {others.map((item) => (
                <a
                  className="work-more-link"
                  key={item.slug}
                  href={asset(workPath(item.slug, lang))}
                >
                  <strong>{item.title}</strong>
                  <span>{item.type}</span>
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
