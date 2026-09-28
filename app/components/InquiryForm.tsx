"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { track } from "@vercel/analytics";
import type { InquiryCopy, InquiryOption } from "../data/types";

interface InquiryFormProps {
  copy: InquiryCopy;
  /** The address the brief is sent to. */
  email: string;
  /** The WhatsApp chat link (`https://wa.me/<number>`), or undefined. */
  whatsapp?: string;
  /** Service slugs and names, so `?service=<slug>` can say which page the
   *  visitor came from. */
  services: { slug: string; name: string }[];
  /** Published starting-price range, for the budget hint. */
  priceRange: { min: string; max: string };
}

type Channel = "email" | "whatsapp" | "copy";

const fill = (text: string, values: Record<string, string>) =>
  text.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);

const labelFor = (options: InquiryOption[], key: string) =>
  options.find(([value]) => value === key)?.[1] ?? "";

/**
 * The project brief on `/start-a-project/`.
 *
 * There is no backend. The visitor fills in a few plain-language questions
 * and the brief is composed into a message they send themselves — by email
 * (the primary action), on WhatsApp, or copied to paste anywhere. That keeps
 * the page static, keeps the owner's inbox off a public POST endpoint (the
 * Web3Forms form this replaces needed a captcha for exactly that reason), and
 * means the visitor sees exactly what is sent.
 *
 * Without JavaScript the form still works: it is a real `<form>` whose action
 * is a `mailto:` URL, which browsers submit by opening the mail client with
 * the fields as the body. With JavaScript the submit is intercepted and the
 * body is composed as a readable brief in the page's language instead of
 * `key=value` lines, and the WhatsApp and copy actions appear.
 *
 * Events: `inquiry_submit { channel, stage, platform, timeline, budget,
 * service }` — option keys only, never the free text or the contact details.
 */
