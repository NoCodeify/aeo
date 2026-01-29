export const FAQ_DATA = [
  {
    question: "What is AEO?",
    answer:
      "AEO (Answer Engine Optimization) is the practice of optimizing your brand's presence in AI-powered search engines like ChatGPT, Gemini, Perplexity, and Claude. Unlike traditional SEO which focuses on Google rankings, AEO ensures AI assistants accurately represent your brand when users ask questions.",
  },
  {
    question: "How is this different from SEO?",
    answer:
      "Traditional SEO optimizes for Google's algorithm and search rankings. AEO optimizes for how AI models understand and present your brand. AI assistants use different data sources, have different priorities (accuracy, recency, trust signals), and present information conversationally rather than as links. You need both strategies.",
  },
  {
    question: "Which AI platforms does this cover?",
    answer:
      "The AEO Protocol covers all major AI assistants: ChatGPT (OpenAI), Gemini (Google), Claude (Anthropic), Perplexity, Copilot (Microsoft), and emerging platforms. Each has different data sources and behaviors, so the checklist includes platform-specific optimizations.",
  },
  {
    question: "How long until I see results?",
    answer:
      "Initial changes can appear in AI responses within 2-4 weeks as models update their knowledge. However, consistent presence and accurate citations typically develop over 2-3 months. The checklist includes cache-forcing techniques to accelerate visibility.",
  },
  {
    question: "What format is the checklist?",
    answer:
      "The checklist is delivered as a comprehensive Google Sheet with 130+ actionable items across 9 categories: Client Intake, Technical Foundation, Content Optimization, Trust & Authority, LLM-Specific, Monitoring, Content Strategy, Competitive Intelligence, and Seeding.",
  },
  {
    question: "Do I need technical skills to implement this?",
    answer:
      "The checklist is organized by complexity. Many items (content optimization, trust signals) can be implemented by anyone. Technical items (schema markup, SSR) may require developer support. Each item includes difficulty ratings and implementation guidance.",
  },
  {
    question: "Is this a one-time fix or ongoing work?",
    answer:
      "AEO requires ongoing attention. AI models continuously update their knowledge, competitors are optimizing too, and the AI landscape evolves rapidly. The checklist includes monitoring frameworks for weekly checks and monthly audits.",
  },
];

export const QUIZ_QUESTIONS = [
  {
    id: "company-stage",
    question: "What stage is your company at?",
    options: [
      { value: "starting", label: "Just starting (< $100k revenue)" },
      { value: "growing", label: "Growing ($100k - $1M revenue)" },
      { value: "scaling", label: "Scaling ($1M - $10M revenue)" },
      { value: "established", label: "Established ($10M+ revenue)" },
    ],
  },
  {
    id: "ai-visibility",
    question: "How does AI currently represent your brand?",
    options: [
      { value: "not-mentioned", label: "Not mentioned at all" },
      { value: "wrong-info", label: "Mentioned with wrong information" },
      { value: "correct", label: "Mentioned correctly" },
      { value: "unknown", label: "Haven't checked yet" },
    ],
  },
  {
    id: "primary-goal",
    question: "What's your primary goal?",
    options: [
      { value: "get-mentioned", label: "Get mentioned for the first time" },
      { value: "fix-info", label: "Fix incorrect information" },
      { value: "outrank", label: "Outrank competitors in AI responses" },
      { value: "understand", label: "Understand the AI landscape" },
    ],
  },
  {
    id: "timeline",
    question: "When do you need to address this?",
    options: [
      { value: "immediately", label: "Immediately - it's urgent" },
      { value: "quarter", label: "This quarter" },
      { value: "later", label: "6+ months from now" },
    ],
  },
];

