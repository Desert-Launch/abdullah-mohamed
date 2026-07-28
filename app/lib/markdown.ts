import { copy } from "../data/copy";
import { bookingHref, contactEmail, shared, storeLinks } from "../data/shared";
import type { CaseStudy, Dictionary, Lang, Product } from "../data/types";
import { SITE_URL, localePath } from "./site";
import { WORK_INDEX_PATH, WORK_LANG, workPath, workProjects } from "./work";

/**
 * Markdown twins of the rendered pages.
 *
 * Every page has a sibling at `<path>index.md` built from the *same*
 * dictionary the HTML renders, so the two can't drift. A request carrying
 * `Accept: text/markdown` is redirected there by `vercel.json` (the site is a
 * static export — there is no server left to negotiate content in-process, so
 * the negotiation happens in the routing layer; see `docs/agent-readiness.md`).
 *
 * Rules that keep these files honest:
 * - No string here is invented. Section labels come from the dictionary, so
 *   the Arabic twin is Arabic; only the anchor slugs and URLs are shared.
 * - Nothing claims a link that doesn't exist: `/work` is English-only today,
 *   so the Arabic twin links case studies to the homepage section instead.
 * - App store links follow `storeLinks.status` exactly as the UI does — a
 *   retired app is labelled retired, never given a dead URL.
 */

/** Absolute URL for a site-relative path. Agents fetch these files out of
 *  context, so every link in them is absolute. */
function abs(path: string): string {
  return `${SITE_URL}${path}`;
}

/** Collapses the blank-line bookkeeping: sections are joined with exactly one
 *  blank line, and empty sections drop out entirely. Callers gate optional
 *  blocks with `list.length && …`, so a falsy entry can be `0` as well as
 *  `undefined` — anything that isn't a non-empty string is dropped. */
function join(blocks: (string | number | null | undefined | false)[]): string {
  return (
    blocks
      .filter((block): block is string => typeof block === "string" && block !== "")
      .join("\n\n")
      .replace(/\n{3,}/g, "\n\n") + "\n"
  );
}

function bullets(items: string[]): string {
  return items.map((item) => `- ${item}`).join("\n");
}

/** A `Product` (freelance project or an app under an experience) as a block. */
function productBlock(t: Dictionary, product: Product, level: string): string {
  return join([
    `${level} ${product.title} — ${product.type}`,
    product.body,
    product.metrics?.length &&
      bullets(product.metrics.map((m) => `**${m.value}** — ${m.label}`)),
    product.stack.length && `${t.markdown.stack}: ${product.stack.join(", ")}`,
  ]).trimEnd();
}

/** The shared contact block. Same channels the contact section renders. */
function contactBlock(t: Dictionary): string {
  return join([
    `## ${t.markdown.contact}`,
    t.contact.body,
    bullets([
      `Email: <mailto:${contactEmail}>`,
      `${t.contact.book}: ${bookingHref}`,
      ...shared.socials
        .filter((social) => social.href.startsWith("http"))
        .map((social) => `${social.label}: ${social.href}`),
    ]),
  ]).trimEnd();
}

/** One case study, rendered the same way on the home twin and the /work twin.
 *  `level` is the heading depth so the same body can sit under an `##` section
 *  on the index or be the `#` title of its own page. */
function caseStudyBlock(t: Dictionary, study: CaseStudy, level: string): string {
  return join([
    `${level} ${study.title} — ${study.type}`,
    study.context,
    study.summary,
    `**${t.caseLabels.challenge}:** ${study.challenge}`,
    `**${t.caseLabels.role}:** ${study.role}`,
    study.process.length && `**${t.caseLabels.process}:**\n${bullets(study.process)}`,
    study.results.length &&
      `**${t.markdown.metrics}:**\n${bullets(study.results.map((m) => `**${m.value}** — ${m.label}`))}`,
    `**${t.markdown.stack}:** ${study.stack.join(", ")}`,
    study.links?.length &&
      `**${t.markdown.links}:**\n${bullets(study.links.map((l) => `[${l.label}](${l.href})`))}`,
  ]).trimEnd();
}

/** Store links / lifecycle badge for a "Selected work" card, mirroring
 *  `SelectedWork.tsx`: only a real https URL becomes a link. */
function appLinks(t: Dictionary, key: string): string {
  const entry = storeLinks[key];
  if (!entry) return "";
  const labels = t.selectedWorkLabels;
  const links: string[] = [];
  if (entry.appStore?.startsWith("http")) links.push(`[${labels.appStore}](${entry.appStore})`);
  if (entry.play?.startsWith("http")) links.push(`[${labels.googlePlay}](${entry.play})`);
  if (links.length) return ` — ${links.join(" · ")}`;
  const status =
    entry.status === "retired"
      ? labels.retired
      : entry.status === "unreleased"
        ? labels.unreleased
        : labels.productBuild;
  return ` — ${entry.year ? `${entry.year} · ` : ""}${status}`;
}

