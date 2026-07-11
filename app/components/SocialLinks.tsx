import type { Social } from "../data/types";

export function SocialLinks({ socials, size = 24 }: { socials: Social[]; size?: number }) {
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
          >
            <img src={social.icon} alt="" width={size} height={size} loading="lazy" />
          </a>
        );
      })}
    </>
  );
}
