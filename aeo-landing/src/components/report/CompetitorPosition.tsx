import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { competitors } from "../../data/fuegenix-report";

export function CompetitorPosition() {
  const tier1 = competitors.filter((c) => c.tier === 1);
  const tier2 = competitors.filter((c) => c.tier === 2);

  return (
    <section className="py-10">
      <SectionHeading
        id="market"
        title="Where You Sit in the Market"
        subtitle="AI platforms now group you with these world-class surgeons"
      />

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-heading font-semibold mb-4 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-warning" />
            Your Direct Peers
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {tier1.map((comp, i) => (
              <motion.div
                key={comp.name}
                className="rounded-xl border-2 border-warning/40 bg-card p-5 card-3d"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <h4 className="font-heading font-semibold text-foreground">{comp.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">{comp.location}</p>
                <p className="text-sm text-muted-foreground mt-3">{comp.specialization}</p>
                <p className="text-sm font-medium text-warning mt-2">{comp.priceRange}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-heading font-semibold mb-4 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-muted" />
            Regional Competitors
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {tier2.map((comp, i) => (
              <motion.div
                key={comp.name}
                className="rounded-xl border border-muted/30 bg-card p-5 card-3d"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <h4 className="font-heading font-semibold text-foreground">{comp.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">{comp.location}</p>
                <p className="text-sm text-muted-foreground mt-3">{comp.specialization}</p>
                <p className="text-sm font-medium text-muted-foreground mt-2">{comp.priceRange}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
