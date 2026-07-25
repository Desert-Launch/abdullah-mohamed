import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WorkHeader } from "../../../components/WorkHeader";
import { WorkShots } from "../../../components/WorkShots";
import { Footer } from "../../../components/Footer";
import { copy } from "../../../data/copy";
import { shared, bookingHref } from "../../../data/shared";
import { asset } from "../../../lib/asset";
import {
  WORK_INDEX_PATH,
  WORK_LANG,
  buildWorkMetadata,
  findProject,
  workPath,
  workProjects,
} from "../../../lib/work";

const t = copy[WORK_LANG];

/** Every slug is known at build time — required by `output: "export"`. */
export function generateStaticParams() {
  return workProjects().map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = findProject(slug);
  if (!study) return {};
  return buildWorkMetadata({
    title: `${study.title} — ${study.type}`,
    description: study.summary,
    path: workPath(study.slug),
    type: "article",
  });
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = findProject(slug);
  if (!study) notFound();

  const others = workProjects().filter((item) => item.slug !== study.slug);

  return (
    <div className="site-shell work-shell" dir={t.dir}>
      <div className="aurora-field" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <WorkHeader t={t} current="detail" />

      {/* id="home" is the skip-link target rendered by RootHtml. */}
      <main id="home" className="work-main">
        <article className="work-detail">
          <a className="work-back" href={asset(WORK_INDEX_PATH)}>
            <span aria-hidden="true">←</span>
            {t.work.backToIndex}
          </a>

          <header className="work-detail-head">
            {study.image ? (
              // Decorative: the project name is the <h1> immediately beside it.
              <img className="case-avatar" src={asset(study.image)} alt="" />
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

            <section className="work-block" aria-labelledby={`heading-${study.slug}-role`}>
              <h2 className="case-label" id={`heading-${study.slug}-role`}>
                {t.caseLabels.role}
              </h2>
              <p className="case-text">{study.role}</p>
            </section>
          </div>

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

          <div className="tag-row compact work-tags">
            {study.stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>

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
                  >
                    {link.label}
                    <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            </section>
          ) : null}

          <section className="work-cta" aria-labelledby={`heading-${study.slug}-cta`}>
            <h2 id={`heading-${study.slug}-cta`}>{t.work.cta.title}</h2>
            <p>{t.work.cta.body}</p>
            <a className="button primary" href={bookingHref}>
              {t.work.cta.button}
            </a>
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
                <a className="work-more-link" key={item.slug} href={asset(workPath(item.slug))}>
                  <strong>{item.title}</strong>
                  <span>{item.type}</span>
                </a>
              ))}
            </div>
          </nav>
        ) : null}
      </main>

      <Footer t={t} lang={WORK_LANG} socials={shared.socials} linkBase="/" />
    </div>
  );
}
