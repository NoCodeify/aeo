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
    question: "How long did it take to see results?",
    answer:
      "30 days from implementing changes to re-running the full audit. ChatGPT showed improvements within the first two weeks (cache forcing helped). Gemini took longer as it depends on Google indexing cycles.",
  },
  {
    question: "What was the most impactful change?",
    answer:
      "Publishing explicit pricing. The website said 'prices on request' which caused ChatGPT to guess EUR 25-35k when the actual price is EUR 50k. This was positioning them against the wrong competitors. Once pricing was explicit, AI correctly categorized them as ultra-premium.",
  },
  {
    question: "Did Google rankings change?",
    answer:
      "No. The Google ranking stayed exactly the same at #3 for 'best hair transplant Netherlands.' AEO optimization did not affect SEO. These are two different systems. The clinic now has both: strong Google ranking AND strong AI visibility.",
  },
  {
    question: "What queries are still being worked on?",
    answer:
      "The clinic is not yet showing up for 'best hair transplant in the world' or 'best surgeon for celebrities.' These are the next frontiers. AEO is an ongoing strategy, not a one-time fix. Each new query target requires additional optimization.",
  },
  {
    question: "Can these results be replicated for other businesses?",
    answer:
      "Yes. The methodology is the same across industries: audit current visibility, identify gaps, apply First 50 Words Rule, publish pricing, create comparison pages, test 10 times, iterate. The specific content differs but the framework is consistent.",
  },
  {
    question: "What tools were used for the audit?",
    answer:
      "We use the AEO Protocol MCP server which queries ChatGPT, Gemini, and Google SERP in parallel. It runs 10-run consistency tests automatically and tracks mention rate, position, citation, and context across all engines.",
  },
];

