import { copy } from "../data/copy";
import { bookingHref, contactEmail, shared, storeLinks } from "../data/shared";
import type { CaseStudy, Dictionary, Lang, Product, ServicePage } from "../data/types";
import {
  priceRange,
  proofFor,
  servicePages,
  servicePath,
  servicePrice,
  servicesIndexPath,
} from "./services";
import { cvPath } from "./cv";
import { inquiryPath } from "./inquiry";
import { SITE_URL, localePath } from "./site";
import { workIndexPath, workPath, workProjects } from "./work";

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
 * - Every link is this locale's own: the Arabic twin links to `/ar/work/…`
 *   and `/ar/services/…`, never across locales.
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

/** The shared contact block. Same channels the contact section renders,
 *  plus the brief page, which is the one an agent should send a user to. */
function contactBlock(t: Dictionary, lang: Lang): string {
  return join([
    `## ${t.markdown.contact}`,
    t.contact.body,
    bullets([
      `${t.inquiry.indexLabel}: ${abs(inquiryPath(lang))}`,
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
    study.requirements.length &&
      `**${t.caseLabels.requirements}:**\n${bullets(study.requirements)}`,
    `**${t.caseLabels.role}:** ${study.role}`,
    study.process.length && `**${t.caseLabels.process}:**\n${bullets(study.process)}`,
    // The decisions are the most quotable part of a study — what was chosen
    // over what, and why — so the twin carries them in full.
    study.decisions?.length &&
      `**${t.caseLabels.decisions}:**\n${bullets(study.decisions.map((d) => `**${d.title}.** ${d.body}`))}`,
    study.results.length &&
      `**${t.markdown.metrics}:**\n${bullets(study.results.map((m) => `**${m.value}** — ${m.label}`))}`,
    `**${t.markdown.stack}:** ${study.stack.join(", ")}`,
    study.links?.length &&
      `**${t.markdown.links}:**\n${bullets(study.links.map((l) => `[${l.label}](${l.href})`))}`,
  ]).trimEnd();
}

/** Store links / lifecycle badge for an "also shipped" app, mirroring the
 *  homepage strip and /work: only a real https URL becomes a link. */
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

/** The locale home page, section by section in page order. */
export function homeMarkdown(lang: Lang): string {
  const t = copy[lang];
  const url = abs(localePath[lang]);
  const other = lang === "en" ? "ar" : "en";
  const stack = t.home.stack;
  const principles = t.home.principles;

  return join([
    `# ${t.meta.title}`,
    `> ${t.meta.description}`,
    bullets([
      `${t.markdown.htmlVersion}: ${url}`,
      `${t.langToggle}: ${abs(localePath[other])}`,
      t.hero.status,
      t.hero.availability,
      `${t.hero.start}: ${abs(inquiryPath(lang))}`,
    ]),
    `_${t.markdown.note}_`,

    `## ${t.hero.title} ${t.hero.titleAccent}`,
    `${t.hero.eyebrow} · ${t.hero.place}`,
    t.hero.lead,
    bullets(t.hero.facts.map(([label, value]) => `**${label}:** ${value}`)),

    `## ${t.home.proof.eyebrow}`,
    bullets(t.proof.map(([value, label]) => `**${value}** — ${label}`)),
    `### ${t.logosLabel}`,
    bullets(t.experiences.map((exp) => `**${exp.company}** — ${exp.role} · ${exp.date} · ${exp.location}`)),

    `## ${t.servicesHeading.title}`,
    t.servicesHeading.body,
    servicePages(lang)
      .map((page) => {
        const price = servicePrice(page, lang);
        return join([
          `### ${page.name} — ${price.price}`,
          `_${page.situation}_`,
          page.lead,
          `${price.note}`,
          `[${t.servicePages.learnMore}](${abs(servicePath(page.slug, lang))})`,
        ]).trimEnd();
      })
      .join("\n\n"),
    t.plansHeading.body,
    `${t.servicePages.notSure.title} ${t.servicePages.notSure.body} → ${abs(inquiryPath(lang))}`,
    `### ${t.processHeading.title}`,
    t.processHeading.body,
    t.process.map((step) => `#### ${step.title}\n\n${step.body}`).join("\n\n"),

    `## ${t.caseStudiesHeading.title}`,
    t.caseStudiesHeading.body,
    workProjects(lang)
      .map((study) =>
        join([
          caseStudyBlock(t, study, "###"),
          `[${t.work.readCase}](${abs(workPath(study.slug, lang))})`,
        ]).trimEnd(),
      )
      .join("\n\n"),
    `### ${t.home.work.alsoShipped}`,
    bullets(
      t.selectedWork.map((app) => `**${app.title}** — ${app.tagline}${appLinks(t, app.key)}`),
    ),

    `## ${stack.heading.title}`,
    stack.heading.body,
    stack.products
      .map((product) =>
        join([
          `### ${product.name} — ${product.context}`,
          bullets(
            stack.layers
              .filter((layer) => product.layers[layer.key])
              .map((layer) => `**${layer.name}:** ${product.layers[layer.key]}`),
          ),
          product.slug && `[${t.work.readCase}](${abs(workPath(product.slug, lang))})`,
        ]).trimEnd(),
      )
      .join("\n\n"),
    `### ${stack.capabilitiesLabel}`,
    stack.capabilities
      .map((item) => `#### ${item.name}\n\n${item.body}\n\n${t.markdown.stack}: ${item.tech}`)
      .join("\n\n"),

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

    t.testimonials.length > 0 && `## ${t.testimonialsHeading.eyebrow}`,
    t.testimonials.length > 0 &&
      t.testimonials
        .map((quote) => `> ${quote.quote}\n>\n> — ${quote.name}, ${quote.role}`)
        .join("\n\n"),

    `## ${t.about.title}`,
    t.about.paragraphs.join("\n\n"),
    `### ${t.about.factsLabel}`,
    bullets(t.about.facts.map(([label, value]) => `**${label}:** ${value}`)),
    `### ${principles.title}`,
    principles.note,
    bullets(
      principles.items.map((item) => {
        const study = t.caseStudies.find((entry) => entry.slug === item.slug);
        return study ? `${item.text} — [${study.title}](${abs(workPath(study.slug, lang))})` : item.text;
      }),
    ),

    contactBlock(t, lang),
  ]);
}

/** The `/work` index, per locale. */
export function workIndexMarkdown(lang: Lang): string {
  const t = copy[lang];
  return join([
    `# ${t.work.meta.title}`,
    `> ${t.work.meta.description}`,
    bullets([
      `${t.markdown.htmlVersion}: ${abs(workIndexPath(lang))}`,
      `${t.work.home}: ${abs(localePath[lang])}`,
    ]),
    `_${t.markdown.note}_`,
    t.work.body,
    ...workProjects(lang).map((study) =>
      join([
        caseStudyBlock(t, study, "##"),
        `[${t.work.readCase}](${abs(workPath(study.slug, lang))})`,
      ]).trimEnd(),
    ),
    `## ${t.work.alsoShipped.title}`,
    t.work.alsoShipped.body,
    bullets(
      t.selectedWork.map((app) => `**${app.title}** — ${app.tagline}${appLinks(t, app.key)}`),
    ),
    contactBlock(t, lang),
  ]);
}

/** One `/work/<slug>` detail page, per locale. */
export function caseStudyMarkdown(study: CaseStudy, lang: Lang): string {
  const t = copy[lang];
  const others = workProjects(lang).filter((other) => other.slug !== study.slug);
  const related = servicePages(lang).filter((page) => page.proof.includes(study.slug));
  return join([
    caseStudyBlock(t, study, "#"),
    bullets([
      `${t.markdown.htmlVersion}: ${abs(workPath(study.slug, lang))}`,
      `${t.work.backToIndex}: ${abs(workIndexPath(lang))}`,
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
      bullets(others.map((other) => `[${other.title}](${abs(workPath(other.slug, lang))})`)),
    `## ${t.work.cta.title}`,
    t.work.cta.body,
    related.length > 0 && `**${t.work.relatedServices}:**`,
    related.length > 0 &&
      bullets(
        related.map(
          (page) =>
            `[${page.name}](${abs(servicePath(page.slug, lang))}) — ${servicePrice(page, lang).price}`,
        ),
      ),
    contactBlock(t, lang),
  ]);
}

/** One service, rendered the same way on the index and on its own page. */
function serviceBlock(t: Dictionary, page: ServicePage, level: string, lang: Lang): string {
  const price = servicePrice(page, lang);
  const labels = t.servicePages.labels;
  const sub = level + "#";
  return join([
    `${level} ${page.title}`,
    `_${page.situation}_`,
    page.lead,
    `**${labels.pricing}:** ${price.price} — ${price.note}`,
    `${sub} ${labels.fit}\n\n${bullets(page.fit)}`,
    `${sub} ${labels.deliverables}\n\n${bullets(page.deliverables)}`,
    `${sub} ${labels.approach}\n\n${bullets(page.approach)}`,
    page.examples.length && `${sub} ${labels.examples}\n\n${bullets(page.examples)}`,
    page.stack.length && `${sub} ${labels.stack}\n\n${page.stack.join(", ")}`,
  ]).trimEnd();
}

/** How a project runs — the same four steps the homepage and every service
 *  page render. */
function processBlock(t: Dictionary, level: string): string {
  return join([
    `${level} ${t.servicePages.labels.process}`,
    t.process.map((step, index) => `${index + 1}. **${step.title}** — ${step.body}`).join("\n"),
  ]).trimEnd();
}

/** The `/services` index, per locale. */
export function servicesIndexMarkdown(lang: Lang): string {
  const t = copy[lang];
  return join([
    `# ${t.servicePages.meta.title}`,
    `> ${t.servicePages.meta.description}`,
    bullets([
      `${t.markdown.htmlVersion}: ${abs(servicesIndexPath(lang))}`,
      `${t.work.home}: ${abs(localePath[lang])}`,
    ]),
    `_${t.markdown.note}_`,
    t.servicePages.body,
    ...servicePages(lang).map((page) => {
      const price = servicePrice(page, lang);
      return join([
        `## ${page.name} — ${price.price}`,
        `_${page.situation}_`,
        page.lead,
        price.note,
        `[${t.servicePages.readMore}](${abs(servicePath(page.slug, lang))})`,
      ]).trimEnd();
    }),
    `## ${t.servicePages.notSure.title}`,
    t.servicePages.notSure.body,
    `[${t.servicePages.cta.start}](${abs(inquiryPath(lang))})`,
    processBlock(t, "##"),
    t.plansHeading.body,
    `## ${t.servicePages.faqTitle}`,
    t.servicePages.faq.map((item) => `### ${item.q}\n\n${item.a}`).join("\n\n"),
    `## ${t.servicePages.cta.title}`,
    t.servicePages.cta.body,
    contactBlock(t, lang),
  ]);
}

/**
 * The `/cv/` page, per locale.
 *
 * The résumé is the page an assistant is most likely to be asked for directly
 * ("what is his background", "where did he study"), so the Markdown twin
 * carries the same graded skills and dated roles the HTML does — not a
 * summary of them.
 */
export function cvMarkdown(lang: Lang): string {
  const t = copy[lang];
  const cv = t.cv;
  const labels = cv.labels;
  return join([
    `# ${cv.title}`,
    `> ${cv.meta.description}`,
    bullets([
      `${t.markdown.htmlVersion}: ${abs(cvPath(lang))}`,
      `PDF: ${abs("/Abdullah_Mohamed_CV.pdf")}`,
      `${t.work.home}: ${abs(localePath[lang])}`,
    ]),
    `_${t.markdown.note}_`,
    cv.lead,

    `## ${labels.summary}`,
    cv.summary,

    `## ${labels.experience}`,
    t.experiences
      .map((role) =>
        join([
          `### ${role.role} — ${role.company}`,
          `${role.date} · ${role.location}`,
          role.summary,
          bullets(role.achievements),
          role.apps.length
            ? `${t.appsLabel}: ${role.apps.map((app) => app.title).join(", ")}`
            : null,
        ]).trimEnd(),
      )
      .join("\n\n"),

    `## ${labels.skills}`,
    cv.skills
      .map((group) =>
        join([
          `### ${group.group}`,
          bullets(
            [
              group.core.length ? `**${labels.core}** — ${group.core.join(", ")}` : null,
              group.strong.length ? `**${labels.strong}** — ${group.strong.join(", ")}` : null,
              group.used.length ? `**${labels.used}** — ${group.used.join(", ")}` : null,
            ].filter((line): line is string => line !== null),
          ),
        ]).trimEnd(),
      )
      .join("\n\n"),

    `## ${labels.education}`,
    bullets(
      cv.education.map(
        (item) => `**${item.degree}** — ${item.school} · ${item.date} · ${item.detail}`,
      ),
    ),

    `## ${labels.languages}`,
    bullets(cv.languages),

    contactBlock(t, lang),
  ]);
}

/** One `/services/<slug>` page, per locale. */
export function servicePageMarkdown(page: ServicePage, lang: Lang): string {
  const t = copy[lang];
  const labels = t.servicePages.labels;
  const proof = proofFor(page, lang);
  const others = servicePages(lang).filter((other) => other.slug !== page.slug);
  return join([
    serviceBlock(t, page, "#", lang),
    bullets([
      `${t.markdown.htmlVersion}: ${abs(servicePath(page.slug, lang))}`,
      `${t.servicePages.backToIndex}: ${abs(servicesIndexPath(lang))}`,
    ]),
    `_${t.markdown.note}_`,
    proof.length > 0 && `## ${labels.proof}`,
    proof.length > 0 &&
      bullets(
        proof.map(
          (study) => `[${study.title} — ${study.type}](${abs(workPath(study.slug, lang))}): ${study.summary}`,
        ),
      ),
    processBlock(t, "##"),
    page.faq.length > 0 && `## ${labels.faq}`,
    page.faq.length > 0 && page.faq.map((item) => `### ${item.q}\n\n${item.a}`).join("\n\n"),
    others.length > 0 && `## ${labels.more}`,
    others.length > 0 &&
      bullets(
        others.map(
          (other) =>
            `[${other.name}](${abs(servicePath(other.slug, lang))}) — ${servicePrice(other, lang).price}`,
        ),
      ),
    `## ${t.servicePages.cta.title}`,
    t.servicePages.cta.body,
    `[${t.servicePages.cta.start}](${abs(inquiryPath(lang, page.slug))})`,
    contactBlock(t, lang),
  ]);
}

/**
 * `llms-full.txt`: every English page's Markdown twin in one file, in reading
 * order — the llms.txt convention's "give me everything" companion, for
 * agents that would rather make one fetch than follow links.
 */
export function llmsFullMarkdown(lang: Lang = "en"): string {
  const divider = "\n\n---\n\n";
  return [
    homeMarkdown(lang),
    servicesIndexMarkdown(lang),
    ...servicePages(lang).map((page) => servicePageMarkdown(page, lang)),
    workIndexMarkdown(lang),
    ...workProjects(lang).map((study) => caseStudyMarkdown(study, lang)),
    cvMarkdown(lang),
    inquiryMarkdown(lang),
  ]
    .map((body) => body.trimEnd())
    .join(divider) + "\n";
}

/**
 * `/start-a-project/`, per locale.
 *
 * The HTML page is a form; its twin is the brief spelled out, so an agent
 * drafting a first message for a user knows exactly what to ask them and
 * where to send it. The option lists are the same ones the form offers.
 */
export function inquiryMarkdown(lang: Lang): string {
  const t = copy[lang];
  const q = t.inquiry;
  const f = q.fields;
  const range = priceRange(lang);
  const whatsapp = shared.socials.find((social) => social.label === "WhatsApp");
  const options = (list: [string, string][]) => list.map(([, label]) => label).join(" · ");
  return join([
    `# ${q.meta.title}`,
    `> ${q.meta.description}`,
    bullets([
      `${t.markdown.htmlVersion}: ${abs(inquiryPath(lang))}`,
      `${t.work.home}: ${abs(localePath[lang])}`,
    ]),
    `_${t.markdown.note}_`,
    q.lead,
    `## ${q.brief.heading}`,
    bullets([
      `**${f.idea.label}** ${f.idea.hint}`,
      `**${f.stage.legend}** ${options(f.stage.options)}`,
      `**${f.platform.legend}** ${options(f.platform.options)}`,
      `**${f.timeline.label}** (${q.optional}) ${options(f.timeline.options)}`,
      `**${f.budget.label}** (${q.optional}) ${options(f.budget.options)} — ${f.budget.hint.replace("{min}", range.min).replace("{max}", range.max)}`,
      `**${f.name.label}**, **${f.email.label}**, **${f.company.label}** (${q.optional})`,
    ]),
    bullets([
      `${q.send.email}: <mailto:${contactEmail}>`,
      whatsapp ? `${q.send.whatsapp}: ${whatsapp.href}` : "",
      `${q.alternatives.book}: ${bookingHref}`,
    ].filter(Boolean)),
    q.privacy,
    `## ${q.next.title}`,
    q.next.steps.map((step, index) => `${index + 1}. ${step}`).join("\n"),
    `## ${q.hiring.title}`,
    `${q.hiring.body} ${abs(cvPath(lang))}`,
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
