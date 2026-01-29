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
    question: "Should I stop doing SEO and focus only on AEO?",
    answer:
      "No. SEO is the foundation that AEO builds upon. Google rankings still drive traffic, and good SEO helps Bing index your site (which ChatGPT relies on). The difference is that SEO alone is no longer enough. You need both: SEO to get indexed, AEO to get recommended.",
  },
  {
    question: "What metrics should I track for AEO instead of rankings?",
    answer:
      "Track four metrics: Mention Rate (how often you appear in 10 tests), Position (are you first or fifth?), Citation (does the LLM link to your site?), and Context (what does it say about you?). These matter more than Google position for understanding AI visibility.",
  },
  {
    question: "Can you rank #1 on Google but be invisible to ChatGPT?",
    answer:
      "Yes. We see this constantly in audits. A brand can rank well on Google but have zero visibility in ChatGPT or Gemini. This happens because LLMs use different criteria than search engines. They prioritize extractable facts, not keyword optimization.",
  },
  {
    question: "How long does AEO take compared to SEO?",
    answer:
      "AEO can show results faster than SEO. ChatGPT cache updates can happen within days using cache forcing techniques. Gemini depends on Google indexing, so it takes longer. We have seen clients go from 0% to 90% visibility in 30 days.",
  },
  {
    question: "Is AEO just a new name for SEO?",
    answer:
      "No. While they share some foundations (being indexed, having quality content), the optimization strategies differ significantly. SEO optimizes for ranking algorithms. AEO optimizes for LLM extraction and recommendation. Different goals, different techniques.",
  },
  {
    question: "What is the biggest difference between AEO and SEO?",
    answer:
      "The competition structure. In SEO, 10 results share page one. In AEO, one or two brands get recommended per query. SEO gets you in the race. AEO makes you the answer. The stakes are higher, but so is the opportunity for early movers.",
  },
];

