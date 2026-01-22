import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface GradientOrbProps {
  className?: string;
  color?: "primary" | "secondary" | "accent";
  size?: "sm" | "md" | "lg" | "xl";
  blur?: "sm" | "md" | "lg";
}

export function GradientOrb({
  className,
  color = "primary",
  size = "md",
  blur = "md",
}: GradientOrbProps) {
  const colorClasses = {
    primary: "bg-primary/30",
    secondary: "bg-secondary/30",
    accent: "bg-accent/30",
  };

  const sizeClasses = {
    sm: "w-32 h-32",
    md: "w-64 h-64",
    lg: "w-96 h-96",
    xl: "w-[500px] h-[500px]",
  };

  const blurClasses = {
    sm: "blur-2xl",
    md: "blur-3xl",
    lg: "blur-[100px]",
  };

  return (
    <motion.div
      className={cn(
        "absolute rounded-full opacity-50 pointer-events-none",
        colorClasses[color],
        sizeClasses[size],
        blurClasses[blur],
        className
      )}
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
