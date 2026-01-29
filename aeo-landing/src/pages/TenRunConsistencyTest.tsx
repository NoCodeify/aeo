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
    question: "Why do LLM responses vary between tests?",
    answer:
      "LLM responses are non-deterministic by design. They sample from probability distributions, meaning the same query can yield different outputs. Temperature settings, context windows, and real-time web data all contribute to variation. This is why single tests are unreliable.",
  },
  {
    question: "How long does a 10-run test take?",
    answer:
      "Manually, about 15-20 minutes per query (including recording results). We recommend testing 5-10 key queries, so a full audit takes 1.5-3 hours. With our MCP tools, the same audit runs in parallel and takes about 5 minutes.",
  },
  {
    question: "Should I test in ChatGPT, Gemini, or both?",
    answer:
      "Both. ChatGPT and Gemini use different retrieval systems. A brand can be invisible in one and visible in the other. Test the same queries in both to get a complete picture. Include Google SERP as well to compare traditional rankings.",
  },
  {
    question: "What queries should I test?",
    answer:
      "Test discovery queries (how new customers find you): 'Best [category] in [location]', 'Top [service] for [use case]', '[Category] recommendations'. Also test comparison queries: '[Your brand] vs [competitor]'. And branded queries: 'What is [your brand]?'",
  },
  {
    question: "What if I score 0/10 on important queries?",
    answer:
      "Zero visibility is common and fixable. Apply the First 50 Words Rule to key pages, add explicit pricing, create comparison pages, and ensure your site is crawlable by AI bots. Most brands can improve from 0% to 70%+ within 30 days.",
  },
  {
    question: "How often should I run consistency tests?",
    answer:
      "Weekly during active optimization. Monthly once you reach target visibility. Re-test immediately after major content changes. LLM caches update periodically, so continuous monitoring catches both improvements and regressions.",
  },
];

