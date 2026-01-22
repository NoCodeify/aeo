import { motion } from "framer-motion";

interface SectionHeadingProps {
  id: string;
  title: string;
  subtitle?: string;
}

export function SectionHeading({ id, title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div
      id={id}
      className="mb-8 scroll-mt-20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl md:text-3xl font-heading font-bold heading-3d text-foreground">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-muted-foreground">{subtitle}</p>
      )}
      <div className="mt-3 h-0.5 w-16 bg-gradient-to-r from-primary to-secondary rounded-full" />
    </motion.div>
  );
}
