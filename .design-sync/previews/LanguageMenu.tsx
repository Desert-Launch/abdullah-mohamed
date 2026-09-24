import { useEffect, useRef } from "react";
import { LanguageMenu, copy } from "abdullah-portfolio";
import "./_kit/card-harness";

export const English = () => (
  <div className="site-shell" dir="ltr" style={{ display: "flex", justifyContent: "flex-end" }}>
    <LanguageMenu t={copy.en} lang="en" />
  </div>
);

export const Arabic = () => (
  <div className="site-shell" dir="rtl" style={{ display: "flex", justifyContent: "flex-end" }}>
    <LanguageMenu t={copy.ar} lang="ar" />
  </div>
);

export const Open = () => {
  // Open/closed is the menu's own state; open it the way a visitor does.
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.querySelector<HTMLButtonElement>(".lang-menu-trigger")?.click();
  }, []);
  return (
    <div
      ref={ref}
      className="site-shell"
      dir="ltr"
      style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-start", minHeight: 150 }}
    >
      <LanguageMenu t={copy.en} lang="en" />
    </div>
  );
};
