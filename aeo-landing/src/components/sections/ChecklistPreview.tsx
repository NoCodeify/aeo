import { motion } from "framer-motion";
import { CheckIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { CHECKLIST_CATEGORIES } from "../../lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function ChecklistPreview() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 heading-3d">
            What's Inside the Checklist
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            300+ actionable items organized by category. Here's a preview of what you'll get.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {CHECKLIST_CATEGORIES.map((category, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                    <Badge variant="secondary">{category.count} items</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {category.items.slice(0, 3).map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckIcon className="w-4 h-4 text-success mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                    <li className="flex items-start gap-2 text-sm">
                      <LockClosedIcon className="w-4 h-4 text-muted mt-0.5 shrink-0" />
                      <span className="text-muted">+ more in full checklist...</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
