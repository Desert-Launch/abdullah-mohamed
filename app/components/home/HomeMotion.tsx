"use client";

import { useEffect, useRef } from "react";

/** Numbers worth counting: an optional "+", digits, then "+" or "%" at most.
 *  "~300–500 ms", "Since 2022" or "4 companies" stay as written. */
const COUNTABLE = /^(\+?)([\d,]+)([+%]?)$/;

/**
 * Every scroll- and pointer-driven effect on the homepage, in one place, so
 * the sections themselves stay server-rendered markup that declares what it
 * wants with data attributes:
 *
 * - `data-reveal`   fade + rise once in view (styles gated on data-reveal-ready)
 * - `data-line`     hairline draws in
 * - `data-count`    number counts up from zero
 * - `data-stagger`  children arrive one after another
 * - `data-rise`     a heading's words rise out of their masks
 * - `data-parallax` drifts at the given rate while scrolling
 * - `data-spot`     a soft light follows the pointer
 * - `data-magnetic` a button leans toward the pointer
 * - `data-cursor`   a label follows the pointer over it
 * - `data-tilt`     its `data-tilt-target` shifts against the pointer
 *
 * Content that is on screen at load is never hidden and then re-shown: only
 * elements still below the fold are armed. Under reduced motion only the
 * reveal (instant) and the reading-progress line remain; pointer effects need
 * a fine pointer that can hover.
 */
