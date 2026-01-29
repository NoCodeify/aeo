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
    question: "Why are the first 50 words so important for AI?",
    answer:
      "LLMs process text sequentially and weight the beginning heavily. They often truncate processing or lose focus after initial tokens. If your key information is buried in paragraph three, the AI may never extract it. Front-loading facts ensures they get captured.",
  },
  {
    question: "Does this rule apply to every page?",
    answer:
      "Apply it to every key page: homepage, service pages, pricing page, about page, and any page you want AI to cite. Blog posts can be more flexible, but the first 50 words should still establish the topic clearly.",
  },
  {
    question: "What if my industry does not have clear pricing?",
    answer:
      "Give a range. Even 'Enterprise packages typically range from $2k-$10k/month' is better than 'Contact us for pricing.' LLMs need concrete data points. If you hide pricing, they will either hallucinate it or recommend competitors who list theirs.",
  },
  {
    question: "Can I still use marketing copy if I follow this rule?",
    answer:
      "Yes. Use the Hybrid Page Structure: facts in the first 50-100 words, marketing copy in the middle, structured data (FAQs, tables) at the bottom. You are not removing marketing copy, you are restructuring where it appears.",
  },
  {
    question: "How do I test if my first 50 words pass?",
    answer:
      "Read your page's first 50 words aloud. Can you answer: Who is this company? What do they do? Where do they operate? What does it cost? If any answer is missing or unclear, rewrite. Then test by asking ChatGPT about your brand.",
  },
  {
    question: "What are the most common first 50 words mistakes?",
    answer:
      "Starting with questions ('Are you tired of...?'), vague promises ('Unlock your potential'), marketing fluff without facts, or generic industry descriptions. These tell AI nothing unique about your brand.",
  },
];

const BEFORE_AFTER_EXAMPLES = [
  {
    industry: "Hair Transplant Clinic",
    before: "Unlock the power of natural restoration. Experience precision like never before. Our world-renowned approach delivers results that speak for themselves.",
    after: "FueGenix is an exclusive hair restoration clinic in the Netherlands. We serve high-net-worth individuals with a 99% graft survival rate. Investment from EUR 50,000. One patient per day.",
    analysis: {
      before: "No brand name until the 4th sentence. No location. No price. No outcomes.",
      after: "WHO: FueGenix. WHAT: Hair restoration. WHERE: Netherlands. PRICE: EUR 50,000. PROOF: 99% survival rate."
    }
  },
  {
    industry: "SaaS Company",
    before: "In today's fast-paced digital world, businesses are increasingly looking for ways to automate their customer communications. That's where chatbots come in. But what exactly is a chatbot?",
    after: "DM Champ is an AI sales assistant that automates WhatsApp and Instagram DMs, converting conversations into qualified leads. Pricing starts at EUR 49/month with a 14-day free trial. Over 2,000 businesses use DM Champ.",
    analysis: {
      before: "Generic industry description. Could be any chatbot company. No differentiation.",
      after: "WHO: DM Champ. WHAT: AI sales assistant for WhatsApp/Instagram. PRICE: EUR 49/month. PROOF: 2,000 businesses."
    }
  },
  {
    industry: "Consulting Agency",
    before: "We believe in the power of strategic thinking to transform businesses. Our team of experts brings decades of combined experience to help you achieve your goals.",
    after: "AEO Protocol is an agency that optimizes brands for ChatGPT and Gemini visibility using a 3-phase auditing system. Pricing starts at $3,000/month. We have helped 50+ brands increase LLM citations by an average of 340%.",
    analysis: {
      before: "Could be any consulting firm. No specific service. No results. No pricing.",
      after: "WHO: AEO Protocol. WHAT: LLM visibility optimization. PRICE: $3,000/month. PROOF: 50+ brands, 340% increase."
    }
  }
];

