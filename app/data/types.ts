export type Lang = "en" | "ar";
export type Theme = "dark" | "light";
export type Palette = "current" | "terracotta" | "teal" | "gold";

export type NavItem = [label: string, href: string];
export type Proof = [value: string, label: string];

export interface Social {
  label: string;
  href: string;
  icon: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface Product {
  title: string;
  type: string;
  image?: string;
  shots?: string[];
  body: string;
  stack: string[];
  metrics?: Metric[];
}

/** A card in the "Selected work" thumbnail grid. Store links are joined in
 *  from `shared.storeLinks` by `key`, so URLs live in exactly one place. */
export interface SelectedApp {
  key: string;
  title: string;
  /** One-line description shown under the title. */
  tagline: string;
  /** Optional logo. When absent, the card shows a letter fallback. */
  image?: string;
}

export interface CaseLink {
  label: string;
  href: string;
}

/** A product screenshot on a case study.
 *
 *  `alt` is the accessible description; `caption` is the visible explanation
 *  under the shot on the /work detail page. Several products have an Arabic-only
 *  UI, so an English reader cannot read the screenshot itself — the caption is
 *  what makes the shot legible to them. Captions describe only what is actually
 *  visible in the file; where that is ambiguous the string is left empty and
 *  the shot renders without a caption. */
export interface Shot {
  src: string;
  alt: string;
  caption: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  type: string;
  /** Ownership/context badge, e.g. "Appenza Studio · product team" vs "Independent build". */
  context?: string;
  image?: string;
  shots?: Shot[];
  summary: string;
  challenge: string;
  role: string;
  process: string[];
  results: Metric[];
  stack: string[];
  links?: CaseLink[];
  /** Sorts first on the /work index. */
  featured?: boolean;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  /** Optional headshot shown next to the attribution. */
  image?: string;
  /** LinkedIn URL where the recommendation can be verified. When set, the
   *  card shows a "Verified · LinkedIn" badge and links to the source. */
  linkedin?: string;
}

/** One step in the "How working with me looks" strip. */
export interface ProcessStep {
  title: string;
  body: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface Experience {
  date: string;
  role: string;
  company: string;
  location: string;
  logo: string;
  summary: string;
  achievements: string[];
  apps: Product[];
}

export interface Service {
  title: string;
  body: string;
}

/** Glyph rendered in a plan card's header. */
export type PlanIcon = "layers" | "browser" | "spark" | "mobile";

export interface Plan {
  name: string;
  /** One-line promise shown under the name, e.g. "A focused web product or
   *  internal tool, shipped." */
  body: string;
  /** Headline starting price, pre-formatted with symbol and grouping, e.g.
   *  "from $3,500". USD in both languages. */
  price: string;
  /** Small print under the price. States that the figure is a starting point
   *  and negotiable — never a duration; timeline is set per proposal. */
  priceNote: string;
  /** Per-card CTA label, e.g. "Book a call". Links to #contact. */
  cta: string;
  /** Which glyph to show in the card header. */
  icon: PlanIcon;
  featured?: boolean;
  /** Badge above a featured card, e.g. "Most popular". */
  badge?: string;
  /** Optional lead-in above the feature list, e.g. "Everything above, plus:". */
  itemsIntro?: string;
  items: string[];
}

/** Copy for the standalone `/work` index and `/work/[slug]` detail pages.
 *
 *  These pages exist in English only today (see the deferred `/ar/work` mirror),
 *  but the strings live in both dictionaries so the Arabic mirror is a routing
 *  change rather than a content project, and so `Dictionary` stays one contract. */
export interface WorkCopy {
  /** SERP/social copy for the /work index route. */
  meta: {
    title: string;
    description: string;
  };
  eyebrow: string;
  title: string;
  body: string;
  /** aria-label for the reduced header rendered on the /work pages. */
  navLabel: string;
  /** Link back to the homepage from the /work header. */
  home: string;
  /** Card CTA into a detail page; also used on the homepage case cards. */
  readCase: string;
  /** Homepage CTA into the /work index. */
  viewAll: string;
  /** Back link at the top of a detail page. */
  backToIndex: string;
  /** Label above the other-projects links at the foot of a detail page. */
  more: string;
  /** Heading for shipped apps that have no written case study yet. */
  alsoShipped: Heading;
  /** Label above the screenshot strip on a detail page. */
  screenshots: string;
  /** Notes that the product UI in the screenshots is Arabic, so the captions
   *  are how a non-Arabic reader can follow them. */
  screenshotsNote: string;
  /** Label above the store/live links on a detail page. */
  links: string;
  /** Closing CTA block on a detail page. */
  cta: {
    title: string;
    body: string;
    button: string;
  };
}

export interface Heading {
  eyebrow: string;
  title: string;
  body?: string;
}

/** Labels for the Markdown twin of a page — the body served to clients that
 *  ask for `Accept: text/markdown` (see `app/lib/markdown.ts` and
 *  `docs/agent-readiness.md`). None of this is rendered in the HTML UI, but it
 *  is still display copy read by a human on the other side of an agent, so it
 *  lives in the dictionaries like everything else. */
export interface MarkdownCopy {
  /** Lead note telling the reader what the file is. */
  note: string;
  /** Label above a stack list. */
  stack: string;
  /** Label above a link list. */
  links: string;
  /** Label above a metric list (case-study results). */
  metrics: string;
  /** Label above the contact block. */
  contact: string;
  /** Label on the line pointing back at the human-readable page. */
  htmlVersion: string;
}

export interface HeroCopy {
  eyebrow: string;
  /** Headline lead-in, rendered in default ink. */
  title: string;
  /** Tail of the headline, rendered in the accent color (gold). */
  titleAccent: string;
  /** Role/positioning line. Rendered by the footer, not the hero. */
  roleLine: string;
  lead: string;
  /** Italic emphasis phrase appended to the end of `lead`. */
  leadEmphasis: string;
  primary: string;
  /** Label for the "see selected work" hero button. */
  work: string;
  cv: string;
  /** Availability line. Rendered by the footer, not the hero. */
  availability: string;
  /** Live status line ("Currently: … — taking new projects from …"),
   *  rendered with a pulsing dot under the hero actions. */
  currently: string;
  socialLabel: string;
}

export interface ContactFormCopy {
  name: string;
  email: string;
  message: string;
  send: string;
  /** Submit button label while the request is in flight. */
  sending: string;
  /** Status line after a successful submit. */
  success: string;
  /** Status line when the submit fails (points at the direct links below). */
  error: string;
  /** "Copy email" button label and its transient copied-state label. */
  copyEmail: string;
  copied: string;
  directLabel: string;
}

export interface ContactCopy {
  eyebrow: string;
  title: string;
  body: string;
  /** Label for the booking / "Book a call" button. */
  book: string;
  form: ContactFormCopy;
}

export interface Dictionary {
  dir: "ltr" | "rtl";
  /** Localized SERP/social copy for this locale's route. */
  meta: {
    title: string;
    /** Full description, for search results. */
    description: string;
    /** Uppercase rule line at the top of the generated social card: role,
     *  city, availability. */
    cardEyebrow: string;
    /** Short description, for og:/twitter: and the social card's sub-line.
     *  WhatsApp and LinkedIn truncate around 150 characters — the SERP-length
     *  description above gets cut mid-sentence in a share preview. */
    social: string;
  };
  /** Visually-hidden skip link rendered first inside <body>. */
  skipLink: string;
  nav: NavItem[];
  role: string;
  menuLabel: string;
  /** aria-label for the floating back-to-top button. */
  backToTop: string;
  themeToggle: string;
  darkToggle: string;
  langToggle: string;
  palette: {
    label: string;
    options: Record<Palette, string>;
  };
  hero: HeroCopy;
  proof: Proof[];
  logosLabel: string;
  logosIntro: string;
  companiesLabel: string;
  appsLabel: string;
  caseStudiesHeading: Heading;
  selectedWorkHeading: Heading;
  selectedWorkLabels: {
    products: string;
    productBuild: string;
    appStore: string;
    googlePlay: string;
    /** Status badges for apps without live store links. `shipped` prefixes
     *  the year on retired apps: "Shipped 2023 · Retired". Other statuses
     *  carrying a `year` prefix it bare: "2022 · Product build". */
    shipped: string;
    retired: string;
    unreleased: string;
  };
  workHeading: Heading;
  freelanceHeading: Heading;
  servicesHeading: Heading;
  plansHeading: Heading;
  processHeading: Heading;
  process: ProcessStep[];
  faqHeading: Heading;
  faq: FaqItem[];
  testimonialsHeading: Heading;
  testimonialLabels: {
    /** Trust badge shown on cards backed by a LinkedIn recommendation. */
    verified: string;
    /** Accessible label for the link to the recommendation on LinkedIn. */
    view: string;
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
  };
  caseLabels: {
    challenge: string;
    role: string;
    process: string;
    results: string;
  };
  caseStudies: CaseStudy[];
  /** Copy for the standalone /work index + detail routes. */
  work: WorkCopy;
  selectedWork: SelectedApp[];
  experiences: Experience[];
  freelanceProjects: Product[];
  services: Service[];
  plans: Plan[];
  testimonials: Testimonial[];
  contact: ContactCopy;
  /** Copy for the `Accept: text/markdown` twin of every page in this locale. */
  markdown: MarkdownCopy;
}
