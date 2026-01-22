import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export function OriginStory() {
  return (
    <section className="py-20 px-4 bg-surface">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Quote className="w-12 h-12 text-primary/30 mb-6" />

          <blockquote className="text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed mb-8 heading-3d">
            I was on my second BMW. Going to buy another one. Asked ChatGPT for advice.{" "}
            <span className="text-primary heading-3d-glow">
              It convinced me to buy a Porsche Boxster instead.
            </span>{" "}
            If AI can change MY buying decision, what's it doing to my clients' businesses?
          </blockquote>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold icon-3d">
              SL
            </div>
            <div>
              <p className="font-semibold">Sohaib Lokhandwala</p>
              <p className="text-muted-foreground text-sm">Creator of the AEO Protocol</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
