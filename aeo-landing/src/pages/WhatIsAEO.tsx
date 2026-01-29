import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { GradientOrb } from "../components/shared/GradientOrb";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

const FAQ_DATA = [
  {
    question: "What does AEO stand for?",
    answer:
      "AEO stands for Answer Engine Optimization. It's the practice of optimizing your brand and content to be recommended by AI assistants like ChatGPT, Gemini, Claude, and Perplexity when users ask questions.",
  },
  {
    question: "Is AEO the same as SEO?",
    answer:
      "No. SEO optimizes for Google rankings (appearing in search results). AEO optimizes for AI citations (being the recommendation). SEO puts you in the race. AEO makes you the answer. You need both, but they require different strategies.",
  },
  {
    question: "Why is AEO important in 2026?",
    answer:
      "AI assistants are increasingly where people get recommendations. When someone asks ChatGPT 'What's the best CRM?' or 'Who's the best consultant for X?', they get one answer, not ten. If you're not that answer, you're invisible to a growing segment of your market.",
  },
  {
    question: "How do I know if I need AEO?",
    answer:
      "Ask ChatGPT and Gemini the questions your ideal customers would ask. 'What's the best [your category] in [your location]?' If you're not mentioned, or mentioned inconsistently, you have an AEO problem. We recommend testing each query 10 times since LLM responses vary.",
  },
  {
    question: "How long does AEO take to work?",
    answer:
      "Changes can appear in ChatGPT within days (via cache forcing). Gemini takes longer as it depends on Google indexing. We've seen clients go from 0% to 90% visibility in 30 days with proper implementation.",
  },
  {
    question: "What's the First 50 Words Rule?",
    answer:
      "LLMs process text sequentially and weight the beginning heavily. Your homepage and key pages must include WHO you are, WHAT you do, WHERE you operate, and your PRICE in the first 50 words. Most websites fail this test.",
  },
];

