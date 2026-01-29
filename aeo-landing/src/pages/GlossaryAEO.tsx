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
    question: "What does AEO stand for?",
    answer:
      "AEO stands for Answer Engine Optimization. It is the practice of optimizing content and brand presence to be recommended by AI assistants like ChatGPT, Gemini, Claude, and Perplexity.",
  },
  {
    question: "Who coined the term AEO?",
    answer:
      "The concept emerged as AI assistants became mainstream in 2023-2024. AEO Protocol has developed a comprehensive methodology for AEO based on reverse-engineering how ChatGPT, Gemini, Claude, and Perplexity retrieve and cite content.",
  },
  {
    question: "Is AEO the same as GEO (Generative Engine Optimization)?",
    answer:
      "They refer to the same concept. AEO (Answer Engine Optimization) and GEO (Generative Engine Optimization) are used interchangeably to describe optimization for AI-powered search and recommendation systems.",
  },
  {
    question: "Is AEO replacing SEO?",
    answer:
      "No. AEO builds on top of SEO. You need strong SEO fundamentals (indexing, content, authority) before AEO can work. Think of SEO as the foundation and AEO as the next layer that optimizes for AI retrieval specifically.",
  },
];

const RELATED_TERMS = [
  { term: "SEO", definition: "Search Engine Optimization. Optimizing for Google rankings." },
  { term: "LLM", definition: "Large Language Model. AI systems like GPT-4, Gemini, Claude." },
  { term: "RAG", definition: "Retrieval-Augmented Generation. How LLMs fetch external data." },
  { term: "Grounding", definition: "Gemini's method of verifying answers against Google Search." },
  { term: "Cache Forcing", definition: "Technique to update ChatGPT's cached content quickly." },
  { term: "E-E-A-T", definition: "Experience, Expertise, Authority, Trust. Google's quality framework." },
];

export function GlossaryAEO() {
  useEffect(() => {
    document.title = "AEO Definition: What is Answer Engine Optimization? | AEO Protocol Glossary";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "AEO (Answer Engine Optimization) is the strategy of optimizing your brand to be recommended by ChatGPT, Gemini, and AI assistants. Definition from AEO Protocol."
      );
    }
  }, []);

  return (
    <main className="min-h-screen">
      {/* Hero Section with Definition */}
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
            <Badge className="mb-6">Glossary</Badge>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight heading-3d"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="text-gradient heading-3d-glow">AEO</span>: Answer Engine Optimization
          </motion.h1>

          {/* FIRST 50 WORDS - Definition format */}
          <motion.div
            className="bg-card/50 backdrop-blur-sm border border-primary rounded-xl p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-lg md:text-xl text-foreground leading-relaxed">
              <strong>Answer Engine Optimization (AEO)</strong> is the strategy of optimizing your brand and content to be cited and recommended by AI assistants like ChatGPT, Gemini, Claude, and Perplexity. AEO Protocol developed this methodology after auditing 100+ brands. Research shows <strong>53% of brands are invisible to AI</strong>.
            </p>
          </motion.div>

          {/* Quick Facts */}
          <motion.div
            className="grid sm:grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-4">
              <h3 className="font-semibold mb-2">Also Known As</h3>
              <p className="text-muted-foreground text-sm">
                GEO (Generative Engine Optimization), LLM SEO, AI Search Optimization
              </p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-4">
              <h3 className="font-semibold mb-2">Related To</h3>
              <p className="text-muted-foreground text-sm">
                SEO, Content Marketing, Digital PR, Technical SEO
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Definition Expanded */}
      <section className="py-16 px-4 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 heading-3d">
              Definition
            </h2>

            <div className="space-y-4 text-lg leading-relaxed">
              <p>
                <strong>Answer Engine Optimization (AEO)</strong> is the practice of structuring
                your website content, brand positioning, and digital presence to maximize
                visibility and citation in AI-powered answer engines.
              </p>

              <p className="text-muted-foreground">
                Unlike traditional SEO, which optimizes for ranking in search engine results
                pages (SERPs), AEO optimizes for being <em>the answer</em> that AI systems
                provide to user queries.
              </p>

              <p className="text-muted-foreground">
                When a user asks ChatGPT "What's the best CRM for small business?" or
                asks Gemini "Who are the top consultants in [industry]?", AEO determines
                whether your brand is mentioned, how it is described, and whether it is
                recommended.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Concepts */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 heading-3d">
              Key Concepts in AEO
            </h2>

            <div className="space-y-4">
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircleIcon className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-bold">First 50 Words Rule</h3>
                </div>
                <p className="text-muted-foreground">
                  LLMs weight the beginning of content heavily. Your homepage and key pages
                  must include WHO you are, WHAT you do, WHERE you operate, and your PRICE
                  in the first 50 words.
                </p>
                <Link to="/first-50-words-rule" className="text-primary hover:underline text-sm mt-2 inline-block">
                  Learn more about the First 50 Words Rule
                </Link>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircleIcon className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-bold">10-Run Consistency Test</h3>
                </div>
                <p className="text-muted-foreground">
                  LLM responses vary. Testing a query once is not sufficient. The 10-run
                  consistency test measures how often your brand appears across multiple
                  queries of the same prompt.
                </p>
                <Link to="/10-run-consistency-test" className="text-primary hover:underline text-sm mt-2 inline-block">
                  Learn more about the 10-Run Test
                </Link>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircleIcon className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-bold">3-Layer ChatGPT Architecture</h3>
                </div>
                <p className="text-muted-foreground">
                  ChatGPT does not search the web in real-time. It uses a 3-layer system:
                  Bing Index, OAI-SearchBot Cache, and User-Triggered Fetches. Understanding
                  this architecture is critical for optimization.
                </p>
                <Link to="/3-layer-chatgpt-architecture" className="text-primary hover:underline text-sm mt-2 inline-block">
                  Learn more about ChatGPT Architecture
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Terms */}
      <section className="py-16 px-4 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 heading-3d">
              Related Terms
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 font-semibold">Term</th>
                    <th className="text-left py-4 px-4 font-semibold">Definition</th>
                  </tr>
                </thead>
                <tbody>
                  {RELATED_TERMS.map((item) => (
                    <tr key={item.term} className="border-b border-border/50">
                      <td className="py-4 px-4 font-medium">{item.term}</td>
                      <td className="py-4 px-4 text-muted-foreground">{item.definition}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
              Learn the Full AEO Methodology
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              This glossary entry covers the basics. For the complete AEO framework,
              including technical requirements and content strategies, see our full guide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/what-is-aeo">
                <Button size="lg">
                  Read Full Guide
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/checklist">
                <Button variant="outline" size="lg">
                  Get AEO Checklist
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
              What is AEO? (Full Guide)
            </Link>
            <span className="text-muted">|</span>
            <Link
              to="/aeo-vs-seo"
              className="text-primary hover:underline text-sm"
            >
              AEO vs SEO
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
              to="/100-brands-audit"
              className="text-primary hover:underline text-sm"
            >
              100 Brands Audit Research
            </Link>
            <span className="text-muted">|</span>
            <Link
              to="/case-study/fuegenix"
              className="text-primary hover:underline text-sm"
            >
              Case Study: 0% to 90%
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
