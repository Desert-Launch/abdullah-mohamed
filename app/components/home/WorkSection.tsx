import type { CSSProperties } from "react";
import { storeLinks } from "../../data/shared";
import type { CaseStudy, Dictionary, Lang } from "../../data/types";
import { asset } from "../../lib/asset";
import { workIndexPath, workPath, workProjects } from "../../lib/work";
import { SectionLabel, pad, storeOf } from "./parts";

/** How many studies get a full feature block; the rest are rows. Matches the
 *  top of the /work index, which sorts the same way (`workProjects`). */
const FEATURED = 3;

/** Vertical offsets of the five screens on the wide card, in px. */
const CINEMA_OFFSETS = [40, 0, 56, 8, 48];

const isHttp = (href?: string): href is string => !!href && href.startsWith("http");

/**
 * "Selected work". The first three studies each get their own staging: the
 * lead study's screens on a stage, the Talia system diagram (the product is a
 * platform, and has no screens to show), and a full-width card for the third.
 * Everything else is a row, then the store-only apps.
 */
export function WorkSection({ t, lang, n }: { t: Dictionary; lang: Lang; n: string }) {
  const studies = workProjects(lang);
  const [first, second, third] = studies;
  const rest = studies.slice(FEATURED);
  const heading = t.caseStudiesHeading;

  return (
    <section id="work" className="home-section home-work" aria-labelledby="work-title">
      <div className="home-wrap">
        <SectionLabel n={n}>{heading.eyebrow}</SectionLabel>
        <div className="home-head" data-reveal="">
          <h2 id="work-title">{heading.title}</h2>
          {heading.body ? <p>{heading.body}</p> : null}
        </div>

        {first ? (
          <article className="feat" data-reveal="" aria-labelledby={`case-${first.slug}`}>
            <CaseStage study={first} number={pad(1)} t={t} lang={lang} />
            <CaseText study={first} number={pad(1)} t={t} lang={lang} />
          </article>
        ) : null}

        {second ? (
          <article
            className="feat feat--reverse"
            data-reveal=""
            aria-labelledby={`case-${second.slug}`}
          >
            <CaseText study={second} number={pad(2)} t={t} lang={lang} />
            {second.slug === "talia" ? (
              <TaliaDiagram study={second} t={t} lang={lang} />
            ) : (
              <CaseStage study={second} number={pad(2)} t={t} lang={lang} />
            )}
          </article>
        ) : null}
      </div>

      {third ? <CaseCinema study={third} number={pad(3)} t={t} lang={lang} /> : null}

      <div className="home-wrap">
        {rest.length > 0 ? (
          <div className="home-more">
            <div className="home-more-head">
              <h3>{t.work.more}</h3>
              <a className="home-link" href={asset(workIndexPath(lang))}>
                {t.work.viewAll}
                <span className="glyph-dir" aria-hidden="true">
                  →
                </span>
              </a>
            </div>
            <ul className="home-rows" data-stagger="">
              {rest.map((study, index) => {
                const metric = study.results[study.highlight ?? 0];
                return (
                  <li key={study.slug}>
                    <a
                      className="home-row study-row"
                      href={asset(workPath(study.slug, lang))}
                      data-cursor={t.home.work.cursor}
                    >
                      <span className="home-row-n" aria-hidden="true">
                        {pad(FEATURED + index + 1)}
                      </span>
                      {study.image ? (
                        <img src={asset(study.image)} alt="" width="40" height="40" loading="lazy" />
                      ) : (
                        <span className="study-row-fallback" aria-hidden="true">
                          {study.title.slice(0, 1)}
                        </span>
                      )}
                      {/* Real spaces between the parts: the grid lays them out,
                          but the link's accessible name is their text. */}
                      <span className="study-row-title">
                        <span>{study.title}</span>{" "}
                        <span>{study.type}</span>
                      </span>{" "}
                      {study.context ? (
                        <span className="study-row-context">{study.context}</span>
                      ) : (
                        <span />
                      )}{" "}
                      {metric ? (
                        <span className="study-row-metric">
                          <span>{metric.value}</span>{" "}
                          <span>{metric.label}</span>
                        </span>
                      ) : (
                        <span />
                      )}
                      <span className="home-row-arrow glyph-dir" aria-hidden="true">
                        →
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}

        {t.selectedWork.length > 0 ? (
          <div className="home-also">
            <p className="home-kicker">{t.home.work.alsoShipped}</p>
            <ul>
              {t.selectedWork.map((app) => {
                const entry = storeLinks[app.key];
                const links = [
                  { href: entry?.appStore, label: t.selectedWorkLabels.appStore },
                  { href: entry?.play, label: t.selectedWorkLabels.googlePlay },
                ].filter((link): link is { href: string; label: string } => isHttp(link.href));
                return (
                  <li key={app.key}>
                    {app.image ? (
                      <img src={asset(app.image)} alt="" width="36" height="36" loading="lazy" />
                    ) : (
                      <span className="study-row-fallback" aria-hidden="true">
                        {app.title.slice(0, 1)}
                      </span>
                    )}
                    <div>
                      <p className="home-also-title">{app.title}</p>
                      <p className="home-also-tagline">{app.tagline}</p>
                      {links.length > 0 ? (
                        <p className="home-also-links">
                          {links.map((link) => (
                            <a
                              key={link.href}
                              href={link.href}
                              target="_blank"
                              rel="noreferrer"
                              data-track="store_link_click"
                              data-track-app={app.key}
                              data-track-store={storeOf(link.href)}
                            >
                              {link.label}
                              <span className="glyph-dir" aria-hidden="true">
                                ↗
                              </span>
                              <span className="sr-only"> — {app.title}</span>
                            </a>
                          ))}
                        </p>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}

type CaseProps = { study: CaseStudy; number: string; t: Dictionary; lang: Lang };

/** The text column of a featured study: kicker, title, summary, results,
 *  role and stack, then the way in. */
function CaseText({ study, number, t, lang }: CaseProps) {
  const links = (study.links ?? []).filter((link) => isHttp(link.href));
  return (
    <div className="feat-text">
      <p className="feat-kicker">
        <span className="feat-kicker-n" aria-hidden="true">
          {number}
        </span>
        <span>{study.type}</span>
      </p>
      <h3 id={`case-${study.slug}`} className="feat-title">
        {study.title}
      </h3>
      {study.context ? <p className="feat-context">{study.context}</p> : null}
      <p className="feat-summary">{study.summary}</p>
      <CaseMetrics study={study} />
      <p className="feat-line">
        <span>{t.home.work.role}</span> — {study.role}
      </p>
      <p className="feat-line">
        <span>{t.home.work.stack}</span> — {study.stack.join(" · ")}
      </p>
      <div className="feat-actions">
        <a className="button primary" href={asset(workPath(study.slug, lang))} data-magnetic>
          {t.work.readCase}
          <span className="button-icon button-icon--go" aria-hidden="true">
            →
          </span>
          <span className="sr-only"> — {study.title}</span>
        </a>
        {links.map((link) => (
          <a
            key={link.href}
            className="home-link"
            href={link.href}
            target="_blank"
            rel="noreferrer"
            data-track="store_link_click"
            data-track-app={study.slug}
            data-track-store={storeOf(link.href)}
          >
            {link.label}
            <span className="glyph-dir" aria-hidden="true">
              ↗
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

function CaseMetrics({ study }: { study: CaseStudy }) {
  if (study.results.length === 0) return null;
  return (
    <dl className="feat-metrics" data-cols={study.results.length === 3 ? 3 : 2}>
      {study.results.map((metric) => (
        <div key={metric.label}>
          <dt data-count="">{metric.value}</dt>
          <dd>{metric.label}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Three of the study's screens on a lit stage. They part on hover, and drift
 *  at different rates on scroll (`data-parallax`). */
function CaseStage({ study, number, t, lang }: CaseProps) {
  const shots = study.shots ?? [];
  // Centre the first screen; flank it with the next two.
  const [centre, left, right] = shots;
  return (
    <a
      className="feat-stage"
      href={asset(workPath(study.slug, lang))}
      aria-label={`${study.title} — ${t.work.readCase}`}
      data-cursor={t.home.work.cursor}
      data-spot=""
    >
      <span className="feat-stage-glow" aria-hidden="true" />
      <span className="home-spot" aria-hidden="true" />
      <span className="feat-stage-meta" aria-hidden="true">
        <span>{number}</span>
        {study.platforms ? <span>{study.platforms.join(" · ")}</span> : null}
      </span>
      {centre ? (
        <span className="feat-stage-phones" aria-hidden="true">
          {left ? (
            <span className="device feat-stage-phone is-start" data-parallax="0.05">
              <img src={asset(left.src)} alt="" width="738" height="1600" loading="lazy" />
            </span>
          ) : null}
          <span className="device feat-stage-phone is-centre" data-parallax="0.1">
            <img src={asset(centre.src)} alt="" width="738" height="1600" loading="lazy" />
          </span>
          {right ? (
            <span className="device feat-stage-phone is-end" data-parallax="0.03">
              <img src={asset(right.src)} alt="" width="738" height="1600" loading="lazy" />
            </span>
          ) : null}
        </span>
      ) : null}
    </a>
  );
}

/** Talia as the tree it runs: one authority, schools under it, the first one
 *  live. Drawn from `home.talia`; every label is stated in the case study. */
function TaliaDiagram({ study, t, lang }: { study: CaseStudy; t: Dictionary; lang: Lang }) {
  const d = t.home.talia;
  return (
    <a
      className="feat-diagram"
      href={asset(workPath(study.slug, lang))}
      aria-label={`${study.title} — ${t.work.readCase}`}
      data-cursor={t.home.work.cursor}
      data-spot=""
    >
      <span className="home-spot" aria-hidden="true" />
      <span className="feat-diagram-head" aria-hidden="true">
        <span>{d.label}</span>
        <span>{d.products}</span>
      </span>
      <span className="diagram" aria-hidden="true">
        <span className="diagram-node diagram-root">
          <span className="diagram-label">{d.authority}</span>
          <span className="diagram-title">{d.ministry}</span>
        </span>
        <span className="diagram-stem" />
        <span className="diagram-bar" />
        <span className="diagram-schools">
          <span className="diagram-branch">
            <span className="diagram-stem diagram-stem--short" />
            <span className="diagram-node diagram-node--live">
              <span className="diagram-label">
                <span>{d.school}</span>
                <span className="diagram-live">
                  <span className="diagram-live-dot" />
                  {d.live}
                </span>
              </span>
              <span className="diagram-title">{d.pilot}</span>
              <span className="diagram-roles">
                {d.roles.map((role) => (
                  <span key={role}>{role}</span>
                ))}
              </span>
            </span>
          </span>
          {[0, 1].map((key) => (
            <span className="diagram-branch" key={key}>
              <span className="diagram-stem diagram-stem--short" />
              <span className="diagram-node diagram-node--next">
                <span className="diagram-label">{d.school}</span>
                <span className="diagram-title">{d.nextTenant}</span>
              </span>
            </span>
          ))}
        </span>
      </span>
      <span className="diagram-notes" aria-hidden="true">
        {d.notes.map((note) => (
          <span className="diagram-note" key={note.label}>
            <span className="diagram-label">{note.label}</span>
            <span className="diagram-note-title">{note.title}</span>
            <span className="diagram-note-body">{note.body}</span>
          </span>
        ))}
      </span>
    </a>
  );
}

/** The third study, full-bleed: its two headline results large, and every
 *  screen in a row rising out of the bottom edge. */
function CaseCinema({ study, number, t, lang }: CaseProps) {
  const href = asset(workPath(study.slug, lang));
  const shots = study.shots ?? [];
  return (
    <article className="cinema" data-reveal="" aria-labelledby={`case-${study.slug}`}>
      <div className="home-wrap cinema-head">
        <div>
          <p className="feat-kicker">
            <span className="feat-kicker-n" aria-hidden="true">
              {number}
            </span>
            <span>{study.type}</span>
          </p>
          <h3 id={`case-${study.slug}`} className="feat-title">
            {study.title}
          </h3>
          {study.context ? <p className="feat-context">{study.context}</p> : null}
        </div>
        <p className="feat-summary">{study.summary}</p>
      </div>
      <div className="cinema-frame">
        <a
          className="cinema-stage"
          href={href}
          aria-label={`${study.title} — ${t.work.readCase}`}
          data-cursor={t.home.work.cursor}
          data-spot=""
        >
          <span className="cinema-glow" aria-hidden="true" />
          <span className="home-spot" aria-hidden="true" />
          <span className="cinema-metrics" aria-hidden="true">
            {study.results.slice(0, 2).map((metric) => (
              <span className="cinema-metric" key={metric.label}>
                <span className="cinema-value">{metric.value}</span>
                <span className="cinema-label">{metric.label}</span>
              </span>
            ))}
          </span>
          {shots.length > 0 ? (
            <span className="cinema-shots" data-parallax="0.07" aria-hidden="true">
              {shots.map((shot, index) => (
                <span
                  className="device cinema-shot"
                  key={shot.src}
                  style={{ "--offset": `${CINEMA_OFFSETS[index % CINEMA_OFFSETS.length]}px` } as CSSProperties}
                >
                  <img src={asset(shot.src)} alt="" width="230" height="499" loading="lazy" />
                </span>
              ))}
            </span>
          ) : null}
        </a>
      </div>
      <div className="home-wrap cinema-foot">
        <p className="feat-line">
          <span>{t.home.work.stack}</span> — {study.stack.join(" · ")}
        </p>
        <a className="button ghost" href={href} data-magnetic>
          {t.work.readCase}
          <span className="button-icon button-icon--go" aria-hidden="true">
            →
          </span>
          <span className="sr-only"> — {study.title}</span>
        </a>
      </div>
    </article>
  );
}
