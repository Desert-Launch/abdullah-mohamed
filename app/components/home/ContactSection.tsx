import { bookingHref, contactEmail, cvPdf, shared } from "../../data/shared";
import type { Dictionary, Lang } from "../../data/types";
import { asset } from "../../lib/asset";
import { inquiryPath } from "../../lib/inquiry";
import { CopyEmailButton } from "./CopyEmailButton";
import { SectionLabel, SplitWords, wordCount } from "./parts";

/**
 * "Hiring, or building?": one lane per audience, then the address itself. The
 * lane buttons are built from data the site already holds (the CV, the
 * booking link, `shared.socials`), so no label is duplicated. Every CTA
 * declares its conversion event (docs/analytics.md). The project lane leads
 * with the written brief — the step a client without a technical spec can
 * take — and keeps the call and WhatsApp beside it.
 */
export function ContactSection({ t, lang, n }: { t: Dictionary; lang: Lang; n: string }) {
  const contact = t.contact;
  const social = (label: string) => shared.socials.find((item) => item.label === label);
  const linkedin = social("LinkedIn");
  const whatsapp = social("WhatsApp");
  const github = social("GitHub");

  return (
    <section id="contact" className="home-section home-contact home-wrap" aria-labelledby="contact-title">
      <SectionLabel n={n}>{contact.eyebrow}</SectionLabel>
      <h2 id="contact-title" className="contact-title" data-rise="">
        <SplitWords text={contact.title} />{" "}
        <span className="contact-title-accent">
          <SplitWords text={contact.titleAccent} start={wordCount(contact.title)} />
        </span>
      </h2>
      <p className="contact-lead">{contact.body}</p>

      <div className="lanes" data-reveal="">
        <div className="lane">
          <p className="lane-label">{contact.lanes.hiring.label}</p>
          <h3>{contact.lanes.hiring.title}</h3>
          <p>{contact.lanes.hiring.body}</p>
          <div className="lane-actions">
            <a
              className="button primary"
              href={asset(cvPdf)}
              target="_blank"
              rel="noreferrer"
              data-magnetic
              data-track="cv_download"
              data-track-source="contact"
            >
              {t.hero.cv}
              <span className="button-icon button-icon--go" aria-hidden="true">
                →
              </span>
            </a>
            {linkedin ? (
              <a
                className="button ghost"
                href={linkedin.href}
                target="_blank"
                rel="noreferrer"
                data-magnetic
                data-track="linkedin_click"
                data-track-source="contact"
              >
                {linkedin.label}
                <span className="button-icon glyph-dir" aria-hidden="true">
                  ↗
                </span>
              </a>
            ) : null}
          </div>
        </div>
        <div className="lane">
          <p className="lane-label">{contact.lanes.project.label}</p>
          <h3>{contact.lanes.project.title}</h3>
          <p>{contact.lanes.project.body}</p>
          <div className="lane-actions">
            <a
              className="button secondary"
              href={asset(inquiryPath(lang))}
              data-magnetic
              data-track="start_project_click"
              data-track-source="contact"
            >
              {t.hero.start}
              <span className="button-icon button-icon--go" aria-hidden="true">
                →
              </span>
            </a>
            <a
              className="button ghost"
              href={bookingHref}
              data-magnetic
              data-track="book_call_click"
              data-track-source="contact"
            >
              {t.hero.primary}
            </a>
            {whatsapp ? (
              <a
                className="button ghost"
                href={whatsapp.href}
                target="_blank"
                rel="noreferrer"
                data-magnetic
                data-track="whatsapp_click"
                data-track-source="contact"
              >
                {whatsapp.label}
                <span className="button-icon glyph-dir" aria-hidden="true">
                  ↗
                </span>
              </a>
            ) : null}
          </div>
        </div>
      </div>

      <div className="reach">
        <a
          className="reach-email"
          href={`mailto:${contactEmail}`}
          dir="ltr"
          data-track="email_click"
          data-track-source="contact"
        >
          {contactEmail}
        </a>
        <div className="reach-links">
          <CopyEmailButton email={contactEmail} label={contact.copyEmail} copiedLabel={contact.copied} />
          {github ? (
            <a
              className="home-link"
              href={github.href}
              target="_blank"
              rel="noreferrer"
              data-track="github_click"
              data-track-source="contact"
            >
              {github.label}
              <span className="glyph-dir" aria-hidden="true">
                ↗
              </span>
            </a>
          ) : null}
          {linkedin ? (
            <a
              className="home-link"
              href={linkedin.href}
              target="_blank"
              rel="noreferrer"
              data-track="linkedin_click"
              data-track-source="contact"
            >
              {linkedin.label}
              <span className="glyph-dir" aria-hidden="true">
                ↗
              </span>
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