export function InquiryForm({ copy, email, whatsapp, services, priceRange }: InquiryFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [ready, setReady] = useState(false);
  const [service, setService] = useState<{ slug: string; name: string } | null>(null);
  const [status, setStatus] = useState("");
  const [copied, setCopied] = useState(false);
  const f = copy.fields;

  useEffect(() => {
    setReady(true);
    const slug = new URLSearchParams(window.location.search).get("service");
    const match = services.find((item) => item.slug === slug);
    if (match) setService(match);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [services]);

  /** Reads the form and returns the brief, the subject, and the option keys
   *  for analytics — or null if a required field is missing, after letting
   *  the browser point at it. */
  function compose() {
    const form = formRef.current;
    if (!form || !form.reportValidity()) return null;
    const data = new FormData(form);
    const value = (key: string) => String(data.get(key) ?? "").trim();
    const keys = {
      stage: value("stage"),
      platform: value("platform"),
      timeline: value("timeline"),
      budget: value("budget"),
    };
    // Questions ("Where are you now?") take the answer after a space; labels
    // ("Budget range") after a colon.
    const line = (label: string, text: string) =>
      text ? `${label}${/[?؟]$/.test(label) ? "" : ":"} ${text}` : "";
    const body = [
      copy.brief.heading,
      service ? `${copy.regarding} ${service.name}` : "",
      "",
      f.idea.label,
      value("idea"),
      "",
      line(f.stage.legend, labelFor(f.stage.options, keys.stage)),
      line(f.platform.legend, labelFor(f.platform.options, keys.platform)),
      line(f.timeline.label, labelFor(f.timeline.options, keys.timeline)),
      line(f.budget.label, labelFor(f.budget.options, keys.budget)),
      "",
      `${f.name.label}: ${value("name")}`,
      `${f.email.label}: ${value("email")}`,
      value("company") ? `${f.company.label}: ${value("company")}` : "",
      "",
      `— ${copy.brief.footer}`,
    ]
      // Keep deliberate blank lines, drop the ones left by empty answers.
      .filter((row, index, rows) => row !== "" || (index > 0 && rows[index - 1] !== ""))
      .join("\n");
    const subject = fill(copy.brief.subject, { name: value("name") });
    return { body, subject, keys };
  }

  function report(channel: Channel, keys: Record<string, string>) {
    const props: Record<string, string> = { channel };
    for (const [key, value] of Object.entries(keys)) if (value) props[key] = value;
    if (service) props.service = service.slug;
    track("inquiry_submit", props);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const brief = compose();
    if (!brief) return;
    report("email", brief.keys);
    // CRLF line breaks: RFC 6068 asks for them in a mailto body, and some
    // desktop clients collapse bare LFs.
    const body = brief.body.replace(/\n/g, "\r\n");
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(brief.subject)}&body=${encodeURIComponent(body)}`;
    setStatus(fill(copy.status.email, { email }));
  }

  function onWhatsApp() {
    const brief = compose();
    if (!brief || !whatsapp) return;
    report("whatsapp", brief.keys);
    window.open(`${whatsapp}?text=${encodeURIComponent(brief.body)}`, "_blank", "noopener,noreferrer");
    setStatus(copy.status.whatsapp);
  }

  async function onCopy() {
    const brief = compose();
    if (!brief) return;
    try {
      await navigator.clipboard.writeText(brief.body);
    } catch {
      // Clipboard API blocked (insecure context, permissions): fall back to a
      // selected textarea, which every browser can still copy from.
      const area = document.createElement("textarea");
      area.value = brief.body;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    report("copy", brief.keys);
    setStatus(fill(copy.status.copy, { email }));
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  }

  const optional = <span className="inquiry-optional"> ({copy.optional})</span>;

  return (
    <form
      ref={formRef}
      className="inquiry-form"
      // The no-JavaScript path: browsers open the mail client with the fields.
      action={`mailto:${email}?subject=${encodeURIComponent(copy.brief.heading)}`}
      method="post"
      encType="text/plain"
      onSubmit={onSubmit}
    >
      {service ? (
        <p className="inquiry-regarding">
          {copy.regarding} <strong>{service.name}</strong>
        </p>
      ) : null}

      <div className="inquiry-field">
        <label htmlFor="inquiry-idea">{f.idea.label}</label>
        <p className="inquiry-hint" id="inquiry-idea-hint">
          {f.idea.hint}
        </p>
        <textarea
          id="inquiry-idea"
          name="idea"
          rows={5}
          required
          aria-describedby="inquiry-idea-hint"
        />
      </div>

      {[
        { name: "stage", legend: f.stage.legend, options: f.stage.options },
        { name: "platform", legend: f.platform.legend, options: f.platform.options },
      ].map((group) => (
        <fieldset className="inquiry-choices" key={group.name}>
          <legend>
            {group.legend}
            {optional}
          </legend>
          <div className="inquiry-options">
            {group.options.map(([value, label]) => (
              <label className="inquiry-choice" key={value}>
                <input type="radio" name={group.name} value={value} />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      ))}

      <div className="inquiry-row">
        <div className="inquiry-field">
          <label htmlFor="inquiry-timeline">
            {f.timeline.label}
            {optional}
          </label>
          <select id="inquiry-timeline" name="timeline" defaultValue="">
            <option value="">{copy.choose}</option>
            {f.timeline.options.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div className="inquiry-field">
          <label htmlFor="inquiry-budget">
            {f.budget.label}
            {optional}
          </label>
          <select
            id="inquiry-budget"
            name="budget"
            defaultValue=""
            aria-describedby="inquiry-budget-hint"
          >
            <option value="">{copy.choose}</option>
            {f.budget.options.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <p className="inquiry-hint" id="inquiry-budget-hint">
            {fill(f.budget.hint, priceRange)}
          </p>
        </div>
      </div>

      <div className="inquiry-row inquiry-row--contact">
        <div className="inquiry-field">
          <label htmlFor="inquiry-name">{f.name.label}</label>
          <input id="inquiry-name" name="name" type="text" autoComplete="name" required />
        </div>
        <div className="inquiry-field">
          <label htmlFor="inquiry-email">{f.email.label}</label>
          <input
            id="inquiry-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            dir="ltr"
            required
          />
        </div>
        <div className="inquiry-field">
          <label htmlFor="inquiry-company">
            {f.company.label}
            {optional}
          </label>
          <input id="inquiry-company" name="company" type="text" autoComplete="organization" />
        </div>
      </div>

      <div className="inquiry-actions">
        <button className="button primary" type="submit">
          {copy.send.email}
          <span className="glyph-dir" aria-hidden="true">
            →
          </span>
        </button>
        {ready && whatsapp ? (
          <button className="button ghost" type="button" onClick={onWhatsApp}>
            {copy.send.whatsapp}
          </button>
        ) : null}
        {ready ? (
          <button className="button ghost" type="button" onClick={onCopy}>
            {copied ? copy.send.copied : copy.send.copy}
          </button>
        ) : null}
      </div>

      <div className="inquiry-foot">
        <p className="inquiry-status" role="status" aria-live="polite">
          {status}
        </p>
        <p className="inquiry-privacy">{copy.privacy}</p>
      </div>
    </form>
  );
}
