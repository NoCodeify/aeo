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
    question: "Does ChatGPT search the web in real-time?",
    answer:
      "No. ChatGPT reads from a cache of information crawled by OAI-SearchBot days or weeks ago. The cache is not real-time. This means your website content needs to be optimized for when the crawler visits, not just when users arrive.",
  },
  {
    question: "How often does ChatGPT update its cache?",
    answer:
      "The OAI-SearchBot cache updates periodically, but not in real-time. You can force updates using cache forcing techniques, such as asking ChatGPT about your brand with web search enabled. Updates can appear within days using this method.",
  },
  {
    question: "What is the First 50 Words Rule?",
    answer:
      "LLMs weight the beginning of content heavily. The first 50 words on your key pages must include WHO you are, WHAT you do, WHERE you operate, and your PRICE. Most websites fail this test by leading with marketing fluff instead of facts.",
  },
  {
    question: "Why do I need to test 10 times instead of once?",
    answer:
      "LLM responses are non-deterministic. They vary every time you ask. You might appear in one response and not the next. The 10-run consistency test gives you a reliable measure of visibility, not a single lucky or unlucky result.",
  },
  {
    question: "What content does ChatGPT actually cite?",
    answer:
      "ChatGPT cites original data and unique information it could not have known without reading your page. Generic advice, marketing copy, and information it could generate itself will not earn citations. Original research and proprietary data get cited.",
  },
  {
    question: "Is optimizing for ChatGPT the same as optimizing for Google?",
    answer:
      "No. Google ranks pages based on keywords, backlinks, and engagement signals. ChatGPT extracts facts and recommends brands based on how well content answers questions. Different algorithms, different optimization strategies.",
  },
];

