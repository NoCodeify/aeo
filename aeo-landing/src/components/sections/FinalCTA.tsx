import { motion } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Button } from "../ui/button";
import { GradientOrb } from "../shared/GradientOrb";

interface FinalCTAProps {
  onOpenQuiz: () => void;
}

export function FinalCTA({ onOpenQuiz }: FinalCTAProps) {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <GradientOrb className="top-0 left-1/4" color="primary" size="lg" blur="lg" />
      <GradientOrb className="bottom-0 right-1/4" color="secondary" size="md" blur="lg" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 heading-3d-glow">
            Ready to Control What AI Says About You?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get the complete 300+ point checklist and start optimizing your brand's AI presence today.
          </p>

          <Button size="xl" onClick={onOpenQuiz} className="group">
            Get Free Checklist
            <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>

          <p className="text-sm text-muted mt-4">
            Free forever. No credit card required.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
