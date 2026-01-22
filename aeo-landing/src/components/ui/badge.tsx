import { type HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "outline";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors badge-3d",
        {
          "bg-primary/10 text-primary border border-primary/20":
            variant === "default",
          "bg-secondary/10 text-secondary border border-secondary/20":
            variant === "secondary",
          "border border-card-border text-muted-foreground": variant === "outline",
        },
        className
      )}
      {...props}
    />
  );
}

export { Badge };