export function HowToOptimizeForChatGPT() {
  useEffect(() => {
    document.title = "How to Optimize for ChatGPT: The Complete System (2026) | AEO Protocol";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "The exact 5-step system to get your brand recommended by ChatGPT. Learn the 3-layer architecture, First 50 Words Rule, and 10-run consistency test from AEO Protocol."
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
            <Badge className="mb-6">Complete System</Badge>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight heading-3d"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            How to Optimize for{" "}
            <span className="text-gradient heading-3d-glow">ChatGPT</span>
          </motion.h1>

          {/* FIRST 50 WORDS */}
          <motion.p
            className="text-lg md:text-xl text-foreground mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <strong>AEO Protocol</strong> developed this system after auditing 100+ brands for ChatGPT visibility. Most businesses never make it past Layer 1 of ChatGPT's 3-layer architecture. This guide covers the{" "}
            <strong>exact 5-step system</strong> we use to take brands from invisible to recommended, including the First 50 Words Rule and 10-run consistency test.
          </motion.p>

          {/* Key Takeaways */}
          <motion.div
            className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-xl font-bold mb-4">The 5-Step System</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  Understand the 3-Layer Architecture (Bing, OAI-SearchBot, User Fetches)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  Apply the First 50 Words Rule (WHO, WHAT, WHERE, PRICE)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  Run the 10-Run Consistency Test to measure visibility
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  Use the Hybrid Page Structure (facts above fold, marketing middle)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  Create Original Data that forces citations
                </span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* The 3-Layer Architecture */}
      <section className="py-16 px-4 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 heading-3d">
              Step 1: Understand the 3-Layer Architecture
            </h2>
            <p className="text-muted-foreground mb-8">
              Most people think ChatGPT searches the web in real-time. It does not. There are three layers between your brand and getting recommended.
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
                  ChatGPT's web search is powered by Bing. Standard Bing SEO applies. If Bing cannot find you, neither can ChatGPT. This is where most people stop. They assume being indexed in Google means being indexed in Bing. Maybe. Maybe not.
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
                  OpenAI's own crawler visits your site, reads your pages, and stores that information in a persistent cache. This is where most citations come from. When ChatGPT recommends your brand and links to your website, that is Layer 2.
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
                  Real-time, on-demand fetching when someone asks about your brand specifically. This is the least reliable layer but can be used to force cache updates by asking ChatGPT about your brand with web search enabled.
                </p>
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
              Step 2: Apply the First 50 Words Rule
            </h2>
            <p className="text-muted-foreground mb-8">
              LLMs have a problem: they lose focus. When an AI reads your website, it weights the beginning heavily. The first 50 words tell it WHO you are, WHAT you do, WHERE you operate, and your PRICE.
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

            {/* Before/After */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <XCircleIcon className="w-5 h-5 text-destructive" />
                  <span className="font-bold text-destructive">Before (Fails)</span>
                </div>
                <p className="text-muted-foreground italic">
                  "Unlock the power of natural restoration. Experience precision like never before. Our world-renowned approach delivers results that speak for themselves."
                </p>
                <p className="text-sm text-destructive mt-4">
                  No WHO, WHAT, WHERE, or PRICE. Completely useless for AI extraction.
                </p>
              </div>

              <div className="bg-primary/10 border border-primary/30 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircleIcon className="w-5 h-5 text-primary" />
                  <span className="font-bold text-primary">After (Passes)</span>
                </div>
                <p className="text-muted-foreground italic">
                  "FueGenix is an exclusive hair restoration clinic in the Netherlands. We serve high-net-worth individuals with a 99% graft survival rate. Investment from EUR 50,000. One patient per day."
                </p>
                <p className="text-sm text-primary mt-4">
                  WHO: FueGenix. WHAT: Hair restoration. WHERE: Netherlands. PRICE: EUR 50,000.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The 10-Run Consistency Test */}
      <section className="py-16 px-4 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 heading-3d">
              Step 3: Run the 10-Run Consistency Test
            </h2>
            <p className="text-muted-foreground mb-8">
              Here is something that trips up almost everyone. You ask ChatGPT your discovery query and your brand shows up. Great. Done, right? Wrong. LLM responses are non-deterministic. They vary every single time.
            </p>

            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold mb-4">The Scoring Scale</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <span className="w-20 text-right font-bold text-primary">9-10/10</span>
                  <span className="text-muted-foreground">Locked in. Strong visibility.</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-20 text-right font-bold text-primary">7-8/10</span>
                  <span className="text-muted-foreground">Good, but gaps to fix.</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-20 text-right font-bold text-yellow-500">5-6/10</span>
                  <span className="text-muted-foreground">Weak. Appearing but inconsistent.</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-20 text-right font-bold text-orange-500">1-4/10</span>
                  <span className="text-muted-foreground">Poor. Major work needed.</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-20 text-right font-bold text-destructive">0/10</span>
                  <span className="text-muted-foreground">Invisible. You do not exist to AI.</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-primary/10 border border-primary/30 rounded-xl">
              <p className="text-lg">
                <strong>Real result:</strong> When we ran FueGenix's audit, they were 0 out of 10 on key queries. Zero. 30 days later, after implementing this system? 9 out of 10. That is the difference between invisible and locked in.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Hybrid Page Structure */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 heading-3d">
              Step 4: Use the Hybrid Page Structure
            </h2>
            <p className="text-muted-foreground mb-8">
              Most websites are structured wrong for AI. Big hero image. Marketing headline. Story about the founder. Testimonials. And somewhere at the bottom, maybe some actual facts. LLMs read top to bottom. By the time they get to the facts, they have moved on.
            </p>

            <div className="space-y-4">
              <div className="bg-card/50 backdrop-blur-sm border border-primary/50 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-2">Above the Fold: Facts</h3>
                <p className="text-muted-foreground">
                  First 100-150 words: WHO, WHAT, WHERE, PRICE. Features. Outcomes. Numbers. This is what LLMs extract. Put your most important information here.
                </p>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
                <h3 className="text-lg font-bold mb-2">Middle Section: Sales Copy</h3>
                <p className="text-muted-foreground">
                  Now you can tell your story. Your differentiators. Your testimonials. Humans read this. LLMs skim past it.
                </p>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-primary/50 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-2">Bottom Section: Structured Data</h3>
                <p className="text-muted-foreground">
                  Features in bullet points. Pricing tables. FAQ section. LLMs love FAQs because they are pre-formatted question-and-answer pairs, exactly how people ask ChatGPT questions.
                </p>
              </div>
            </div>

            <p className="text-muted-foreground mt-6">
              Think of it like a sandwich. Facts on top, facts on bottom, that is what AI eats. Marketing in the middle for humans.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Original Data Rule */}
      <section className="py-16 px-4 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 heading-3d">
              Step 5: Create Original Data That Forces Citations
            </h2>
            <p className="text-muted-foreground mb-8">
              Here is why most content never gets cited. LLMs do not cite generic advice. They already know generic advice. "Why AEO matters." "How to optimize your website." ChatGPT can generate that itself.
            </p>

            <div className="p-6 bg-card/50 border border-border rounded-xl mb-8">
              <p className="text-lg font-medium mb-4">
                The rule: If ChatGPT could write it without you, it will not cite you.
              </p>
              <p className="text-muted-foreground">
                What they cite is unique data. Information they could not have known without reading your specific page.
              </p>
            </div>

            <h3 className="text-xl font-bold mb-4">Content That Forces Citations</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-4">
                <h4 className="font-bold mb-2">Original Research</h4>
                <p className="text-sm text-muted-foreground">
                  "We analyzed 500 ChatGPT responses and found..."
                </p>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-4">
                <h4 className="font-bold mb-2">Proprietary Data</h4>
                <p className="text-sm text-muted-foreground">
                  "Our customers report an average 340% increase in..."
                </p>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-4">
                <h4 className="font-bold mb-2">Specific Case Studies</h4>
                <p className="text-sm text-muted-foreground">
                  "Here is what happened when we implemented this with FueGenix..."
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
              Get the Complete Checklist
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              This is the exact system we used to take a EUR 50,000 clinic from zero visibility to being called "the best for artistic perfection" globally. Get every step, test, and metric in one checklist.
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
                  Read the Case Study
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
              to="/aeo-vs-seo"
              className="text-primary hover:underline text-sm"
            >
              AEO vs SEO Comparison
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
