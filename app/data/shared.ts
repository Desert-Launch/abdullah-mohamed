import type { Social, StackGroup } from "./types";

export const shared: {
  companies: { src: string; name: string }[];
  products: { src?: string; name: string }[];
  socials: Social[];
  stackGroups: StackGroup[];
} = {
  companies: [
    { src: "/images/company_logos/appenza.webp", name: "Appenza Studio" },
    { src: "/images/company_logos/dibhoalding.webp", name: "Dibho Holding" },
    { src: "/images/company_logos/revearsite.webp", name: "RevealSite" },
    { src: "/images/company_logos/zeyada.webp", name: "Zeyada" },
  ],
  products: [
    { src: "/images/apps_logos/faheem_ai.webp", name: "Faheem" },
    { src: "/images/apps_logos/voicers.webp", name: "Voicers" },
    { src: "/images/apps_logos/imox.webp", name: "imox" },
    { src: "/images/apps_logos/yolo.webp", name: "YOLO" },
    { src: "/images/apps_logos/yolo_patient.webp", name: "YOLO Patient" },
    { src: "/images/apps_logos/jaweb.webp", name: "Jaweb" },
    { src: "/images/apps_logos/fastap.webp", name: "FasTap" },
    { src: "/images/apps_logos/btc.webp", name: "BTC" },
    { src: "/images/apps_logos/xera.webp", name: "Xera Lab" },
    { src: "/images/apps_logos/ezhal.webp", name: "Ezhal" },
    { src: "/images/company_logos/zeyada.webp", name: "Zeyada School" },
    { src: "/images/apps_logos/jd.webp", name: "J&D Pharmacy" },
    { src: "/images/apps_logos/medical_center.webp", name: "Medical Center" },
    { src: "/images/apps_logos/quickrx.webp", name: "QuickRX" },
    { src: "/images/apps_logos/holland.webp", name: "Holland Pharmacy" },
    { src: "/images/apps_logos/q_fight_gym.png", name: "Q-Fight Gym" },
    { src: "/images/apps_logos/al_muslim.png", name: "Al-Muslim" },
    { src: "/images/apps_logos/talia.png", name: "Talia" },
    { name: "Ofoq" },
  ],
  socials: [
    {
      label: "Email",
      href: "mailto:abdullah.mohamed102001@gmail.com",
      icon: "/icons/social/gmail.svg",
    },
    {
      label: "WhatsApp",
      href: "https://wa.me/201111852544",
      icon: "/icons/social/whatsapp.svg",
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/abdullah-mohamed-3010",
      icon: "/icons/social/linkedin.svg",
    },
    {
      label: "GitHub",
      href: "https://github.com/Abdullah3010",
      icon: "/icons/social/github.svg",
    },
  ],
  stackGroups: [
    {
      file: "languages",
      label: { en: "Languages", ar: "اللغات" },
      names: "Dart, JavaScript, HTML, CSS",
    },
    {
      file: "frameworks",
      label: { en: "Frameworks & Libraries", ar: "الأطر والمكتبات" },
      names: "Flutter, Node.js, Express, GraphQL, Sequelize",
    },
    {
      file: "ai",
      label: { en: "AI & Real-Time", ar: "الذكاء الاصطناعي والفوري" },
      names:
        "Azure OpenAI, Claude, ChatGPT, Cursor, GitHub Copilot, WebSocket, Socket.IO",
    },
    {
      file: "databases",
      label: { en: "Databases", ar: "قواعد البيانات" },
      names: "PostgreSQL, MySQL, MongoDB, Firebase, Redis, Hive",
    },
    {
      file: "devops",
      label: { en: "DevOps & Cloud", ar: "DevOps والسحابة" },
      names: "AWS, Docker, Nginx, Fastlane / CI-CD",
    },
    {
      file: "tools",
      label: { en: "Tools", ar: "الأدوات" },
      names:
        "Git, GitHub, Bitbucket, Postman, Jira, Swagger, Confluence, Azure DevOps",
    },
    {
      file: "analytics",
      label: { en: "Analytics & Payments", ar: "التحليلات والمدفوعات" },
      names: "Firebase Analytics, Google Analytics",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────
// Fill these in. Everything here is language-agnostic, so you edit it ONCE.
// ─────────────────────────────────────────────────────────────────────────

/** Your Calendly / Cal.com booking link. Until this is a real https URL, the
 *  "Work with me" / "Book a call" buttons safely fall back to email. */
export const bookingUrl =
  "https://calendly.com/abdullah-mohamed102001/book-a-call";

/** Headshot for the About section. Drop the file in `public/images/` and set
 *  the path here (e.g. "/images/abdullah.jpg"). Leave `null` to hide the photo
 *  — About stays text-only, no broken image. */
export const profilePhoto: string | null = "/images/abdullah.jpg";

/** Lifecycle of a shipped app. Clients retiring an app (business ended,
 *  taken off the stores) is normal — we label it honestly instead of showing
 *  a dead link or claiming "live". */
export type AppStatus = "live" | "retired" | "private" | "unreleased";

/** Per-app status + store links for the "Selected work" grid. Only real
 *  https URLs render buttons (so we never ship a dead link); non-live apps
 *  get a status badge instead. `year` feeds the "Shipped {year} · Retired"
 *  badge when known. */
export const storeLinks: Record<
  string,
  { status: AppStatus; year?: string; appStore?: string; play?: string }
> = {
  faheem: {
    status: "live",
    appStore: "https://apps.apple.com/us/app/faheem-ai/id6743378136",
    play: "https://play.google.com/store/apps/details?id=com.moe.fahem",
  },
  voicers: { status: "unreleased" },
  imox: { status: "retired" },
  yolo: {
    status: "live",
    appStore: "https://apps.apple.com/us/developer/yolo-gmbh-germany/id1644853629",
    play: "https://play.google.com/store/apps/developer?id=Dib+GmbH",
  },
  fastap: { status: "retired", year: "2023" },
  btc: {
    status: "live",
    appStore: "https://apps.apple.com/us/app/btc-e-shop/id6757194529",
    play: "https://play.google.com/store/apps/details?id=com.bulliontradingcenter.btc.eshop",
  },
  // Google Play build is still under review — the Play button appears when
  // the listing goes live and the URL lands here.
  qfight: {
    status: "live",
    year: "2026",
    appStore: "https://apps.apple.com/us/app/q-fight-gym/id6759147399",
  },
  almuslim: {
    status: "live",
    year: "2026",
    appStore:
      "https://apps.apple.com/us/app/al-muslim-%D8%A7%D9%84%D9%85%D8%B3%D9%84%D9%85/id6757352101",
    play: "https://play.google.com/store/apps/details?id=com.elmuslim.app",
  },
  xera: { status: "private", year: "2024" },
};

/** Web3Forms access key for the contact form (designed to be public — it only
 *  routes submissions to the owner's inbox). When empty, the form falls back
 *  to the mailto: flow. */
export const web3formsKey = "5b4a9d2c-da3d-47d3-b267-a5ab12484b18";

/** Primary contact address, reused by the mailto fallbacks. */
export const contactEmail = "abdullah.mohamed102001@gmail.com";

/** The "Work with me" / "Book a call" target: the real booking link once set,
 *  otherwise a working mailto so the CTA is never dead. */
export const bookingHref = bookingUrl.startsWith("http")
  ? bookingUrl
  : `mailto:${contactEmail}`;

/** Headshots for the testimonials section (from LinkedIn recommendations). */
export const testimonialImages = {
  ahmedFarid: "/images/testimonials/ahmed-farid.webp",
  mohamadZakaria: "/images/testimonials/mohamad-zakaria.webp",
  mohamedSayed: "/images/testimonials/mohamed-sayed.webp",
};

export const appImages = {
  faheem: "/images/apps_logos/faheem_ai.webp",
  voicers: "/images/apps_logos/voicers.webp",
  imox: "/images/apps_logos/imox.webp",
  yolo: "/images/apps_logos/yolo.webp",
  revealsite: "/images/company_logos/revearsite.webp",
  revealsite2: "/images/company_logos/revealsite2.webp",
  jd: "/images/apps_logos/jd.webp",
  jd2: "/images/apps_logos/jd2.webp",
  holland: "/images/apps_logos/holland.webp",
  medical: "/images/apps_logos/medical_center.webp",
  quickrx: "/images/apps_logos/quickrx.webp",
  zeyada: "/images/company_logos/zeyada.webp",
  jaweb: "/images/apps_logos/jaweb.webp",
  fastap: "/images/apps_logos/fastap.webp",
  btc: "/images/apps_logos/btc.webp",
  qfight: "/images/apps_logos/q_fight_gym.png",
  almuslim: "/images/apps_logos/al_muslim.png",
  talia: "/images/apps_logos/talia.png",
  ezhal: "/images/apps_logos/ezhal.webp",
  ezhalShot: "/images/ezhal_shot1.webp",
  xera: "/images/apps_logos/xera.webp",
};
