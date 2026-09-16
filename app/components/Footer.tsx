import type { Dictionary, Lang, Social } from "../data/types";
import { asset } from "../lib/asset";
import { bookingHref, contactEmail } from "../data/shared";

/** Conversion event per profile link (see docs/analytics.md). */
const PROFILE_EVENT: Record<string, string> = {
  LinkedIn: "linkedin_click",
  GitHub: "github_click",
};

interface FooterProps {
  t: Dictionary;
  lang: Lang;
  socials: Social[];
  /** Page the footer's in-page anchors belong to. Empty on the locale home
   *  pages, where `#services` resolves against the current document; set to
   *  "/" on the standalone /work pages, where those sections live elsewhere
   *  and a bare anchor would go nowhere. */
  linkBase?: string;
}

export function Footer({ t, lang, socials, linkBase = "" }: FooterProps) {
  const year = new Date().getFullYear();
  const name = lang === "ar" ? "عبدالله محمد" : "Abdullah Mohamed";
  // Anchors get the base prefix; real paths (e.g. "/work/") are already
  // absolute and only need the deploy basePath.
  const sectionHref = (href: string) =>
    href.startsWith("#") ? `${asset(linkBase)}${href}` : asset(href);
  const externalProfiles = socials.filter(
    (social) => social.href.startsWith("http") && social.label !== "WhatsApp",
  );
  const whatsapp = socials.find((social) => social.label === "WhatsApp");

  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          {/* The visible text is "AM Abdullah Mohamed", so the accessible name
              has to start with it — an aria-label of "… home" alone made the
              two disagree (axe: label-content-name-mismatch), which breaks
              voice control, where people say what they can see. */}
          <a className="footer-logo" href={sectionHref("#home")} title={t.work.home}>
            <span>AM</span>
            <strong>{name}</strong>
          </a>
          <p>{t.hero.roleLine}</p>
          <div className="footer-note">
            <span aria-hidden="true" />
            {t.hero.availability}
          </div>
        </div>

        <nav className="footer-column" aria-label={lang === "ar" ? "روابط الأقسام" : "Section links"}>
          <h2>{lang === "ar" ? "الأقسام" : "Sections"}</h2>
          {t.nav.map(([label, href]) => (
            <a key={href} href={sectionHref(href)}>
              {label}
            </a>
          ))}
        </nav>

        <div className="footer-column">
          <h2>{lang === "ar" ? "الملفات" : "Profiles"}</h2>
          {externalProfiles.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              data-track={PROFILE_EVENT[social.label]}
              data-track-source="footer"
            >
              <img src={asset(social.icon)} alt="" width="18" height="18" loading="lazy" />
              {social.label}
            </a>
          ))}
        </div>

        <div className="footer-column footer-contact">
          <h2>{lang === "ar" ? "تواصل" : "Contact"}</h2>
          <a
            href={bookingHref}
            target={bookingHref.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            data-track="book_call_click"
            data-track-source="footer"
          >
            {lang === "ar" ? "احجز مكالمة" : "Book a call"}
          </a>
          <a
            href={asset("/Abdullah_Mohamed_CV.pdf")}
            target="_blank"
            rel="noreferrer"
            data-track="cv_download"
            data-track-source="footer"
          >
            {t.hero.cv}
          </a>
          <a
            className="footer-email"
            href={`mailto:${contactEmail}`}
            data-track="email_click"
            data-track-source="footer"
          >
            {contactEmail}
          </a>
          {whatsapp ? (
            <a
              href={whatsapp.href}
              target="_blank"
              rel="noreferrer"
              data-track="whatsapp_click"
              data-track-source="footer"
            >
              {lang === "ar" ? "واتساب" : "WhatsApp"}
            </a>
          ) : null}
          <span>{lang === "ar" ? "القاهرة · ريموت · GMT+2" : "Cairo · Remote · GMT+2"}</span>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {year} · {name}
        </p>
        <p>
          {lang === "ar"
            ? "تحليلات تحترم الخصوصية · بدون كوكيز"
            : "Privacy-friendly analytics · No cookies"}
        </p>
      </div>
    </footer>
  );
}
