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
    question: "What makes AEO Protocol different from other consultants?",
    answer:
      "We developed our methodology by reverse-engineering how ChatGPT, Gemini, Claude, and Perplexity retrieve and cite content. Our approach is based on primary research (auditing 100+ brands) and real client results (0% to 90% visibility in 30 days), not theory.",
  },
  {
    question: "Who is AEO consulting for?",
    answer:
      "AEO consulting is for businesses that want to be recommended by AI assistants. This includes premium service providers, B2B companies, healthcare practices, consultancies, and any brand competing for discovery queries like 'best [category] in [location]'.",
  },
  {
    question: "How long does it take to see results?",
    answer:
      "ChatGPT visibility can improve within days using cache-forcing techniques. Gemini visibility depends on Google indexing and typically takes 2-4 weeks. We have seen clients go from 0% to 90% visibility in 30 days with focused implementation.",
  },
  {
    question: "Do you offer implementation or just strategy?",
    answer:
      "Both. We offer audit-only engagements (strategy and playbook) as well as full implementation where we work directly with your team or handle content updates ourselves. The approach depends on your internal resources.",
  },
  {
    question: "What industries do you work with?",
    answer:
      "We work across industries, with particular expertise in healthcare, professional services, SaaS, and premium B2C brands. Our methodology applies to any business that competes for AI discovery queries.",
  },
  {
    question: "Is this the same as SEO?",
    answer:
      "AEO builds on SEO but optimizes for different outcomes. SEO gets you ranked in Google. AEO gets you recommended by ChatGPT and Gemini. You need both, but they require different strategies. We can help with both.",
  },
];

const SERVICES = [
  {
    title: "AEO Audit",
    description: "Comprehensive visibility assessment with 10-run consistency testing, First 50 Words analysis, and prioritized action playbook.",
    deliverables: ["Visibility scores", "Content analysis", "Action playbook"],
    link: "/aeo-audit",
  },
  {
    title: "Implementation Support",
    description: "Hands-on help executing your AEO playbook, including content rewrites, technical fixes, and cache-forcing.",
    deliverables: ["Content optimization", "Technical setup", "Weekly check-ins"],
    link: null,
  },
  {
    title: "Ongoing Monitoring",
    description: "Monthly visibility tracking with 10-run consistency tests, competitor monitoring, and strategy adjustments.",
    deliverables: ["Monthly reports", "Trend analysis", "Optimization recommendations"],
    link: null,
  },
];

