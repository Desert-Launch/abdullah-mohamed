import type { Dictionary, Social } from "../data/types";
import { bookingHref } from "../data/shared";
import { asset } from "../lib/asset";
import { SocialLinks } from "./SocialLinks";

export function Hero({ t, socials }: { t: Dictionary; socials: Social[] }) {
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">{t.hero.eyebrow}</p>
        <h1>
          {t.hero.title} <span className="hero-accent">{t.hero.titleAccent}</span>
        </h1>
        <p className="hero-lead">
          {t.hero.lead} <em className="hero-em">{t.hero.leadEmphasis}</em>
        </p>

        <div className="hero-actions">
          <a className="button primary" href={bookingHref} data-magnetic>
            {t.hero.primary}
            <span className="button-icon button-icon--go" aria-hidden="true">
              →
            </span>
          </a>
          <a className="button ghost" href="#work">
            {t.hero.work}
          </a>
          <a
            className="button ghost"
            href={asset("/Abdullah_Mohamed_CV.pdf")}
            target="_blank"
            rel="noreferrer"
          >
            {t.hero.cv}
            <span className="button-icon button-icon--down" aria-hidden="true">
              ↓
            </span>
          </a>
        </div>

        <p className="hero-currently">
          <span className="pulse-dot" aria-hidden="true" />
          {t.hero.currently}
        </p>

        <div className="hero-social" aria-label={t.hero.socialLabel}>
          <SocialLinks socials={socials} size={26} />
        </div>
      </div>

    </section>
  );
}
