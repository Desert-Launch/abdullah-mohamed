import type { CSSProperties } from "react";
import { cvPdf } from "../../data/shared";
import type { Dictionary, Lang } from "../../data/types";
import { asset } from "../../lib/asset";
import { findProject, workPath } from "../../lib/work";
import { SplitWords, wordCount } from "./parts";

/** Which strata carry a travelling signal, and its timing (seconds). */
const SIGNALS: Record<number, { duration: number; delay: number }> = {
  1: { duration: 6.5, delay: 0.4 },
  3: { duration: 8, delay: 3.2 },
};

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

/**
 * The hero. The H1 holds the meta row's first two items — who, and where —
 * above the tagline, so the page's one heading names the person and the role
 * (CLAUDE.md). The headline's words rise in on a transform-only animation:
 * text that starts at opacity 0 is excluded from LCP, and this is the LCP
 * element. The availability line sits beside the meta row but outside the
 * heading.
 */
export function HomeHero({ t, lang }: { t: Dictionary; lang: Lang }) {
  const hero = t.hero;
  const titleWords = wordCount(hero.title);

  return (
    <section className="home-hero home-wrap" aria-labelledby="hero-title">
      <div className="home-hero-head">
        <p className="home-hero-status home-intro">
          <span className="home-live-dot" aria-hidden="true" />
          {hero.status}
        </p>
        <h1 id="hero-title" className="home-hero-title">
          {/* The spaces between the parts are real text: the flex gap
              separates them on screen, but a crawler or screen reader reads
              the heading's text, and without them it runs words together. */}
          <span className="home-hero-meta home-intro-solid">
            <span className="home-hero-who">{hero.eyebrow}</span>{" "}
            <span className="home-hero-place">{hero.place}</span>
          </span>{" "}
          <span className="home-hero-headline">
            <SplitWords text={hero.title} />{" "}
            <span className="home-hero-accent">
              <SplitWords text={hero.titleAccent} start={titleWords} />
            </span>
          </span>
        </h1>
      </div>

      <div className="home-hero-body">
        <div className="home-hero-lead home-intro" style={delay(700)}>
          <p>{hero.lead}</p>
          <div className="home-hero-actions">
            <a className="button primary" href="#work" data-magnetic>
              {hero.explore}
              <span className="button-icon button-icon--go" aria-hidden="true">
                →
              </span>
            </a>
            <a className="button ghost" href="#contact" data-magnetic>
              {hero.talk}
            </a>
            <a
              className="home-link"
              href={asset(cvPdf)}
              target="_blank"
              rel="noreferrer"
              data-track="cv_download"
              data-track-source="hero"
            >
              {hero.cv}
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        <dl className="home-hero-facts home-intro" style={delay(850)} aria-label={hero.factsLabel}>
          {hero.facts.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <Strata t={t} lang={lang} />
    </section>
  );
}

/**
 * "Production strata": Faheem drawn as the five layers it runs on, with the
 * app's own screens standing on top. The whole card is one link into the case
 * study, named by `ariaLabel`, so its contents are decoration to assistive
 * tech. On a phone the screens move above the layer list.
 */
function Strata({ t, lang }: { t: Dictionary; lang: Lang }) {
  const strata = t.home.strata;
  const study = findProject("faheem", lang);
  const shots = study?.shots ?? [];
  // faheem1: worked solution · faheem2: photographed equation · faheem3: chat
  const [solution, photo, chat] = shots;

  return (
    <a
      className="strata home-intro"
      style={delay(1000)}
      href={asset(workPath("faheem", lang))}
      aria-label={strata.ariaLabel}
      data-cursor={strata.cursor}
      data-spot=""
      data-tilt=""
    >
      <span className="strata-glow" aria-hidden="true" />
      <span className="home-spot" aria-hidden="true" />
      <span className="strata-head" aria-hidden="true">
        <span>{strata.label}</span>
        <span className="strata-stat">{strata.stat}</span>
      </span>
      <span className="strata-layers" aria-hidden="true">
        {strata.layers.map((layer, index) => {
          const signal = SIGNALS[index];
          return (
            <span className="strata-layer" key={layer.layer}>
              {signal ? (
                <span
                  className="strata-signal"
                  style={
                    {
                      "--duration": `${signal.duration}s`,
                      "--delay": `${signal.delay}s`,
                    } as CSSProperties
                  }
                />
              ) : null}
              <span className="strata-n">L{index + 1}</span>
              <span className="strata-name">{layer.layer}</span>
              <span className="strata-detail">{layer.detail}</span>
            </span>
          );
        })}
      </span>
      <span className="strata-cta" aria-hidden="true">
        {t.work.readCase}
        <span className="glyph-dir">→</span>
      </span>
      {chat ? (
        <span className="strata-phones" data-tilt-target="" aria-hidden="true">
          {solution ? (
            <span className="device strata-phone strata-phone--wide">
              <img src={asset(solution.src)} alt="" width="738" height="1600" loading="lazy" />
            </span>
          ) : null}
          <span className="device strata-phone strata-phone--main">
            <img src={asset(chat.src)} alt="" width="738" height="1600" loading="lazy" />
          </span>
          {photo ? (
            <span className="device strata-phone strata-phone--side">
              <img src={asset(photo.src)} alt="" width="738" height="1600" loading="lazy" />
            </span>
          ) : null}
        </span>
      ) : null}
    </a>
  );
}
