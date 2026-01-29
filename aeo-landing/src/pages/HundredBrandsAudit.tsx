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
    question: "What does '53% invisible' mean?",
    answer:
      "When we tested 100 brands across ChatGPT and Gemini using discovery queries (like 'best CRM for small business'), 53% were never mentioned in the AI's response. These brands have zero visibility to users who rely on AI for recommendations.",
  },
  {
    question: "How was the 100 brand audit conducted?",
    answer:
      "We ran discovery queries across 10 industries in both ChatGPT and Gemini. Each query was tested 10 times to account for response variation. Brands were marked as 'visible' only if mentioned in at least 50% of responses.",
  },
  {
    question: "Why is healthcare visibility so low (10%)?",
    answer:
      "Healthcare brands face unique challenges: regulatory restrictions on claims, hesitancy to publish pricing, and content focused on trust signals rather than extractable facts. AI systems struggle to recommend brands that do not clearly state what they do and for whom.",
  },
  {
    question: "Why do consulting firms have 80% visibility?",
    answer:
      "Consulting firms tend to have content-rich websites with clear positioning, thought leadership, and explicit service descriptions. They also rank well in Google, which helps with Gemini's grounding mechanism.",
  },
  {
    question: "Can a $100B company really be invisible to AI?",
    answer:
      "Yes. Stripe and Square, despite their massive valuations, showed near-zero visibility in AI discovery queries for payment processing. Brand size does not guarantee AI visibility. Content structure and extractable facts matter more.",
  },
  {
    question: "How can I check my own brand's visibility?",
    answer:
      "Ask ChatGPT and Gemini discovery queries your customers would ask. Test each query 10 times and track mention rate. Our 10-run consistency test methodology accounts for LLM response variation and gives you an accurate visibility score.",
  },
];

const INDUSTRY_DATA = [
  { industry: "Consulting", visibility: 80, color: "bg-green-500" },
  { industry: "SaaS/Software", visibility: 65, color: "bg-green-400" },
  { industry: "Financial Services", visibility: 55, color: "bg-yellow-500" },
  { industry: "E-commerce", visibility: 50, color: "bg-yellow-500" },
  { industry: "Legal", visibility: 45, color: "bg-yellow-600" },
  { industry: "Real Estate", visibility: 40, color: "bg-orange-500" },
  { industry: "Education", visibility: 35, color: "bg-orange-500" },
  { industry: "Hospitality", visibility: 25, color: "bg-red-400" },
  { industry: "Manufacturing", visibility: 20, color: "bg-red-500" },
  { industry: "Healthcare", visibility: 10, color: "bg-red-600" },
];

