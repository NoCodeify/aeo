import { motion } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { GradientOrb } from "../shared/GradientOrb";

interface HeroProps {
  onOpenQuiz: () => void;
}

export function Hero({ onOpenQuiz }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
      <GradientOrb className="top-20 -left-32" color="primary" size="xl" blur="lg" />
      <GradientOrb className="bottom-20 -right-32" color="secondary" size="lg" blur="lg" />
      <GradientOrb className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" color="accent" size="md" blur="lg" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge className="mb-6">
            <SparklesIcon className="w-3 h-3 mr-1" />
            130+ Point Checklist - Free
          </Badge>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight heading-3d"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Is AI{" "}
          <span className="text-gradient heading-3d-glow">Lying</span>{" "}
          About Your Brand?
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Get the complete AEO checklist to control what ChatGPT, Gemini & Perplexity say about you
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button size="xl" onClick={onOpenQuiz}>
            Get Free Checklist
          </Button>
        </motion.div>

        <motion.p
          className="text-sm text-muted mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          No credit card required. Instant access.
        </motion.p>
      </div>
    </section>
  );
}
