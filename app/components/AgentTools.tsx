"use client";

import { useEffect } from "react";
import { bookingHref, contactEmail, shared, storeLinks } from "../data/shared";
import type { Dictionary, Lang } from "../data/types";
import { SITE_URL, localePath } from "../lib/site";
import { WORK_LANG, workPath } from "../lib/work";

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
 *   hands it back; it does not submit the contact form. An agent that could
 *   silently post to Web3Forms is a spam pipe pointed at the owner's inbox.
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
  // /work is English-only; the Arabic page must not hand out URLs that 404.
  const caseUrl = (slug: string) =>
    lang === WORK_LANG ? `${SITE_URL}${workPath(slug)}` : `${home}#cases`;

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
          currently: t.hero.currently,
          proof: t.proof.map(([value, label]) => ({ value, label })),
          about: t.about.paragraphs,
          url: home,
          markdown: `${home}index.md`,
        }),
    },
    {
      name: "list_services_and_pricing",
      description:
        "What Abdullah builds and what each engagement starts at, in USD. Prices are starting points, negotiable by scope, and are not quotes.",
      inputSchema: NO_ARGS,
      execute: () =>
        json({
          services: t.services.map((service) => ({
            title: service.title,
            body: service.body,
          })),
          plans: t.plans.map((plan) => ({
            name: plan.name,
            summary: plan.body,
            startingPrice: plan.price,
            priceNote: plan.priceNote,
            includes: plan.items,
          })),
          note: t.plansHeading.body ?? t.plansHeading.title,
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
            role: study.role,
            process: study.process,
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
          contactSection: `${home}#contact`,
          profiles: shared.socials.map((social) => ({
            label: social.label,
            href: social.href,
          })),
          whatToInclude: t.contact.body,
          expectedReply: t.contact.form.success,
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
              "The brief: the product, the deadline, and what is currently blocking you.",
          },
        },
        required: ["message"],
        additionalProperties: false,
      },
      execute: (args) => {
        const from = typeof args?.name === "string" ? args.name : "";
        const reply = typeof args?.email === "string" ? args.email : "";
        const message = typeof args?.message === "string" ? args.message : "";
        const subject = `Project inquiry${from ? ` from ${from}` : ""}`;
        const body = `${message}\n\n— ${from}\n${reply}`;
        return json({
          sent: false,
          action: "Open this URL to review and send the message yourself.",
          mailto: `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
          alternatives: { booking: bookingHref, form: `${home}#contact` },
        });
      },
    },
  ];
}

export function AgentTools({ t, lang }: { t: Dictionary; lang: Lang }) {
  useEffect(() => {
    const context = (navigator as Navigator & { modelContext?: ModelContext })
      .modelContext;
    if (!context) return;

    const tools = buildTools(t, lang);

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
  }, [t, lang]);

  return null;
}
