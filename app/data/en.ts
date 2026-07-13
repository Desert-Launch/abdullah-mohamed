import { appImages } from "./shared";
import type { Dictionary } from "./types";

export const en: Dictionary = {
  dir: "ltr",
  nav: [
    ["Case studies", "#cases"],
    ["Experience", "#experience"],
    ["What I do", "#services"],
    ["Selected work", "#work"],
    ["About", "#about"],
    ["Contact", "#contact"],
  ],
  role: "Senior Software Engineer",
  menuLabel: "Toggle menu",
  backToTop: "Back to top",
  themeToggle: "Light",
  darkToggle: "Dark",
  langToggle: "عربي",
  palette: {
    label: "Color palette",
    options: {
      current: "Default",
      terracotta: "Terracotta",
      teal: "Teal",
      gold: "Gold",
    },
  },
  hero: {
    eyebrow:
      "Senior Software Engineer · Cairo, Egypt 🇪🇬 · Open to relocation 🌍",
    title: "I build products that ship —",
    titleAccent: "and survive production.",
    roleLine: "Senior Software Engineer · AI, Mobile & Full-Stack Products",
    tagline:
      "The engineer teams bring in when the product actually has to ship — and survive production.",
    lead: "Cairo-based senior engineer, 5+ years shipping production apps end to end. Right now I'm building Faheem — Egypt's Ministry of Education AI platform with real-time voice-to-voice tutoring and AI-generated lessons. 10+ apps live across Egypt, Germany, the UAE, and the US. Flutter, Node.js, AWS — and comfortable adapting to",
    leadEmphasis: "whatever the product needs.",
    primary: "Start a project",
    secondary: "Start a project",
    work: "See selected work",
    cv: "Download CV",
    availability: "Open to freelance, contracts, and product partnerships",
    stackLabel: "Core stack",
    stack: "Flutter + Node.js + PostgreSQL + AWS",
    socialLabel: "Find me on",
  },
  proof: [
    ["10+", "apps shipped to stores"],
    ["4 regions", "Egypt, Gulf, Europe, US"],
  ],
  proofNote: "Live on the App Store & Google Play.",
  logosLabel: "Built with teams. Shipped for real users.",
  logosIntro: "Companies I have partnered with and products I have helped take from an idea to production.",
  companiesLabel: "Companies",
  appsLabel: "Apps & products",
  caseStudiesHeading: {
    eyebrow: "Selected case studies",
    title: "Two products, from unclear problem to production.",
    body: "Not just screenshots — the problem, my role, how I built it, and what shipped.",
  },
  selectedWorkHeading: {
    eyebrow: "Selected work",
    title: "More apps and product work.",
    body: "A few of the other products I've built or materially contributed to, including shipped apps and private builds.",
  },
  selectedWorkLabels: {
    products: "products",
    productBuild: "Product build",
    appStore: "App Store",
    googlePlay: "Google Play",
  },
  caseLabels: {
    challenge: "The challenge",
    role: "My role",
    process: "How I built it",
    results: "Results",
  },
  workHeading: {
    eyebrow: "Experience and apps",
    title: "Professional roles, grouped by the products I shipped.",
    body: "Each role below shows the company context, the products I worked on there, and the engineering outcomes instead of repeating the same apps across multiple sections.",
  },
  freelanceHeading: {
    eyebrow: "Independent and freelance work",
    title: "Standalone products and platforms.",
    body: "These projects were built outside the main employment timeline or as separate product engagements.",
  },
  servicesHeading: {
    eyebrow: "Services",
    title: "What clients usually hire me to handle.",
    body: "The value is not only writing code. It is turning unclear product needs into shipped systems with fewer moving parts.",
  },
  stackHeading: {
    eyebrow: "Stack",
    title: "Tools I use when the product has to survive production.",
  },
  plansHeading: {
    eyebrow: "Engagement plans",
    title: "Simple offers for different stages.",
  },
  testimonialsHeading: {
    eyebrow: "What people say",
    title: "Feedback from teams and clients.",
    body: "Real words from people I have shipped with.",
  },
  caseStudies: [
    {
      slug: "faheem",
      title: "Faheem",
      type: "Arabic AI tutoring platform",
      context: "Appenza Studio · product team",
      image: appImages.faheem,
      summary:
        "The core of an Arabic-first AI tutor now used by 20,000+ K-12 students.",
      challenge:
        "Students needed tutoring that felt live and trustworthy in Arabic — real-time answers, voice, and visuals — not a generic chatbot bolted onto a form.",
      role: "Core engineer on the realtime tutoring layer and the app architecture the rest of the product is built on.",
      process: [
        "Built realtime AI tutoring over WebSocket with Azure OpenAI streaming so answers arrive token by token.",
        "Shipped a voice tutor with STT/TTS and an AI board that generates educational visuals on the fly.",
        "Structured 16 modules in clean architecture with localization, analytics, Crashlytics, FCM, and multi-environment builds.",
      ],
      results: [
        { value: "20,000+", label: "K-12 students" },
        { value: "16", label: "clean-architecture modules" },
        { value: "Realtime", label: "voice + chat tutoring" },
      ],
      stack: [
        "Flutter",
        "Azure OpenAI",
        "WebSocket",
        "Firebase",
        "Clean Architecture",
      ],
    },
    {
      slug: "jaweb",
      title: "Jaweb",
      type: "Competitive trivia game",
      context: "Independent build · sole engineer",
      image: appImages.jaweb,
      shots: [
        "/images/jaweb1.webp",
        "/images/jaweb2.webp",
        "/images/jaweb3.webp",
      ],
      summary:
        "A living-room trivia night turned into a fair, automated product with payments.",
      challenge:
        "Turn an informal two-team quiz game into a product that referees itself, scores fairly, and takes payment — without a human host keeping track.",
      role: "Sole engineer. Designed and built the whole app from scratch.",
      process: [
        "Modeled two teams, six categories, and three difficulty levels with referee logic that enforces the rules.",
        "Automated scoring so a full match runs without a human keeping score.",
        "Integrated My Fatoorah payments and packaged it on a clean-architecture Flutter codebase.",
      ],
      results: [
        { value: "6", label: "categories" },
        { value: "3", label: "difficulty levels" },
        { value: "Automatic", label: "referee + scoring" },
      ],
      stack: ["Flutter", "Clean Architecture", "My Fatoorah", "Payments"],
    },
  ],
  selectedWork: [
    {
      key: "voicers",
      title: "Voicers",
      tagline:
        "Unpublished bilingual social audio platform for creators, VNotes, playlists, competitions, and audience engagement.",
      image: appImages.voicers,
    },
    {
      key: "imox",
      title: "IMOX",
      tagline:
        "Video-first social shopping — sellers post reels, buyers check out in-feed.",
      image: appImages.imox,
    },
    {
      key: "yolo",
      title: "YOLO",
      tagline:
        "Clinic operations: patients, appointments, inventory, and billing in one app.",
      image: appImages.yolo,
    },
    {
      key: "xera",
      title: "Xera Lab",
      tagline:
        "Full-stack dental case management platform — customer portal, admin dashboard, and Node.js API. Built and delivered to the client.",
      image: appImages.xera,
    },
    {
      key: "fastap",
      title: "FasTap",
      tagline:
        "Tap an NFC card to share a full profile — opens on any phone, no install.",
      image: appImages.fastap,
    },
    {
      key: "btc",
      title: "BTC",
      tagline:
        "Storefront + B2B wholesale ordering for a major gold & jewelry house.",
      image: appImages.btc,
    },
    {
      key: "qfight",
      title: "Q-Fight Gym",
      tagline:
        "Official app for a professional Muay Thai gym in Qatar, coached by Thai world-title fighters.",
      image: appImages.qfight,
    },
    {
      key: "almuslim",
      title: "Al-Muslim",
      tagline:
        "A daily Muslim companion: Quran, adhkar & duas, accurate prayer times, and qibla — with smart reminders.",
      image: appImages.almuslim,
    },
  ],
  experiences: [
    {
      date: "Feb 2025 - Present",
      role: "Senior Software Engineer",
      company: "Appenza Studio",
      location: "Full-time · Egypt",
      logo: "/images/company_logos/appenza.webp",
      summary:
        "Building the core of Faheem, an Arabic AI tutoring product used by 20,000+ K-12 students.",
      achievements: [
        "Developed realtime AI tutoring over WebSocket with Azure OpenAI streaming.",
        "Built voice tutor flows with STT/TTS and an AI board for generated educational visuals.",
        "Implemented clean architecture across 16 modules with localization, analytics, Crashlytics, FCM, and multi-environment builds.",
      ],
      apps: [
        {
          title: "Faheem",
          type: "AI education platform",
          image: appImages.faheem,
          body: "Arabic tutoring app with AI chat, voice tutor, smart quizzes, solve-by-camera, educational visuals, wallet, points, onboarding, and RTL UX.",
          stack: [
            "Flutter",
            "Azure OpenAI",
            "WebSocket",
            "Firebase",
            "Clean Architecture",
          ],
          metrics: [
            { value: "20,000+", label: "K-12 students" },
            { value: "16", label: "modules shipped" },
            { value: "Realtime", label: "voice + chat AI" },
          ],
        },
        {
          title: "Talia",
          type: "Multi-tenant school platform",
          image: appImages.talia,
          body: "Multi-tenant K-12 school management platform for national education ministries. Building the React/SvelteKit web client with client-side role-based access across school, multi-school, and ministry scopes; under evaluation by the education ministries of Egypt, Qatar, and Libya.",
          stack: ["React", "SvelteKit", "TypeScript", "Tailwind CSS", "RBAC"],
        },
        {
          title: "BTC",
          type: "Gold & jewelry commerce app",
          image: appImages.btc,
          body: "Commerce app for one of Egypt's largest gold and jewelry houses. Built the customer storefront and B2B merchant wholesale-ordering apps from a single shared Flutter codebase over a GraphQL API.",
          stack: [
            "Flutter",
            "GraphQL",
            "Multi-app",
            "E-commerce",
            "Clean Architecture",
          ],
        },
      ],
    },
    {
      date: "Sep 2024 - Jan 2025",
      role: "Software Engineer",
      company: "Dib GmbH",
      location: "Full-time · Germany remote",
      logo: "/images/company_logos/dibhoalding.webp",
      summary:
        "Worked on social commerce and clinic management products across Egypt, Germany, and UAE deployments.",
      achievements: [
        "Optimized startup and reels performance with lazy initialization, caching, and pagination prefetching.",
        "Migrated deep linking from Firebase to Airbridge and implemented Mixpanel events and funnels.",
        "Reduced YOLO app size from 86 MB to 51 MB and shipped 10+ client-requested features.",
      ],
      apps: [
        {
          title: "IMOX",
          type: "Social e-commerce",
          image: appImages.imox,
          body: "Video-first shopping app where sellers publish products as short reels and buyers shop through social content.",
          stack: ["Flutter", "Airbridge", "Mixpanel", "Caching", "Deep Links"],
        },
        {
          title: "YOLO",
          type: "Clinic management system",
          image: appImages.yolo,
          body: "Clinic operations product covering HR, doctors, patients, appointments, inventory, billing, and multi-region feature delivery.",
          stack: ["Flutter", "Healthcare", "Optimization", "Multi-region"],
          metrics: [
            { value: "86 → 51 MB", label: "app size cut" },
            { value: "10+", label: "features shipped" },
          ],
        },
      ],
    },
    {
      date: "Nov 2023 - Feb 2025",
      role: "Software Engineer",
      company: "Revealsite",
      location: "Part-time · United States remote",
      logo: "/images/company_logos/revearsite.webp",
      summary:
        "Built and maintained white-label Flutter apps for independent and community pharmacies in the US.",
      achievements: [
        "Delivered refill, transfer, appointment, reminder, medication-history, and patient messaging workflows.",
        "Worked on one shared codebase provisioned by client ID with runtime branding and offline-first caching.",
        "Integrated OTP/JWT auth, request tracking, notifications, Google Maps links, and healthcare-focused flows.",
      ],
      apps: [
        {
          title: "RevealSite Platform",
          type: "White-label pharmacy platform",
          image: appImages.revealsite,
          body: "Shared pharmacy engagement platform powering branded patient apps with refills, transfers, appointments, reminders, and two-way messaging.",
          stack: ["Flutter", "Django REST", "JWT", "Hive", "Runtime branding"],
        },
        {
          title: "J&D Pharmacy",
          type: "Patient app",
          image: appImages.jd,
          body: "Neighborhood pharmacy app with OTP auth, guest refill checkout, prescription transfer, appointments, medication history, reminders, and health news.",
          stack: ["Flutter", "BLoC", "Dio", "Hive", "JWT"],
        },
        {
          title: "Medical Compounding Pharmacy",
          type: "Patient app",
          image: appImages.medical,
          body: "Compounding pharmacy app with pickup/delivery refills, prescription transfers, reminders, appointments, HIPAA consent, and secure request routing.",
          stack: ["Flutter", "Clean Architecture", "BLoC", "Hive"],
        },
        {
          title: "Quick RX",
          type: "Specialty pharmacy app",
          image: appImages.quickrx,
          body: "Specialty pharmacy app for refills, profile transfers, appointments, medication reminders, request tracking, and secure OTP/JWT authentication.",
          stack: ["Flutter", "Dio", "Hive", "Notifications", "JWT"],
        },
        {
          title: "Holland Discount Pharmacy",
          type: "Patient app",
          image: appImages.holland,
          body: "Independent pharmacy app with delivery/pickup refills, transfers, reminders, appointments, health news, and secure request routing.",
          stack: ["Flutter", "Clean Architecture", "BLoC", "Hive"],
        },
      ],
    },
    {
      date: "Apr 2023 - Sep 2024",
      role: "Software Engineer",
      company: "Zeyada",
      location: "Full-time",
      logo: "/images/company_logos/zeyada.webp",
      summary:
        "Worked on school management features for payments, chat, parent communication, and in-app commerce.",
      achievements: [
        "Built realtime 1-to-1 and group chat with mute, block, clear, and moderation controls.",
        "Integrated PayTabs for school fee payments.",
        "Implemented Guardsquare shielding and Magento GraphQL integration for the school store.",
      ],
      apps: [
        {
          title: "Zeyada School Management",
          type: "School operations app",
          image: appImages.zeyada,
          body: "School app for payments, realtime communication, parent-school workflows, protected builds, and store integration.",
          stack: ["Flutter", "PayTabs", "GraphQL", "Guardsquare", "Magento"],
        },
      ],
    },
  ],
  freelanceProjects: [
    {
      title: "Al-Muslim",
      type: "Islamic daily companion",
      image: appImages.almuslim,
      body: "A daily Muslim companion for reading the Quran, adhkar, and duas, with accurate prayer times, qibla direction, and smart reminders.",
      stack: ["Flutter", "REST API", "Notifications", "Geolocation"],
    },
    {
      title: "Q-Fight Gym",
      type: "Muay Thai gym app",
      image: appImages.qfight,
      body: "The official app for a professional Muay Thai gym in Qatar, connecting members with a training program led by Thai world-title fighters.",
      stack: ["Flutter", "Clean Architecture", "Firebase", "Payments"],
    },
    {
      title: "Jaweb",
      type: "Interactive quiz game",
      image: appImages.jaweb,
      shots: [
        "/images/jaweb1.webp",
        "/images/jaweb2.webp",
        "/images/jaweb3.webp",
      ],
      body: "Competitive trivia product built from scratch with two teams, six categories, three difficulty levels, referee logic, automatic scoring, and My Fatoorah payments.",
      stack: ["Flutter", "Clean Architecture", "My Fatoorah", "Payments"],
      metrics: [
        { value: "6", label: "categories" },
        { value: "3", label: "difficulty levels" },
        { value: "Auto", label: "referee + scoring" },
      ],
    },
    {
      title: "FasTap",
      type: "NFC digital business card",
      image: appImages.fastap,
      shots: [
        "/images/fastab1.webp",
        "/images/fastab2.webp",
        "/images/fastab3.webp",
      ],
      body: "Flutter app that writes profiles to NFC cards, plus a Flutter Web profile page opened from tap-to-share links and deployed with Firebase and Nginx.",
      stack: ["Flutter", "Flutter Web", "Firebase", "NFC", "Nginx"],
      metrics: [
        { value: "1 tap", label: "to share a profile" },
        { value: "App + Web", label: "single build" },
      ],
    },
    {
      title: "Xera Lab",
      type: "Dental case management platform",
      image: appImages.xera,
      body: "Customer portal, admin dashboard, Node.js backend, PostgreSQL database, JWT role access, AWS S3 uploads, Docker Compose, and Nginx deployment.",
      stack: ["Flutter Web", "Node.js", "PostgreSQL", "Docker", "AWS"],
    },
    {
      title: "Ezhal",
      type: "Multi-tenant car-service platform",
      image: appImages.ezhal,
      shots: [appImages.ezhalShot],
      body: "Three role-specific Flutter apps for customers, employees, and managers with booking, live technician tracking, wallet, points, stamps, subscriptions, and Apple Wallet passes.",
      stack: [
        "Flutter",
        "Riverpod",
        "MyFatoorah",
        "Stripe",
        "Firebase",
        "Apple PassKit",
      ],
      metrics: [
        { value: "3 apps", label: "one codebase" },
        { value: "Live", label: "technician tracking" },
      ],
    },
    {
      title: "Ofoq",
      type: "Saudi home-services app",
      body: "On-demand home-services app for browsing services, scheduling bookings, worker matching, request management, and Firebase-backed realtime flows.",
      stack: ["Flutter", "Firebase", "REST API", "Realtime"],
    },
  ],
  services: [
    {
      title: "Real-time AI features",
      body: "Streaming AI chat, voice tutors (STT/TTS), and generated content wired into your product over WebSocket — the way Faheem serves 20,000+ students live.",
    },
    {
      title: "Flutter apps, end-to-end",
      body: "iOS + Android from one clean-architecture codebase: auth, payments, analytics, push, offline, and the store release — not just screens.",
    },
    {
      title: "AI product builds (idea → store)",
      body: "The whole path from unclear idea to a live app: backend APIs, database, deployment pipeline, and a product that survives production.",
    },
  ],
  plans: [
    {
      name: "Audit",
      fit: "For existing products",
      body: "A focused review of architecture, performance, UX, and deployment risks.",
      items: [
        "Code and system review",
        "Priority fixes list",
        "Technical direction call",
      ],
    },
    {
      name: "Launch",
      fit: "For new MVPs",
      body: "A production-ready slice that proves the product and gives you something real to ship.",
      featured: true,
      items: [
        "Mobile or web app",
        "Backend and database",
        "Deploy and handoff docs",
      ],
    },
    {
      name: "Partner",
      fit: "For ongoing delivery",
      body: "Senior engineering capacity for teams that need continuous product movement.",
      items: [
        "Roadmap execution",
        "Maintenance and scaling",
        "Weekly delivery rhythm",
      ],
    },
  ],
  testimonials: [
    {
      sample: true,
      quote:
        "Replace this with a real quote from a client or teammate — one or two sentences on what you shipped and the result. Ask them to name a concrete outcome.",
      name: "Client or teammate name",
      role: "Role · Company",
    },
    {
      sample: true,
      quote:
        "A second short quote works well here. Specifics beat praise: “cut our release time in half”, “app finally stable in production”, “handled the whole build solo.”",
      name: "Client or teammate name",
      role: "Role · Company",
    },
  ],
  about: {
    eyebrow: "About",
    title: "I build products that have to survive real users.",
    paragraphs: [
      "I'm a senior software engineer working across AI features, Flutter apps, backend APIs, and the deployment pipelines that keep them running. Most of my work is the part teams underestimate: turning an unclear idea into something that actually ships and holds up in production.",
      "Over the last few years I've put 10+ apps into stores across four regions, usually owning a feature from architecture through release. I care about clarity, momentum, and code the next engineer can maintain without a map.",
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Need a product built, fixed, or launched?",
    body: "Send me the product, deadline, and what is currently blocking you. I’ll reply with the next practical step.",
    book: "Book a call",
    form: {
      name: "Your name",
      email: "Your email",
      message: "What do you need built, fixed, or launched?",
      send: "Send message",
      directLabel: "Or reach me directly",
    },
  },
};
