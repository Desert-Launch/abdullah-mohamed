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

export interface StackGroup {
  file: string;
  label: Record<Lang, string>;
  names: string;
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

export interface CaseStudy {
  slug: string;
  title: string;
  type: string;
  /** Ownership/context badge, e.g. "Appenza Studio · product team" vs "Independent build". */
  context?: string;
  image?: string;
  shots?: string[];
  summary: string;
  challenge: string;
  role: string;
  process: string[];
  results: Metric[];
  stack: string[];
  links?: CaseLink[];
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
  /** Marks placeholder content to be swapped for a real client quote.
   *  Sample testimonials are never rendered — the section hides itself
   *  until at least one real quote exists. */
  sample?: boolean;
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
export type PlanIcon = "clock" | "diamond" | "infinity";

export interface Plan {
  name: string;
  /** One-line promise shown under the name, e.g. "One production-ready slice, shipped." */
  body: string;
  /** Headline price, pre-formatted with symbol and grouping, e.g. "$1,200". USD in both languages. */
  price: string;
  /** Small print under the price, e.g. "flat · one system · 5 business days". */
  priceNote: string;
  /** Per-card CTA label, e.g. "Book a review". Links to #contact. */
  cta: string;
  /** Which glyph to show in the card header. */
  icon: PlanIcon;
  featured?: boolean;
  /** Badge above a featured card, e.g. "Most popular". */
  badge?: string;
  /** Optional lead-in above the feature list, e.g. "Everything in Architecture Clinic, plus:". */
  itemsIntro?: string;
  items: string[];
}

/** A fixed-scope specialization sold alongside the core plans (the add-ons row). */
export interface PlanAddOn {
  name: string;
  /** Headline price, pre-formatted, e.g. "$6,000". */
  price: string;
  body: string;
}

export interface Heading {
  eyebrow: string;
  title: string;
  body?: string;
}

export interface HeroCopy {
  eyebrow: string;
  /** Headline lead-in, rendered in default ink. */
  title: string;
  /** Tail of the headline, rendered in the accent color (gold). */
  titleAccent: string;
  roleLine: string;
  tagline: string;
  lead: string;
  /** Italic emphasis phrase appended to the end of `lead`. */
  leadEmphasis: string;
  primary: string;
  secondary: string;
  /** Label for the "see selected work" hero button. */
  work: string;
  cv: string;
  availability: string;
  /** Live status line ("Currently: … — taking new projects from …"),
   *  rendered with a pulsing dot under the hero actions. */
  currently: string;
  stackLabel: string;
  stack: string;
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
  /** Store-availability line under the proof strip, e.g. "Live on the App Store & Google Play". */
  proofNote: string;
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
  stackHeading: Heading;
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
  selectedWork: SelectedApp[];
  experiences: Experience[];
  freelanceProjects: Product[];
  services: Service[];
  plans: Plan[];
  /** Fixed-scope specializations shown as a compact row below the core plans. */
  planAddOns: PlanAddOn[];
  testimonials: Testimonial[];
  contact: ContactCopy;
}
