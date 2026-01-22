import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { gapAnalysis } from "../../data/fuegenix-report";

function scoreColor(score: number) {
  if (score >= 80) return "bg-success";
  if (score >= 40) return "bg-warning";
  return "bg-destructive";
}

function scoreTextColor(score: number) {
  if (score >= 80) return "text-success";
  if (score >= 40) return "text-warning";
  return "text-destructive";
}

export function ResultsProof() {
  return (
    <section className="py-10">
      <SectionHeading
        id="proof"
        title="The Results"
        subtitle="Before and after scores across every area we optimized"
      />

      <div className="space-y-4">
        {gapAnalysis.map((item, i) => {
          const delta = item.afterScore - item.beforeScore;
          return (
            <motion.div
              key={item.area}
              className="rounded-xl border border-card-border bg-card p-5 card-3d"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground mb-1">{item.clientLabel}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{item.description}</p>

                  {/* Before bar */}
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs text-muted-foreground w-12 shrink-0">Before</span>
                    <div className="flex-1 h-3 rounded-full bg-surface overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${scoreColor(item.beforeScore)} opacity-50`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.beforeScore}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      />
                    </div>
                    <span className={`text-sm font-mono font-bold w-10 text-right ${scoreTextColor(item.beforeScore)}`}>
                      {item.beforeScore}%
                    </span>
                  </div>

                  {/* After bar */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground w-12 shrink-0">After</span>
                    <div className="flex-1 h-3 rounded-full bg-surface overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${scoreColor(item.afterScore)}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.afterScore}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.4 }}
                      />
                    </div>
                    <span className={`text-sm font-mono font-bold w-10 text-right ${scoreTextColor(item.afterScore)}`}>
                      {item.afterScore}%
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground mt-2">{item.detail}</p>
                </div>

                {/* Delta badge */}
                <div className="flex items-center justify-center shrink-0">
                  <div className="flex flex-col items-center rounded-lg bg-success/5 border border-success/20 px-4 py-2">
                    <span className="text-2xl font-heading font-bold text-success">
                      +{delta}
                    </span>
                    <span className="text-xs text-muted-foreground">pts</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
