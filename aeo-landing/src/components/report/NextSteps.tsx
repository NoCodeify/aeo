import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { recommendations } from "../../data/fuegenix-report";

export function NextSteps() {
  const pendingItems = recommendations.filter(
    (r) => r.status === "pending" || r.status === "in-progress"
  );

  return (
    <section className="py-10">
      <SectionHeading
        id="next"
        title="What's Next"
        subtitle="Remaining actions to maximize your AI visibility"
      />

      <div className="space-y-3">
        {pendingItems.map((item, i) => (
          <motion.div
            key={item.action}
            className="flex items-center gap-3 p-4 rounded-xl border border-card-border bg-card card-3d"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <span
              className={`text-lg shrink-0 ${
                item.status === "in-progress" ? "text-warning" : "text-muted"
              }`}
            >
              {item.status === "in-progress" ? "\u25CB" : "\u2022"}
            </span>
            <div className="flex-1">
              <span className="text-sm text-foreground">{item.clientLabel}</span>
            </div>
            {item.status === "in-progress" && (
              <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border bg-warning/10 text-warning border-warning/20">
                In Progress
              </span>
            )}
          </motion.div>
        ))}
      </div>

      <motion.p
        className="mt-8 text-sm text-muted-foreground text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        We'll re-run this audit monthly to track progress.
      </motion.p>
    </section>
  );
}
