import { motion } from "framer-motion";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";

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
          <ChatBubbleBottomCenterTextIcon className="w-12 h-12 text-primary/30 mb-6" />

          <blockquote className="text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed mb-8 heading-3d">
            I was on my second BMW. Going to buy another one. Asked ChatGPT for advice.{" "}
            <span className="text-primary heading-3d-glow">
              It convinced me to buy a Porsche Boxster instead.
            </span>{" "}
            If AI can change MY buying decision, what's it doing to my clients' businesses?
          </blockquote>

          <div className="flex items-center gap-4">
            <img src="/sohaib.png" alt="Sohaib Ahmad" className="w-12 h-12 rounded-full object-cover" />
            <div>
              <p className="font-semibold">Sohaib Ahmad</p>
              <p className="text-muted-foreground text-sm">Creator of the AEO Protocol</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
