import { shared } from "../../data/shared";
import type { Dictionary, Lang } from "../../data/types";
import { asset } from "../../lib/asset";
import { cvPath } from "../../lib/cv";
import { localePath } from "../../lib/site";
import { ThemeSwitch } from "./ThemeSwitch";

/** The homepage's footer: who, the profiles, the other language by its own
 *  name, and the theme control. The sub-pages keep the fuller `Footer`. */
export function HomeFooter({ t, lang }: { t: Dictionary; lang: Lang }) {
  const other: Lang = lang === "en" ? "ar" : "en";
  const profiles = shared.socials.filter(
    (social) => social.label === "LinkedIn" || social.label === "GitHub",
  );
  const event: Record<string, string> = { LinkedIn: "linkedin_click", GitHub: "github_click" };

  return (
    <footer className="home-footer home-wrap">
      <p>
        <span className="home-footer-name">{t.name}</span> · {t.role} · {t.place}
      </p>
      <div className="home-footer-links">
        {profiles.map((profile) => (
          <a
            key={profile.label}
            href={profile.href}
            target="_blank"
            rel="noreferrer"
            data-track={event[profile.label]}
            data-track-source="footer"
          >
            {profile.label}
          </a>
        ))}
        <a href={asset(cvPath(lang))}>{t.cv.indexLabel}</a>
        <a href={asset(localePath[other])} hrefLang={other} lang={other}>
          {t.language.options[other]}
        </a>
      </div>
      <div className="home-footer-end">
        <ThemeSwitch copy={t.home.theme} />
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
