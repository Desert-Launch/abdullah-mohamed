import type { Dictionary } from "../data/types";
import { storeLinks } from "../data/shared";
import { asset } from "../lib/asset";

const isRealUrl = (url?: string): url is string => !!url && url.startsWith("http");

export function SelectedWork({ t }: { t: Dictionary }) {
  if (t.selectedWork.length === 0) return null;

  return (
    <section id="work" className="section selected-work-section">
      <div className="section-heading selected-work-heading" data-reveal>
        <div>
          <p className="eyebrow">{t.selectedWorkHeading.eyebrow}</p>
          <h2>{t.selectedWorkHeading.title}</h2>
          {t.selectedWorkHeading.body ? <p>{t.selectedWorkHeading.body}</p> : null}
        </div>
        <p className="work-count" aria-label={`${t.selectedWork.length} ${t.selectedWorkLabels.products}`}>
          <strong>{String(t.selectedWork.length).padStart(2, "0")}</strong>
          <span>{t.selectedWorkLabels.products}</span>
        </p>
      </div>

      <div className="work-grid">
        {t.selectedWork.map((app, index) => {
          const links = storeLinks[app.key] ?? {};
          const hasStore = isRealUrl(links.appStore) || isRealUrl(links.play);
          return (
            <article className="work-card" key={app.key} data-reveal data-glow>
              <span className="card-spotlight" aria-hidden="true" />
              <span className="card-edge" aria-hidden="true" />
              <span className="work-card-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="work-card-head">
                <div className="work-card-logo">
                  {app.image ? (
                    <img src={asset(app.image)} alt="" loading="lazy" />
                  ) : (
                    <span className="work-card-fallback" aria-hidden="true">
                      {app.title.slice(0, 1)}
                    </span>
                  )}
                </div>
                <h3>{app.title}</h3>
              </div>
              <p className="work-card-tagline">{app.tagline}</p>
              {hasStore ? (
                <div className="work-stores">
                  {isRealUrl(links.appStore) ? (
                    <a className="store-pill" href={links.appStore} target="_blank" rel="noreferrer">
                      {t.selectedWorkLabels.appStore}<span aria-hidden="true">↗</span>
                    </a>
                  ) : null}
                  {isRealUrl(links.play) ? (
                    <a className="store-pill" href={links.play} target="_blank" rel="noreferrer">
                      {t.selectedWorkLabels.googlePlay}<span aria-hidden="true">↗</span>
                    </a>
                  ) : null}
                </div>
              ) : (
                <div className="work-status">
                  <span aria-hidden="true" />
                  {t.selectedWorkLabels.productBuild}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