export function TenRunConsistencyTest() {
  useEffect(() => {
    document.title = "The 10-Run Consistency Test: How to Measure AI Visibility | AEO Protocol";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "LLM responses vary. Test once, get lucky or unlucky. The 10-Run Consistency Test gives you reliable AI visibility data. Learn the methodology from AEO Protocol."
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
            <Badge className="mb-6">Testing Methodology</Badge>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight heading-3d"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            The{" "}
            <span className="text-gradient heading-3d-glow">10-Run</span> Consistency Test
          </motion.h1>

          {/* FIRST 50 WORDS */}
          <motion.p
            className="text-lg md:text-xl text-foreground mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <strong>The 10-Run Consistency Test</strong> is the only reliable way to measure AI visibility. LLM responses are non-deterministic: they vary every time you ask.{" "}
            <strong>AEO Protocol</strong> developed this methodology after finding that single tests are meaningless. A brand might appear in 1 out of 10 queries, giving a false positive on a single test. Here is how to measure what actually matters.
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
                  Single tests are unreliable. LLM responses vary every time.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  Test each query 10 times. Track mention rate, position, citation, and context.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  9-10/10 = Locked in. 0/10 = Invisible. Everything between needs work.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  Test in both ChatGPT and Gemini. They use different retrieval systems.
                </span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Why Single Tests Fail */}
      <section className="py-16 px-4 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 heading-3d">
              Why Single Tests Are Meaningless
            </h2>
            <p className="text-muted-foreground mb-8">
              Here is something that trips up almost everyone. You ask ChatGPT your discovery query and your brand shows up. Great. Done, right? Wrong.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <XCircleIcon className="w-6 h-6 text-destructive" />
                  <h3 className="text-lg font-bold">The False Positive</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  You test once. Your brand appears. You celebrate. But that response was 1 out of 10 possible outcomes. The other 9 times, users see your competitors.
                </p>
                <p className="text-sm text-destructive">
                  Actual visibility: 10%. Perceived visibility: 100%.
                </p>
              </div>

              <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <XCircleIcon className="w-6 h-6 text-destructive" />
                  <h3 className="text-lg font-bold">The False Negative</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  You test once. Your brand does not appear. You panic. But that response was also 1 out of 10 possible outcomes. The other 9 times, you do appear.
                </p>
                <p className="text-sm text-destructive">
                  Actual visibility: 90%. Perceived visibility: 0%.
                </p>
              </div>
            </div>

            <div className="p-6 bg-primary/10 border border-primary/30 rounded-xl">
              <p className="text-lg">
                <strong>The solution:</strong> Never test once. Test ten times. Then you know whether you appear 1/10, 5/10, or 9/10 times. That is your real visibility score.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Methodology */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 heading-3d">
              The 10-Run Test Methodology
            </h2>
            <p className="text-muted-foreground mb-8">
              For each important query, run this exact process.
            </p>

            <div className="space-y-4 mb-8">
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    1
                  </span>
                  <h3 className="text-xl font-bold">Define Your Query</h3>
                </div>
                <p className="text-muted-foreground">
                  Choose discovery queries that matter: "Best [category] in [location]", "Top [service] for [use case]". These are how new customers find you.
                </p>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    2
                  </span>
                  <h3 className="text-xl font-bold">Run 10 Times in ChatGPT</h3>
                </div>
                <p className="text-muted-foreground">
                  Ask the same query 10 times. Start a new conversation each time (important). Record whether your brand appears, its position, whether it is cited, and what context is given.
                </p>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    3
                  </span>
                  <h3 className="text-xl font-bold">Run 10 Times in Gemini</h3>
                </div>
                <p className="text-muted-foreground">
                  Repeat the process in Gemini. Results often differ significantly. A brand can be invisible in ChatGPT but visible in Gemini, or vice versa.
                </p>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    4
                  </span>
                  <h3 className="text-xl font-bold">Score and Analyze</h3>
                </div>
                <p className="text-muted-foreground">
                  Calculate your mention rate (X/10). Note position patterns, citation frequency, and how the AI describes your brand. This is your baseline.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Scoring Scale */}
      <section className="py-16 px-4 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 heading-3d">
              The Consistency Scoring Scale
            </h2>
            <p className="text-muted-foreground mb-8">
              Use this scale to interpret your 10-run test results.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 font-semibold">Score</th>
                    <th className="text-left py-4 px-4 font-semibold">Rating</th>
                    <th className="text-left py-4 px-4 font-semibold">Interpretation</th>
                    <th className="text-left py-4 px-4 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-4 px-4">
                      <span className="font-bold text-primary">9-10/10</span>
                    </td>
                    <td className="py-4 px-4 text-primary font-medium">Locked In</td>
                    <td className="py-4 px-4 text-muted-foreground">
                      Strong, consistent visibility. Users reliably see you.
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">
                      Maintain. Monitor monthly.
                    </td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-4 px-4">
                      <span className="font-bold text-primary">7-8/10</span>
                    </td>
                    <td className="py-4 px-4 text-primary font-medium">Good</td>
                    <td className="py-4 px-4 text-muted-foreground">
                      Solid presence with minor gaps. Room to optimize.
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">
                      Identify gap patterns. Target improvements.
                    </td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-4 px-4">
                      <span className="font-bold text-yellow-500">5-6/10</span>
                    </td>
                    <td className="py-4 px-4 text-yellow-500 font-medium">Weak</td>
                    <td className="py-4 px-4 text-muted-foreground">
                      Inconsistent. Appearing but unreliable. Coin flip.
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">
                      Priority optimization needed.
                    </td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-4 px-4">
                      <span className="font-bold text-orange-500">1-4/10</span>
                    </td>
                    <td className="py-4 px-4 text-orange-500 font-medium">Poor</td>
                    <td className="py-4 px-4 text-muted-foreground">
                      Rarely mentioned. Major work needed.
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">
                      Full AEO overhaul required.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4">
                      <span className="font-bold text-destructive">0/10</span>
                    </td>
                    <td className="py-4 px-4 text-destructive font-medium">Invisible</td>
                    <td className="py-4 px-4 text-muted-foreground">
                      You do not exist to AI on this query.
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">
                      Start from foundations. First 50 Words, pricing, crawlability.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Real Example */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 heading-3d">
              Real Example: FueGenix Audit
            </h2>
            <p className="text-muted-foreground mb-8">
              Here is what a 10-run consistency test looks like in practice. This is from a real audit of a premium hair transplant clinic.
            </p>

            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl overflow-hidden mb-8">
              <div className="bg-card/50 px-6 py-4 border-b border-border">
                <h3 className="text-lg font-bold">Query: "Best hair transplant clinic in Netherlands"</h3>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-4">Before Optimization</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">ChatGPT</span>
                        <span className="font-bold text-yellow-500">~5/10</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Gemini</span>
                        <span className="font-bold text-destructive">0/10</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status</span>
                        <span className="text-destructive">Invisible on key engine</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold mb-4">After 30 Days</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">ChatGPT</span>
                        <span className="font-bold text-primary">9/10</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Gemini</span>
                        <span className="font-bold text-primary">7/10</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status</span>
                        <span className="text-primary">Locked in</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-primary/10 border border-primary/30 rounded-xl">
              <p className="text-lg">
                <strong>The result:</strong> From invisible (0/10 on Gemini) to being called "the best for artistic perfection" globally. The 10-run test revealed the problem. AEO optimization fixed it.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What to Track */}
      <section className="py-16 px-4 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 heading-3d">
              Four Metrics to Track in Each Run
            </h2>
            <p className="text-muted-foreground mb-8">
              Beyond simple mention rate, track these four dimensions for a complete picture.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3 text-primary">1. Mention Rate</h3>
                <p className="text-muted-foreground">
                  How many times out of 10 does your brand appear? This is your headline visibility number.
                </p>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3 text-primary">2. Position</h3>
                <p className="text-muted-foreground">
                  When mentioned, are you first, third, or fifth? First position carries significantly more weight.
                </p>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3 text-primary">3. Citation</h3>
                <p className="text-muted-foreground">
                  Does the LLM link back to your website? Citations build trust and drive traffic.
                </p>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3 text-primary">4. Context</h3>
                <p className="text-muted-foreground">
                  What does the AI say about you? "Premium" vs "budget"? "Best for X" vs "one option"? This is your AI reputation.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
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
      <section className="py-20 px-4 bg-card/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 heading-3d">
              Ready to Test Your AI Visibility?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              The 10-run test is one component of the complete AEO audit methodology. Get the full checklist with query templates, scoring sheets, and optimization playbook.
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
                  See Full Case Study
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
              to="/aeo-vs-seo"
              className="text-primary hover:underline text-sm"
            >
              AEO vs SEO Comparison
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