export function AEOConsulting() {
  useEffect(() => {
    document.title = "AEO Consulting: Get Recommended by ChatGPT and Gemini | AEO Protocol";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "AEO Protocol consulting helps brands get recommended by ChatGPT and Gemini. Methodology based on 100+ audits. Clients have gone from 0% to 90% visibility."
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
            <Badge className="mb-6">Services</Badge>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight heading-3d"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="text-gradient heading-3d-glow">AEO Consulting</span>: Be the AI's Answer
          </motion.h1>

          {/* FIRST 50 WORDS */}
          <motion.p
            className="text-lg md:text-xl text-foreground mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <strong>AEO Protocol helps brands get recommended by ChatGPT and Gemini.</strong> Founded by Sohaib Ahmad after auditing 100+ brands, our methodology has taken clients from <strong>0% to 90% visibility in 30 days</strong>. We developed AEO after AI convinced us to change a major purchase decision. If it can change ours, it is changing your customers' decisions too.
          </motion.p>

          {/* Key Stats */}
          <motion.div
            className="grid sm:grid-cols-3 gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-4 text-center">
              <span className="text-3xl font-bold text-primary">100+</span>
              <p className="text-sm text-muted-foreground">Brands Audited</p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-4 text-center">
              <span className="text-3xl font-bold text-primary">0% to 90%</span>
              <p className="text-sm text-muted-foreground">Visibility Improvement</p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-4 text-center">
              <span className="text-3xl font-bold text-primary">30 Days</span>
              <p className="text-sm text-muted-foreground">Time to Results</p>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <a href="mailto:hello@aeoprotocol.ai?subject=AEO Consulting Inquiry">
              <Button size="lg">
                Start a Conversation
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Button>
            </a>
            <Link to="/checklist">
              <Button variant="outline" size="lg">
                Get Free Checklist
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-16 px-4 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 heading-3d">
              Why We Started AEO Protocol
            </h2>

            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 mb-6">
              <p className="text-lg leading-relaxed mb-4">
                I was on my second BMW. Going to buy another one. I asked ChatGPT for advice.
              </p>
              <p className="text-lg leading-relaxed mb-4">
                It convinced me to buy a Porsche Boxster instead.
              </p>
              <p className="text-lg leading-relaxed mb-4 text-primary font-medium">
                If AI can change MY buying decision, what is it doing to my clients' businesses?
              </p>
              <p className="text-muted-foreground">
                That question led to auditing 100+ brands across ChatGPT and Gemini. The findings
                were stark: 53% of well-known brands are completely invisible to AI. The brands
                that are visible share common patterns. We turned those patterns into a methodology.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 heading-3d">
              How We Work
            </h2>
            <p className="text-muted-foreground mb-8">
              We offer three levels of engagement depending on your needs and internal resources.
            </p>

            <div className="space-y-6">
              {SERVICES.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold">{service.title}</h3>
                    {service.link && (
                      <Link to={service.link} className="text-primary hover:underline text-sm">
                        Learn more
                      </Link>
                    )}
                  </div>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.deliverables.map((deliverable) => (
                      <Badge key={deliverable} variant="outline" className="text-xs">
                        {deliverable}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Methodology Overview */}
      <section className="py-16 px-4 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 heading-3d">
              The AEO Protocol Methodology
            </h2>
            <p className="text-muted-foreground mb-8">
              Our approach is based on reverse-engineering how ChatGPT, Gemini, Claude, and
              Perplexity retrieve and cite content. Key principles include:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircleIcon className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-bold">First 50 Words Rule</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  LLMs weight the beginning of content heavily. WHO, WHAT, WHERE, and PRICE
                  must be in the first 50 words of key pages.
                </p>
                <Link to="/first-50-words-rule" className="text-primary hover:underline text-sm mt-2 inline-block">
                  Learn more
                </Link>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircleIcon className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-bold">10-Run Consistency Test</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  LLM responses vary. We test each query 10 times to measure true visibility
                  rate, not a single snapshot.
                </p>
                <Link to="/10-run-consistency-test" className="text-primary hover:underline text-sm mt-2 inline-block">
                  Learn more
                </Link>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircleIcon className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-bold">3-Layer Architecture</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  ChatGPT uses Bing Index, OAI-SearchBot Cache, and User Fetches. Understanding
                  these layers is critical for optimization.
                </p>
                <Link to="/3-layer-chatgpt-architecture" className="text-primary hover:underline text-sm mt-2 inline-block">
                  Learn more
                </Link>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircleIcon className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-bold">Cache Forcing</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Techniques to update ChatGPT's cached content within minutes, not weeks.
                  Critical for time-sensitive updates.
                </p>
                <Link to="/how-to-optimize-for-chatgpt" className="text-primary hover:underline text-sm mt-2 inline-block">
                  Learn more
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Case Study Highlight */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 heading-3d">
              Client Results
            </h2>

            <div className="bg-card/50 backdrop-blur-sm border border-primary/50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-primary text-primary-foreground">Case Study</Badge>
                <h3 className="text-xl font-bold">FueGenix Hair Restoration</h3>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <span className="text-3xl font-bold text-destructive">0%</span>
                  <p className="text-sm text-muted-foreground">Starting Visibility</p>
                </div>
                <div className="text-center">
                  <span className="text-3xl font-bold text-primary">90%</span>
                  <p className="text-sm text-muted-foreground">Final Visibility</p>
                </div>
                <div className="text-center">
                  <span className="text-3xl font-bold text-foreground">30 Days</span>
                  <p className="text-sm text-muted-foreground">Time to Results</p>
                </div>
              </div>

              <p className="text-muted-foreground mb-4">
                FueGenix, a premium hair restoration clinic in the Netherlands, was completely
                invisible to ChatGPT for discovery queries like "best hair transplant clinic in Europe."
                After implementing our playbook, they achieved 90% visibility in 30 days.
              </p>

              <Link to="/case-study/fuegenix" className="text-primary hover:underline">
                Read the full case study
              </Link>
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
              Ready to Be the AI's Answer?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start with a conversation. We will discuss your goals, assess your current
              visibility, and determine if AEO consulting is the right fit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:hello@aeoprotocol.ai?subject=AEO Consulting Inquiry">
                <Button size="lg">
                  Start a Conversation
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Button>
              </a>
              <Link to="/aeo-audit">
                <Button variant="outline" size="lg">
                  Start With an Audit
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
              to="/aeo-audit"
              className="text-primary hover:underline text-sm"
            >
              AEO Audit Service
            </Link>
            <span className="text-muted">|</span>
            <Link
              to="/100-brands-audit"
              className="text-primary hover:underline text-sm"
            >
              100 Brands Research
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
              to="/checklist"
              className="text-primary hover:underline text-sm"
            >
              Free AEO Checklist
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
