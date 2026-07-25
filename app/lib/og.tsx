import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/**
 * Renderer for the /work routes' social cards — the images WhatsApp, LinkedIn,
 * Slack and X show when a project URL is shared. One card per project, so they
 * have to be generated; the locale home pages use a static file instead (see
 * SHARE_IMAGE in lib/site.tsx for why that distinction matters).
 *
 * They have to read at thumbnail size, so each carries one headline and one
 * supporting line and nothing that competes. Deliberately not a phone
 * screenshot — the products' UIs are Arabic and unreadable at 1200x630.
 *
 * Colors are the dark theme's literal token values rather than var() lookups:
 * this renders through satori, which has no :root and no cascade to resolve
 * them from. Keep them in step with the `:root` block in globals.css.
 */
const INK = "#f4f1e8";
const MUTED = "#9d9584";
const PAPER = "#0e0d0b";
const ACCENT = "#8b7cf0";

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

