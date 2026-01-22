import { motion } from "framer-motion";
import { ProgressRing } from "./ProgressRing";
import { SectionHeading } from "./SectionHeading";
import { engineDetails } from "../../data/fuegenix-report";

const strengthStyles: Record<string, string> = {
  Strong: "bg-success/10 text-success border-success/20",
  Building: "bg-warning/10 text-warning border-warning/20",
  "Needs Work": "bg-destructive/10 text-destructive border-destructive/20",
};

export function CurrentVisibility() {
  return (
    <section className="py-10">
      <SectionHeading
        id="visibility"
        title="Your Visibility Across AI Platforms"
        subtitle="How often AI recommends you when people ask for the best"
      />

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {engineDetails.map((engine) => (
          <div
            key={engine.engine}
            className="rounded-xl border border-card-border bg-card p-5 card-3d flex flex-col items-center gap-4"
          >
            <ProgressRing
              value={engine.discoveryScore}
              label={engine.engine}
              sublabel="Recommendation Rate"
            />
            <p className="text-sm text-muted-foreground text-center">
              {engine.detail}
            </p>
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${strengthStyles[engine.strengthLabel]}`}
            >
              {engine.strengthLabel}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
