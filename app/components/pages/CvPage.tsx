import { JsonLd } from "../JsonLd";
import { WorkHeader } from "../WorkHeader";
import { Footer } from "../Footer";
import { copy } from "../../data/copy";
import { shared, contactEmail } from "../../data/shared";
import type { Lang, SkillGroup } from "../../data/types";
import { asset } from "../../lib/asset";
import { cvJsonLd } from "../../lib/jsonld";
import { localePath } from "../../lib/site";

/** One graded row of a skills group. Empty levels render nothing — several
 *  groups genuinely have no incidental tools. */
function SkillRow({ label, items }: { label: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div className="cv-skill-row">
      <dt>{label}</dt>
      <dd>{items.join(" · ")}</dd>
    </div>
  );
}

function SkillCard({
  group,
  labels,
}: {
  group: SkillGroup;
  labels: { core: string; strong: string; used: string };
}) {
  return (
    <article className="cv-skill-group">
      <h3>{group.group}</h3>
      <dl className="cv-skill-levels">
        <SkillRow label={labels.core} items={group.core} />
        <SkillRow label={labels.strong} items={group.strong} />
        <SkillRow label={labels.used} items={group.used} />
      </dl>
    </article>
  );
}

/**
 * `/cv/` and `/ar/cv/` — the HTML résumé.
 *
 * Built from data the site already holds: the employment history is
 * `Dictionary.experiences` (the same array the homepage timeline renders, so
 * the two can never disagree), and only the summary, education, skills and
 * languages are `Dictionary.cv`. The PDF is linked, not replaced — this page
 * exists for the things a PDF can't do: be crawled, be read by an assistant,
 * and be copied into an ATS form.
 */
export function CvPage({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const cv = t.cv;

  return (
    <div className="site-shell work-shell" dir={t.dir}>
      <JsonLd data={cvJsonLd(lang)} />
      <div className="aurora-field" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <WorkHeader t={t} lang={lang} section="cv" current="index" />

      {/* id="home" is the skip-link target rendered by RootHtml. */}
      <main id="home" className="work-main cv-main">
        <header className="cv-head">
          <p className="eyebrow">{cv.eyebrow}</p>
          <h1>{cv.title}</h1>
          <p className="cv-lead">{cv.lead}</p>
          <div className="cv-head-actions">
            <a
              className="button primary"
              href={asset("/Abdullah_Mohamed_CV.pdf")}
              target="_blank"
              rel="noreferrer"
              data-track="cv_download"
              data-track-source="cv-page"
            >
              {cv.downloadPdf}
              <span className="button-icon button-icon--down" aria-hidden="true">
                ↓
              </span>
            </a>
            <a
              className="button ghost"
              href={`mailto:${contactEmail}`}
              data-track="email_click"
              data-track-source="cv-page"
            >
              {contactEmail}
            </a>
          </div>
          <p className="cv-print-note">{cv.labels.printNote}</p>
        </header>

        <section className="cv-section" aria-labelledby="cv-summary">
          <h2 className="case-label" id="cv-summary">
            {cv.labels.summary}
          </h2>
          <p className="cv-summary">{cv.summary}</p>
        </section>

        {/* The same roles as the homepage timeline, in résumé form: dates,
            title, company, and what was owned there. */}
        <section className="cv-section" aria-labelledby="cv-experience">
          <h2 className="case-label" id="cv-experience">
            {cv.labels.experience}
          </h2>
          <div className="cv-roles">
            {t.experiences.map((role) => (
              <article className="cv-role" key={`${role.company}-${role.date}`}>
                <div className="cv-role-head">
                  <h3>{role.role}</h3>
                  <p className="cv-role-company">
                    {role.company} · {role.location}
                  </p>
                  <p className="cv-role-date">{role.date}</p>
                </div>
                <p className="cv-role-summary">{role.summary}</p>
                <ul className="cv-role-points">
                  {role.achievements.map((achievement) => (
                    <li key={achievement}>{achievement}</li>
                  ))}
                </ul>
                {role.apps.length > 0 ? (
                  <p className="cv-role-products">
                    {role.apps.map((app) => app.title).join(" · ")}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section className="cv-section" aria-labelledby="cv-skills">
          <h2 className="case-label" id="cv-skills">
            {cv.labels.skills}
          </h2>
          <div className="cv-skills">
            {cv.skills.map((group) => (
              <SkillCard key={group.group} group={group} labels={cv.labels} />
            ))}
          </div>
        </section>

        <div className="cv-columns">
          <section className="cv-section" aria-labelledby="cv-education">
            <h2 className="case-label" id="cv-education">
              {cv.labels.education}
            </h2>
            {cv.education.map((item) => (
              <article className="cv-education" key={item.degree}>
                <h3>{item.degree}</h3>
                <p>{item.school}</p>
                <p className="cv-role-date">
                  {item.date} · {item.detail}
                </p>
              </article>
            ))}
          </section>

          <section className="cv-section" aria-labelledby="cv-languages">
            <h2 className="case-label" id="cv-languages">
              {cv.labels.languages}
            </h2>
            <ul className="cv-languages">
              {cv.languages.map((language) => (
                <li key={language}>{language}</li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      <Footer t={t} lang={lang} socials={shared.socials} linkBase={localePath[lang]} />
    </div>
  );
}
