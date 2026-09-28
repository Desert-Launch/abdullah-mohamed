"use client";

import { useEffect } from "react";
import { copy } from "../data/copy";
import { bookingHref, contactEmail, shared, storeLinks } from "../data/shared";
import type { Dictionary, Lang } from "../data/types";
import { inquiryPath } from "../lib/inquiry";
import { servicePages, servicePath, servicePrice } from "../lib/services";
import { SITE_URL, localePath } from "../lib/site";
import { workPath } from "../lib/work";

/**
 * WebMCP — the site's own tools, offered to an AI agent driving the browser.
 *
 * `navigator.modelContext` is a browser-provided bridge: an agent operating the
 * page can call these instead of scraping the DOM. Everything returned is read
 * straight out of the same dictionary the page renders, so a tool can never
 * answer with something the visitor isn't also being shown.
 *
 * Deliberate limits:
 * - Nothing here writes. `draft_project_inquiry` composes a `mailto:` URL and
 *   hands it back for the user to send. An agent that could send on its own
 *   is a spam pipe pointed at the owner's inbox.
 * - Tool *names and descriptions* are English in both locales — they are
 *   protocol identifiers, not display copy, and must stay stable across the
 *   language switch. The *content* they return is the visitor's language.
 * - The API is progressively enhanced: no `navigator.modelContext`, no-op. It
 *   ships in very few browsers today.
 *
 * Spec: https://webmachinelearning.github.io/webmcp/
 */

type ToolResult = { content: { type: "text"; text: string }[] };

interface WebMcpTool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (args?: Record<string, unknown>) => ToolResult;
}

interface ModelContext {
  provideContext?: (context: { tools: WebMcpTool[] }) => unknown;
  registerTool?: (tool: WebMcpTool) => { unregister?: () => void } | undefined;
}

/** Tools answer with JSON text — an agent parses it, a human still reads it. */
function json(value: unknown): ToolResult {
  return { content: [{ type: "text", text: JSON.stringify(value, null, 2) }] };
}

const NO_ARGS = { type: "object", properties: {}, additionalProperties: false };

