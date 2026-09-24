"use client";

import { useEffect, useRef, useState } from "react";

/** Copies the address to the clipboard and says so for a moment. The status
 *  change is announced (`aria-live`), since the label is the only feedback. */
export function CopyEmailButton({
  email,
  label,
  copiedLabel,
}: {
  email: string;
  label: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Clipboard blocked: the address is on screen as a mailto link anyway.
      return;
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button className="reach-pill" type="button" onClick={copy} aria-live="polite">
      {copied ? copiedLabel : label}
    </button>
  );
}
