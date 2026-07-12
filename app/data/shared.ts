import type { Social, StackGroup } from "./types";

export const shared: {
  companyLogos: { src: string; name: string }[];
  socials: Social[];
  stackGroups: StackGroup[];
} = {
  companyLogos: [
    { src: "/images/company_logos/appenza.webp", name: "Appenza Studio" },
    { src: "/images/company_logos/dibhoalding.webp", name: "Dibho Holding" },
    { src: "/images/company_logos/revearsite.webp", name: "RevealSite" },
    { src: "/images/company_logos/zeyada.webp", name: "Zeyada" },
    { src: "/images/apps_logos/faheem_ai.webp", name: "Faheem" },
    { src: "/images/apps_logos/imox.webp", name: "imox" },
    { src: "/images/apps_logos/jaweb.webp", name: "Jaweb" },
    { src: "/images/apps_logos/fastap.webp", name: "FasTap" },
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

/** Per-app store links for the "Selected work" grid. Paste real URLs; empty
 *  strings render no button (so we never ship a dead link). */
export const storeLinks: Record<string, { appStore?: string; play?: string }> =
  {
    voicers: { appStore: "", play: "" },
    imox: { appStore: "", play: "" },
    yolo: { appStore: "", play: "" },
    fastap: { appStore: "", play: "" },
    btc: { appStore: "", play: "" },
    qfight: { appStore: "", play: "" },
    almuslim: { appStore: "", play: "" },
  };

/** Primary contact address, reused by the mailto fallbacks. */
export const contactEmail = "abdullah.mohamed102001@gmail.com";

/** The "Work with me" / "Book a call" target: the real booking link once set,
 *  otherwise a working mailto so the CTA is never dead. */
export const bookingHref = bookingUrl.startsWith("http")
  ? bookingUrl
  : `mailto:${contactEmail}`;

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
  ezhal: "/images/apps_logos/ezhal.webp",
  ezhalShot: "/images/ezhal_shot1.webp",
  xera: "/images/apps_logos/xera.webp",
};
