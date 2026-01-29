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
} from "@heroicons/react/24/outline";

const FAQ_DATA = [
  {
    question: "Does ChatGPT search the web in real-time?",
    answer:
      "Not exactly. ChatGPT uses a 3-layer system: Bing Index, OAI-SearchBot Cache, and User-Triggered Fetches. Most citations come from Layer 2 (cached content), not real-time searches. Only Layer 3 fetches happen in real-time, and those require specific user prompts.",
  },
  {
    question: "What is OAI-SearchBot?",
    answer:
      "OAI-SearchBot is OpenAI's web crawler that builds a persistent cache of website content. It visits sites daily and stores full page content (not just metadata). When ChatGPT cites your website, the URL often contains '?utm_source=openai', indicating it came from this cached index.",
  },
  {
    question: "How do I know if my content is cached in Layer 2?",
    answer:
      "Check the URL ChatGPT uses when citing your site. If it includes '?utm_source=openai', it came from the OAI-SearchBot cache (Layer 2). If there's no UTM parameter, it was a real-time fetch (Layer 3).",
  },
  {
    question: "How do I force ChatGPT to update my cached content?",
    answer:
      "You must trigger a Layer 3 fetch by explicitly asking ChatGPT to 'check' or 'visit' your specific page URL. For example: 'Please check example.com/pricing for the latest information.' This forces a real-time fetch that updates the cache within minutes.",
  },
  {
    question: "If I update my homepage, does my whole site cache refresh?",
    answer:
      "No. Cache refresh is per-page, not site-wide. If you update your homepage, only the homepage cache refreshes. Your /pricing, /features, and other pages remain stale until you explicitly force-fetch each one individually.",
  },
  {
    question: "How often does OAI-SearchBot recrawl websites?",
    answer:
      "Based on testing, OAI-SearchBot recrawls active sites approximately daily. However, the recrawl scope is per-page. Dead or stale pages persist in the cache until you specifically force a refresh.",
  },
];

