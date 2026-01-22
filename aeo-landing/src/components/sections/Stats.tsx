import { motion } from "framer-motion";
import { STATS } from "../../lib/constants";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

export function Stats() {
  return (
    <section className="py-20 px-4 bg-surface">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {STATS.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              variants={itemVariants}
            >
              <div className="text-5xl md:text-6xl font-bold text-gradient stat-3d mb-3">
                {stat.value}
              </div>
              <p className="text-lg text-foreground mb-2">{stat.label}</p>
              <p className="text-sm text-muted">{stat.source}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
