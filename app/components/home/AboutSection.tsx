import { profilePhoto } from "../../data/shared";
import type { Dictionary, Lang } from "../../data/types";
import { asset } from "../../lib/asset";
import { findProject, workPath } from "../../lib/work";
import { SectionLabel } from "./parts";

/**
 * "About", then the principles. The facts list is a real <dl>: it is the
 * quotable block an assistant lifts when asked who he is, so every value is
 * one line and states something found elsewhere on the page or the CV. Each
 * principle links to the case study whose decision it condenses.
 */
export function AboutSection({ t, lang, n }: { t: Dictionary; lang: Lang; n: string }) {
  const about = t.about;
  const principles = t.home.principles;

  return (
    <section id="about" className="home-section home-wrap" aria-labelledby="about-title">
      <SectionLabel n={n}>{about.eyebrow}</SectionLabel>
      <div className="about" data-reveal="">
        {profilePhoto ? (
          <figure className="about-figure">
            <img
              src={asset(profilePhoto)}
              alt={about.photoAlt}
              width="1280"
              height="1279"
              loading="lazy"
            />
            <figcaption>{about.photoCaption}</figcaption>
          </figure>
        ) : null}
        <div className="about-text">
          <h2 id="about-title">{about.title}</h2>
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <dl className="about-list" aria-label={about.factsLabel}>
            {about.facts.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="principles" data-reveal="">
        <div className="principles-head">
          <h3>{principles.title}</h3>
          <p>{principles.note}</p>
        </div>
        <ol>
          {principles.items.map((item, index) => {
            const study = findProject(item.slug, lang);
            return (
              <li key={item.text}>
                <p>
                  <span className="principles-n" aria-hidden="true">
                    P{index + 1}
                  </span>
                  {item.text}
                </p>
                {study ? (
                  <a className="home-link" href={asset(workPath(study.slug, lang))}>
                    {study.title}
                    <span className="glyph-dir" aria-hidden="true">
                      →
                    </span>
                  </a>
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
