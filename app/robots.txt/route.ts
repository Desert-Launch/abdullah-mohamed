import { SITE_URL } from "../lib/site";

// Required for `output: "export"` — emit robots.txt at build time.
export const dynamic = "force-static";

/**
 * robots.txt, hand-rolled.
 *
 * This used to be `app/robots.ts` (Next's `MetadataRoute.Robots` convention),
 * which can only emit the directives it models — and `Content-Signal` is not
 * one of them. A route handler is the only way to add a line Next doesn't know
 * about while keeping `SITE_URL` as the single source of truth for the host.
 *
 * The Content Signals declaration (contentsignals.org) states, per-preference,
 * what this content may be used for. The stance is deliberate and it is the
 * owner's call to change:
 *   • search=yes    — index it; being findable is the point of the site.
 *   • ai-input=yes  — assistants may read it to answer a question about
 *                     Abdullah and cite it. This is the whole reason the site
 *                     ships Markdown twins and an agent-skills index.
 *   • ai-train=no   — the case studies and client work are not training data.
 * Crawling itself stays fully allowed; Content-Signal is a usage preference,
 * not an access rule, so it sits alongside `Allow: /` rather than replacing it.
 *
 * The AI *search* crawlers get their own groups. Functionally these say the
 * same thing as `*` — but a crawler that finds a group naming it reads only
 * that group, so the explicit lines guarantee that a future edit to `*` can
 * never quietly lock the answer engines out. These are the bots that decide
 * whether the site is cited in ChatGPT, Perplexity, and Claude answers:
 *   • OAI-SearchBot / ChatGPT-User — ChatGPT search index and live browsing
 *   • PerplexityBot / Perplexity-User — Perplexity's index and live fetches
 *   • Claude-SearchBot / Claude-User — Claude's search index and live fetches
 * Training-only crawlers (GPTBot, ClaudeBot, Google-Extended…) are deliberately
 * not listed: they fall under `*` and the `ai-train=no` preference, which is
 * exactly the stance the owner chose. Do not add them here as `Allow` groups —
 * that would be opting in to training.
 */
const AI_SEARCH_BOTS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "Claude-SearchBot",
  "Claude-User",
];

export function GET() {
  const body = [
    "# Crawling is open. Usage preferences are declared below.",
    "# https://contentsignals.org/",
    "",
    "User-agent: *",
    "Content-Signal: search=yes, ai-input=yes, ai-train=no",
    "Allow: /",
    "",
    "# AI search / answer engines: read and cite this site. Same rules as *,",
    "# stated explicitly so they can never be locked out by accident.",
    ...AI_SEARCH_BOTS.flatMap((bot) => [
      `User-agent: ${bot}`,
      "Content-Signal: search=yes, ai-input=yes, ai-train=no",
      "Allow: /",
      "",
    ]),
    `Host: ${SITE_URL}`,
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    "",
    "# Machine-readable entry points:",
    `# ${SITE_URL}/llms.txt`,
    `# ${SITE_URL}/llms-full.txt`,
    `# ${SITE_URL}/index.md`,
    `# ${SITE_URL}/.well-known/api-catalog`,
    `# ${SITE_URL}/.well-known/agent-skills/index.json`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
