import type { Dictionary } from "../data/types";
import { storeLinks } from "../data/shared";

const isRealUrl = (url?: string): url is string => !!url && url.startsWith("http");

export function SelectedWork({ t }: { t: Dictionary }) {
  if (t.selectedWork.length === 0) return null;

  return (
    <section id="work" className="section">
      <div className="section-heading">
        <p className="eyebrow">{t.selectedWorkHeading.eyebrow}</p>
        <h2>{t.selectedWorkHeading.title}</h2>
        {t.selectedWorkHeading.body ? <p>{t.selectedWorkHeading.body}</p> : null}
      </div>

      <div className="work-grid">
        {t.selectedWork.map((app) => {
          const links = storeLinks[app.key] ?? {};
          const hasStore = isRealUrl(links.appStore) || isRealUrl(links.play);
          return (
            <article className="work-card" key={app.key}>
              <div className="work-card-head">
                {app.image ? (
                  <img src={app.image} alt={`${app.title} logo`} loading="lazy" />
                ) : (
                  <span className="work-card-fallback" aria-hidden="true">
                    {app.title.slice(0, 1)}
                  </span>
                )}
                <h3>{app.title}</h3>
              </div>
              <p className="work-card-tagline">{app.tagline}</p>
              {hasStore ? (
                <div className="work-stores">
                  {isRealUrl(links.appStore) ? (
                    <a className="store-pill" href={links.appStore} target="_blank" rel="noreferrer">
                      App Store
                    </a>
                  ) : null}
                  {isRealUrl(links.play) ? (
                    <a className="store-pill" href={links.play} target="_blank" rel="noreferrer">
                      Google Play
                    </a>
                  ) : null}
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
