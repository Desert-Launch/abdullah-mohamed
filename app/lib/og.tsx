import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/**
 * Shared renderers for the site's social cards — the images WhatsApp,
 * LinkedIn, Slack and X show when a URL is shared. Two shapes:
 * `renderSiteOgImage` for a locale home page, `renderOgImage` for a /work
 * project. Both have to read at thumbnail size, so they carry one headline and
 * one supporting line and nothing that competes.
 *
 * Colors are the dark theme's literal token values rather than var() lookups:
 * this renders through satori, which has no :root and no cascade to resolve
 * them from. Keep them in step with the `:root` block in globals.css.
 */
const INK = "#f4f1e8";
const MUTED = "#9d9584";
const PAPER = "#0e0d0b";
const ACCENT = "#8b7cf0";
const LINE = "rgba(244, 241, 232, 0.14)";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/**
 * The real brand faces, read off disk at build time.
 *
 * satori cannot use `next/font`, and with no font supplied it falls back to a
 * generic sans — so the card would be typeset in a face the site never uses,
 * and Arabic would render as blank boxes. `app/fonts/*.ttf` are checked in for
 * exactly this (see app/fonts/README.md); they are not the web fonts, which
 * still come from next/font/google in lib/site.tsx.
 */
const fontDir = join(process.cwd(), "app", "fonts");
const fonts = [
  { name: "DM Sans", data: readFileSync(join(fontDir, "DMSans-Regular.ttf")), weight: 400 as const, style: "normal" as const },
  { name: "DM Sans", data: readFileSync(join(fontDir, "DMSans-Medium.ttf")), weight: 500 as const, style: "normal" as const },
];

/** The washed aurora the site paints behind everything, flattened to two stops. */
const BACKDROP = `radial-gradient(900px 520px at 12% 0%, rgba(139,124,240,0.34), transparent 60%), radial-gradient(760px 520px at 100% 100%, rgba(217,178,106,0.14), transparent 62%)`;

/**
 * Satori has no line-clamp, so a long summary simply runs into the signature
 * block. Cut at the last word boundary that fits — roughly three lines at the
 * subtitle's size — rather than letting the card overflow.
 */
function clampText(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[,.;:—–-]$/, "")}…`;
}

export function renderOgImage({
  eyebrow,
  title,
  subtitle,
}: {
  /** Small uppercase line above the title — the project's category. */
  eyebrow: string;
  title: string;
  /** One line under the title. Kept short; it is ~28px on a 1200px card. */
  subtitle: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "76px 84px",
          background: PAPER,
          backgroundImage: BACKDROP,
          color: INK,
          fontFamily: "DM Sans",
          fontWeight: 400,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 26,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: ACCENT,
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              marginTop: 26,
              // Project names are one word and get the full display size; the
              // index's sentence-length title steps down so it and the summary
              // both fit above the signature.
              fontSize: title.length <= 20 ? 104 : title.length <= 44 ? 74 : 60,
              lineHeight: 1.06,
              letterSpacing: -2,
            }}
          >
            {title}
          </div>
          <div
            style={{
              marginTop: 26,
              maxWidth: 900,
              fontSize: 34,
              lineHeight: 1.35,
              color: MUTED,
            }}
          >
            {clampText(subtitle, 130)}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 18,
              background: ACCENT,
              color: PAPER,
              fontSize: 27,
            }}
          >
            AM
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30 }}>Abdullah Mohamed</div>
            <div style={{ fontSize: 23, color: MUTED }}>
              Senior Software Engineer · abdullahmohamed.dev
            </div>
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts },
  );
}

/**
 * Social card for a locale's home page — the one a recruiter or client sees
 * pasted into WhatsApp or LinkedIn.
 *
 * Reads top to bottom the way the hero does: who and where, the positioning
 * headline with its accent tail, one line of proof, then the signature and the
 * stack. Everything comes from the dictionary, so the card cannot drift from
 * the page the way a hand-made PNG does.
 *
 * Latin only. satori reverses the word order of Arabic runs — the glyphs shape
 * and join correctly, but the words come out backwards and wrap in the wrong
 * order — so /ar shares this English card rather than a scrambled Arabic one.
 * Its og:title and og:description are still Arabic.
 */
export function renderSiteOgImage({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  name,
  domain,
  tags,
}: {
  /** Uppercase rule line: role · city · availability. */
  eyebrow: string;
  /** Headline lead-in, in ink. */
  title: string;
  /** Headline tail, in the accent color. */
  titleAccent: string;
  subtitle: string;
  name: string;
  domain: string;
  tags: string[];
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 28,
          background: PAPER,
          backgroundImage: BACKDROP,
          color: INK,
          fontFamily: "DM Sans",
          fontWeight: 400,
        }}
      >
        {/* Hairline frame — the same bordered-card language the site uses. */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "58px 64px",
            border: `1px solid ${LINE}`,
            borderRadius: 22,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 10, height: 10, borderRadius: 10, background: ACCENT }} />
              <div
                style={{
                  fontSize: 22,
                  letterSpacing: 3.5,
                  textTransform: "uppercase",
                  color: MUTED,
                }}
              >
                {eyebrow}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 34,
                fontSize: 72,
                lineHeight: 1.14,
                letterSpacing: -2.4,
              }}
            >
              <div style={{ fontWeight: 500 }}>{title}</div>
              <div style={{ color: ACCENT, fontWeight: 500 }}>{titleAccent}</div>
            </div>

            <div
              style={{
                marginTop: 30,
                maxWidth: 880,
                fontSize: 27,
                lineHeight: 1.5,
                color: MUTED,
              }}
            >
              {clampText(subtitle, 150)}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 32,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 27, fontWeight: 500, color: ACCENT }}>{name}</div>
              <div style={{ marginTop: 6, fontSize: 22, color: MUTED }}>{domain}</div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              {tags.map((tag) => (
                <div
                  key={tag}
                  style={{
                    padding: "8px 16px",
                    border: `1px solid ${LINE}`,
                    borderRadius: 999,
                    fontSize: 20,
                    color: INK,
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts },
  );
}