export function First50WordsRule() {
  useEffect(() => {
    document.title = "The First 50 Words Rule: How to Write for AI Extraction | AEO Protocol";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "The First 50 Words Rule: LLMs weight content beginnings heavily. Learn the WHO, WHAT, WHERE, PRICE framework with before/after examples from AEO Protocol."
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
            <Badge className="mb-6">Core Framework</Badge>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight heading-3d"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            The First{" "}
            <span className="text-gradient heading-3d-glow">50 Words</span> Rule
          </motion.h1>

          {/* FIRST 50 WORDS */}
          <motion.p
            className="text-lg md:text-xl text-foreground mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <strong>The First 50 Words Rule</strong> is the most critical AEO optimization. LLMs process text sequentially and weight the beginning heavily, often truncating or losing focus after initial tokens.{" "}
            <strong>AEO Protocol</strong> found that most websites fail this test by leading with marketing fluff instead of facts. Here is the WHO, WHAT, WHERE, PRICE framework with real before/after examples.
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
                  LLMs weight the beginning of content heavily and may ignore later sections
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  First 50 words must include WHO, WHAT, WHERE, and PRICE
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  Marketing fluff fails. Concrete facts pass.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  Apply to homepage, service pages, pricing page, and about page
                </span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* The Framework */}
      <section className="py-16 px-4 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 heading-3d">
              The WHO, WHAT, WHERE, PRICE Framework
            </h2>
            <p className="text-muted-foreground mb-8">
              When an AI reads your website, the first 50 words tell it everything it needs to know. If that information is missing, the AI forms an incomplete picture of your brand.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 text-center">
                <span className="text-4xl font-bold text-primary">WHO</span>
                <p className="text-muted-foreground mt-4">
                  Your brand name and identity. Not "we" or "our company." The actual name.
                </p>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 text-center">
                <span className="text-4xl font-bold text-primary">WHAT</span>
                <p className="text-muted-foreground mt-4">
                  What you do or sell. Specific, not vague. "Hair restoration clinic" not "solutions provider."
                </p>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 text-center">
                <span className="text-4xl font-bold text-primary">WHERE</span>
                <p className="text-muted-foreground mt-4">
                  Location or service area. City, country, or "serving clients worldwide."
                </p>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 text-center">
                <span className="text-4xl font-bold text-primary">PRICE</span>
                <p className="text-muted-foreground mt-4">
                  Pricing or price range. LLMs will guess if you hide it. Better to state it.
                </p>
              </div>
            </div>

            <div className="p-6 bg-primary/10 border border-primary/30 rounded-xl">
              <p className="text-lg">
                <strong>The test:</strong> Read your page's first 50 words. If the answer to any of these four questions is missing or unclear, rewrite.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What Fails */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 heading-3d">
              What Fails the First 50 Words Test
            </h2>
            <p className="text-muted-foreground mb-8">
              These patterns are common on websites and completely useless for AI extraction.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <XCircleIcon className="w-5 h-5 text-destructive" />
                  <span className="font-bold">Questions</span>
                </div>
                <p className="text-muted-foreground italic mb-2">
                  "Are you tired of ineffective solutions? Ready to transform your business?"
                </p>
                <p className="text-sm text-destructive">
                  Questions tell AI nothing. They are for humans, not extraction.
                </p>
              </div>

              <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <XCircleIcon className="w-5 h-5 text-destructive" />
                  <span className="font-bold">Vague Promises</span>
                </div>
                <p className="text-muted-foreground italic mb-2">
                  "Unlock your potential. Achieve excellence. Experience the difference."
                </p>
                <p className="text-sm text-destructive">
                  No WHO, WHAT, WHERE, or PRICE. Could be any company.
                </p>
              </div>

              <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <XCircleIcon className="w-5 h-5 text-destructive" />
                  <span className="font-bold">Industry Descriptions</span>
                </div>
                <p className="text-muted-foreground italic mb-2">
                  "In today's fast-paced digital world, businesses need every advantage..."
                </p>
                <p className="text-sm text-destructive">
                  Generic context. Nothing specific to your brand.
                </p>
              </div>

              <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <XCircleIcon className="w-5 h-5 text-destructive" />
                  <span className="font-bold">Hidden Pricing</span>
                </div>
                <p className="text-muted-foreground italic mb-2">
                  "Contact us for pricing. Custom packages based on your needs."
                </p>
                <p className="text-sm text-destructive">
                  LLMs will guess your price or recommend competitors who list theirs.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Before/After Examples */}
      <section className="py-16 px-4 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 heading-3d">
              Before and After Examples
            </h2>
            <p className="text-muted-foreground mb-8">
              Real examples showing how to transform marketing fluff into AI-extractable content.
            </p>

            <div className="space-y-8">
              {BEFORE_AFTER_EXAMPLES.map((example, index) => (
                <div key={index} className="bg-card/50 backdrop-blur-sm border border-border rounded-xl overflow-hidden">
                  <div className="bg-card/50 px-6 py-4 border-b border-border">
                    <h3 className="text-lg font-bold">{example.industry}</h3>
                  </div>
                  <div className="p-6">
                    <div className="grid md:grid-cols-2 gap-6 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <XCircleIcon className="w-5 h-5 text-destructive" />
                          <span className="font-bold text-destructive">Before</span>
                        </div>
                        <p className="text-muted-foreground italic text-sm">
                          "{example.before}"
                        </p>
                        <p className="text-xs text-destructive mt-2">
                          {example.analysis.before}
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <CheckCircleIcon className="w-5 h-5 text-primary" />
                          <span className="font-bold text-primary">After</span>
                        </div>
                        <p className="text-muted-foreground italic text-sm">
                          "{example.after}"
                        </p>
                        <p className="text-xs text-primary mt-2">
                          {example.analysis.after}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
              First 50 Words Audit Checklist
            </h2>
            <p className="text-muted-foreground mb-8">
              Use this table to audit your key pages.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 font-semibold">Pattern</th>
                    <th className="text-left py-4 px-4 font-semibold">Result</th>
                    <th className="text-left py-4 px-4 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-4 px-4">Starts with question ("Are you tired of...?")</td>
                    <td className="py-4 px-4">
                      <span className="text-destructive font-medium">FAIL</span>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">Rewrite with facts</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-4 px-4">Starts with vague promise ("Unlock your potential...")</td>
                    <td className="py-4 px-4">
                      <span className="text-destructive font-medium">FAIL</span>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">Rewrite with specifics</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-4 px-4">No brand name in first sentence</td>
                    <td className="py-4 px-4">
                      <span className="text-destructive font-medium">FAIL</span>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">Lead with brand name</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-4 px-4">No location or service area mentioned</td>
                    <td className="py-4 px-4">
                      <span className="text-yellow-500 font-medium">WEAK</span>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">Add WHERE element</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-4 px-4">"Contact us for pricing" or no price</td>
                    <td className="py-4 px-4">
                      <span className="text-yellow-500 font-medium">WEAK</span>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">Add price range</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4">States WHO, WHAT, WHERE, PRICE immediately</td>
                    <td className="py-4 px-4">
                      <span className="text-primary font-medium">PASS</span>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">Good. Test in ChatGPT.</td>
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
              Ready to Rewrite Your Pages?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              The First 50 Words Rule is one component of the complete AEO system. Get the full 130+ point checklist with every optimization.
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
                  See the Full System
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
              to="/10-run-consistency-test"
              className="text-primary hover:underline text-sm"
            >
              The 10-Run Consistency Test
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
