import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "../../lib/constants";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function Testimonials() {
  return (
    <section className="py-20 px-4 bg-surface">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 heading-3d">
            Real Results from Real Businesses
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See how others have taken control of their AI presence.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full hover:border-primary/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-warning text-warning"
                      />
                    ))}
                  </div>

                  <p className="text-foreground mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </p>

                  <div className="border-t border-card-border pt-4">
                    <Badge variant="outline" className="mb-3">
                      {testimonial.result}
                    </Badge>
                    <p className="font-semibold text-sm">{testimonial.author}</p>
                    <p className="text-muted-foreground text-sm">
                      {testimonial.company}
                    </p>
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
