"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import type { Dictionary, Lang } from "../data/types";
import { asset } from "../lib/asset";
import { localePath } from "../lib/site";

/** Menu order, not preference order — English first in both locales because the
 *  list is a stable pair, and a list that reorders itself per locale is harder
 *  to re-find than one that doesn't. */
const LANGS: Lang[] = ["en", "ar"];

/**
 * Language switch, as a dropdown.
 *
 * Every entry is a real `<a href>` to the other locale's URL, exactly as the
 * single toggle link it replaces was: language is the route here, never client
 * state, so switching has to be a navigation a crawler can follow and a visitor
 * can bookmark. The menu only changes how the choice is *presented* — it names
 * both languages instead of asking the visitor to infer the destination from a
 * one-word toggle.
 *
 * Keyboard contract (the menu-button pattern): the trigger owns `aria-expanded`
 * and `aria-controls`, arrows move between items, Escape closes and returns
 * focus to the trigger, and moving focus out or pointing outside closes it.
 * Closed, the panel is `visibility: hidden`, so its links leave the tab order
 * rather than lurking invisibly in it.
 */
export function LanguageMenu({ t, lang }: { t: Dictionary; lang: Lang }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemsRef = useRef<Array<HTMLAnchorElement | null>>([]);
  const menuId = useId();

  // Pointer down (not click) so the menu closes on the press that starts a
  // drag or a scroll, matching how native menus behave.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Node && rootRef.current?.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // Opening moves focus onto the current language, so a keyboard user lands on
  // the item that describes where they already are and arrows off it.
  useEffect(() => {
    if (!open) return;
    itemsRef.current[LANGS.indexOf(lang)]?.focus();
  }, [open, lang]);

  const close = (returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  };

  const moveFocus = (step: number) => {
    const items = itemsRef.current.filter((item): item is HTMLAnchorElement => item !== null);
    if (items.length === 0) return;
    const from = items.indexOf(document.activeElement as HTMLAnchorElement);
    // Wrap; focus still on the trigger (-1) enters from whichever end the key
    // points at.
    const next =
      from === -1
        ? step > 0
          ? 0
          : items.length - 1
        : (from + step + items.length) % items.length;
    items[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      if (!open) return;
      event.stopPropagation();
      close(true);
      return;
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      moveFocus(event.key === "ArrowDown" ? 1 : -1);
    }
  };

  return (
    <div
      className={`lang-menu${open ? " is-open" : ""}`}
      ref={rootRef}
      onKeyDown={onKeyDown}
      // Tabbing off the last item (or shift-tabbing off the trigger) leaves the
      // menu behind; relatedTarget is the element focus is heading to.
      onBlur={(event) => {
        if (!open) return;
        const next = event.relatedTarget;
        if (next instanceof Node && rootRef.current?.contains(next)) return;
        setOpen(false);
      }}
    >
      <button
        className="switch-button lang-menu-trigger"
        type="button"
        ref={triggerRef}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        // The visible autonym is part of the name, so the spoken label still
        // matches what a speech-control user reads on the button.
        aria-label={`${t.language.label}: ${t.language.options[lang]}`}
        onClick={() => setOpen((value) => !value)}
      >
        <svg
          className="lang-menu-globe"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3c2.4 2.5 3.6 5.5 3.6 9s-1.2 6.5-3.6 9c-2.4-2.5-3.6-5.5-3.6-9s1.2-6.5 3.6-9Z" />
        </svg>
        <span className="lang-menu-current">{t.language.options[lang]}</span>
        <svg
          className="lang-menu-chevron"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <div className="lang-menu-list" id={menuId} role="menu" aria-label={t.language.label}>
        {LANGS.map((value, index) => {
          const isCurrent = value === lang;
          return (
            <a
              key={value}
              className={`lang-menu-item${isCurrent ? " is-current" : ""}`}
              role="menuitem"
              // Next applies basePath to <Link>, not to raw hrefs.
              href={asset(localePath[value])}
              hrefLang={value}
              // `lang` but deliberately no `dir`: each autonym is a single
              // one-script word, so bidi renders it correctly either way, while
              // a per-item dir would flip that row's alignment and stagger the
              // check marks down the menu.
              lang={value}
              aria-current={isCurrent ? "true" : undefined}
              ref={(node) => {
                itemsRef.current[index] = node;
              }}
              // Clicking the language you're already in is a no-op navigation;
              // just shut the menu.
              onClick={() => close(isCurrent)}
            >
              <svg
                className="lang-menu-check"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.6}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <span>{t.language.options[value]}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