function buildTools(t: Dictionary, lang: Lang): WebMcpTool[] {
  const home = `${SITE_URL}${localePath[lang]}`;
  // Every URL handed out is this locale's own — both locales have the pages.
  const caseUrl = (slug: string) => `${SITE_URL}${workPath(slug, lang)}`;
  const serviceUrl = (slug: string) => `${SITE_URL}${servicePath(slug, lang)}`;

  return [
    {
      name: "get_profile",
      description:
        "Who Abdullah Mohamed is: role, location, positioning, headline proof numbers, and current availability. Start here.",
      inputSchema: NO_ARGS,
      execute: () =>
        json({
          name: "Abdullah Mohamed",
          role: t.role,
          headline: `${t.hero.title} ${t.hero.titleAccent}`,
          summary: t.meta.description,
          availability: t.hero.availability,
          currently: t.hero.status,
          proof: t.proof.map(([value, label]) => ({ value, label })),
          about: t.about.paragraphs,
          url: home,
          markdown: `${home}index.md`,
        }),
    },
    {
      name: "list_services_and_pricing",
      description:
        "What Abdullah builds — MVPs, mobile apps, web apps, SaaS, custom business software, AI features, and improving existing apps — with who each one is for and what it starts at, in USD. Prices are starting points, negotiable by scope, and are not quotes.",
      inputSchema: NO_ARGS,
      execute: () =>
        json({
          summary: t.servicePages.body,
          services: servicePages(lang).map((page) => {
            const price = servicePrice(page, lang);
            return {
              name: page.name,
              forWhom: page.situation,
              summary: page.lead,
              startingPrice: price.price,
              priceNote: price.note,
              includes: page.deliverables,
              examples: page.examples,
              url: serviceUrl(page.slug),
            };
          }),
          note: t.plansHeading.body ?? t.plansHeading.title,
          startAProject: `${SITE_URL}${inquiryPath(lang)}`,
        }),
    },
    {
      name: "list_case_studies",
      description:
        "The written case studies — challenge, role, process, measured results, and stack for each — with a link to the full page.",
      inputSchema: NO_ARGS,
      execute: () =>
        json(
          t.caseStudies.map((study) => ({
            title: study.title,
            type: study.type,
            context: study.context,
            summary: study.summary,
            challenge: study.challenge,
            requirements: study.requirements,
            role: study.role,
            process: study.process,
            decisions: study.decisions,
            results: study.results,
            stack: study.stack,
            url: caseUrl(study.slug),
          })),
        ),
    },
    {
      name: "list_shipped_apps",
      description:
        "Apps shipped to the App Store and Google Play, each with its real lifecycle status (live, retired, private, unreleased) and store links where they exist. Report these as 'shipped', not 'live'.",
      inputSchema: NO_ARGS,
      execute: () =>
        json(
          t.selectedWork.map((app) => {
            const entry = storeLinks[app.key];
            return {
              title: app.title,
              tagline: app.tagline,
              status: entry?.status ?? "unknown",
              year: entry?.year,
              appStore: entry?.appStore,
              googlePlay: entry?.play,
            };
          }),
        ),
    },
    {
      name: "get_contact_options",
      description:
        "Every way to reach Abdullah — email, booking link, and social profiles — plus what a useful first message should contain.",
      inputSchema: NO_ARGS,
      execute: () =>
        json({
          email: contactEmail,
          booking: bookingHref,
          startAProject: `${SITE_URL}${inquiryPath(lang)}`,
          contactSection: `${home}#contact`,
          profiles: shared.socials.map((social) => ({
            label: social.label,
            href: social.href,
          })),
          whatToInclude: [
            t.inquiry.fields.idea.label,
            t.inquiry.fields.stage.legend,
            t.inquiry.fields.platform.legend,
            t.inquiry.fields.timeline.label,
            t.inquiry.fields.budget.label,
          ],
          expectedReply: t.contact.body,
        }),
    },
    {
      name: "draft_project_inquiry",
      description:
        "Compose an inquiry to Abdullah and return it as a mailto: URL for the user to review and send. This does NOT send anything — the user opens the link themselves.",
      inputSchema: {
        type: "object",
        properties: {
          name: { type: "string", description: "Who the message is from." },
          email: { type: "string", description: "Reply-to address." },
          message: {
            type: "string",
            description:
              "What the user wants to build, in their own words: who it is for and what they should be able to do with it.",
          },
          stage: {
            type: "string",
            enum: t.inquiry.fields.stage.options.map(([key]) => key),
            description: "Where they are now: just an idea, designs, an existing product, or other.",
          },
          platform: {
            type: "string",
            enum: t.inquiry.fields.platform.options.map(([key]) => key),
            description: "Web, mobile (iOS and Android), both, or unsure.",
          },
          timeline: {
            type: "string",
            enum: t.inquiry.fields.timeline.options.map(([key]) => key),
          },
          budget: {
            type: "string",
            enum: t.inquiry.fields.budget.options.map(([key]) => key),
          },
        },
        required: ["message"],
        additionalProperties: false,
      },
      execute: (args) => {
        const from = typeof args?.name === "string" ? args.name : "";
        const reply = typeof args?.email === "string" ? args.email : "";
        const message = typeof args?.message === "string" ? args.message : "";
        const f = t.inquiry.fields;
        // Option keys become the visitor-language labels the form would use.
        const pick = (key: string, options: [string, string][], label: string) => {
          const value = typeof args?.[key] === "string" ? args[key] : "";
          const text = options.find(([option]) => option === value)?.[1];
          return text ? `${label} ${text}` : "";
        };
        const subject = t.inquiry.brief.subject.replace("{name}", from);
        const body = [
          t.inquiry.brief.heading,
          "",
          f.idea.label,
          message,
          "",
          pick("stage", f.stage.options, f.stage.legend),
          pick("platform", f.platform.options, f.platform.legend),
          pick("timeline", f.timeline.options, f.timeline.label),
          pick("budget", f.budget.options, f.budget.label),
          "",
          `— ${from}`,
          reply,
        ]
          .filter((line, index, lines) => line !== "" || lines[index - 1] !== "")
          .join("\n");
        return json({
          sent: false,
          action: "Open this URL to review and send the message yourself.",
          mailto: `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
          alternatives: {
            startAProject: `${SITE_URL}${inquiryPath(lang)}`,
            booking: bookingHref,
            contactSection: `${home}#contact`,
          },
        });
      },
    },
  ];
}

/** Takes the locale, not the dictionary: the page around it is server-rendered,
 *  and a dictionary prop would be serialized into the page payload. */
export function AgentTools({ lang }: { lang: Lang }) {
  useEffect(() => {
    const context = (navigator as Navigator & { modelContext?: ModelContext })
      .modelContext;
    if (!context) return;

    const tools = buildTools(copy[lang], lang);

    // The spec's bulk call replaces the page's whole tool set, which is what we
    // want on a language switch. `registerTool` is the older per-tool shape
    // still shipping in some builds.
    if (typeof context.provideContext === "function") {
      context.provideContext({ tools });
      return () => {
        context.provideContext?.({ tools: [] });
      };
    }
    if (typeof context.registerTool === "function") {
      const handles = tools.map((tool) => context.registerTool?.(tool));
      return () => handles.forEach((handle) => handle?.unregister?.());
    }
  }, [lang]);

  return null;
}
