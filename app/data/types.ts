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

export interface Plan {
  name: string;
  fit: string;
  body: string;
  featured?: boolean;
  items: string[];
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
     *  the year on retired apps: "Shipped 2023 · Retired". */
    shipped: string;
    retired: string;
    unreleased: string;
  };
  workHeading: Heading;
  freelanceHeading: Heading;
  servicesHeading: Heading;
  stackHeading: Heading;
  plansHeading: Heading;
  /** CTA label at the bottom of each plan card (links to #contact). */
  plansCta: string;
  processHeading: Heading;
  process: ProcessStep[];
  faqHeading: Heading;
  faq: FaqItem[];
  testimonialsHeading: Heading;
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
  testimonials: Testimonial[];
  contact: ContactCopy;
}
