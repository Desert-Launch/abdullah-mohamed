import { Fragment, type CSSProperties, type ReactNode } from "react";

/**
 * "02 ── In production": the numbered hairline label that opens every homepage
 * section. The number is page furniture (aria-hidden); the label is the
 * section's accessible name. Sections with no heading of their own pass
 * `heading` so the label is an <h2> and the outline stays whole.
 */
export function SectionLabel({
  n,
  id,
  heading = false,
  children,
}: {
  n: string;
  id?: string;
  heading?: boolean;
  children: ReactNode;
}) {
  const Label = heading ? "h2" : "span";
  return (
    <div className="home-label">
      <span className="home-label-n" aria-hidden="true">
        {n}
      </span>
      <Label id={id} className="home-label-text">
        {children}
      </Label>
      <span className="home-label-line" data-line="" aria-hidden="true" />
    </div>
  );
}

/**
 * A line of display type split into masked words for the rise animation
 * (`.home-word` in globals.css). The words stay plain text in the DOM, so the
 * sentence reads and indexes as the sentence it is. `start` continues the
 * stagger from a previous run on the same heading.
 */
export function SplitWords({ text, start = 0 }: { text: string; start?: number }) {
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <>
      {words.map((word, i) => (
        <Fragment key={`${i}-${word}`}>
          {i > 0 ? " " : null}
          <span className="home-word">
            <span style={{ "--i": start + i } as CSSProperties}>{word}</span>
          </span>
        </Fragment>
      ))}
    </>
  );
}

export function wordCount(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

/** "04", "05", … — the numbers on the case-study rows and section labels. */
export function pad(n: number): string {
  return String(n).padStart(2, "0");
}

/** Which store a link points at, for the `store_link_click` event. */
export function storeOf(href: string): "app-store" | "google-play" | "web" {
  if (href.includes("apps.apple.com")) return "app-store";
  if (href.includes("play.google.com")) return "google-play";
  return "web";
}
