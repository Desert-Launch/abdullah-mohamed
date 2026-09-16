"use client";

import { useRef, useState } from "react";
import { track } from "@vercel/analytics";
import type { ContactFormCopy, ContactIntent, Social } from "../data/types";
import { contactEmail, web3formsKey } from "../data/shared";
import { SocialLinks } from "./SocialLinks";

type Status = "idle" | "sending" | "success" | "error";

const INTENTS: ContactIntent[] = ["project", "hiring", "other"];

export function ContactForm({ form, socials }: { form: ContactFormCopy; socials: Social[] }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  // Defaults to the commonest case; the subject line and the analytics event
  // both carry it, so a recruiter's message is distinguishable in the inbox.
  const [intent, setIntent] = useState<ContactIntent>("project");
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // `contact_form_start` fires once per mount, on the first focus into any
  // field — start vs. submit is the form's abandonment rate.
  const started = useRef(false);

  function handleFocus() {
    if (started.current) return;
    started.current = true;
    track("contact_form_start");
  }

  const subject = `${form.intentOptions[intent]}${name ? ` — ${name}` : ""}`;

  function mailtoFallback() {
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${body}`;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Honeypot: bots fill every field; real users never see this one.
    const botcheck = new FormData(event.currentTarget).get("botcheck");
    if (botcheck) {
      setStatus("success");
      return;
    }
    if (!web3formsKey) {
      track("contact_form_submit", { via: "mailto", intent });
      mailtoFallback();
      return;
    }
    setStatus("sending");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: web3formsKey,
          subject: `Portfolio: ${subject}`,
          name,
          email,
          // Web3Forms passes unknown keys straight through to the email.
          intent,
          message,
        }),
      });
      const result = (await response.json()) as { success?: boolean };
      if (!response.ok || !result.success) throw new Error("submit failed");
      // Only a delivered message counts; the honeypot path above never does.
      track("contact_form_submit", { via: "web3forms", intent });
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  function handleCopyEmail() {
    navigator.clipboard?.writeText(contactEmail).then(() => {
      setCopied(true);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} onFocus={handleFocus}>
      {/* Visible labels, not placeholder-only: a placeholder disappears the
          moment someone types, taking the only description of the field with
          it (and axe flags the pattern). */}
      <label className="contact-field">
        <span className="contact-field-label">{form.intentLabel}</span>
        <select
          name="intent"
          value={intent}
          onChange={(event) => setIntent(event.target.value as ContactIntent)}
        >
          {INTENTS.map((value) => (
            <option key={value} value={value}>
              {form.intentOptions[value]}
            </option>
          ))}
        </select>
      </label>
      <label className="contact-field">
        <span className="contact-field-label">{form.name}</span>
        <input
          type="text"
          name="name"
          required
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <label className="contact-field">
        <span className="contact-field-label">{form.email}</span>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <label className="contact-field">
        <span className="contact-field-label">{form.message}</span>
        <textarea
          name="message"
          rows={4}
          required
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
      </label>
      <input
        type="checkbox"
        name="botcheck"
        className="contact-botcheck"
        tabIndex={-1}
        aria-hidden="true"
        autoComplete="off"
      />
      <button
        className="button secondary"
        type="submit"
        data-magnetic
        disabled={status === "sending"}
      >
        {status === "sending" ? form.sending : form.send}
      </button>

      {/* Live region so screen readers announce the outcome without focus moves. */}
      <p className="contact-status" role="status" aria-live="polite">
        {status === "success" ? (
          <span className="is-success">{form.success}</span>
        ) : status === "error" ? (
          <span className="is-error">{form.error}</span>
        ) : null}
      </p>

      <div className="contact-direct">
        <span>{form.directLabel}</span>
        <div className="contact-direct-icons">
          <SocialLinks socials={socials} size={24} source="contact" />
          <button type="button" className="copy-email" onClick={handleCopyEmail}>
            {copied ? form.copied : form.copyEmail}
          </button>
        </div>
      </div>
    </form>
  );
}
