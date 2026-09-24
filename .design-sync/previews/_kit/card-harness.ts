// Preview-only (never part of the bundle): adapts the card harness to how the
// site renders. Imported first by every preview.

// 1. The harness appends `body{margin:0;padding:24px;background:#fff}` after
//    the site's stylesheet, hiding globals.css's own `body` rule — the paper
//    colour and aurora wash every page sits on. The site's ink is cream, so
//    without this every card reads cream-on-white. Drop only the harness's
//    background; its margin/padding stay. Designs built with the bundle get
//    the body rule from styles.css directly.
for (const sheet of Array.from(document.styleSheets)) {
  if (sheet.href) continue;
  let rules: CSSRuleList;
  try {
    rules = sheet.cssRules;
  } catch {
    continue;
  }
  for (const rule of Array.from(rules)) {
    if (rule instanceof CSSStyleRule && rule.selectorText === "body") {
      rule.style.removeProperty("background");
    }
  }
}

// 2. Every <img> on the site is loading="lazy". The capture step waits on
//    img.decode() for all images, and a lazy image below the card's viewport
//    never starts loading, so that wait never ends (the full pages are
//    several thousand px tall). Load them eagerly — same pixels, earlier.
const eager = (root: ParentNode) => {
  root.querySelectorAll<HTMLImageElement>('img[loading="lazy"]').forEach((img) => {
    img.loading = "eager";
  });
};
new MutationObserver((records) => {
  for (const record of records) {
    record.addedNodes.forEach((node) => {
      if (node instanceof HTMLImageElement && node.loading === "lazy") node.loading = "eager";
      else if (node instanceof Element) eager(node);
    });
  }
}).observe(document.documentElement, { childList: true, subtree: true });

export {};