export function AEOvsSEO() {
  useEffect(() => {
    document.title = "AEO vs SEO: Key Differences Explained (2026 Guide) | AEO Protocol";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "AEO optimizes for AI recommendations, SEO optimizes for Google rankings. Learn the 4 metrics that matter and why ranking #3 on Google can mean 0% AI visibility."
      );
    }
  }, []);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
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
            <Badge className="mb-6">Comparison Guide</Badge>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight heading-3d"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            AEO vs SEO:{" "}
            <span className="text-gradient heading-3d-glow">What Actually Matters</span>
          </motion.h1>

          {/* FIRST 50 WORDS */}
          <motion.p
            className="text-lg md:text-xl text-foreground mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <strong>AEO (Answer Engine Optimization)</strong> optimizes your brand to be recommended by ChatGPT and Gemini. SEO optimizes for Google rankings. AEO Protocol has audited 100+ brands and discovered a critical gap:{" "}
            <strong>you can rank #3 on Google and have 0% AI visibility</strong>. This guide explains the four metrics that actually matter.
          </motion.p>

          {/* Key Takeaways */}
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
                  Google rankings and AI visibility are two different games
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  A brand ranking #3 on Google can have 0% visibility in ChatGPT
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  AEO tracks 4 metrics: Mention Rate, Position, Citation, Context
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  SEO is the foundation, AEO is the competitive edge
                </span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* The Paradox Section */}
      <section className="py-16 px-4 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 heading-3d">
              The Google #3 Paradox
            </h2>
            <p className="text-muted-foreground mb-8">
              A premium hair transplant clinic ranked #3 on Google for "best hair transplant Netherlands." Their SEO agency was celebrating. But when we ran an AEO audit, asking the same query in ChatGPT and Gemini ten times each, they appeared zero times.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4">Google Result</h3>
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-bold text-primary">#3</span>
                  <div>
                    <p className="text-muted-foreground">Ranking position</p>
                    <p className="text-sm text-muted">Page 1, visible</p>
                  </div>
                </div>
              </div>

              <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4">AI Visibility</h3>
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-bold text-destructive">0%</span>
                  <div>
                    <p className="text-muted-foreground">Mention rate</p>
                    <p className="text-sm text-muted">0 out of 10 tests</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground">
              This is the paradox: you can win at SEO and lose at AEO. Google rankings tell you where you appear in search results. AI visibility tells you who gets recommended when someone asks for advice. These are two different games with different rules.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 heading-3d">
              AEO vs SEO: Complete Comparison
            </h2>
            <p className="text-muted-foreground mb-8">
              Understanding the differences between AEO and SEO is critical for modern digital strategy. Here is a side-by-side comparison.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 font-semibold">Factor</th>
                    <th className="text-left py-4 px-4 font-semibold">SEO</th>
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
                  <tr className="border-b border-border/50">
                    <td className="py-4 px-4 font-medium">Time to Results</td>
                    <td className="py-4 px-4 text-muted-foreground">
                      3-6 months typically
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">
                      Days to weeks (cache forcing)
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

      {/* The 4 AEO Metrics */}
      <section className="py-16 px-4 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 heading-3d">
              The 4 AEO Metrics That Replace Rankings
            </h2>
            <p className="text-muted-foreground mb-8">
              Instead of obsessing over Google position, track these four metrics weekly. They tell you how AI perceives and recommends your brand.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    1
                  </span>
                  <h3 className="text-xl font-bold">Mention Rate</h3>
                </div>
                <p className="text-muted-foreground">
                  Out of 10 queries, how many times does the brand get mentioned? Anything below 60% means you are being overlooked. Test the same query 10 times because LLM responses vary.
                </p>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    2
                  </span>
                  <h3 className="text-xl font-bold">Position</h3>
                </div>
                <p className="text-muted-foreground">
                  When you ARE mentioned, are you first, third, or fifth? Are you positioned as "the best" or just "one option"? First mention carries more weight.
                </p>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    3
                  </span>
                  <h3 className="text-xl font-bold">Citation</h3>
                </div>
                <p className="text-muted-foreground">
                  Does the LLM link back to your website? This tells you if your content is being used as a source. Cited responses build more trust than mentions alone.
                </p>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    4
                  </span>
                  <h3 className="text-xl font-bold">Context</h3>
                </div>
                <p className="text-muted-foreground">
                  What does the AI say about you? Are they calling you "premium" or "budget"? "Best for hairlines" or "best for volume"? This is your AI reputation.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Both Matter */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 heading-3d">
              Why You Need Both SEO and AEO
            </h2>
            <p className="text-muted-foreground mb-8">
              This is not an either/or situation. SEO is the foundation that AEO builds upon. Here is how they work together.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircleIcon className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-bold">SEO Provides</h3>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li>Indexing in Bing (which ChatGPT uses)</li>
                  <li>Indexing in Google (which Gemini uses)</li>
                  <li>Website traffic from organic search</li>
                  <li>Domain authority and backlinks</li>
                  <li>Technical foundation (speed, structure)</li>
                </ul>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircleIcon className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-bold">AEO Provides</h3>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li>AI recommendations and citations</li>
                  <li>Being the answer, not just an option</li>
                  <li>Influence over purchase decisions</li>
                  <li>Competitive moat (most have not started)</li>
                  <li>Direct conversion from AI users</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-6 bg-primary/10 border border-primary/30 rounded-xl">
              <p className="text-lg">
                <strong>The key insight:</strong> Google had 20+ years of SEO best practices. Everyone learned the rules. AI search is in year one. The rules are still being written. The businesses that move now get first-mover advantage.
              </p>
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
              Ready to Track What Actually Matters?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get the complete 130+ point AEO checklist. It includes all four metrics, how to test them, and the optimization playbook.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/checklist">
                <Button size="lg">
                  Get Free Checklist
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/case-study/fuegenix">
                <Button variant="outline" size="lg">
                  See the Case Study
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Internal Links */}
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
              The 10-Run Consistency Test
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
