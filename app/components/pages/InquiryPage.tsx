import { InquiryForm } from "../InquiryForm";
import { JsonLd } from "../JsonLd";
import { WorkHeader } from "../WorkHeader";
import { Footer } from "../Footer";
import { copy } from "../../data/copy";
import { bookingHref, contactEmail, cvPdf, shared } from "../../data/shared";
import type { Lang } from "../../data/types";
import { asset } from "../../lib/asset";
import { cvPath } from "../../lib/cv";
import { inquiryJsonLd } from "../../lib/jsonld";
import { priceRange, servicePages } from "../../lib/services";
import { localePath } from "../../lib/site";

/**
 * `/start-a-project/` and `/ar/start-a-project/` — the brief.
 *
 * The form is the page; the aside answers the three things a first-time
 * client wonders before sending anything: what happens next, whether they can
 * just talk instead, and (for the recruiter who landed here) where the CV is.
 * Only the form is a client island, and it gets its copy slice rather than
 * the dictionary.
 */
export function InquiryPage({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const inquiry = t.inquiry;
  const whatsapp = shared.socials.find((social) => social.label === "WhatsApp")?.href;
  const linkedin = shared.socials.find((social) => social.label === "LinkedIn");

  return (
    <div className="site-shell work-shell" dir={t.dir}>
      <JsonLd data={inquiryJsonLd(lang)} />
      <div className="aurora-field" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <WorkHeader t={t} lang={lang} section="start" current="index" />

      {/* id="home" is the skip-link target rendered by RootHtml. */}
      <main id="home" className="work-main">
        <div className="section-heading inquiry-heading">
          <p className="eyebrow">{inquiry.eyebrow}</p>
          <h1>{inquiry.title}</h1>
          <p>{inquiry.lead}</p>
        </div>

        <div className="inquiry-layout">
          <InquiryForm
            copy={inquiry}
            email={contactEmail}
            whatsapp={whatsapp}
            services={servicePages(lang).map((page) => ({ slug: page.slug, name: page.name }))}
            priceRange={priceRange(lang)}
          />

          <aside className="inquiry-aside">
            <section aria-labelledby="inquiry-next">
              <h2 className="case-label" id="inquiry-next">
                {inquiry.next.title}
              </h2>
              <ol className="inquiry-next">
                {inquiry.next.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </section>

            <section aria-labelledby="inquiry-talk">
              <h2 className="case-label" id="inquiry-talk">
                {inquiry.alternatives.title}
              </h2>
              <p>{inquiry.alternatives.body}</p>
              <div className="inquiry-aside-links">
                <a
                  className="button ghost"
                  href={bookingHref}
                  data-track="book_call_click"
                  data-track-source="inquiry"
                >
                  {inquiry.alternatives.book}
                </a>
                <a
                  className="home-link"
                  href={`mailto:${contactEmail}`}
                  dir="ltr"
                  data-track="email_click"
                  data-track-source="inquiry"
                >
                  {contactEmail}
                </a>
              </div>
            </section>

            <section aria-labelledby="inquiry-hiring">
              <h2 className="case-label" id="inquiry-hiring">
                {inquiry.hiring.title}
              </h2>
              <p>{inquiry.hiring.body}</p>
              <div className="inquiry-aside-links">
                <a className="home-link" href={asset(cvPath(lang))}>
                  {t.cv.indexLabel}
                </a>
                <a
                  className="home-link"
                  href={asset(cvPdf)}
                  target="_blank"
                  rel="noreferrer"
                  data-track="cv_download"
                  data-track-source="inquiry"
                >
                  {t.hero.cv}
                </a>
                {linkedin ? (
                  <a
                    className="home-link"
                    href={linkedin.href}
                    target="_blank"
                    rel="noreferrer"
                    data-track="linkedin_click"
                    data-track-source="inquiry"
                  >
                    {linkedin.label}
                    <span className="glyph-dir" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                ) : null}
              </div>
            </section>
          </aside>
        </div>
      </main>

      <Footer t={t} lang={lang} socials={shared.socials} linkBase={localePath[lang]} />
    </div>
  );
}
