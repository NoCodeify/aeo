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
    question: "What is included in an AEO audit?",
    answer:
      "An AEO audit includes: 10-run consistency testing across ChatGPT and Gemini, First 50 Words analysis of key pages, technical crawler access verification, content extractability assessment, competitor visibility comparison, and a prioritized action playbook.",
  },
  {
    question: "How long does an AEO audit take?",
    answer:
      "A comprehensive AEO audit typically takes 1-2 weeks. This includes running multiple query tests (each query tested 10 times), analyzing your website content, reviewing technical setup, and compiling the findings into an actionable playbook.",
  },
  {
    question: "What queries do you test?",
    answer:
      "We test your 'dream queries' (the questions you want to be recommended for), category discovery queries (e.g., 'best [category] in [location]'), comparison queries (e.g., '[your brand] vs [competitor]'), and branded queries to assess accuracy.",
  },
  {
    question: "Why test each query 10 times?",
    answer:
      "LLM responses vary. A single test gives you a snapshot, not the full picture. Our 10-run consistency test reveals your true mention rate, position consistency, and how your brand is described across multiple responses.",
  },
  {
    question: "What is a visibility score?",
    answer:
      "Your visibility score is the percentage of times your brand is mentioned when tested 10 times per query. A score of 90% means you appeared in 9 out of 10 responses. The industry average is just 47%.",
  },
  {
    question: "Do you audit both ChatGPT and Gemini?",
    answer:
      "Yes. ChatGPT and Gemini use different retrieval architectures (cache-based vs grounding-based), so visibility in one does not guarantee visibility in the other. We test both and provide specific recommendations for each.",
  },
];

const AUDIT_COMPONENTS = [
  {
    title: "10-Run Consistency Test",
    description: "Each discovery query tested 10 times across ChatGPT and Gemini to measure true visibility rate.",
    metrics: ["Mention rate", "Position consistency", "Description accuracy"],
  },
  {
    title: "First 50 Words Analysis",
    description: "Review of your homepage and key pages against the WHO/WHAT/WHERE/PRICE framework.",
    metrics: ["Brand clarity", "Service description", "Location signals", "Pricing presence"],
  },
  {
    title: "Technical Crawler Audit",
    description: "Verification that AI crawlers can access and extract your content.",
    metrics: ["robots.txt configuration", "JavaScript rendering", "Server response codes"],
  },
  {
    title: "Content Extractability",
    description: "Assessment of how well your content structure supports LLM extraction.",
    metrics: ["Heading hierarchy", "Table presence", "Schema markup", "Fact density"],
  },
  {
    title: "Competitor Comparison",
    description: "Visibility analysis of your top competitors to identify gaps and opportunities.",
    metrics: ["Share of voice", "Positioning differences", "Content gaps"],
  },
  {
    title: "Action Playbook",
    description: "Prioritized recommendations with expected impact and implementation difficulty.",
    metrics: ["Quick wins", "Strategic priorities", "Long-term investments"],
  },
];

