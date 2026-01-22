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
      "The checklist is delivered as a comprehensive Google Sheet with 300+ actionable items organized by category: Technical Foundation, Content Optimization, Trust Signals, Cache Management, and platform-specific sections for each major AI assistant.",
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
    title: "Technical Foundation",
    count: "20+",
    items: [
      "robots.txt AI crawler configuration",
      "Server-side rendering (SSR) setup",
      "Structured data markup",
      "Sitemap optimization for AI crawlers",
    ],
  },
  {
    title: "Content Optimization",
    count: "50+",
    items: [
      "First 50 words optimization",
      "Question-answer content patterns",
      "Entity establishment",
      "Citation-friendly formatting",
    ],
  },
  {
    title: "Trust Signals",
    count: "30+",
    items: [
      "Author credentials setup",
      "Source validation links",
      "Third-party verification",
      "Review platform presence",
    ],
  },
  {
    title: "Cache Management",
    count: "40+",
    items: [
      "Update frequency signals",
      "Content freshness markers",
      "Cache forcing techniques",
      "Monitoring dashboard setup",
    ],
  },
  {
    title: "LLM-Specific",
    count: "100+",
    items: [
      "ChatGPT optimization (Bing backend)",
      "Gemini grounding signals (Google)",
      "Perplexity citation patterns",
      "Claude knowledge cutoff considerations",
    ],
  },
  {
    title: "Monitoring & Analytics",
    count: "60+",
    items: [
      "Weekly visibility tracking",
      "Competitor mention alerts",
      "Accuracy scoring framework",
      "Citation source analysis",
    ],
  },
];

export const STATS = [
  {
    value: "62%",
    label: "of ChatGPT citations are NOT from Bing search",
    source: "Internal research, 2024",
  },
  {
    value: "Daily",
    label: "recrawl frequency for active, updated sites",
    source: "OpenAI documentation",
  },
  {
    value: "340%",
    label: "YoY growth in AI-assisted search queries",
    source: "Industry reports, 2024",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "After implementing the AEO Protocol, ChatGPT went from ignoring us to recommending us as the top solution in our category.",
    author: "Marketing Director",
    company: "B2B SaaS Company",
    result: "From invisible to #1 recommendation",
  },
  {
    quote:
      "We found out AI was telling prospects our pricing was 3x higher than reality. The checklist helped us fix it in weeks.",
    author: "Founder",
    company: "E-commerce Brand",
    result: "Pricing accuracy restored",
  },
  {
    quote:
      "The competitive intelligence section alone was worth it. We discovered 3 competitors we didn't know AI was recommending over us.",
    author: "CEO",
    company: "Professional Services",
    result: "3 hidden competitors discovered",
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
export const GOOGLE_SHEET_URL = "YOUR_GOOGLE_SHEET_URL";
