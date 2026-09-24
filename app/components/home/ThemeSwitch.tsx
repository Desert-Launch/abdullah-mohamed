"use client";

import type { HomeCopy, ThemePreference } from "../../data/types";
import { useSiteTheme } from "../../lib/useSiteTheme";

const OPTIONS: ThemePreference[] = ["system", "light", "dark"];

/**
 * Auto / Light / Dark. A group of toggle buttons rather than a radio group:
 * each is a plain button with `aria-pressed`, one tab stop apiece, which is
 * what three words side by side read as. Every instance shares one store
 * (useSiteTheme), so the header's, the footer's and the menu's controls agree.
 */
export function ThemeSwitch({
  copy,
  large = false,
}: {
  copy: HomeCopy["theme"];
  large?: boolean;
}) {
  const { preference, setPreference } = useSiteTheme();
  return (
    <div
      className={`theme-switch${large ? " theme-switch--large" : ""}`}
      role="group"
      aria-label={copy.label}
    >
      {OPTIONS.map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={preference === option}
          onClick={() => setPreference(option)}
        >
          {copy[option]}
        </button>
      ))}
    </div>
  );
}
