import { copy } from "../data/copy";
import type { Lang } from "../data/types";
import { asset } from "../lib/asset";
import { cvPath } from "../lib/cv";
import { localePath } from "../lib/site";
import { AgentTools } from "./AgentTools";
import { AboutSection } from "./home/AboutSection";
import { ContactSection } from "./home/ContactSection";
import { ExperienceSection } from "./home/ExperienceSection";
import { HomeChrome } from "./home/HomeChrome";
import { HomeFooter } from "./home/HomeFooter";
import { HomeHero } from "./home/HomeHero";
import { HomeMotion } from "./home/HomeMotion";
import { ProofSection } from "./home/ProofSection";
import { Recommendations } from "./home/Recommendations";
import { ServicesSection } from "./home/ServicesSection";
import { StackSection } from "./home/StackSection";
import { WorkSection } from "./home/WorkSection";
import { pad } from "./home/parts";

/**
 * The homepage body, shared by `/` and `/ar/`. A server component: the
 * sections are static markup, and the few interactive parts (the chrome and
 * its menu, the theme control, the stack map, the role tabs, copy-email, and
 * the motion layer) are client islands inside it.
 *
 * Section order is the JSX order below. Ids are stable — they are the nav
 * anchors and the scrollspy targets — and the "02"…"09" labels are numbered in
 * this same order, so moving a section renumbers it.
 */
export function Portfolio({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const other: Lang = lang === "en" ? "ar" : "en";
  let section = 1;
  const next = () => pad(++section);

  return (
    <div className="home" id="top" dir={t.dir} data-lang={lang}>
      {/* Renders nothing. Offers this page's content to an AI agent driving the
          browser, via WebMCP — see AgentTools.tsx. */}
      <AgentTools lang={lang} />
      <HomeChrome
        lang={lang}
        name={t.name}
        homeLabel={`${t.name} — ${t.work.home}`}
        backToTop={t.backToTop}
        nav={t.nav.map(([label, href]) => ({ label, href, id: href.replace(/^#/, "") }))}
        cv={{ href: asset(cvPath(lang)), label: t.cv.indexLabel }}
        talk={t.hero.talk}
        chrome={t.home.chrome}
        theme={t.home.theme}
        language={t.language}
        alternate={{ href: asset(localePath[other]), lang: other }}
      />

      {/* id="home" is the skip-link target rendered by RootHtml. */}
      <main id="home">
        <HomeHero t={t} lang={lang} />
        <ProofSection t={t} n={next()} />
        {/* Services right after the proof: a visitor who came to hire should
            find their path ("I have an idea", "my app is slow") on the second
            screen, not the eighth. Recruiters have the hero's "Explore
            selected work" and the nav for #work. */}
        <ServicesSection t={t} lang={lang} n={next()} />
        <WorkSection t={t} lang={lang} n={next()} />
        <StackSection t={t} lang={lang} n={next()} />
        <ExperienceSection t={t} lang={lang} n={next()} />
        {t.testimonials.length > 0 ? <Recommendations t={t} n={next()} /> : null}
        <AboutSection t={t} lang={lang} n={next()} />
        <ContactSection t={t} lang={lang} n={next()} />
      </main>

      <HomeFooter t={t} lang={lang} />
      <HomeMotion />
    </div>
  );
}