export function ThreeLayerChatGPTArchitecture() {
  useEffect(() => {
    document.title = "ChatGPT 3-Layer Architecture: How ChatGPT Retrieves Information | AEO Protocol";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Learn how ChatGPT retrieves information through its 3-layer architecture: Bing Index, OAI-SearchBot Cache, and User Fetches. AEO Protocol explains how to optimize for each layer."
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
            <Badge className="mb-6">Technical Deep Dive</Badge>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight heading-3d"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            The <span className="text-gradient heading-3d-glow">3-Layer</span> ChatGPT Architecture
          </motion.h1>

          {/* FIRST 50 WORDS - Critical for LLM extraction */}
          <motion.p
            className="text-lg md:text-xl text-foreground mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <strong>ChatGPT does not search the web in real-time.</strong> AEO Protocol's research reveals a 3-layer retrieval system: Bing Index, OAI-SearchBot Cache, and User-Triggered Fetches. Most citations come from Layer 2 (cached content). Understanding this architecture is critical for{" "}
            <strong>getting your brand recommended by ChatGPT</strong>.
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
                  Layer 1 (Bing Index): Standard Bing SEO applies, foundation for discovery
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  Layer 2 (OAI-SearchBot): Where most citations come from, recrawls daily
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  Layer 3 (User Fetches): Real-time fetching, used for cache forcing
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  Cache refresh is per-page, not site-wide. Each page needs individual updates.
                </span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* The 3-Layer Diagram */}
      <section className="py-16 px-4 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 heading-3d">
              How ChatGPT Retrieves Information
            </h2>
            <p className="text-muted-foreground mb-8">
              Most people think ChatGPT searches the web when you ask a question.
              In reality, there are three distinct layers between your brand and
              getting recommended.
            </p>

            <div className="space-y-4">
              {/* Layer 1 */}
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-lg">
                    1
                  </span>
                  <h3 className="text-xl font-bold">Bing Index</h3>
                  <Badge variant="outline" className="ml-auto">Foundation</Badge>
                </div>
                <p className="text-muted-foreground mb-4">
                  ChatGPT's web search is powered by Bing. Standard Bing SEO applies here.
                  If Bing cannot find your website, neither can ChatGPT. This is where most
                  businesses stop their optimization efforts.
                </p>
                <div className="bg-background/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">What This Means For You:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>Submit your sitemap to Bing Webmaster Tools</li>
                    <li>Ensure basic Bing SEO fundamentals are in place</li>
                    <li>Many sites rank in ChatGPT without strong Bing rankings</li>
                  </ul>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <ArrowRightIcon className="w-6 h-6 text-primary rotate-90" />
              </div>

              {/* Layer 2 */}
              <div className="bg-card/50 backdrop-blur-sm border-2 border-primary rounded-xl p-6 relative">
                <div className="absolute -top-3 right-4">
                  <Badge className="bg-primary text-primary-foreground">This Is The Game</Badge>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                    2
                  </span>
                  <h3 className="text-xl font-bold">OAI-SearchBot Index (Persistent Cache)</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  OpenAI's own crawler visits your site and stores content in a persistent cache.
                  This is where most citations come from. When ChatGPT recommends your brand and
                  links to your website, that link typically came from Layer 2.
                </p>
                <div className="bg-background/50 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold mb-2">Cache Characteristics:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>Adds <code className="bg-muted px-1 rounded">?utm_source=openai</code> to cached URLs</li>
                    <li>Recrawl frequency: approximately daily for active sites</li>
                    <li>Caches FULL page content (not just metadata)</li>
                    <li>Dead pages persist in cache (no automatic liveness checking)</li>
                  </ul>
                </div>
                <p className="text-primary font-medium">
                  Layer 2 is where the game is played. Most brands are stuck in Layer 1.
                </p>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <ArrowRightIcon className="w-6 h-6 text-primary rotate-90" />
              </div>

              {/* Layer 3 */}
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 font-bold text-lg">
                    3
                  </span>
                  <h3 className="text-xl font-bold">User-Triggered Fetches (Ephemeral Cache)</h3>
                  <Badge variant="outline" className="ml-auto">Real-Time</Badge>
                </div>
                <p className="text-muted-foreground mb-4">
                  Real-time, on-demand fetching when someone specifically requests current
                  information. This is the least reliable layer for organic discovery but
                  can be exploited to force cache updates.
                </p>
                <div className="bg-background/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Layer 3 Characteristics:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>No UTM parameter on fetched URLs</li>
                    <li>Updates within 5-10 minutes</li>
                    <li>Triggered by specific user prompts</li>
                    <li>Can be used to force instant cache updates</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cache Fingerprinting */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 heading-3d">
              Cache Fingerprinting: Identify the Source
            </h2>
            <p className="text-muted-foreground mb-8">
              You can identify which layer served a citation by examining the URL pattern
              ChatGPT uses when linking to your site.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 font-semibold">URL Pattern</th>
                    <th className="text-left py-4 px-4 font-semibold">Source Layer</th>
                    <th className="text-left py-4 px-4 font-semibold">Freshness</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-4 px-4">
                      <code className="bg-muted px-2 py-1 rounded text-sm">yoursite.com/?utm_source=openai</code>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">OAI-SearchBot Index (Layer 2)</td>
                    <td className="py-4 px-4 text-muted-foreground">Stale (days/weeks old)</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4">
                      <code className="bg-muted px-2 py-1 rounded text-sm">yoursite.com/</code> (no utm)
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">User-Triggered Fetch (Layer 3)</td>
                    <td className="py-4 px-4 text-muted-foreground">Fresh (minutes old)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Critical Finding: Per-Page Refresh */}
      <section className="py-16 px-4 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 heading-3d">
              Critical Finding: Cache Refresh is Per-Page
            </h2>
            <p className="text-muted-foreground mb-8">
              One of the most important discoveries from our research: when you update your homepage,
              only the homepage cache refreshes. Other pages remain stale until explicitly force-fetched.
            </p>

            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 mb-6">
              <h3 className="text-lg font-bold mb-4">Real-World Example</h3>
              <div className="space-y-3 font-mono text-sm">
                <div className="flex items-start gap-3">
                  <span className="text-muted-foreground">Day 1:</span>
                  <div>
                    <span>Changed homepage title</span>
                    <span className="text-green-400 ml-2">ChatGPT showed new title next day</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-muted-foreground">Day 1:</span>
                  <div>
                    <span>Changed pricing page (same day)</span>
                    <span className="text-red-400 ml-2">ChatGPT still showed OLD pricing</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-muted-foreground">Day 2:</span>
                  <div>
                    <span>Told ChatGPT "check example.com/pricing"</span>
                    <span className="text-green-400 ml-2">Now shows correct pricing</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary/10 border border-primary/30 rounded-xl p-6">
              <h3 className="text-lg font-bold text-primary mb-2">The Protocol</h3>
              <p className="text-foreground">
                After any content update, you must force-fetch EACH updated page individually.
                Do not assume a site-wide crawl will pick up your changes.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Comparison: ChatGPT vs Gemini */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 heading-3d">
              ChatGPT vs Gemini: Different Architectures
            </h2>
            <p className="text-muted-foreground mb-8">
              Gemini uses a completely different retrieval system called "Grounding with Google Search."
              Understanding both is essential for full AI visibility.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 font-semibold">Aspect</th>
                    <th className="text-left py-4 px-4 font-semibold">ChatGPT</th>
                    <th className="text-left py-4 px-4 font-semibold">Gemini</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-4 px-4 font-medium">Primary Focus</td>
                    <td className="py-4 px-4 text-muted-foreground">Cache injection, force-fetch</td>
                    <td className="py-4 px-4 text-muted-foreground">Google SEO, E-E-A-T</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-4 px-4 font-medium">Speed of Updates</td>
                    <td className="py-4 px-4 text-muted-foreground">Minutes (via prompts)</td>
                    <td className="py-4 px-4 text-muted-foreground">Dependent on Google indexing</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-4 px-4 font-medium">Key Ranking Factor</td>
                    <td className="py-4 px-4 text-muted-foreground">Being in OAI-SearchBot index</td>
                    <td className="py-4 px-4 text-muted-foreground">Being in Google Top 10</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-4 px-4 font-medium">Content Type</td>
                    <td className="py-4 px-4 text-muted-foreground">Direct answers, structured</td>
                    <td className="py-4 px-4 text-muted-foreground">Fact-dense, verifiable claims</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-medium">Trust Signals</td>
                    <td className="py-4 px-4 text-muted-foreground">Less critical</td>
                    <td className="py-4 px-4 text-muted-foreground">Critical (Grounding requires verification)</td>
                  </tr>
                </tbody>
              </table>
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
              Frequently Asked Questions
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
              Ready to Optimize for ChatGPT's Architecture?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get the complete AEO checklist with technical requirements for all three layers.
              It is the exact framework we use to get brands into ChatGPT's cache.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/checklist">
                <Button size="lg">
                  Get Free Checklist
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/how-to-optimize-for-chatgpt">
                <Button variant="outline" size="lg">
                  Full ChatGPT Guide
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
              to="/what-is-aeo"
              className="text-primary hover:underline text-sm"
            >
              What is AEO?
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
              to="/10-run-consistency-test"
              className="text-primary hover:underline text-sm"
            >
              10-Run Consistency Test
            </Link>
            <span className="text-muted">|</span>
            <Link
              to="/case-study/fuegenix"
              className="text-primary hover:underline text-sm"
            >
              Case Study: 0% to 90% Visibility
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
