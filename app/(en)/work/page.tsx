import type { Metadata } from "next";
import { WorkHeader } from "../../components/WorkHeader";
import { Footer } from "../../components/Footer";
import { copy } from "../../data/copy";
import { shared, storeLinks } from "../../data/shared";
import { asset } from "../../lib/asset";
import {
  WORK_INDEX_PATH,
  WORK_LANG,
  buildWorkMetadata,
  workPath,
  workProjects,
} from "../../lib/work";

const t = copy[WORK_LANG];

const isRealUrl = (url?: string): url is string => !!url && url.startsWith("http");

export const metadata: Metadata = buildWorkMetadata({
  title: t.work.meta.title,
  description: t.work.meta.description,
  path: WORK_INDEX_PATH,
});

export default function WorkIndexPage() {
  const projects = workProjects();
  const labels = t.selectedWorkLabels;

  return (
    <div className="site-shell work-shell" dir={t.dir}>
      <div className="aurora-field" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <WorkHeader t={t} current="index" />

      {/* id="home" is the skip-link target rendered by RootHtml. */}
      <main id="home" className="work-main">
        <div className="section-heading">
          <p className="eyebrow">{t.work.eyebrow}</p>
          <h1>{t.work.title}</h1>
          <p>{t.work.body}</p>
        </div>

        <div className="work-index-grid">
          {projects.map((study) => (
            <article className="work-project-card" key={study.slug}>
              <div className="work-project-head">
                {study.image ? (
                  <img
                    className="case-avatar"
                    src={asset(study.image)}
                    alt=""
                    loading="lazy"
                  />
                ) : (
                  <span className="case-avatar" aria-hidden="true">
                    {study.title.slice(0, 1)}
                  </span>
                )}
                <div>
                  <p className="eyebrow">{study.type}</p>
                  <h2>{study.title}</h2>
                </div>
              </div>

              {study.context ? (
                <span className="work-project-context">{study.context}</span>
              ) : null}

              <p>{study.summary}</p>

              <div className="tag-row compact">
                {study.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>

              {/* Stretched link — one tab stop, whole card clickable. The
                  project name is in the accessible name so the links are
                  distinguishable when read out of context. */}
              <a className="work-project-cta" href={asset(workPath(study.slug))}>
                {t.work.readCase}
                <span aria-hidden="true">→</span>
                <span className="sr-only"> — {study.title}</span>
              </a>
            </article>
          ))}
        </div>

        {/* Shipped apps that have no written case study. They are listed
            honestly as what they are — a card and a store link — rather than
            given a detail page with invented content. */}
        {t.selectedWork.length > 0 ? (
          <section className="work-also" aria-labelledby="also-shipped">
            <div className="section-heading">
              <p className="eyebrow">{t.work.alsoShipped.eyebrow}</p>
              <h2 id="also-shipped">{t.work.alsoShipped.title}</h2>
              {t.work.alsoShipped.body ? <p>{t.work.alsoShipped.body}</p> : null}
            </div>

            <div className="work-also-grid">
              {t.selectedWork.map((app) => {
                const links = storeLinks[app.key];
                const status =
                  links?.status === "retired"
                    ? links.year
                      ? `${labels.shipped} ${links.year} · ${labels.retired}`
                      : labels.retired
                    : links?.status === "unreleased"
                      ? labels.unreleased
                      : links?.year
                        ? `${links.year} · ${labels.productBuild}`
                        : labels.productBuild;
                const stores = [
                  isRealUrl(links?.appStore) ? [labels.appStore, links.appStore] : null,
                  isRealUrl(links?.play) ? [labels.googlePlay, links.play] : null,
                ].filter((entry): entry is [string, string] => entry !== null);

                return (
                  <article className="work-also-card" key={app.key}>
                    <div className="work-also-head">
                      {app.image ? (
                        <img src={asset(app.image)} alt="" loading="lazy" />
                      ) : (
                        <span className="work-also-fallback" aria-hidden="true">
                          {app.title.slice(0, 1)}
                        </span>
                      )}
                      <h3>{app.title}</h3>
                    </div>
                    <p>{app.tagline}</p>
                    {stores.length > 0 ? (
                      <div className="work-stores">
                        {stores.map(([label, href]) => (
                          <a
                            className="store-pill"
                            key={href}
                            href={href}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {label}
                            <span aria-hidden="true">↗</span>
                            <span className="sr-only"> — {app.title}</span>
                          </a>
                        ))}
                      </div>
                    ) : (
                      <div
                        className={`work-status${
                          links?.status === "retired" || links?.status === "unreleased"
                            ? " is-muted"
                            : ""
                        }`}
                      >
                        <span aria-hidden="true" />
                        {status}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </section>
        ) : null}
      </main>

      <Footer t={t} lang={WORK_LANG} socials={shared.socials} linkBase="/" />
    </div>
  );
}
