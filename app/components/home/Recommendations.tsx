import { shared } from "../../data/shared";
import type { Dictionary } from "../../data/types";
import { asset } from "../../lib/asset";
import { SectionLabel } from "./parts";

/** Real LinkedIn recommendations, excerpted. The first is set large; the
 *  rest follow in a grid. Renders nothing if the list is ever emptied. */
export function Recommendations({ t, n }: { t: Dictionary; n: string }) {
  const [featured, ...rest] = t.testimonials;
  if (!featured) return null;
  const labels = t.testimonialLabels;
  const linkedinLabel = shared.socials.find((social) => social.label === "LinkedIn")?.label;

  return (
    <section className="home-section home-wrap" aria-labelledby="rec-title">
      <SectionLabel n={n} id="rec-title" heading>
        {t.testimonialsHeading.eyebrow}
      </SectionLabel>

      <figure className="rec-feature" data-reveal="">
        <span className="rec-mark" aria-hidden="true">
          “
        </span>
        <blockquote>{featured.quote}</blockquote>
        <figcaption>
          {featured.image ? (
            <img src={asset(featured.image)} alt="" width="52" height="52" loading="lazy" />
          ) : null}
          <div>
            <p className="rec-name">{featured.name}</p>
            <p className="rec-role">{featured.role}</p>
          </div>
          {featured.linkedin ? (
            <a className="rec-badge" href={featured.linkedin} target="_blank" rel="noreferrer">
              {labels.verified}
              <span className="glyph-dir" aria-hidden="true">
                ↗
              </span>
            </a>
          ) : null}
        </figcaption>
      </figure>

      {rest.length > 0 ? (
        <div className="rec-grid" data-reveal="">
          {rest.map((item) => (
            <figure className="rec-card" key={item.name}>
              <blockquote>{item.quote}</blockquote>
              <figcaption>
                {item.image ? (
                  <img src={asset(item.image)} alt="" width="40" height="40" loading="lazy" />
                ) : null}
                <div>
                  <p className="rec-name">{item.name}</p>
                  <p className="rec-role">{item.role}</p>
                </div>
                {item.linkedin ? (
                  <a
                    className="rec-link"
                    href={item.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${labels.view} — ${item.name}`}
                  >
                    {linkedinLabel}
                    <span className="glyph-dir" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                ) : null}
              </figcaption>
            </figure>
          ))}
        </div>
      ) : null}
    </section>
  );
}