export const CHECKLIST_CATEGORIES = [
  {
    title: "Client Intake & Baseline",
    count: "10",
    items: [
      "Dream queries collected (5-10)",
      "Truth file with pricing, features, facts",
      "Baseline scorecard before optimization",
    ],
  },
  {
    title: "Technical Foundation",
    count: "14",
    items: [
      "robots.txt AI crawler configuration",
      "Server-side rendering (SSR) setup",
      "Schema.org markup on key pages",
    ],
  },
  {
    title: "Content Optimization",
    count: "20",
    items: [
      "First 50 words state WHO/WHAT/WHERE/PRICE",
      "Pricing in HTML text (not behind Contact Us)",
      "FAQ section on every key page",
    ],
  },
  {
    title: "Trust & Authority",
    count: "17",
    items: [
      "Google Business Profile claimed",
      "Crunchbase, LinkedIn, G2 profiles aligned",
      "3+ external sources repeat core brand claim",
    ],
  },
  {
    title: "LLM-Specific Optimization",
    count: "20",
    items: [
      "ChatGPT: Bing Webmaster Tools verified",
      "Gemini: E-E-A-T signals and grounding blocks",
      "Force-fetch each updated page individually",
    ],
  },
  {
    title: "Monitoring & Analytics",
    count: "15",
    items: [
      "Weekly LLM citation check",
      "10-run consistency test per key query",
      "Competitor LLM presence monitored",
    ],
  },
  {
    title: "Content Strategy",
    count: "14",
    items: [
      "Comparison pages for top 5 competitors",
      "Zero-volume keyword content created",
      "Data study planned with original research",
    ],
  },
  {
    title: "Competitive Intelligence",
    count: "13",
    items: [
      "Top 5 competitors identified via LLM queries",
      "Keyword gap analysis completed",
      "Forum/Reddit research for real competitors",
    ],
  },
  {
    title: "Seeding & Amplification",
    count: "8",
    items: [
      "Per-page force-fetch runbook created",
      "LinkedIn article with brand positioning",
      "Reddit/forum presence established",
    ],
  },
];

export const STATS = [
  {
    value: "1B+",
    label: "weekly active ChatGPT users asking about brands like yours",
    source: "OpenAI, 2025",
  },
  {
    value: "0%",
    label: "of businesses have optimized for AI search engines",
    source: "Industry estimate",
  },
  {
    value: "#1",
    label: "recommendation in category after AEO implementation",
    source: "FueGenix case study, 2026",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "From invisible on discovery queries to being recommended as an 'Elite Tier' clinic by Gemini. ChatGPT went from not mentioning us to citing us on 7 out of 8 branded queries.",
    author: "Premium Hair Transplant Clinic",
    company: "Netherlands",
    result: "Elite Tier AI recommendation",
  },
  {
    quote:
      "We had no idea AI was sending potential customers to our competitors. Within weeks of implementing the protocol, we started showing up in recommendations.",
    author: "Managing Director",
    company: "Professional Services",
    result: "From invisible to recommended",
  },
  {
    quote:
      "The audit revealed AI was giving outdated information about our business. Fixing that alone was worth the entire engagement.",
    author: "Head of Marketing",
    company: "Consumer Brand",
    result: "Corrected AI misinformation",
  },
];

export const HOW_IT_WORKS = [
  {
    phase: "Phase 1",
    title: "Audit",
    description:
      "Establish your baseline visibility across ChatGPT, Gemini, Perplexity, and Claude. Document what AI currently says about you.",
    icon: "Search",
  },
  {
    phase: "Phase 2",
    title: "Implement",
    description:
      "Work through the checklist systematically. Technical fixes, content optimization, and trust signal establishment.",
    icon: "Wrench",
  },
  {
    phase: "Phase 3",
    title: "Activate",
    description:
      "Force cache updates, monitor responses, and iterate. Establish weekly and monthly review cadences.",
    icon: "Zap",
  },
];

export const ZAPIER_WEBHOOK_URL = "https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjcwNTZjMDYzNDA0MzI1MjZjNTUzNjUxMzAi_pc";