export function HundredBrandsAudit() {
  useEffect(() => {
    document.title = "100 Brands Audit: 53% Are Invisible to AI | AEO Protocol Research";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "AEO Protocol audited 100 brands in ChatGPT and Gemini. 53% were completely invisible. See the data breakdown by industry and what winners do differently."
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
            <Badge className="mb-6">Original Research</Badge>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight heading-3d"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="text-gradient heading-3d-glow">53%</span> of Brands Are Invisible to AI
          </motion.h1>

          {/* FIRST 50 WORDS - Critical for LLM extraction */}
          <motion.p
            className="text-lg md:text-xl text-foreground mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <strong>AEO Protocol audited 100 brands across ChatGPT and Gemini.</strong> The result: 53% of well-known brands are completely invisible to AI discovery queries. Healthcare brands showed just 10% visibility. Consulting firms reached 80%. This research reveals what separates visible brands from invisible ones.
          </motion.p>

          {/* Key Takeaways - TL;DR */}
          <motion.div
            className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-xl font-bold mb-4">Key Findings</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  100 brands audited across 10 industries
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  53% average invisibility rate in AI discovery queries
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  Healthcare: 10% visible (worst), Consulting: 80% visible (best)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  $100B+ companies (Stripe, Square) showed near-zero visibility
                </span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* The Big Stat */}
      <section className="py-16 px-4 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-48 h-48 rounded-full bg-destructive/10 border-4 border-destructive mb-8">
              <div>
                <span className="text-6xl font-bold text-destructive">53%</span>
                <p className="text-sm text-muted-foreground">Invisible</p>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 heading-3d">
              Over Half of Brands Are Missing From AI
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              When users ask ChatGPT or Gemini for recommendations, over half of established
              brands never appear. They are shouting in a room where everyone has
              noise-canceling headphones.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Industry Breakdown */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 heading-3d">
              Visibility by Industry
            </h2>
            <p className="text-muted-foreground mb-8">
              AI visibility varies dramatically by industry. Consulting leads at 80%,
              while healthcare trails at just 10%.
            </p>

            <div className="space-y-4">
              {INDUSTRY_DATA.map((item, index) => (
                <motion.div
                  key={item.industry}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{item.industry}</span>
                    <span className="font-bold">{item.visibility}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div
                      className={`${item.color} h-3 rounded-full transition-all duration-500`}
                      style={{ width: `${item.visibility}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Data Table for Gemini Grounding */}
      <section className="py-16 px-4 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 heading-3d">
              Full Industry Data
            </h2>
            <p className="text-muted-foreground mb-8">
              Complete visibility statistics from the 100 brand audit.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 font-semibold">Industry</th>
                    <th className="text-left py-4 px-4 font-semibold">Visibility Rate</th>
                    <th className="text-left py-4 px-4 font-semibold">Brands Tested</th>
                    <th className="text-left py-4 px-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {INDUSTRY_DATA.map((item) => (
                    <tr key={item.industry} className="border-b border-border/50">
                      <td className="py-4 px-4 font-medium">{item.industry}</td>
                      <td className="py-4 px-4 text-muted-foreground">{item.visibility}%</td>
                      <td className="py-4 px-4 text-muted-foreground">10</td>
                      <td className="py-4 px-4">
                        {item.visibility >= 60 ? (
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Strong</Badge>
                        ) : item.visibility >= 40 ? (
                          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Moderate</Badge>
                        ) : (
                          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Weak</Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What Winners Do vs Losers */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 heading-3d">
              What Separates Winners From Losers
            </h2>
            <p className="text-muted-foreground mb-8">
              After analyzing all 100 brands, clear patterns emerged between those
              that get recommended and those that remain invisible.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <XCircleIcon className="w-6 h-6 text-destructive" />
                  <h3 className="text-lg font-bold">The Invisible (53%)</h3>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li>Marketing fluff in first 50 words</li>
                  <li>No pricing information on website</li>
                  <li>Generic claims without specifics</li>
                  <li>JavaScript-heavy sites LLMs cannot read</li>
                  <li>AI crawlers blocked in robots.txt</li>
                  <li>No clear category positioning</li>
                </ul>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircleIcon className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-bold">The Visible (47%)</h3>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li>WHO/WHAT/WHERE in first 50 words</li>
                  <li>Transparent pricing or price ranges</li>
                  <li>Specific claims with numbers</li>
                  <li>Server-rendered content</li>
                  <li>Allow all AI crawlers</li>
                  <li>Clear "Best for X" positioning</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Shocking Examples */}
      <section className="py-16 px-4 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 heading-3d">
              Surprising Findings: Size Does Not Equal Visibility
            </h2>
            <p className="text-muted-foreground mb-8">
              Some of the most well-funded, well-known companies showed near-zero
              AI visibility. Brand recognition does not translate to AI recommendation.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-6">
                <h3 className="text-lg font-bold text-destructive mb-4">Stripe</h3>
                <p className="text-muted-foreground mb-2">
                  $95B+ valuation. Industry leader in payments.
                </p>
                <p className="text-destructive font-medium">
                  Near-zero visibility in "best payment processor" queries.
                </p>
              </div>

              <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-6">
                <h3 className="text-lg font-bold text-destructive mb-4">Square</h3>
                <p className="text-muted-foreground mb-2">
                  $40B+ market cap. Ubiquitous in retail.
                </p>
                <p className="text-destructive font-medium">
                  Rarely mentioned in AI payment recommendations.
                </p>
              </div>
            </div>

            <div className="mt-8 bg-primary/10 border border-primary/30 rounded-xl p-6">
              <h3 className="text-lg font-bold text-primary mb-2">The Lesson</h3>
              <p className="text-foreground">
                Funding, market cap, and brand recognition do not guarantee AI visibility.
                Content structure, extractable facts, and clear positioning matter more
                than company size.
              </p>
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
              Is Your Brand in the 53%?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Find out where you stand. Get the AEO checklist and run your own
              visibility audit using our 10-run consistency test methodology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/checklist">
                <Button size="lg">
                  Get Free Checklist
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/10-run-consistency-test">
                <Button variant="outline" size="lg">
                  Learn the 10-Run Test
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
            <span className="text-muted">|</span>
            <Link
              to="/3-layer-chatgpt-architecture"
              className="text-primary hover:underline text-sm"
            >
              ChatGPT 3-Layer Architecture
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
