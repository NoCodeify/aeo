import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { headlineResults } from "../../data/fuegenix-report";

export function HeadlineResult() {
  return (
    <section className="py-10">
      <SectionHeading
        id="results"
        title="When People Ask AI 'Who's the Best?'"
        subtitle="The key metrics that matter most to your business"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {headlineResults.map((result, i) => (
          <motion.div
            key={`${result.engine}-${i}`}
            className="rounded-xl border border-card-border bg-card p-5 card-3d"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <p className="text-xs font-medium text-primary mb-3">
              {result.engine}
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              "{result.query}"
            </p>

            <div className="flex items-center gap-3 mb-4">
              <div className="text-center flex-1">
                <span className="text-xl font-heading font-bold text-destructive">
                  {result.before.value}
                </span>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {result.before.label}
                </p>
              </div>
              <div className="text-muted-foreground">&rarr;</div>
              <div className="text-center flex-1">
                <span className="text-xl font-heading font-bold text-success">
                  {result.after.value}
                </span>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {result.after.label}
                </p>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              {result.summary}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
