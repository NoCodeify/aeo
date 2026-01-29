import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { GradientOrb } from "../components/shared/GradientOrb";
import {
  ArrowRightIcon,
  BookOpenIcon,
  BeakerIcon,
  ChartBarIcon,
  AcademicCapIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const GUIDE_PAGES = [
  {
    title: "What is AEO?",
    description: "Complete guide to Answer Engine Optimization and why it matters for your brand.",
    url: "/what-is-aeo",
    icon: AcademicCapIcon,
    badge: "Start Here",
  },
  {
    title: "AEO vs SEO",
    description: "How Answer Engine Optimization differs from traditional SEO, and why you need both.",
    url: "/aeo-vs-seo",
    icon: ChartBarIcon,
  },
  {
    title: "How to Optimize for ChatGPT",
    description: "Step-by-step guide to getting your brand recommended by ChatGPT.",
    url: "/how-to-optimize-for-chatgpt",
    icon: BookOpenIcon,
  },
];

const METHODOLOGY_PAGES = [
  {
    title: "The First 50 Words Rule",
    description: "Why LLMs weight the beginning of your content heavily, and how to pass the test.",
    url: "/first-50-words-rule",
  },
  {
    title: "The 10-Run Consistency Test",
    description: "How to accurately measure your AI visibility with statistical confidence.",
    url: "/10-run-consistency-test",
  },
];

const PROOF_PAGES = [
  {
    title: "FueGenix Case Study",
    description: "How a premium hair clinic went from 0% to 90% AI visibility in 30 days.",
    url: "/case-study/fuegenix",
    stat: "0% → 90%",
  },
];

export function Learn() {
  useEffect(() => {
    document.title = "Learn AEO - Answer Engine Optimization Resources | AEO Protocol";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Free AEO resources from AEO Protocol. Learn how to optimize your brand for ChatGPT, Gemini, and AI assistants. Guides, methodologies, and case studies."
      );
    }
  }, []);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <GradientOrb className="top-20 -left-32" color="primary" size="xl" blur="lg" />
        <GradientOrb className="bottom-20 -right-32" color="secondary" size="lg" blur="lg" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-6">Free Resources</Badge>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight heading-3d"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Learn <span className="text-gradient heading-3d-glow">AEO</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Everything you need to optimize your brand for ChatGPT, Gemini, and AI assistants.
            Free guides, proprietary methodologies, and real case studies.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link to="/checklist">
              <Button size="lg">
                Get the 130+ Point Checklist
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Guides Section */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-2 heading-3d">
              Educational Guides
            </h2>
            <p className="text-muted-foreground mb-8">
              Start here to understand AEO and how it works.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {GUIDE_PAGES.map((page, index) => (
                <motion.div
                  key={page.url}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link to={page.url} className="block h-full">
                    <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 h-full hover:border-primary/50 transition-colors">
                      <div className="flex items-center gap-3 mb-4">
                        <page.icon className="w-6 h-6 text-primary" />
                        {page.badge && (
                          <Badge variant="secondary" className="text-xs">
                            {page.badge}
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{page.title}</h3>
                      <p className="text-muted-foreground text-sm">
                        {page.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Methodologies Section */}
      <section className="py-16 px-4 bg-card/30">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <BeakerIcon className="w-6 h-6 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold heading-3d">
                Proprietary Methodologies
              </h2>
            </div>
            <p className="text-muted-foreground mb-8">
              The frameworks we developed from auditing 100+ brands.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {METHODOLOGY_PAGES.map((page, index) => (
                <motion.div
                  key={page.url}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link to={page.url} className="block">
                    <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
                      <h3 className="text-xl font-bold mb-2">{page.title}</h3>
                      <p className="text-muted-foreground text-sm">
                        {page.description}
                      </p>
                      <div className="mt-4 flex items-center text-primary text-sm font-medium">
                        Read methodology
                        <ArrowRightIcon className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <CheckCircleIcon className="w-6 h-6 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold heading-3d">
                Case Studies
              </h2>
            </div>
            <p className="text-muted-foreground mb-8">
              Real results from real clients.
            </p>

            {PROOF_PAGES.map((page, index) => (
              <motion.div
                key={page.url}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={page.url} className="block">
                  <div className="bg-card/50 backdrop-blur-sm border border-primary/30 rounded-xl p-8 hover:border-primary/50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{page.title}</h3>
                        <p className="text-muted-foreground">
                          {page.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-4xl font-bold text-primary">
                          {page.stat}
                        </span>
                        <ArrowRightIcon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
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
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get the complete 130+ point AEO checklist. It's the exact framework
              we use to take brands from invisible to recommended.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/checklist">
                <Button size="lg">
                  Get Free Checklist
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/what-is-aeo">
                <Button variant="outline" size="lg">
                  Start with "What is AEO?"
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
