export type Lang = "en" | "ar";
export type Theme = "dark" | "light";

export type NavItem = [label: string, href: string];
export type Proof = [value: string, label: string];
/** One row of the About section's "at a glance" list: `[label, value]`. Short,
 *  factual, and quotable — this is the block an assistant lifts when asked
 *  "who is Abdullah Mohamed and what does he do". */
export type Fact = [label: string, value: string];

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

/** One engineering decision on a case study, with the reason behind it.
 *
 *  This is the block that was missing: the studies named an architecture
 *  ("clean architecture, 16 modules") without ever saying what was chosen over
 *  what, or why. A hiring manager reads a case study for exactly this — it is
 *  the difference between a feature list and evidence of judgment. Every entry
 *  must be a decision that was actually made on the project, with the
 *  constraint that forced it. */
export interface CaseDecision {
  /** The decision as a claim: "WebSocket, not request/response". */
  title: string;
  /** The constraint that forced it and what it bought. */
  body: string;
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
  /** Decisions and their reasons — see `CaseDecision`. Optional only so a new
   *  study can be added before its decisions are written; every study that
   *  claims senior work should have them. */
  decisions?: CaseDecision[];
  results: Metric[];
  stack: string[];
  links?: CaseLink[];
  /** ISO date (YYYY-MM-DD) this write-up was first published.
   *
   *  Feeds `Article.datePublished`. Without it every case study carried only a
   *  `dateModified` of the build date, so each page appeared to change on
   *  every deploy and none had a stable date to be ranked or cited by. */
  published: string;
  /** For the `SoftwareApplication` node on the case page: schema.org
   *  `applicationCategory` (e.g. "EducationalApplication") and the platforms
   *  it shipped on. Omitted where the product is not an app. */
  appCategory?: string;
  platforms?: string[];
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
  /** Stable id, shared with the matching `servicePages.pages` entry — the
   *  card links to `/services/<slug>/` and the Service JSON-LD is keyed on it. */
  slug: string;
  name: string;
  /** One-line promise shown under the name, e.g. "A focused web product or
   *  internal tool, shipped." */
  body: string;
  /** Headline starting price, pre-formatted with symbol and grouping, e.g.
   *  "from $3,500". USD in both languages. */
  price: string;
  /** The same starting price as a number (USD), for the Offer structured
   *  data. Must agree with `price` — the string is what people read, the
   *  number is what search engines read. */
  minPrice: number;
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

/** Copy for the standalone `/work` index and `/work/[slug]` detail pages,
 *  routed in both locales (`/work/…`, `/ar/work/…`). */
export interface WorkCopy {
  /** SERP/social copy for the /work index route. The title is the page's own
   *  part only — the locale layout's template appends "| Abdullah Mohamed". */
  meta: {
    title: string;
    description: string;
  };
  /** SERP title/description templates for a `/work/<slug>/` page. Placeholders:
   *  `{title}`, `{type}`, `{summary}`, `{stack}` (comma-joined). The description
   *  is composed from the study rather than stored per study so it can never
   *  say something the page doesn't. */
  caseMeta: {
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
  /** Label above the links from a case study to the services that cite it
   *  as proof — the page's "hire me for the same thing" line. */
  relatedServices: string;
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

/** One credential on `/cv/`. Education was absent from the site entirely —
 *  recruiters filter on it and `Person.alumniOf` had nothing to point at. */
export interface Education {
  degree: string;
  school: string;
  /** One line: GPA, honours, or field. */
  detail: string;
  date: string;
}

/** A skills group on `/cv/`, split by how deep the experience actually goes.
 *
 *  The site had no skills block at all — the stack appeared as a sentence in
 *  the hero, an FAQ answer, and ~120 card pills that mixed technologies with
 *  outcomes ("Optimization", "Multi-region"). Grading them is the honest
 *  version: `core` is daily production work over years, `strong` is shipped
 *  with, `used` is real but incidental. Nothing here is a technology that
 *  isn't already evidenced by a role or a case study. */
export interface SkillGroup {
  group: string;
  core: string[];
  strong: string[];
  used: string[];
}

/** Copy for the standalone `/cv/` route, in both locales.
 *
 *  The one page a recruiter wants that the site did not have: crawlable and
 *  printable, the target for "Abdullah Mohamed CV / resume", and the home for
 *  the facts that live nowhere else on the site (education, skills by level).
 *  The employment history is NOT duplicated here — the page renders
 *  `Dictionary.experiences`, the same data the homepage timeline uses. */
export interface CvCopy {
  /** SERP/social copy. Title is the page's own part — the layout appends
   *  "| Abdullah Mohamed". */
  meta: {
    title: string;
    description: string;
  };
  eyebrow: string;
  title: string;
  lead: string;
  /** Header/breadcrumb label. */
  indexLabel: string;
  /** aria-label for the reduced header's nav on this page. */
  navLabel: string;
  /** Professional summary — the paragraph at the top of the PDF. */
  summary: string;
  downloadPdf: string;
  labels: {
    summary: string;
    experience: string;
    education: string;
    skills: string;
    core: string;
    strong: string;
    used: string;
    languages: string;
    contact: string;
    /** Note explaining that the page and the PDF are the same document. */
    printNote: string;
  };
  languages: string[];
  education: Education[];
  skills: SkillGroup[];
}

/** One standalone `/services/<slug>/` landing page.
 *
 *  Each page is the long form of one pricing card (`Plan`, joined by `slug`):
 *  what the service is, who it is for, what is delivered, how it is built, the
 *  case studies that prove it, and the questions clients ask before booking.
 *  Written to be read on its own by someone who arrived from a search or an
 *  assistant's answer and has never seen the homepage. */
export interface ServicePage {
  slug: string;
  /** SERP/social copy. Title is the page's own part — the layout appends
   *  "| Abdullah Mohamed". */
  meta: {
    title: string;
    description: string;
  };
  /** Short noun-phrase name, e.g. "Flutter mobile apps" — breadcrumb, cards,
   *  and the `Service.name` in structured data. */
  name: string;
  /** Category eyebrow above the H1, e.g. "Services · Mobile". */
  eyebrow: string;
  /** The H1: what is built and for whom. */
  title: string;
  /** Lead paragraph — a self-contained answer to "what is this service?". */
  lead: string;
  /** "Is this you?" — the situations the service fits. */
  fit: string[];
  /** "What you get" — the deliverables. */
  deliverables: string[];
  /** "How I build it" — stack, practices, and the working agreement. */
  approach: string[];
  /** Slugs of `caseStudies` entries that prove this service. Resolved at
   *  render time; an unknown slug is skipped, never a broken link. */
  proof: string[];
  /** Questions specific to this service; also emitted as FAQPage markup. */
  faq: FaqItem[];
}

/** Copy for the `/services/` index and the `/services/<slug>/` pages, routed
 *  in both locales (`/services/…`, `/ar/services/…`). */
export interface ServicesCopy {
  /** SERP/social copy for the index. */
  meta: {
    title: string;
    description: string;
  };
  eyebrow: string;
  title: string;
  body: string;
  /** aria-label for the reduced header's nav on these pages. */
  navLabel: string;
  /** Header/breadcrumb label for the index. */
  indexLabel: string;
  /** Card CTA into a service page from the index. */
  readMore: string;
  /** Link on a homepage pricing card into its service page. */
  learnMore: string;
  /** Homepage link from the pricing heading into the index. */
  viewAll: string;
  /** Back link at the top of a detail page. */
  backToIndex: string;
  /** Section labels on a detail page. */
  labels: {
    fit: string;
    deliverables: string;
    approach: string;
    proof: string;
    pricing: string;
    faq: string;
    more: string;
  };
  /** Closing CTA block on a detail page. */
  cta: {
    title: string;
    body: string;
    button: string;
  };
  pages: ServicePage[];
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
  /** Lead paragraph. Keep it to ~35 words: at 62 it was nine lines on a
   *  phone, and the specialty never reached the first screen. */
  lead: string;
  /** The hero's two CTA rows, each labelled for the audience it serves.
   *  The site has two: someone hiring for a role, and someone with a product
   *  to build. Before this the hero had one undifferentiated row of three
   *  buttons written for the buyer, and a recruiter's action ("Download CV")
   *  sat third as a ghost button. */
  ctaRows: {
    hiringLabel: string;
    projectLabel: string;
  };
  /** "Book a call" — the client row's primary action. */
  primary: string;
  /** "See services & pricing" — the client row's secondary action. */
  services: string;
  cv: string;
  /** "View experience" — into the employment timeline. */
  experience: string;
  /** Availability line. Rendered by the footer, not the hero. */
  availability: string;
  /** Live status line ("Currently: … — taking new projects from …"),
   *  rendered with a pulsing dot under the hero actions. */
  currently: string;
  socialLabel: string;
  /** Heading over the proof stats, which sit in the hero's second column on
   *  desktop and under the CTAs on mobile — so the numbers land in the first
   *  viewport instead of a screen below it. Visually hidden. */
  proofLabel: string;
}

/** Who is writing. The site serves two audiences and the form could not tell
 *  them apart: every message arrived under the same subject, and analytics
 *  could not say whether a submission was a lead or an interview. */
export type ContactIntent = "hiring" | "project" | "other";

export interface ContactFormCopy {
  name: string;
  email: string;
  message: string;
  /** Visible label for the intent selector, and the option text. */
  intentLabel: string;
  intentOptions: Record<ContactIntent, string>;
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

/** One audience's lane in the contact section: a heading that names them and
 *  a line telling them what happens next. The action buttons are built from
 *  data the site already holds (the CV path, `shared.socials`, the booking
 *  link), so a lane adds no duplicate labels. */
export interface ContactLane {
  title: string;
  body: string;
}

export interface ContactCopy {
  eyebrow: string;
  title: string;
  body: string;
  /** Label for the booking / "Book a call" button. */
  book: string;
  /** The two doors. Before this the whole section — heading, form placeholder
   *  and success copy — was addressed to a buyer, and a recruiter had no path
   *  that named them. */
  lanes: {
    hiring: ContactLane;
    project: ContactLane;
  };
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
  /** The header's language menu. `label` names the control; `options` are the
   *  locale names written *in their own language* (autonyms) — a visitor
   *  scanning for Arabic looks for "العربية", not for "Arabic", so these two
   *  strings are deliberately identical in both dictionaries. */
  language: {
    label: string;
    options: Record<Lang, string>;
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
    /** Heading over the "at a glance" list. */
    factsLabel: string;
    /** The at-a-glance rows: role, base, experience, stack, languages,
     *  availability. Keep every value to one line. */
    facts: Fact[];
  };
  caseLabels: {
    challenge: string;
    role: string;
    process: string;
    /** Heading over `CaseStudy.decisions` — the block a hiring manager reads
     *  a case study for. */
    decisions: string;
    results: string;
  };
  caseStudies: CaseStudy[];
  /** Copy for the standalone /work index + detail routes. */
  work: WorkCopy;
  /** Copy for the standalone /services index + detail routes. */
  servicePages: ServicesCopy;
  /** Copy for the standalone /cv route. */
  cv: CvCopy;
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
