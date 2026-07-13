"use client";

import { useState } from "react";
import type { ContactFormCopy, Social } from "../data/types";
import { SocialLinks } from "./SocialLinks";

export function ContactForm({ form, socials }: { form: ContactFormCopy; socials: Social[] }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = encodeURIComponent(`Project inquiry${name ? ` from ${name}` : ""}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:abdullah.mohamed102001@gmail.com?subject=${subject}&body=${body}`;
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
      <button className="button secondary" type="submit" data-magnetic>
        {form.send}
      </button>

      <div className="contact-direct">
        <span>{form.directLabel}</span>
        <div className="contact-direct-icons">
          <SocialLinks socials={socials} size={24} />
        </div>
      </div>
    </form>
  );
}
