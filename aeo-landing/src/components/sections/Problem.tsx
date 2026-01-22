import { motion } from "framer-motion";
import { AlertTriangle, Bot, TrendingDown, Search } from "lucide-react";
import { Card, CardContent } from "../ui/card";

const problems = [
  {
    icon: Bot,
    title: "AI is recommending your competitors",
    description:
      "When customers ask ChatGPT for solutions, it's mentioning your competitors - not you.",
  },
  {
    icon: AlertTriangle,
    title: "ChatGPT might be making up your pricing",
    description:
      "AI hallucinations mean false information about your business is being shared confidently.",
  },
  {
    icon: TrendingDown,
    title: "Traditional SEO won't save you",
    description:
      "AI assistants don't just use Google. 62% of ChatGPT citations come from sources other than Bing.",
  },
  {
    icon: Search,
    title: "Your customers are asking AI, not Google",
    description:
      "AI-assisted search is growing 340% year-over-year. The shift has already begun.",
  },
];

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

export function Problem() {
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
            The Problem No One's Talking About
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            While you're focused on Google rankings, AI is reshaping how customers discover and choose businesses.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {problems.map((problem, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full hover:border-primary/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-destructive/10 text-destructive icon-3d">
                      <problem.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{problem.title}</h3>
                      <p className="text-muted-foreground">{problem.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
