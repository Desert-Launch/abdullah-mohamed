import type { Dictionary, Lang } from "../../data/types";
import { asset } from "../../lib/asset";
import { cvPath } from "../../lib/cv";
import { ExperienceTabs, type RoleView } from "./ExperienceTabs";
import { SectionLabel } from "./parts";

/** "Experience": the same `experiences` the /cv/ page renders, so the two
 *  cannot disagree. */
export function ExperienceSection({ t, lang, n }: { t: Dictionary; lang: Lang; n: string }) {
  // Only what the tabs render crosses into the client component.
  const roles: RoleView[] = t.experiences.map((role) => ({
    company: role.company,
    role: role.role,
    date: role.date,
    location: role.location,
    logo: asset(role.logo),
    summary: role.summary,
    achievements: role.achievements,
    apps: role.apps.map((app) => ({
      title: app.title,
      type: app.type,
      image: app.image ? asset(app.image) : undefined,
      body: app.body,
      stack: app.stack.join(" · "),
    })),
  }));

  return (
    <section id="experience" className="home-section home-wrap" aria-labelledby="exp-title">
      <SectionLabel n={n}>{t.workHeading.eyebrow}</SectionLabel>
      <div className="home-head home-head--action">
        <h2 id="exp-title">{t.workHeading.title}</h2>
        <a className="button ghost" href={asset(cvPath(lang))} data-magnetic>
          {t.home.experience.fullCv}
          <span className="button-icon button-icon--go" aria-hidden="true">
            →
          </span>
        </a>
      </div>
      <ExperienceTabs
        roles={roles}
        tabsLabel={t.home.experience.tabsLabel}
        productsLabel={t.home.experience.products}
      />
    </section>
  );
}
