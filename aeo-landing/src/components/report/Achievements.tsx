import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { recommendations } from "../../data/fuegenix-report";

export function Achievements() {
  const doneItems = recommendations.filter((r) => r.status === "done");
  const totalItems = recommendations.length;

  const categories = [...new Set(doneItems.map((r) => r.category))];

  return (
    <section className="py-10">
      <SectionHeading
        id="actions"
        title="What We Did About It"
        subtitle="Actions completed to improve your AI visibility"
      />

      <motion.div
        className="mb-6 rounded-xl border border-success/20 bg-success/5 p-4 flex items-center justify-between"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <span className="text-sm font-medium text-foreground">Actions completed</span>
        <span className="text-lg font-heading font-bold text-success">
          {doneItems.length} of {totalItems}
        </span>
      </motion.div>

      <div className="space-y-6">
        {categories.map((category) => {
          const items = doneItems.filter((r) => r.category === category);
          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="text-base font-heading font-semibold mb-3 text-foreground">
                {category}
              </h3>
              <div className="space-y-2">
                {items.map((item) => (
                  <div
                    key={item.action}
                    className="flex items-center gap-3 p-3 rounded-lg border border-card-border bg-card"
                  >
                    <span className="text-success text-lg shrink-0">&#10003;</span>
                    <span className="text-sm text-foreground">
                      {item.clientLabel}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
