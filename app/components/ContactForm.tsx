"use client";

import { useRef, useState } from "react";
import type { ContactFormCopy, Social } from "../data/types";
import { contactEmail, web3formsKey } from "../data/shared";
import { SocialLinks } from "./SocialLinks";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm({ form, socials }: { form: ContactFormCopy; socials: Social[] }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function mailtoFallback() {
    const subject = encodeURIComponent(`Project inquiry${name ? ` from ${name}` : ""}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
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
          subject: `Portfolio inquiry${name ? ` from ${name}` : ""}`,
          name,
          email,
          message,
        }),
      });
      const result = (await response.json()) as { success?: boolean };
      if (!response.ok || !result.success) throw new Error("submit failed");
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
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>
        <span className="sr-only">{form.name}</span>
        <input
          type="text"
          name="name"
          required
          placeholder={form.name}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <label>
        <span className="sr-only">{form.email}</span>
        <input
          type="email"
          name="email"
          required
          placeholder={form.email}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <label>
        <span className="sr-only">{form.message}</span>
        <textarea
          name="message"
          rows={4}
          required
          placeholder={form.message}
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
          <SocialLinks socials={socials} size={24} />
          <button type="button" className="copy-email" onClick={handleCopyEmail}>
            {copied ? form.copied : form.copyEmail}
          </button>
        </div>
      </div>
    </form>
  );
}
