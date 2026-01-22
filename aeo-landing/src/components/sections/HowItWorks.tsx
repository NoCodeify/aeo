import { motion } from "framer-motion";
import { MagnifyingGlassIcon, WrenchIcon, BoltIcon } from "@heroicons/react/24/outline";
import { HOW_IT_WORKS } from "../../lib/constants";

const icons = {
  Search: MagnifyingGlassIcon,
  Wrench: WrenchIcon,
  Zap: BoltIcon,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export function HowItWorks() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 heading-3d">
            How the AEO Protocol Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A systematic approach to controlling your brand's presence in AI responses.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {HOW_IT_WORKS.map((step, index) => {
            const Icon = icons[step.icon as keyof typeof icons];
            return (
              <motion.div
                key={index}
                className="relative"
                variants={itemVariants}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center icon-3d">
                      <Icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-card border border-card-border flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>

                  <span className="text-primary text-sm font-medium mb-2">
                    {step.phase}
                  </span>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>

                {index < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[calc(50%+60px)] w-[calc(100%-120px)] h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