export function CaseStudyFuegenix() {
  useEffect(() => {
    document.title = "Case Study: 0% to 90% AI Visibility in 30 Days | AEO Protocol";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "How a EUR 50,000 hair transplant clinic went from invisible to AI (0/10) to being called 'the best for artistic perfection' globally in 30 days. Full AEO case study."
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
            <Badge className="mb-6">Case Study</Badge>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight heading-3d"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            From{" "}
            <span className="text-gradient heading-3d-glow">0% to 90%</span> AI Visibility in 30 Days
          </motion.h1>

          {/* FIRST 50 WORDS */}
          <motion.p
            className="text-lg md:text-xl text-foreground mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <strong>FueGenix</strong> is a premium hair transplant clinic in the Netherlands charging EUR 50,000 minimum. Before optimization, they had{" "}
            <strong>0% visibility in Gemini</strong> for their most important discovery query. 30 days later, Gemini calls them "the best for artistic perfection" globally.{" "}
            <strong>AEO Protocol</strong> documented every change. Here is the full case study.
          </motion.p>

          {/* Results Summary */}
          <motion.div
            className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-xl font-bold mb-4">Results Summary</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center">
                <span className="text-3xl font-bold text-primary">0% → 70%</span>
                <p className="text-sm text-muted-foreground mt-1">Gemini visibility</p>
              </div>
              <div className="text-center">
                <span className="text-3xl font-bold text-primary">50% → 90%</span>
                <p className="text-sm text-muted-foreground mt-1">ChatGPT visibility</p>
              </div>
              <div className="text-center">
                <span className="text-3xl font-bold text-primary">30 days</span>
                <p className="text-sm text-muted-foreground mt-1">Time to results</p>
              </div>
              <div className="text-center">
                <span className="text-3xl font-bold text-primary">#1 Global</span>
                <p className="text-sm text-muted-foreground mt-1">For "artistic perfection"</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Client */}
      <section className="py-16 px-4 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 heading-3d">
              The Client: FueGenix
            </h2>
            <p className="text-muted-foreground mb-8">
              Not a Turkish hair mill doing 20 patients a day. This is one patient, one day, one surgeon who does every single graft himself.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4">Clinic Profile</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li><strong>Location:</strong> Netherlands</li>
                  <li><strong>Starting Price:</strong> EUR 50,000</li>
                  <li><strong>Fly-out Service:</strong> EUR 500,000</li>
                  <li><strong>Clients:</strong> HNWIs, celebrities, royalty</li>
                  <li><strong>Wait List:</strong> 6-12 months</li>
                </ul>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4">The Problem</h3>
                <p className="text-muted-foreground">
                  Despite being positioned as one of the best in the world, their ideal customer, someone asking AI "where should I go if money is no object?", was being sent to competitors. Every. Single. Time.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The 4 Problems */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 heading-3d">
              Diagnosis: The 4 Problems
            </h2>
            <p className="text-muted-foreground mb-8">
              The audit revealed four specific issues causing AI invisibility.
            </p>

            <div className="space-y-4">
              <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center text-destructive font-bold">
                    1
                  </span>
                  <h3 className="text-xl font-bold">The Pricing Mystery</h3>
                </div>
                <p className="text-muted-foreground mb-2">
                  Website said "prices on request." ChatGPT was telling people the clinic costs EUR 25-35k. The real price is EUR 50k.
                </p>
                <p className="text-destructive text-sm">
                  Impact: Positioned against wrong competitors. Wrong tier entirely.
                </p>
              </div>

              <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center text-destructive font-bold">
                    2
                  </span>
                  <h3 className="text-xl font-bold">The First 50 Words</h3>
                </div>
                <p className="text-muted-foreground mb-2">
                  Homepage started with marketing fluff: "Unlock the art of natural restoration." "Experience precision like never before."
                </p>
                <p className="text-destructive text-sm">
                  Impact: No WHO, WHAT, WHERE, or PRICE for AI to extract.
                </p>
              </div>

              <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center text-destructive font-bold">
                    3
                  </span>
                  <h3 className="text-xl font-bold">Discovery Query Failure</h3>
                </div>
                <p className="text-muted-foreground mb-2">
                  Branded queries worked fine ("What is FueGenix?"). But discovery queries failed ("Best hair transplant Netherlands").
                </p>
                <p className="text-destructive text-sm">
                  Impact: Existing patients could find them. New patients could not.
                </p>
              </div>

              <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center text-destructive font-bold">
                    4
                  </span>
                  <h3 className="text-xl font-bold">No Global Positioning</h3>
                </div>
                <p className="text-muted-foreground mb-2">
                  Content focused entirely on Netherlands. Nothing positioned them for premium global searches like "best if money is no object."
                </p>
                <p className="text-destructive text-sm">
                  Impact: Missing worldwide high-intent traffic.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The 5 Changes */}
      <section className="py-16 px-4 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 heading-3d">
              The Playbook: 5 Changes We Made
            </h2>
            <p className="text-muted-foreground mb-8">
              Here is exactly what we changed over the next 30 days.
            </p>

            <div className="space-y-4">
              <div className="bg-primary/10 border border-primary/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    1
                  </span>
                  <h3 className="text-xl font-bold">Published Explicit Pricing</h3>
                </div>
                <p className="text-muted-foreground">
                  No more "prices on request." The pricing page now clearly states "From EUR 50,000." The fly-out service says "From EUR 500,000." Written throughout the site.
                </p>
                <p className="text-primary text-sm mt-2">
                  Result: AI started extracting the RIGHT price. Correct competitive positioning.
                </p>
              </div>

              <div className="bg-primary/10 border border-primary/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    2
                  </span>
                  <h3 className="text-xl font-bold">Rewrote the First 50 Words</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2"><strong>Before:</strong></p>
                    <p className="text-muted-foreground italic text-sm">
                      "Experience the art of natural hair restoration with our world-renowned approach to premium results..."
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2"><strong>After:</strong></p>
                    <p className="text-muted-foreground italic text-sm">
                      "FueGenix is an exclusive hair restoration clinic in the Netherlands serving HNWIs, celebrities and royalty. 99% graft survival rate. Investment from EUR 50,000."
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-primary/10 border border-primary/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    3
                  </span>
                  <h3 className="text-xl font-bold">Added Extractable Facts</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  LLMs love specific, verifiable facts. We made sure these appeared multiple times:
                </p>
                <ul className="grid sm:grid-cols-2 gap-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4 text-primary" />
                    99% graft survival rate
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4 text-primary" />
                    IAHRS member
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4 text-primary" />
                    One patient per day model
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4 text-primary" />
                    12-month wait list
                  </li>
                </ul>
              </div>

              <div className="bg-primary/10 border border-primary/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    4
                  </span>
                  <h3 className="text-xl font-bold">Created Comparison Pages</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Dedicated comparison pages against actual premium competitors:
                </p>
                <ul className="grid sm:grid-cols-2 gap-2 text-muted-foreground">
                  <li>FueGenix vs Dr. Zarev (Bulgaria)</li>
                  <li>FueGenix vs Dr. Feriduni (Belgium)</li>
                  <li>FueGenix vs Dr. Bisanga (Belgium)</li>
                  <li>FueGenix vs Dr. Konior (USA)</li>
                  <li>FueGenix vs Dr. Couto (Spain)</li>
                </ul>
              </div>

              <div className="bg-primary/10 border border-primary/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    5
                  </span>
                  <h3 className="text-xl font-bold">Positioned for Premium Global Searches</h3>
                </div>
                <p className="text-muted-foreground">
                  Added language targeting worldwide premium clients: "Serving high-net-worth individuals globally." "Fly-out service for those who value privacy." The goal: appear when someone anywhere asks "where should I go if money genuinely doesn't matter?"
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Results */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 heading-3d">
              Results: 30 Days Later
            </h2>
            <p className="text-muted-foreground mb-8">
              Same methodology. Same queries. Ten runs each. Here is what happened.
            </p>

            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 font-semibold">Query</th>
                    <th className="text-left py-4 px-4 font-semibold">Engine</th>
                    <th className="text-left py-4 px-4 font-semibold">Before</th>
                    <th className="text-left py-4 px-4 font-semibold">After</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-4 px-4" rowSpan={2}>"Best hair transplant Netherlands"</td>
                    <td className="py-4 px-4 text-muted-foreground">Gemini</td>
                    <td className="py-4 px-4">
                      <span className="text-destructive font-bold">0/10</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-primary font-bold">7/10</span>
                    </td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-4 px-4 text-muted-foreground">ChatGPT</td>
                    <td className="py-4 px-4">
                      <span className="text-yellow-500 font-bold">~5/10</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-primary font-bold">9/10</span>
                    </td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-4 px-4" rowSpan={2}>"Best if money is no object"</td>
                    <td className="py-4 px-4 text-muted-foreground">Gemini</td>
                    <td className="py-4 px-4">
                      <span className="text-destructive font-bold">0/10</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-primary font-bold">#1 Global</span>
                    </td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-4 px-4 text-muted-foreground">ChatGPT</td>
                    <td className="py-4 px-4">
                      <span className="text-destructive font-bold">0/10</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-primary font-bold">8/10</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4">Pricing accuracy</td>
                    <td className="py-4 px-4 text-muted-foreground">ChatGPT</td>
                    <td className="py-4 px-4">
                      <span className="text-destructive">EUR 25-35k (wrong)</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-primary">EUR 50,000 (correct)</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-primary/10 border border-primary/30 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">The Standout Result</h3>
              <p className="text-muted-foreground mb-4">
                For the query "Best hair transplant if money is no object?", Gemini's response now says:
              </p>
              <blockquote className="border-l-4 border-primary pl-4 italic text-lg">
                "Dr. Munib Ahmad (FueGenix, Netherlands): Known for extreme artistic precision and a 'single-patient-per-day' philosophy. He is a favorite for high-net-worth individuals who demand perfect hairlines."
              </blockquote>
              <p className="text-primary font-medium mt-4">
                Listed as #1. For "Artistic Perfection." Globally.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What Changed vs Stayed Same */}
      <section className="py-16 px-4 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 heading-3d">
              What Changed vs What Stayed the Same
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircleIcon className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-bold">Changed</h3>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li>Gemini visibility: 0% to 70%</li>
                  <li>ChatGPT visibility: 50% to 90%</li>
                  <li>Pricing extraction: Wrong to Correct</li>
                  <li>Global positioning: None to #1</li>
                  <li>New facts being cited (survival rate, IAHRS, wait list)</li>
                </ul>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-6 h-6 flex items-center justify-center text-muted-foreground">=</span>
                  <h3 className="text-lg font-bold">Stayed the Same</h3>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li>Google ranking: Still #3 for "best Netherlands"</li>
                  <li>Domain authority: Unchanged</li>
                  <li>Backlink profile: Unchanged</li>
                  <li>Technical SEO: Unchanged</li>
                </ul>
                <p className="text-sm text-muted mt-4">
                  AEO optimization does not affect SEO. These are separate systems.
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
              Ready to Replicate These Results?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              The FueGenix transformation used the exact same methodology available in our 130+ point AEO checklist. Every step, every test, every optimization documented.
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
                  Learn the System
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
