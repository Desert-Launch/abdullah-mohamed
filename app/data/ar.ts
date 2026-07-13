import { appImages } from "./shared";
import type { Dictionary } from "./types";

export const ar: Dictionary = {
  dir: "rtl",
  nav: [
    ["دراسات حالة", "#cases"],
    ["الخبرات", "#experience"],
    ["ماذا أقدّم", "#services"],
    ["أعمال مختارة", "#work"],
    ["نبذة", "#about"],
    ["تواصل", "#contact"],
  ],
  role: "مهندس برمجيات أول",
  menuLabel: "فتح القائمة",
  backToTop: "العودة إلى الأعلى",
  themeToggle: "فاتح",
  darkToggle: "داكن",
  langToggle: "EN",
  palette: {
    label: "لوحة الألوان",
    options: {
      current: "افتراضي",
      terracotta: "تراكوتا",
      teal: "تركوازي",
      gold: "ذهبي",
    },
  },
  hero: {
    eyebrow: "مهندس برمجيات أول · القاهرة، مصر 🇪🇬 · متاح للانتقال 🌍",
    title: "أبني منتجات تُطلَق —",
    titleAccent: "وتصمد في الإنتاج.",
    roleLine: "مهندس برمجيات أول · منتجات ذكاء اصطناعي، موبايل، وفل-ستاك",
    tagline:
      "المهندس الذي تستعين به الفرق عندما يجب أن يُطلق المنتج فعلاً — ويصمد في الإنتاج.",
    lead: "مهندس برمجيات أول من القاهرة، أكثر من 5+ سنوات في بناء وإطلاق تطبيقات إنتاجية من البداية للنهاية. أعمل حاليًا على فهيم — منصّة الذكاء الاصطناعي لوزارة التربية والتعليم المصرية، بتدريس صوتي فوري ودروس مولّدة بالذكاء الاصطناعي. أكثر من 10+ تطبيقات منشورة في مصر وألمانيا والإمارات والولايات المتحدة. Flutter وNode.js وAWS — ومستعد للتكيّف مع",
    leadEmphasis: "ما يحتاجه المنتج مهما كان.",
    primary: "لنبدأ مشروعًا",
    secondary: "ابدأ مشروعاً",
    work: "شاهد أعمالًا مختارة",
    cv: "تحميل السيرة الذاتية",
    availability: "متاح للفريلانس، العقود، والشراكات التقنية",
    stackLabel: "التقنيات الأساسية",
    stack: "Flutter + Node.js + PostgreSQL + AWS",
    socialLabel: "تابعني على",
  },
  proof: [
    ["10+", "تطبيقات تم إطلاقها على المتاجر"],
    ["4 مناطق", "مصر، الخليج، أوروبا، أمريكا"],
  ],
  proofNote: "متاح على App Store و Google Play.",
  logosLabel: "بُنيت مع فرق. وأُطلقت لمستخدمين حقيقيين.",
  logosIntro: "شركات تعاونت معها ومنتجات ساهمت في تحويلها من فكرة إلى منتج فعلي.",
  companiesLabel: "الشركات",
  appsLabel: "التطبيقات والمنتجات",
  caseStudiesHeading: {
    eyebrow: "دراسات حالة مختارة",
    title: "منتجان، من مشكلة غير واضحة إلى الإنتاج.",
    body: "ليست مجرد صور — المشكلة، دوري، كيف بنيته، وما الذي تم إطلاقه.",
  },
  selectedWorkHeading: {
    eyebrow: "أعمال مختارة",
    title: "تطبيقات ومنتجات أخرى.",
    body: "بعض المنتجات التي بنيتها أو ساهمت فيها بشكل فعلي، بين تطبيقات منشورة ومشاريع خاصة.",
  },
  selectedWorkLabels: {
    products: "منتجات",
    productBuild: "منتج رقمي",
    appStore: "App Store",
    googlePlay: "Google Play",
  },
  caseLabels: {
    challenge: "التحدي",
    role: "دوري",
    process: "كيف بنيته",
    results: "النتائج",
  },
  workHeading: {
    eyebrow: "الخبرات والتطبيقات",
    title: "كل خبرة مرتبطة بالمنتجات التي عملت عليها.",
    body: "بدلاً من تكرار نفس التطبيقات في أكثر من مكان، كل شركة تعرض السياق، المنتجات، والنتائج الهندسية الخاصة بها.",
  },
  freelanceHeading: {
    eyebrow: "مشاريع مستقلة وفريلانس",
    title: "منتجات ومنصات خارج الخبرات الأساسية.",
    body: "هذه المشاريع تم تنفيذها كأعمال مستقلة أو ارتباطات منفصلة عن خط الخبرة الوظيفية الرئيسي.",
  },
  servicesHeading: {
    eyebrow: "الخدمات",
    title: "ما الذي يطلبه العملاء مني عادة.",
    body: "القيمة ليست كتابة كود فقط. القيمة في تحويل احتياج غير واضح إلى نظام يتم إطلاقه بأقل تعقيد ممكن.",
  },
  stackHeading: {
    eyebrow: "التقنيات",
    title: "أدوات أستخدمها عندما يجب أن ينجو المنتج في الإنتاج.",
  },
  plansHeading: {
    eyebrow: "باقات التعاون",
    title: "عروض واضحة لمراحل مختلفة.",
  },
  testimonialsHeading: {
    eyebrow: "ماذا يقولون",
    title: "آراء من فرق وعملاء عملت معهم.",
    body: "كلمات حقيقية من أشخاص شحنت معهم منتجات.",
  },
  caseStudies: [
    {
      slug: "faheem",
      title: "فهيم",
      type: "منصة تعليم عربية بالذكاء الاصطناعي",
      context: "Appenza Studio · ضمن الفريق",
      image: appImages.faheem,
      summary:
        "قلب مدرّس عربي بالذكاء الاصطناعي يستخدمه الآن أكثر من 20,000 طالب K-12.",
      challenge:
        "الطلاب احتاجوا تدريساً يبدو حياً وموثوقاً بالعربية — إجابات فورية، صوت، وصور — وليس روبوت محادثة عام مركّب على نموذج.",
      role: "مهندس أساسي على طبقة التدريس الفورية والبنية التي بُني عليها باقي المنتج.",
      process: [
        "بناء تدريس AI فوري عبر WebSocket مع Azure OpenAI streaming بحيث تصل الإجابة كلمة بكلمة.",
        "إطلاق مدرّس صوتي بـ STT/TTS ولوحة AI تولّد صوراً تعليمية لحظياً.",
        "هيكلة 16 موديول بـ Clean Architecture مع التعريب، التحليلات، Crashlytics، FCM، وبيئات متعددة.",
      ],
      results: [
        { value: "+20,000", label: "طالب K-12" },
        { value: "16", label: "موديول ببنية نظيفة" },
        { value: "فوري", label: "تدريس صوت + محادثة" },
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
      type: "لعبة مسابقات تنافسية",
      context: "مشروع مستقل · المهندس الوحيد",
      image: appImages.jaweb,
      shots: [
        "/images/jaweb1.webp",
        "/images/jaweb2.webp",
        "/images/jaweb3.webp",
      ],
      summary:
        "أمسية مسابقات عائلية تحوّلت إلى منتج عادل ذاتي التحكيم مع مدفوعات.",
      challenge:
        "تحويل لعبة مسابقات غير رسمية بفريقين إلى منتج يحكّم نفسه، يحسب النقاط بعدل، ويستقبل المدفوعات — دون مقدّم بشري يتابع.",
      role: "المهندس الوحيد. صممت وبنيت التطبيق بالكامل من الصفر.",
      process: [
        "نمذجة فريقين، ست تصنيفات، وثلاثة مستويات صعوبة مع منطق حكم يفرض القواعد.",
        "أتمتة حساب النقاط بحيث تُدار المباراة كاملة دون متابعة بشرية.",
        "دمج مدفوعات My Fatoorah وتغليف كل ذلك على كود Flutter بـ Clean Architecture.",
      ],
      results: [
        { value: "6", label: "تصنيفات" },
        { value: "3", label: "مستويات صعوبة" },
        { value: "تلقائي", label: "حكم + حساب نقاط" },
      ],
      stack: ["Flutter", "Clean Architecture", "My Fatoorah", "Payments"],
    },
  ],
  selectedWork: [
    {
      key: "voicers",
      title: "Voicers",
      tagline:
        "منصة صوت اجتماعية ثنائية اللغة غير منشورة لصناع المحتوى، VNotes، القوائم، المسابقات، وتفاعل الجمهور.",
      image: appImages.voicers,
    },
    {
      key: "imox",
      title: "IMOX",
      tagline:
        "تسوق اجتماعي بالفيديو — البائع ينشر ريلز والمشتري يشتري من الفيد.",
      image: appImages.imox,
    },
    {
      key: "yolo",
      title: "YOLO",
      tagline: "عمليات العيادات: مرضى، مواعيد، مخزون، وفواتير في تطبيق واحد.",
      image: appImages.yolo,
    },
    {
      key: "xera",
      title: "Xera Lab",
      tagline:
        "منصة إدارة حالات أسنان متكاملة — بوابة عملاء، لوحة إدارة، و Node.js API. بُنيت وسُلّمت للعميل.",
      image: appImages.xera,
    },
    {
      key: "fastap",
      title: "FasTap",
      tagline: "المس كارت NFC لمشاركة ملف كامل — يفتح على أي هاتف بلا تثبيت.",
      image: appImages.fastap,
    },
    {
      key: "btc",
      title: "BTC",
      tagline: "متجر عملاء + طلبات جملة B2B لأحد كبار بيوت الذهب والمجوهرات.",
      image: appImages.btc,
    },
    {
      key: "qfight",
      title: "Q-Fight Gym",
      tagline:
        "التطبيق الرسمي لصالة مواي تاي احترافية في قطر، بتدريب أبطال تايلانديين حاصلين على ألقاب عالمية.",
      image: appImages.qfight,
    },
    {
      key: "almuslim",
      title: "المسلم",
      tagline:
        "رفيق المسلم اليومي: القرآن الكريم، الأذكار والأدعية، مواقيت صلاة دقيقة، واتجاه القبلة مع تذكيرات ذكية.",
      image: appImages.almuslim,
    },
  ],
  experiences: [
    {
      date: "فبراير 2025 - الآن",
      role: "مهندس برمجيات أول",
      company: "Appenza Studio",
      location: "دوام كامل · مصر",
      logo: "/images/company_logos/appenza.webp",
      summary:
        "بناء قلب فهيم، منتج تعليمي عربي بالذكاء الاصطناعي يستخدمه أكثر من 20,000 طالب.",
      achievements: [
        "تطوير محادثة AI فورية عبر WebSocket باستخدام Azure OpenAI streaming.",
        "بناء تدفقات مدرس صوتي STT/TTS ولوحة AI للصور التعليمية المولدة.",
        "تنفيذ Clean Architecture عبر 16 موديول مع RTL، تحليلات، Crashlytics، FCM، وبيئات متعددة.",
      ],
      apps: [
        {
          title: "فهيم",
          type: "منصة تعليم بالذكاء الاصطناعي",
          image: appImages.faheem,
          body: "تطبيق تعليمي عربي يحتوي على AI chat، مدرس صوتي، اختبارات ذكية، solve-by-camera، صور تعليمية، محفظة، نقاط، onboarding، وتجربة RTL.",
          stack: [
            "Flutter",
            "Azure OpenAI",
            "WebSocket",
            "Firebase",
            "Clean Architecture",
          ],
          metrics: [
            { value: "+20,000", label: "طالب K-12" },
            { value: "16", label: "موديول" },
            { value: "فوري", label: "صوت + محادثة AI" },
          ],
        },
        {
          title: "Talia",
          type: "منصة إدارة مدارس متعددة المستأجرين",
          image: appImages.talia,
          body: "منصة إدارة مدارس K-12 متعددة المستأجرين لوزارات التعليم. بناء واجهة الويب بـ React/SvelteKit مع صلاحيات وصول حسب الدور على مستوى المدرسة، مجموعة المدارس، والوزارة؛ تحت التقييم من وزارات التعليم في مصر، قطر، وليبيا.",
          stack: ["React", "SvelteKit", "TypeScript", "Tailwind CSS", "RBAC"],
        },
        {
          title: "BTC",
          type: "تطبيق تجارة ذهب ومجوهرات",
          image: appImages.btc,
          body: "تطبيق تجاري لواحدة من أكبر بيوت الذهب والمجوهرات في مصر. بناء متجر العملاء وتطبيق تجار الجملة (B2B) من كود Flutter واحد مشترك عبر GraphQL API.",
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
      date: "سبتمبر 2024 - يناير 2025",
      role: "مهندس برمجيات",
      company: "Dib GmbH",
      location: "دوام كامل · ألمانيا عن بعد",
      logo: "/images/company_logos/dibhoalding.webp",
      summary:
        "العمل على منتجات تجارة اجتماعية وعمليات عيادات عبر مصر، ألمانيا، والإمارات.",
      achievements: [
        "تحسين بدء التشغيل وأداء الريلز باستخدام lazy initialization والكاشينج و pagination prefetch.",
        "نقل Deep Linking من Firebase إلى Airbridge وتنفيذ Mixpanel events/funnels.",
        "تقليل حجم YOLO من 86 MB إلى 51 MB وشحن أكثر من 10 مميزات للعميل.",
      ],
      apps: [
        {
          title: "IMOX",
          type: "تجارة اجتماعية",
          image: appImages.imox,
          body: "تطبيق تسوق بالفيديو حيث ينشر البائعون المنتجات كريلز ويتسوق المشترون من محتوى قصير.",
          stack: ["Flutter", "Airbridge", "Mixpanel", "Caching", "Deep Links"],
        },
        {
          title: "YOLO",
          type: "نظام إدارة عيادات",
          image: appImages.yolo,
          body: "منتج عمليات عيادات يغطي HR، الأطباء، المرضى، المواعيد، المخزون، الفواتير، وتسليم مميزات لمناطق متعددة.",
          stack: ["Flutter", "Healthcare", "Optimization", "Multi-region"],
          metrics: [
            { value: "86 ← 51 MB", label: "تقليل حجم التطبيق" },
            { value: "+10", label: "مميزات مشحونة" },
          ],
        },
      ],
    },
    {
      date: "نوفمبر 2023 - فبراير 2025",
      role: "مهندس برمجيات",
      company: "Revealsite",
      location: "دوام جزئي · أمريكا عن بعد",
      logo: "/images/company_logos/revearsite.webp",
      summary:
        "بناء وصيانة تطبيقات Flutter White-label لصيدليات مستقلة ومجتمعية في أمريكا.",
      achievements: [
        "تنفيذ إعادة الصرف، تحويل الوصفات، المواعيد، التذكيرات، تاريخ الأدوية، ومراسلة المرضى.",
        "العمل على كود واحد مشترك يتم تهيئته حسب client ID مع runtime branding و offline-first caching.",
        "دمج OTP/JWT auth، تتبع الطلبات، الإشعارات، Google Maps links، وتدفقات صحية مخصصة.",
      ],
      apps: [
        {
          title: "RevealSite Platform",
          type: "منصة صيدليات White-label",
          image: appImages.revealsite,
          body: "منصة صيدليات مشتركة تشغل تطبيقات مرضى ببراندات مختلفة مع إعادة صرف، تحويل وصفات، مواعيد، تذكيرات، ومراسلة.",
          stack: ["Flutter", "Django REST", "JWT", "Hive", "Runtime branding"],
        },
        {
          title: "J&D Pharmacy",
          type: "تطبيق مرضى",
          image: appImages.jd,
          body: "تطبيق صيدلية محلية يشمل OTP auth، guest refills، تحويل وصفات، مواعيد، تاريخ أدوية، تذكيرات، وأخبار صحية.",
          stack: ["Flutter", "BLoC", "Dio", "Hive", "JWT"],
        },
        {
          title: "Medical Compounding Pharmacy",
          type: "تطبيق مرضى",
          image: appImages.medical,
          body: "تطبيق صيدلية مركبة لإعادة الصرف بالاستلام أو التوصيل، تحويل الوصفات، التذكيرات، المواعيد، HIPAA consent، وتوجيه آمن للطلبات.",
          stack: ["Flutter", "Clean Architecture", "BLoC", "Hive"],
        },
        {
          title: "Quick RX",
          type: "تطبيق صيدلية متخصصة",
          image: appImages.quickrx,
          body: "تطبيق لإعادة الصرف، تحويل الملف والوصفات، المواعيد، تذكيرات الأدوية، تتبع الطلبات، وتسجيل آمن OTP/JWT.",
          stack: ["Flutter", "Dio", "Hive", "Notifications", "JWT"],
        },
        {
          title: "Holland Discount Pharmacy",
          type: "تطبيق مرضى",
          image: appImages.holland,
          body: "تطبيق صيدلية مستقلة مع إعادة صرف، توصيل أو استلام، تحويل وصفات، تذكيرات، مواعيد، أخبار صحية، وتوجيه آمن للطلبات.",
          stack: ["Flutter", "Clean Architecture", "BLoC", "Hive"],
        },
      ],
    },
    {
      date: "أبريل 2023 - سبتمبر 2024",
      role: "مهندس برمجيات",
      company: "Zeyada",
      location: "دوام كامل",
      logo: "/images/company_logos/zeyada.webp",
      summary:
        "العمل على مزايا إدارة مدارس للمدفوعات، المحادثات، التواصل مع أولياء الأمور، والتجارة داخل التطبيق.",
      achievements: [
        "بناء محادثات فورية فردية وجماعية مع mute و block و clear وأدوات تحكم.",
        "دمج PayTabs لمدفوعات المصروفات المدرسية.",
        "تنفيذ Guardsquare shielding وتكامل Magento GraphQL للمتجر المدرسي.",
      ],
      apps: [
        {
          title: "Zeyada School Management",
          type: "تطبيق إدارة مدارس",
          image: appImages.zeyada,
          body: "تطبيق مدارس للمدفوعات، التواصل الفوري، تدفقات أولياء الأمور، حماية الإصدارات، وتكامل المتجر.",
          stack: ["Flutter", "PayTabs", "GraphQL", "Guardsquare", "Magento"],
        },
      ],
    },
  ],
  freelanceProjects: [
    {
      title: "المسلم",
      type: "رفيق إسلامي يومي",
      image: appImages.almuslim,
      body: "رفيق يومي لقراءة القرآن الكريم والأذكار والأدعية، مع مواقيت صلاة دقيقة، اتجاه القبلة، وتذكيرات ذكية.",
      stack: ["Flutter", "REST API", "Notifications", "Geolocation"],
    },
    {
      title: "Q-Fight Gym",
      type: "تطبيق صالة مواي تاي",
      image: appImages.qfight,
      body: "التطبيق الرسمي لصالة مواي تاي احترافية في قطر، يربط الأعضاء ببرنامج تدريبي يقوده أبطال تايلانديون حاصلون على ألقاب عالمية.",
      stack: ["Flutter", "Clean Architecture", "Firebase", "Payments"],
    },
    {
      title: "Jaweb",
      type: "لعبة مسابقات تفاعلية",
      image: appImages.jaweb,
      shots: [
        "/images/jaweb1.webp",
        "/images/jaweb2.webp",
        "/images/jaweb3.webp",
      ],
      body: "منتج مسابقات تنافسي تم بناؤه من الصفر بفرق، تصنيفات، مستويات صعوبة، منطق حكم، حساب نقاط تلقائي، ومدفوعات My Fatoorah.",
      stack: ["Flutter", "Clean Architecture", "My Fatoorah", "Payments"],
      metrics: [
        { value: "6", label: "تصنيفات" },
        { value: "3", label: "مستويات صعوبة" },
        { value: "تلقائي", label: "حكم + حساب نقاط" },
      ],
    },
    {
      title: "FasTap",
      type: "كارت أعمال رقمي NFC",
      image: appImages.fastap,
      shots: [
        "/images/fastab1.webp",
        "/images/fastab2.webp",
        "/images/fastab3.webp",
      ],
      body: "تطبيق Flutter يكتب ملفات المستخدم على كروت NFC مع صفحة Flutter Web تفتح عند المسح ونشر Firebase و Nginx.",
      stack: ["Flutter", "Flutter Web", "Firebase", "NFC", "Nginx"],
      metrics: [
        { value: "نقرة واحدة", label: "لمشاركة الملف" },
        { value: "تطبيق + ويب", label: "بناء واحد" },
      ],
    },
    {
      title: "Xera Lab",
      type: "منصة إدارة حالات أسنان",
      image: appImages.xera,
      body: "بوابة عملاء، لوحة إدارة، باك إند Node.js، قاعدة PostgreSQL، صلاحيات JWT، رفع إلى AWS S3، ونشر Docker Compose و Nginx.",
      stack: ["Flutter Web", "Node.js", "PostgreSQL", "Docker", "AWS"],
    },
    {
      title: "Ezhal",
      image: appImages.ezhal,
      shots: [appImages.ezhalShot],
      type: "منصة خدمات سيارات متعددة المستأجرين",
      body: "ثلاثة تطبيقات Flutter للعملاء والموظفين والمديرين مع حجز، تتبع مباشر، محفظة، نقاط، أختام، اشتراكات، و Apple Wallet passes.",
      stack: [
        "Flutter",
        "Riverpod",
        "MyFatoorah",
        "Stripe",
        "Firebase",
        "Apple PassKit",
      ],
      metrics: [
        { value: "3 تطبيقات", label: "كود واحد" },
        { value: "مباشر", label: "تتبع الفني" },
      ],
    },
    {
      title: "Ofoq",
      type: "تطبيق خدمات منزلية للسعودية",
      body: "تطبيق خدمات منزلية عند الطلب لتصفح الخدمات، جدولة الحجوزات، مطابقة العاملين، إدارة الطلبات، وتدفقات فورية عبر Firebase.",
      stack: ["Flutter", "Firebase", "REST API", "Realtime"],
    },
  ],
  services: [
    {
      title: "مزايا ذكاء اصطناعي فورية",
      body: "محادثة AI بالبث، مدرّس صوتي (STT/TTS)، ومحتوى مولّد مدمج في منتجك عبر WebSocket — كما يخدم فهيم أكثر من 20,000 طالب مباشرة.",
    },
    {
      title: "تطبيقات Flutter من البداية للنهاية",
      body: "iOS و Android من كود واحد ببنية نظيفة: تسجيل دخول، مدفوعات، تحليلات، إشعارات، أوفلاين، وإطلاق على المتجر — وليس مجرد واجهات.",
    },
    {
      title: "بناء منتجات AI (من الفكرة إلى المتجر)",
      body: "المسار كامل من فكرة غير واضحة إلى تطبيق حيّ: واجهات خلفية، قاعدة بيانات، خط نشر، ومنتج يصمد في الإنتاج.",
    },
  ],
  plans: [
    {
      name: "مراجعة",
      fit: "للمنتجات القائمة",
      body: "مراجعة مركزة للبنية، الأداء، تجربة المستخدم، ومخاطر النشر.",
      items: ["مراجعة الكود والنظام", "قائمة إصلاحات مرتبة", "جلسة اتجاه تقني"],
    },
    {
      name: "إطلاق",
      fit: "لمنتجات MVP الجديدة",
      body: "نسخة إنتاجية تثبت المنتج وتمنحك شيئاً حقيقياً يمكن إطلاقه.",
      featured: true,
      items: [
        "تطبيق موبايل أو ويب",
        "باك إند وقاعدة بيانات",
        "نشر وتوثيق تسليم",
      ],
    },
    {
      name: "شراكة",
      fit: "للتنفيذ المستمر",
      body: "قدرة هندسية سينيور للفرق التي تحتاج حركة مستمرة في المنتج.",
      items: ["تنفيذ خارطة الطريق", "صيانة وتوسيع", "إيقاع تسليم أسبوعي"],
    },
  ],
  testimonials: [
    {
      sample: true,
      quote:
        "استبدل هذا باقتباس حقيقي من عميل أو زميل — جملة أو جملتين عمّا نفّذته والنتيجة. اطلب منه ذكر نتيجة ملموسة.",
      name: "اسم العميل أو الزميل",
      role: "المنصب · الشركة",
    },
    {
      sample: true,
      quote:
        "اقتباس ثاني قصير يعمل جيداً هنا. التفاصيل أقوى من المديح: «قلّل وقت الإطلاق للنصف»، «التطبيق أصبح مستقراً في الإنتاج»، «أدار البناء كله بمفرده».",
      name: "اسم العميل أو الزميل",
      role: "المنصب · الشركة",
    },
  ],
  about: {
    eyebrow: "نبذة",
    title: "أبني منتجات لا بد أن تصمد أمام مستخدمين حقيقيين.",
    paragraphs: [
      "مهندس برمجيات أول أعمل على ميزات الذكاء الاصطناعي، وتطبيقات Flutter، والواجهات الخلفية، وخطوط النشر التي تُبقيها تعمل. معظم عملي هو الجزء الذي تستهين به الفرق: تحويل فكرة غير واضحة إلى شيء يُطلَق فعلًا ويصمد في الإنتاج.",
      "خلال السنوات الأخيرة أطلقت أكثر من 10 تطبيقات على المتاجر في أربع مناطق، وغالبًا أمتلك الميزة من التصميم المعماري حتى الإصدار. يهمني الوضوح، والاستمرارية، وكودٌ يستطيع المهندس التالي صيانته دون خريطة.",
    ],
  },
  contact: {
    eyebrow: "تواصل",
    title: "تحتاج منتجاً يتم بناؤه أو إصلاحه أو إطلاقه؟",
    body: "أرسل لي فكرة المنتج، الموعد المطلوب، وما الذي يعطلك الآن. سأرد عليك بالخطوة العملية التالية.",
    book: "احجز مكالمة",
    form: {
      name: "اسمك",
      email: "بريدك الإلكتروني",
      message: "ما الذي تحتاج بناءه أو إصلاحه أو إطلاقه؟",
      send: "إرسال الرسالة",
      directLabel: "أو تواصل معي مباشرة",
    },
  },
};