export function AEOAudit() {
  useEffect(() => {
    document.title = "AEO Audit: Measure Your AI Visibility | AEO Protocol";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Get an AEO audit to measure your brand's visibility in ChatGPT and Gemini. 10-run consistency testing, First 50 Words analysis, and a prioritized action playbook."
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
            <Badge className="mb-6">Service</Badge>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight heading-3d"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="text-gradient heading-3d-glow">AEO Audit</span>: Measure Your AI Visibility
          </motion.h1>

          {/* FIRST 50 WORDS */}
          <motion.p
            className="text-lg md:text-xl text-foreground mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <strong>An AEO audit measures how visible your brand is to ChatGPT and Gemini.</strong> AEO Protocol's methodology tests each query 10 times to account for LLM response variation. Our audits have helped clients go from <strong>0% to 90% visibility in 30 days</strong>. This page explains what is included and how it works.
          </motion.p>

          {/* Key Takeaways */}
          <motion.div
            className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-xl font-bold mb-4">What You Get</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  10-run consistency test across your dream queries
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  Visibility scores for both ChatGPT and Gemini
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  First 50 Words analysis of homepage and key pages
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  Prioritized action playbook with expected impact
                </span>
              </li>
            </ul>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <a href="mailto:hello@aeoprotocol.ai?subject=AEO Audit Inquiry">
              <Button size="lg">
                Request an Audit
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Button>
            </a>
            <Link to="/checklist">
              <Button variant="outline" size="lg">
                Get Free Checklist First
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Audit Components */}
      <section className="py-16 px-4 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 heading-3d">
              What is Included
            </h2>
            <p className="text-muted-foreground mb-8">
              Every AEO audit includes these six components, tailored to your industry and target queries.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {AUDIT_COMPONENTS.map((component, index) => (
                <motion.div
                  key={component.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6"
                >
                  <h3 className="text-lg font-bold mb-2">{component.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{component.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {component.metrics.map((metric) => (
                      <Badge key={metric} variant="outline" className="text-xs">
                        {metric}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Process */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 heading-3d">
              The Audit Process
            </h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Intake Call</h3>
                  <p className="text-muted-foreground">
                    We discuss your business, identify your dream queries (the questions you want
                    to be recommended for), and understand your competitive landscape.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Visibility Testing</h3>
                  <p className="text-muted-foreground">
                    We run your dream queries 10 times each across ChatGPT and Gemini, tracking
                    mention rate, position, and how your brand is described.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Content Analysis</h3>
                  <p className="text-muted-foreground">
                    We analyze your website content against our First 50 Words framework and
                    assess technical factors like crawler access and content extractability.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Playbook Delivery</h3>
                  <p className="text-muted-foreground">
                    We deliver a prioritized action playbook with specific recommendations,
                    expected impact, and implementation guidance. We walk through findings live.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results Example */}
      <section className="py-16 px-4 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 heading-3d">
              Real Results: From 0% to 90%
            </h2>
            <p className="text-muted-foreground mb-8">
              FueGenix, a premium hair restoration clinic, went from completely invisible
              to 90% visibility in ChatGPT within 30 days of implementing their audit playbook.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-6 text-center">
                <span className="text-4xl font-bold text-destructive">0%</span>
                <p className="text-muted-foreground mt-2">Before Audit</p>
                <p className="text-sm text-muted-foreground">Not mentioned in any discovery query</p>
              </div>
              <div className="bg-primary/10 border border-primary/30 rounded-xl p-6 text-center">
                <span className="text-4xl font-bold text-primary">90%</span>
                <p className="text-muted-foreground mt-2">After Implementation</p>
                <p className="text-sm text-muted-foreground">Mentioned in 9/10 queries</p>
              </div>
            </div>

            <Link to="/case-study/fuegenix" className="text-primary hover:underline">
              Read the full FueGenix case study
            </Link>
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
              Ready to Measure Your AI Visibility?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Find out where you stand. Get a comprehensive AEO audit with actionable
              recommendations to improve your visibility in ChatGPT and Gemini.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:hello@aeoprotocol.ai?subject=AEO Audit Inquiry">
                <Button size="lg">
                  Request an Audit
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Button>
              </a>
              <Link to="/aeo-consulting">
                <Button variant="outline" size="lg">
                  Learn About Consulting
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
              to="/10-run-consistency-test"
              className="text-primary hover:underline text-sm"
            >
              10-Run Consistency Test
            </Link>
            <span className="text-muted">|</span>
            <Link
              to="/first-50-words-rule"
              className="text-primary hover:underline text-sm"
            >
              First 50 Words Rule
            </Link>
            <span className="text-muted">|</span>
            <Link
              to="/case-study/fuegenix"
              className="text-primary hover:underline text-sm"
            >
              Case Study: 0% to 90%
            </Link>
            <span className="text-muted">|</span>
            <Link
              to="/aeo-consulting"
              className="text-primary hover:underline text-sm"
            >
              AEO Consulting Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
