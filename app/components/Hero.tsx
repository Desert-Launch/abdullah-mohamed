import type { Dictionary, Social } from "../data/types";
import { bookingHref } from "../data/shared";
import { asset } from "../lib/asset";
import { servicesIndexPath } from "../lib/services";
import type { Lang } from "../data/types";
import { CountUp } from "./CountUp";
import { SocialLinks } from "./SocialLinks";

export function Hero({ t, lang, socials }: { t: Dictionary; lang: Lang; socials: Social[] }) {
  const linkedin = socials.find((social) => social.label === "LinkedIn");

  return (
    <section className="hero">
      <div className="hero-copy">
        {/* The role/location pill is part of the H1, not a <p> above it, so
            the page's one H1 says who this is ("Senior Software Engineer ·
            Cairo, Egypt · Remote") before the tagline. Visually identical to
            the old eyebrow; the flag is decoration, so it stays out of the
            text. The headline animates transform-only — see globals.css. */}
        <h1>
          <span className="eyebrow hero-kicker">
            {/* One text run, so on a narrow screen the flag wraps with the
                last word instead of being pushed to the pill's far edge. */}
            <span>
              {t.hero.eyebrow}
              <span className="hero-flag" aria-hidden="true">
                🇪🇬
              </span>
            </span>
          </span>
          <span className="hero-headline">
            {t.hero.title} <span className="hero-accent">{t.hero.titleAccent}</span>
          </span>
        </h1>
        <p className="hero-lead">{t.hero.lead}</p>

        {/* Two labelled rows, one per audience. A recruiter's first action and
            a client's first action are both one glance away, and each row's
            label says which is which — the single unlabelled row that came
            before was written entirely for the buyer. */}
        <div className="hero-actions">
          <div className="hero-cta-row">
            <p className="hero-cta-label">{t.hero.ctaRows.hiringLabel}</p>
            <div className="hero-cta-buttons">
              <a
                className="button primary"
                href={asset("/Abdullah_Mohamed_CV.pdf")}
                target="_blank"
                rel="noreferrer"
                data-magnetic
                data-track="cv_download"
                data-track-source="hero"
              >
                {t.hero.cv}
                <span className="button-icon button-icon--down" aria-hidden="true">
                  ↓
                </span>
              </a>
              <a className="button ghost" href="#experience">
                {t.hero.experience}
              </a>
              {linkedin ? (
                <a
                  className="button ghost"
                  href={linkedin.href}
                  target="_blank"
                  rel="noreferrer"
                  data-track="linkedin_click"
                  data-track-source="hero"
                >
                  {linkedin.label}
                  <span className="button-icon glyph-dir" aria-hidden="true">
                    ↗
                  </span>
                </a>
              ) : null}
            </div>
          </div>

          <div className="hero-cta-row">
            <p className="hero-cta-label">{t.hero.ctaRows.projectLabel}</p>
            <div className="hero-cta-buttons">
              <a
                className="button primary"
                href={bookingHref}
                data-magnetic
                data-track="book_call_click"
                data-track-source="hero"
              >
                {t.hero.primary}
                <span className="button-icon button-icon--go" aria-hidden="true">
                  →
                </span>
              </a>
              <a className="button ghost" href={asset(servicesIndexPath(lang))}>
                {t.hero.services}
              </a>
            </div>
          </div>
        </div>

        <p className="hero-currently">
          <span className="pulse-dot" aria-hidden="true" />
          {t.hero.currently}
        </p>

        <div className="hero-social" aria-label={t.hero.socialLabel}>
          <SocialLinks socials={socials} size={26} source="hero" />
        </div>
      </div>

      {/* The proof numbers used to sit ~900px below the fold, in the half of
          the desktop hero that was empty. Here they are the second column on a
          wide screen and the block under the CTAs on a phone — either way,
          inside the first viewport. */}
      <dl className="hero-proof" aria-label={t.hero.proofLabel}>
        {t.proof.map(([value, label]) => (
          <div className="hero-proof-item" key={label}>
            <dt>
              <CountUp value={value} />
            </dt>
            <dd>{label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
