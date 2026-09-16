import type { Social } from "../data/types";
import { asset } from "../lib/asset";

/** Conversion event per channel (see docs/analytics.md); a channel not
 *  listed here is simply not tracked. */
const TRACK_EVENT: Record<string, string> = {
  Email: "email_click",
  WhatsApp: "whatsapp_click",
  LinkedIn: "linkedin_click",
  GitHub: "github_click",
};

export function SocialLinks({
  socials,
  size = 24,
  source,
}: {
  socials: Social[];
  size?: number;
  /** Where on the page this row sits — the event's `source` property. */
  source: string;
}) {
  return (
    <>
      {socials.map((social) => {
        const external = social.href.startsWith("http");
        return (
          <a
            key={social.label}
            href={social.href}
            title={social.label}
            aria-label={social.label}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
            data-track={TRACK_EVENT[social.label]}
            data-track-source={source}
          >
            <img src={asset(social.icon)} alt="" width={size} height={size} loading="lazy" />
          </a>
        );
      })}
    </>
  );
}
