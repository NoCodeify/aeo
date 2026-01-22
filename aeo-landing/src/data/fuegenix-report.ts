export interface VisibilityScore {
  engine: string;
  branded: number;
  discovery: number;
}

export interface Competitor {
  name: string;
  location: string;
  specialization: string;
  priceRange: string;
  tier: 1 | 2;
}

export interface GapItem {
  area: string;
  clientLabel: string;
  description: string;
  beforeScore: number;
  afterScore: number;
  status: "done" | "pending" | "in-progress";
  detail: string;
}

export interface Recommendation {
  action: string;
  clientLabel: string;
  priority: "immediate" | "short-term" | "medium-term";
  status: "done" | "pending" | "in-progress";
  category?: string;
}

export interface KeyFinding {
  title: string;
  detail: string;
  severity: "high" | "medium" | "low";
}

export const brandInfo = {
  name: "FueGenix Hair Clinic",
  website: "fuegenix.com",
  location: "Bergen op Zoom, Netherlands",
  leadSurgeon: "Dr. Munib Ahmad",
  category: "Premium Hair Transplant Clinic",
  auditDate: "January 2026",
  tagline: "Exclusive hair restoration for HNWIs, business leaders, celebrities and royalty",
  priceRange: "From \u20ac50,000",
  graftSurvival: "99%",
};

export const executiveSummary = {
  headline: "AI now recommends FueGenix as a world-class option",
  subheadline: "Before our work, AI platforms barely knew you existed. Now you're recommended 7-9 times out of 10.",
  heroStat: { before: 25, after: 80, label: "AI Recommendation Rate", unit: "ChatGPT & Gemini" },
};

export const headlineResults = [
  {
    query: "Best hair transplant clinic in the Netherlands",
    engine: "Gemini",
    before: { value: "0/10", label: "Not mentioned" },
    after: { value: "7/10", label: "Recommended" },
    summary: "Google's AI went from never mentioning you to recommending you 7 out of 10 times.",
  },
  {
    query: "Best hair transplant clinic in the Netherlands",
    engine: "ChatGPT",
    before: { value: "5/10", label: "Sometimes mentioned" },
    after: { value: "9/10", label: "Consistently recommended" },
    summary: "ChatGPT now recommends you almost every time someone asks.",
  },
  {
    query: "FueGenix pricing",
    engine: "All Platforms",
    before: { value: "\u20ac25-35k", label: "Wrong price" },
    after: { value: "\u20ac50k+", label: "Correct price" },
    summary: "AI was telling potential clients you cost half what you actually charge.",
  },
];

export const keyFindings: KeyFinding[] = [
  {
    title: "AI was quoting the wrong price",
    detail: "All AI platforms were telling potential clients your procedures cost \u20ac25-35k instead of \u20ac50k+. This attracted the wrong audience and undercut your positioning.",
    severity: "high",
  },
  {
    title: "Google's AI didn't recommend you at all",
    detail: "When people asked Gemini for the best hair transplant in the Netherlands, you weren't mentioned in any of our 10 tests. Competitors appeared instead.",
    severity: "high",
  },
  {
    title: "No comparison content existed",
    detail: "There were no pages explaining how you compare to other top surgeons. AI needs this kind of content to position you correctly against competitors.",
    severity: "medium",
  },
  {
    title: "Almost no reviews for AI to reference",
    detail: "Only 1 Trustpilot review existed. AI platforms use reviews as trust signals when deciding who to recommend.",
    severity: "medium",
  },
  {
    title: "Not recognized outside the Netherlands",
    detail: "AI platforms had no awareness of you for European or global queries. Only local searches mentioned you.",
    severity: "high",
  },
];

export const visibilityScores: VisibilityScore[] = [
  { engine: "ChatGPT", branded: 88, discovery: 90 },
  { engine: "Gemini", branded: 100, discovery: 70 },
  { engine: "Google", branded: 75, discovery: 17 },
];

export const engineDetails = [
  {
    engine: "ChatGPT",
    detail: "Strong recognition when people search by name. Improving on broader recommendation queries.",
    discoveryScore: 90,
    strengthLabel: "Strong" as const,
  },
  {
    engine: "Gemini",
    detail: "Best performer overall. Recommends you consistently from multiple angles.",
    discoveryScore: 70,
    strengthLabel: "Strong" as const,
  },
  {
    engine: "Google",
    detail: "Good when people search by name, but rarely recommends you in broader searches yet.",
    discoveryScore: 17,
    strengthLabel: "Needs Work" as const,
  },
];