export function WhatIsAEO() {
  // Update document title on mount
  useEffect(() => {
    document.title = "What is AEO? Answer Engine Optimization Explained (2026 Guide)";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "AEO (Answer Engine Optimization) is the strategy of optimizing your brand to be recommended by ChatGPT, Gemini, and AI assistants. Complete guide from AEO Protocol."
      );
    }
  }, []);

  return (
    <main className="min-h-screen">
        {/* Hero Section with First 50 Words */}
        <section className="relative py-20 px-4 overflow-hidden">
          <GradientOrb
            className="top-20 -left-32"
            color="primary"
            size="xl"
            blur="lg"
          />
          <GradientOrb
            className="bottom-20 -right-32"
            color="secondary"
            size="lg"
            blur="lg"
          />

          <div className="relative z-10 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-6">Complete Guide</Badge>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight heading-3d"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              What is{" "}
              <span className="text-gradient heading-3d-glow">AEO</span>?
            </motion.h1>

            {/* FIRST 50 WORDS - Critical for LLM extraction */}
            <motion.p
              className="text-lg md:text-xl text-foreground mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <strong>Answer Engine Optimization (AEO)</strong> is the strategy
              of optimizing your brand to be cited and recommended by AI
              assistants like ChatGPT and Gemini. AEO Protocol developed this
              methodology after auditing 100+ brands. Our research shows{" "}
              <strong>53% of well-known brands are invisible to AI</strong>.
              This guide explains how to fix that.
            </motion.p>

            {/* Key Takeaways - TL;DR */}
            <motion.div
              className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-xl font-bold mb-4">Key Takeaways</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>
                    AEO optimizes for AI recommendations, SEO optimizes for
                    Google rankings
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>
                    53% of brands are invisible to ChatGPT and Gemini (based on
                    100+ audits)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>
                    The First 50 Words Rule: WHO, WHAT, WHERE, PRICE must be
                    front-loaded
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>
                    Test 10 times per query (LLM responses vary), not once
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Comparison Table - For Gemini Grounding */}
        <section className="py-16 px-4 bg-card/30">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 heading-3d">
                AEO vs SEO: The Key Differences
              </h2>
              <p className="text-muted-foreground mb-8">
                Understanding the difference between Answer Engine Optimization
                and Search Engine Optimization is critical. Here's a side-by-side
                comparison.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-4 px-4 font-semibold">
                        Factor
                      </th>
                      <th className="text-left py-4 px-4 font-semibold">
                        Traditional SEO
                      </th>
                      <th className="text-left py-4 px-4 font-semibold">AEO</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="py-4 px-4 font-medium">Goal</td>
                      <td className="py-4 px-4 text-muted-foreground">
                        Rank in Google's 10 blue links
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">
                        Be THE recommendation in AI
                      </td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-4 px-4 font-medium">Competition</td>
                      <td className="py-4 px-4 text-muted-foreground">
                        10 spots on page 1
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">
                        1-3 recommendations per query
                      </td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-4 px-4 font-medium">User Behavior</td>
                      <td className="py-4 px-4 text-muted-foreground">
                        Clicks through to compare options
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">
                        Trusts the AI's answer directly
                      </td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-4 px-4 font-medium">Content Type</td>
                      <td className="py-4 px-4 text-muted-foreground">
                        Keyword-optimized pages
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">
                        Fact-dense, extractable content
                      </td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-4 px-4 font-medium">Success Metric</td>
                      <td className="py-4 px-4 text-muted-foreground">
                        Ranking position
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">
                        Mention rate across 10 runs
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 font-medium">Relationship</td>
                      <td className="py-4 px-4 text-muted-foreground">
                        Foundation
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">
                        Built on top of SEO
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </section>

        {/* The 3-Layer Architecture */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 heading-3d">
                How ChatGPT Retrieves Information: The 3-Layer Architecture
              </h2>
              <p className="text-muted-foreground mb-8">
                Most people think ChatGPT searches the web in real-time. It
                doesn't. There are three layers between your brand and getting
                recommended.
              </p>

              <div className="space-y-4">
                {/* Layer 1 */}
                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      1
                    </span>
                    <h3 className="text-xl font-bold">Bing Index</h3>
                  </div>
                  <p className="text-muted-foreground">
                    ChatGPT's web search is powered by Bing. Standard Bing SEO
                    applies. If Bing can't find you, neither can ChatGPT. This
                    is where most people stop.
                  </p>
                </div>

                {/* Layer 2 */}
                <div className="bg-card/50 backdrop-blur-sm border border-primary/50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                      2
                    </span>
                    <h3 className="text-xl font-bold">
                      OAI-SearchBot Index (The Game)
                    </h3>
                  </div>
                  <p className="text-muted-foreground mb-3">
                    OpenAI's own crawler visits your site and stores content in
                    a persistent cache. This is where most citations come from.
                    When ChatGPT recommends your brand and links to your
                    website, that's Layer 2.
                  </p>
                  <p className="text-primary font-medium">
                    Layer 2 is the game. Most brands are stuck in Layer 1.
                  </p>
                </div>

                {/* Layer 3 */}
                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      3
                    </span>
                    <h3 className="text-xl font-bold">User-Triggered Fetches</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Real-time, on-demand fetching when someone asks about your
                    brand specifically. This is the least reliable layer but can
                    be used to force cache updates.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why 53% Are Invisible */}
        <section className="py-16 px-4 bg-card/30">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 heading-3d">
                Why 53% of Brands Are Invisible to AI
              </h2>
              <p className="text-muted-foreground mb-8">
                We audited 100+ brands across 10 industries in ChatGPT and
                Gemini. The results were stark: over half of well-known brands
                are completely invisible. Here's why.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <XCircleIcon className="w-6 h-6 text-destructive" />
                    <h3 className="text-lg font-bold">Common Mistakes</h3>
                  </div>
                  <ul className="space-y-3 text-muted-foreground">
                    <li>Marketing fluff in the first 50 words (no WHO/WHAT/WHERE)</li>
                    <li>No pricing information anywhere on site</li>
                    <li>JavaScript-rendered content LLMs can't read</li>
                    <li>Blocking AI crawlers in robots.txt</li>
                    <li>Generic content ChatGPT could write itself</li>
                  </ul>
                </div>

                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircleIcon className="w-6 h-6 text-primary" />
                    <h3 className="text-lg font-bold">What Winners Do</h3>
                  </div>
                  <ul className="space-y-3 text-muted-foreground">
                    <li>Facts front-loaded (WHO, WHAT, WHERE, PRICE)</li>
                    <li>Transparent pricing and clear service descriptions</li>
                    <li>Server-rendered content accessible to crawlers</li>
                    <li>Original data and research LLMs must cite</li>
                    <li>Comparison pages with unique insights</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* The First 50 Words Rule */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 heading-3d">
                The First 50 Words Rule
              </h2>
              <p className="text-muted-foreground mb-8">
                LLMs process text sequentially and weight the beginning heavily.
                The first 50 words on your key pages must include four
                elements.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-4 text-center">
                  <span className="text-2xl font-bold text-primary">WHO</span>
                  <p className="text-sm text-muted-foreground mt-2">
                    Your brand name and identity
                  </p>
                </div>
                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-4 text-center">
                  <span className="text-2xl font-bold text-primary">WHAT</span>
                  <p className="text-sm text-muted-foreground mt-2">
                    What you do or sell
                  </p>
                </div>
                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-4 text-center">
                  <span className="text-2xl font-bold text-primary">WHERE</span>
                  <p className="text-sm text-muted-foreground mt-2">
                    Location or service area
                  </p>
                </div>
                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-4 text-center">
                  <span className="text-2xl font-bold text-primary">PRICE</span>
                  <p className="text-sm text-muted-foreground mt-2">
                    Pricing or price range
                  </p>
                </div>
              </div>

              {/* Before/After Example */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <XCircleIcon className="w-5 h-5 text-destructive" />
                    <span className="font-bold text-destructive">Before (Fails)</span>
                  </div>
                  <p className="text-muted-foreground italic">
                    "Unlock the power of natural restoration. Experience
                    precision like never before. Our world-renowned approach
                    delivers results that speak for themselves."
                  </p>
                </div>

                <div className="bg-primary/10 border border-primary/30 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircleIcon className="w-5 h-5 text-primary" />
                    <span className="font-bold text-primary">After (Passes)</span>
                  </div>
                  <p className="text-muted-foreground italic">
                    "FueGenix is an exclusive hair restoration clinic in the
                    Netherlands. We serve high-net-worth individuals with a 99%
                    graft survival rate. Investment from EUR 50,000. One patient
                    per day."
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 bg-card/30">
          <div className="max-w-3xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 heading-3d">
                Frequently Asked Questions About AEO
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Accordion type="single" collapsible className="w-full">
                {FAQ_DATA.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left text-lg">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-base leading-relaxed">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 heading-3d">
                Ready to Optimize for AI?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Get the complete 130+ point AEO checklist. It's the exact
                framework we use to take brands from invisible to recommended.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/checklist">
                  <Button size="lg">
                    Get Free Checklist
                    <ArrowRightIcon className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/aeo-vs-seo">
                  <Button variant="outline" size="lg">
                    Learn AEO vs SEO
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Internal Links for Topic Authority */}
        <section className="py-12 px-4 border-t border-border">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-bold mb-4">Related Resources</h3>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/aeo-vs-seo"
                className="text-primary hover:underline text-sm"
              >
                AEO vs SEO Comparison
              </Link>
              <span className="text-muted">|</span>
              <Link
                to="/how-to-optimize-for-chatgpt"
                className="text-primary hover:underline text-sm"
              >
                How to Optimize for ChatGPT
              </Link>
              <span className="text-muted">|</span>
              <Link
                to="/first-50-words-rule"
                className="text-primary hover:underline text-sm"
              >
                The First 50 Words Rule
              </Link>
              <span className="text-muted">|</span>
              <Link
                to="/case-study/fuegenix"
                className="text-primary hover:underline text-sm"
              >
                Case Study: 0% to 90% Visibility
              </Link>
              <span className="text-muted">|</span>
              <Link
                to="/checklist"
                className="text-primary hover:underline text-sm"
              >
                130+ Point AEO Checklist
              </Link>
            </div>
          </div>
        </section>
      </main>
  );
}