export function HomeMotion() {
  const progressRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const hasIO = "IntersectionObserver" in window;
    const cleanups: Array<() => void> = [];
    const all = <T extends Element = HTMLElement>(selector: string) =>
      Array.from(document.querySelectorAll<T & HTMLElement>(selector));
    const belowFold = (el: Element) => el.getBoundingClientRect().top > window.innerHeight;
    const onEnter = (
      els: HTMLElement[],
      fn: (el: HTMLElement) => void,
      options: IntersectionObserverInit = { rootMargin: "0px 0px -8% 0px" },
    ) => {
      if (els.length === 0) return;
      const io = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          io.unobserve(entry.target);
          fn(entry.target as HTMLElement);
        }
      }, options);
      els.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    };

    // Reveal. The hiding lives in CSS, keyed on the pre-paint data-reveal-ready
    // flag; this only decides when each block is shown.
    const reveals = all("[data-reveal]");
    if (reduced || !hasIO) {
      reveals.forEach((el) => el.classList.add("is-visible"));
    } else {
      const line = window.innerHeight * 0.94;
      const pending = reveals.filter((el) => {
        if (el.getBoundingClientRect().top < line) {
          el.classList.add("is-visible");
          return false;
        }
        return true;
      });
      onEnter(pending, (el) => el.classList.add("is-visible"), { rootMargin: "0px 0px -6% 0px" });
    }

    // Reading progress and scroll parallax share one rAF-throttled listener.
    const parallax = reduced ? [] : all("[data-parallax]");
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
        progressRef.current?.style.setProperty("transform", `scaleX(${progress.toFixed(4)})`);
        const view = window.innerHeight;
        for (const el of parallax) {
          const box = el.parentElement?.getBoundingClientRect();
          if (!box || box.bottom < -300 || box.top > view + 300) continue;
          const offset = box.top + box.height / 2 - view / 2;
          el.style.translate = `0 ${(-offset * Number(el.dataset.parallax)).toFixed(1)}px`;
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    cleanups.push(() => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    });

    if (!reduced && hasIO) {
      // Hairlines draw in.
      const lines = all("[data-line]").filter(belowFold);
      lines.forEach((el) => el.setAttribute("data-armed", ""));
      onEnter(lines, (el) => el.setAttribute("data-in", ""));

      // Headings whose words rise (the contact title).
      const rises = all("[data-rise]").filter(belowFold);
      rises.forEach((el) => el.setAttribute("data-armed", ""));
      onEnter(rises, (el) => el.setAttribute("data-in", ""));

      // Groups whose children arrive in sequence.
      const groups = all("[data-stagger]").filter(belowFold);
      groups.forEach((group) => {
        Array.from(group.children).forEach((child, index) =>
          (child as HTMLElement).style.setProperty("--si", String(index)),
        );
        group.setAttribute("data-armed", "");
      });
      onEnter(groups, (el) => el.setAttribute("data-in", ""));

      // Count-ups: the server-rendered value is the real one; below the fold
      // it is swapped for zero and counted back up once half in view.
      const counts = all("[data-count]").filter((el) => belowFold(el) && COUNTABLE.test(el.textContent?.trim() ?? ""));
      const parsed = new Map<HTMLElement, { prefix: string; target: number; suffix: string }>();
      counts.forEach((el) => {
        const [, prefix, digits, suffix] = COUNTABLE.exec(el.textContent!.trim())!;
        parsed.set(el, { prefix, target: Number(digits.replace(/,/g, "")), suffix });
        el.textContent = `${prefix}0${suffix}`;
      });
      onEnter(
        counts,
        (el) => {
          const { prefix, target, suffix } = parsed.get(el)!;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / 1800);
            const eased = 1 - Math.pow(1 - t, 4);
            el.textContent = `${prefix}${Math.round(target * eased).toLocaleString("en-US")}${suffix}`;
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        },
        { threshold: 0.5 },
      );
      cleanups.push(() =>
        parsed.forEach(({ prefix, target, suffix }, el) => {
          el.textContent = `${prefix}${target.toLocaleString("en-US")}${suffix}`;
        }),
      );
    }

    if (!reduced && fine) {
      const listen = <K extends keyof HTMLElementEventMap>(
        el: HTMLElement | Window,
        type: K,
        fn: (event: HTMLElementEventMap[K]) => void,
      ) => {
        el.addEventListener(type, fn as EventListener, { passive: true });
        cleanups.push(() => el.removeEventListener(type, fn as EventListener));
      };

      for (const el of all("[data-spot]")) {
        listen(el, "pointermove", (event) => {
          const box = el.getBoundingClientRect();
          el.style.setProperty("--sx", `${event.clientX - box.left}px`);
          el.style.setProperty("--sy", `${event.clientY - box.top}px`);
          el.style.setProperty("--so", "1");
        });
        listen(el, "pointerleave", () => el.style.setProperty("--so", "0"));
      }

      for (const el of all("[data-magnetic]")) {
        listen(el, "pointermove", (event) => {
          const box = el.getBoundingClientRect();
          el.style.setProperty("--tx", `${((event.clientX - box.left - box.width / 2) * 0.18).toFixed(1)}px`);
          el.style.setProperty("--ty", `${((event.clientY - box.top - box.height / 2) * 0.3).toFixed(1)}px`);
        });
        listen(el, "pointerleave", () => {
          el.style.setProperty("--tx", "0px");
          el.style.setProperty("--ty", "0px");
        });
      }

      for (const el of all("[data-tilt]")) {
        const target = el.querySelector<HTMLElement>("[data-tilt-target]");
        if (!target) continue;
        listen(el, "pointermove", (event) => {
          const box = el.getBoundingClientRect();
          const dx = (event.clientX - box.left) / box.width - 0.5;
          const dy = (event.clientY - box.top) / box.height - 0.5;
          target.style.transform = `translate3d(${(dx * -14).toFixed(1)}px, ${(dy * -10).toFixed(1)}px, 0)`;
        });
        listen(el, "pointerleave", () => {
          target.style.transform = "";
        });
      }

      const cursor = cursorRef.current;
      if (cursor) {
        listen(window, "pointermove", (event) => {
          const over = (event.target as Element | null)?.closest?.("[data-cursor]");
          cursor.style.transform = `translate(${event.clientX + 16}px, ${event.clientY + 16}px)`;
          if (over) {
            cursor.textContent = over.getAttribute("data-cursor");
            cursor.setAttribute("data-on", "");
          } else {
            cursor.removeAttribute("data-on");
          }
        });
      }
    }

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return (
    <>
      <div className="home-progress" ref={progressRef} aria-hidden="true" />
      <div className="home-cursor" ref={cursorRef} aria-hidden="true" />
    </>
  );
}
