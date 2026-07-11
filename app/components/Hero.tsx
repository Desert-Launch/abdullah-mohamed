import type { Dictionary, Social } from "../data/types";
import { bookingHref } from "../data/shared";
import { asset } from "../lib/asset";
import { SocialLinks } from "./SocialLinks";

export function Hero({ t, socials }: { t: Dictionary; socials: Social[] }) {
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">{t.hero.eyebrow}</p>
        <h1>{t.hero.title}</h1>
        <p className="hero-role">{t.hero.roleLine}</p>
        <p className="hero-tagline">{t.hero.tagline}</p>
        <p className="hero-lead">{t.hero.lead}</p>

        <div className="hero-actions">
          <a className="button primary" href={bookingHref}>
            {t.hero.primary}
          </a>
          <a
            className="button ghost"
            href={asset("/Abdullah_Mohamed_Abdullah_CV.pdf")}
            target="_blank"
            rel="noreferrer"
          >
            {t.hero.cv}
          </a>
        </div>

        <div className="hero-social" aria-label={t.hero.socialLabel}>
          <SocialLinks socials={socials} size={26} />
        </div>
      </div>

      <aside className="hero-board" aria-label="Portfolio highlights">
        <div className="availability-card">
          <span className="status-dot" />
          <p>{t.hero.availability}</p>
        </div>

        <div className="device-stack">
          <img className="phone phone-main" src={asset("/images/jaweb1.webp")} alt="Jaweb mobile screen" />
          <img className="phone phone-side" src={asset("/images/fastab1.webp")} alt="FasTap mobile screen" />
          <div className="system-card">
            <span>{t.hero.stackLabel}</span>
            <strong>{t.hero.stack}</strong>
          </div>
        </div>
      </aside>
    </section>
  );
}