export const gapAnalysis: GapItem[] = [
  {
    area: "Gemini Discovery",
    clientLabel: "AI Recommendations (Google Gemini)",
    description: "\"Best hair transplant Netherlands\" 10-run test",
    beforeScore: 0,
    afterScore: 70,
    status: "done",
    detail: "Not mentioned before; now recommended 7 out of 10 times",
  },
  {
    area: "ChatGPT Discovery",
    clientLabel: "AI Recommendations (ChatGPT)",
    description: "\"Best hair transplant Netherlands\" 10-run test",
    beforeScore: 50,
    afterScore: 90,
    status: "done",
    detail: "Mentioned half the time before; now recommended 9 out of 10 times",
  },
  {
    area: "Pricing Accuracy",
    clientLabel: "Correct Pricing in AI",
    description: "AI platforms citing the correct investment level",
    beforeScore: 0,
    afterScore: 100,
    status: "done",
    detail: "Was showing wrong price (\u20ac25-35k); now shows correct price (\u20ac50k+) everywhere",
  },
  {
    area: "Website AEO Score",
    clientLabel: "Website Optimization Score",
    description: "Every page optimized for AI extraction",
    beforeScore: 29,
    afterScore: 100,
    status: "done",
    detail: "All 13 pages now pass our optimization checks",
  },
  {
    area: "Comparison Pages",
    clientLabel: "Competitor Comparison Content",
    description: "Dedicated pages comparing you to other top surgeons",
    beforeScore: 0,
    afterScore: 100,
    status: "done",
    detail: "Created 5 comparison pages (Zarev, Konior, Feriduni, Bisanga, Couto)",
  },
  {
    area: "Global Visibility",
    clientLabel: "International Recognition",
    description: "Recognition beyond the Netherlands",
    beforeScore: 0,
    afterScore: 100,
    status: "done",
    detail: "Now recognized globally; Gemini calls you #1 for \"Artistic Perfection in hair transplants\"",
  },
  {
    area: "Facts Extracted by LLMs",
    clientLabel: "Accurate Brand Facts in AI",
    description: "Key brand facts cited correctly by AI platforms",
    beforeScore: 20,
    afterScore: 80,
    status: "done",
    detail: "1 of 5 key facts cited correctly before; now 4 of 5 are accurate",
  },
  {
    area: "Social Proof",
    clientLabel: "Review Presence",
    description: "Review volume for AI trust signals",
    beforeScore: 5,
    afterScore: 15,
    status: "in-progress",
    detail: "1 Trustpilot review at start; review campaign now in progress",
  },
];

export const recommendations: Recommendation[] = [
  { action: "Update homepage copy to match new positioning", clientLabel: "Rewrote homepage to lead with premium positioning", priority: "immediate", status: "done", category: "Content & Positioning" },
  { action: "Add pricing (\"Investment starts at \u20ac50,000\")", clientLabel: "Added correct pricing across all pages", priority: "immediate", status: "done", category: "Content & Positioning" },
  { action: "Remove \"doctor does everything\" language", clientLabel: "Updated messaging to focus on exclusivity and artistry", priority: "immediate", status: "done", category: "Content & Positioning" },
  { action: "Create /vs/zarev page", clientLabel: "Created first competitor comparison page", priority: "immediate", status: "done", category: "Comparison Pages" },
  { action: "Submit sitemap to Bing Webmaster Tools", clientLabel: "Connect site to Microsoft's AI system", priority: "immediate", status: "pending", category: "Technical" },
  { action: "Create remaining comparison pages", clientLabel: "Built comparison pages for all major competitors", priority: "short-term", status: "done", category: "Comparison Pages" },
  { action: "Implement full Schema.org markup", clientLabel: "Added structured data so AI reads your site correctly", priority: "short-term", status: "done", category: "Technical" },
  { action: "Create llms.txt file", clientLabel: "Add AI-specific instructions to your website", priority: "short-term", status: "pending", category: "Technical" },
  { action: "Launch Trustpilot review campaign", clientLabel: "Build review presence for AI trust signals", priority: "short-term", status: "in-progress", category: "Reviews" },
  { action: "Create LinkedIn company page", clientLabel: "Establish LinkedIn for AI credibility", priority: "short-term", status: "pending", category: "Social Proof" },
  { action: "Create repair/revision specialist content", clientLabel: "Create content for revision and repair searches", priority: "medium-term", status: "pending", category: "Content & Positioning" },
  { action: "Create statistics page with citable data", clientLabel: "Build a data page AI can quote as a source", priority: "medium-term", status: "pending", category: "Content & Positioning" },
  { action: "Get featured in more \"best of\" listicles", clientLabel: "Get mentioned in top-surgeon recommendation lists", priority: "medium-term", status: "pending", category: "External" },
  { action: "Press release for positioning update", clientLabel: "Publish press coverage for AI to reference", priority: "medium-term", status: "pending", category: "External" },
  { action: "Monitor and iterate based on LLM responses", clientLabel: "Monthly AI monitoring and adjustments", priority: "medium-term", status: "in-progress", category: "Ongoing" },
];

export const competitors: Competitor[] = [
  {
    name: "Dr. Zarev",
    location: "Bulgaria",
    specialization: "Gigasessions (10k+ grafts)",
    priceRange: "\u20ac50k-100k+",
    tier: 1,
  },
  {
    name: "Dr. Konior",
    location: "USA",
    specialization: "Technical precision",
    priceRange: "~$35k",
    tier: 1,
  },
  {
    name: "Dr. Couto",
    location: "Spain",
    specialization: "Artistic, \"Leonardo da Vinci\"",
    priceRange: "High",
    tier: 1,
  },
  {
    name: "Dr. Feriduni",
    location: "Belgium",
    specialization: "Long track record, highly respected",
    priceRange: "Premium",
    tier: 2,
  },
  {
    name: "Dr. Bisanga",
    location: "Belgium",
    specialization: "Repair specialist",
    priceRange: "Premium",
    tier: 2,
  },
  {
    name: "Hattingen Hair",
    location: "Germany",
    specialization: "Popular European option",
    priceRange: "Mid-Premium",
    tier: 2,
  },
];
