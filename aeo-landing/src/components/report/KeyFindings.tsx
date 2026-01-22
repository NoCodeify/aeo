import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { keyFindings } from "../../data/fuegenix-report";

const severityStyles: Record<string, string> = {
  high: "bg-destructive/10 text-destructive border-destructive/20",
  medium: "bg-warning/10 text-warning border-warning/20",
  low: "bg-muted/10 text-muted-foreground border-muted/20",
};

const severityLabels: Record<string, string> = {
  high: "Critical",
  medium: "Important",
  low: "Minor",
};

export function KeyFindings() {
  return (
    <section className="py-10">
      <SectionHeading
        id="findings"
        title="What We Found"
        subtitle="The key issues we identified during our initial audit"
      />

      <div className="space-y-4">
        {keyFindings.map((finding, i) => (
          <motion.div
            key={finding.title}
            className="rounded-xl border border-card-border bg-card p-5 card-3d"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-medium text-foreground">{finding.title}</h4>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${severityStyles[finding.severity]}`}
                  >
                    {severityLabels[finding.severity]}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{finding.detail}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