/** The locale home page. */
export function homeMarkdown(lang: Lang): string {
  const t = copy[lang];
  const url = abs(localePath[lang]);
  const other = lang === "en" ? "ar" : "en";
  const hasWorkRoutes = lang === WORK_LANG;

  return join([
    `# ${t.meta.title}`,
    `> ${t.meta.description}`,
    bullets([
      `${t.markdown.htmlVersion}: ${url}`,
      `${t.langToggle}: ${abs(localePath[other])}`,
      t.hero.currently,
      t.hero.availability,
    ]),
    `_${t.markdown.note}_`,

    `## ${t.hero.title} ${t.hero.titleAccent}`,
    `${t.hero.lead} ${t.hero.leadEmphasis}`,
    bullets(t.proof.map(([value, label]) => `**${value}** — ${label}`)),

    `## ${t.servicesHeading.title}`,
    t.servicesHeading.body,
    t.services.map((service) => `### ${service.title}\n\n${service.body}`).join("\n\n"),

    `## ${t.plansHeading.title}`,
    t.plansHeading.body,
    t.plans
      .map((plan) =>
        join([
          `### ${plan.name} — ${plan.price}`,
          `${plan.body} (${plan.priceNote})`,
          plan.itemsIntro,
          bullets(plan.items),
        ]).trimEnd(),
      )
      .join("\n\n"),

    `## ${t.caseStudiesHeading.title}`,
    t.caseStudiesHeading.body,
    t.caseStudies
      .map((study) =>
        join([
          caseStudyBlock(t, study, "###"),
          // /work exists in English only; the Arabic twin must not link at a
          // URL that 404s, so it points back at the homepage section.
          hasWorkRoutes
            ? `[${t.work.readCase}](${abs(workPath(study.slug))})`
            : `[${t.work.readCase}](${url}#cases)`,
        ]).trimEnd(),
      )
      .join("\n\n"),

    `## ${t.selectedWorkHeading.title}`,
    t.selectedWorkHeading.body,
    bullets(
      t.selectedWork.map((app) => `**${app.title}** — ${app.tagline}${appLinks(t, app.key)}`),
    ),

    `## ${t.workHeading.title}`,
    t.workHeading.body,
    t.experiences
      .map((exp) =>
        join([
          `### ${exp.role} — ${exp.company}`,
          `${exp.date} · ${exp.location}`,
          exp.summary,
          exp.achievements.length && bullets(exp.achievements),
          exp.apps.map((app) => productBlock(t, app, "####")).join("\n\n"),
        ]).trimEnd(),
      )
      .join("\n\n"),

    `## ${t.freelanceHeading.title}`,
    t.freelanceHeading.body,
    t.freelanceProjects.map((project) => productBlock(t, project, "###")).join("\n\n"),

    `## ${t.processHeading.title}`,
    t.processHeading.body,
    t.process.map((step) => `### ${step.title}\n\n${step.body}`).join("\n\n"),

    `## ${t.about.title}`,
    t.about.paragraphs.join("\n\n"),

    t.testimonials.length > 0 && `## ${t.testimonialsHeading.title}`,
    t.testimonials.length > 0 &&
      t.testimonials
        .map((quote) => `> ${quote.quote}\n>\n> — ${quote.name}, ${quote.role}`)
        .join("\n\n"),

    `## ${t.faqHeading.title}`,
    t.faq.map((item) => `### ${item.q}\n\n${item.a}`).join("\n\n"),

    contactBlock(t),
  ]);
}

/** The `/work` index. English-only today, like the route itself. */
export function workIndexMarkdown(lang: Lang = WORK_LANG): string {
  const t = copy[lang];
  return join([
    `# ${t.work.meta.title}`,
    `> ${t.work.meta.description}`,
    bullets([
      `${t.markdown.htmlVersion}: ${abs(WORK_INDEX_PATH)}`,
      `${t.work.home}: ${abs(localePath[lang])}`,
    ]),
    `_${t.markdown.note}_`,
    t.work.body,
    ...workProjects(lang).map((study) =>
      join([
        caseStudyBlock(t, study, "##"),
        `[${t.work.readCase}](${abs(workPath(study.slug))})`,
      ]).trimEnd(),
    ),
    `## ${t.work.alsoShipped.title}`,
    t.work.alsoShipped.body,
    bullets(
      t.selectedWork.map((app) => `**${app.title}** — ${app.tagline}${appLinks(t, app.key)}`),
    ),
    contactBlock(t),
  ]);
}

/** One `/work/<slug>` detail page. */
export function caseStudyMarkdown(study: CaseStudy, lang: Lang = WORK_LANG): string {
  const t = copy[lang];
  const others = workProjects(lang).filter((other) => other.slug !== study.slug);
  return join([
    caseStudyBlock(t, study, "#"),
    bullets([
      `${t.markdown.htmlVersion}: ${abs(workPath(study.slug))}`,
      `${t.work.backToIndex}: ${abs(WORK_INDEX_PATH)}`,
    ]),
    `_${t.markdown.note}_`,
    study.shots?.length &&
      join([
        `## ${t.work.screenshots}`,
        t.work.screenshotsNote,
        bullets(study.shots.map((shot) => `${abs(shot.src)} — ${shot.caption || shot.alt}`)),
      ]).trimEnd(),
    others.length > 0 && `## ${t.work.more}`,
    others.length > 0 &&
      bullets(others.map((other) => `[${other.title}](${abs(workPath(other.slug))})`)),
    `## ${t.work.cta.title}`,
    t.work.cta.body,
    contactBlock(t),
  ]);
}

/**
 * Wraps a Markdown body in a `Response`.
 *
 * The headers here are documentation only: `output: "export"` writes the body
 * to a static file and drops everything else, so the real `Content-Type` comes
 * from the `.md` rule in `vercel.json`. Both must stay `text/markdown` — an
 * agent that gets `text/plain` treats the check as failed.
 */
export function markdownResponse(body: string): Response {
  return new Response(body, {
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      // Rough token estimate (~4 chars/token), the optional hint agents use to
      // budget a fetch before making it.
      "x-markdown-tokens": String(Math.ceil(body.length / 4)),
    },
  });
}
