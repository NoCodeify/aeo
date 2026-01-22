import { motion } from "framer-motion";
import { brandInfo, executiveSummary } from "../../data/fuegenix-report";

export function ReportCover() {
  return (
    <motion.header
      className="py-12 md:py-20 text-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-3xl md:text-5xl font-heading font-bold heading-3d-glow text-foreground">
        Your AI Visibility Report
      </h1>
      <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
        How we made AI recommend {brandInfo.name} to high-net-worth clients
      </p>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground">
        <span>{brandInfo.leadSurgeon}</span>
        <span className="text-card-border">|</span>
        <span>{brandInfo.location}</span>
        <span className="text-card-border">|</span>
        <span>{brandInfo.auditDate}</span>
      </div>

      <motion.div
        className="mt-10 max-w-2xl mx-auto rounded-xl border border-card-border bg-card p-6 md:p-8 card-3d"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <p className="text-muted-foreground text-sm mb-6">
          {executiveSummary.subheadline}
        </p>

        <div className="flex items-center justify-center gap-4">
          <div className="text-center">
            <span className="text-3xl md:text-4xl font-heading font-bold text-destructive">
              {executiveSummary.heroStat.before}%
            </span>
            <p className="text-xs text-muted-foreground mt-1">Before</p>
          </div>
          <div className="text-2xl text-muted-foreground">&rarr;</div>
          <div className="text-center">
            <span className="text-3xl md:text-4xl font-heading font-bold text-success">
              {executiveSummary.heroStat.after}%
            </span>
            <p className="text-xs text-muted-foreground mt-1">After</p>
          </div>
        </div>
        <p className="text-sm font-medium text-foreground mt-3">
          {executiveSummary.heroStat.label} ({executiveSummary.heroStat.unit})
        </p>
      </motion.div>
    </motion.header>
  );
}
