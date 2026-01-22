import { motion } from "framer-motion";
import { CheckIcon } from "@heroicons/react/24/outline";
import { cn } from "../../lib/utils";

interface QuizQuestionProps {
  question: string;
  options: { value: string; label: string }[];
  selectedValue: string | null;
  onSelect: (value: string) => void;
}

export function QuizQuestion({
  question,
  options,
  selectedValue,
  onSelect,
}: QuizQuestionProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-center">{question}</h3>

      <div className="space-y-3">
        {options.map((option, index) => (
          <motion.button
            key={option.value}
            className={cn(
              "w-full p-4 rounded-lg border text-left cursor-pointer transition-all duration-200 flex items-center justify-between",
              selectedValue === option.value
                ? "border-primary bg-primary/10 text-foreground"
                : "border-card-border bg-surface hover:border-primary/50 hover:bg-surface-hover"
            )}
            onClick={() => onSelect(option.value)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <span>{option.label}</span>
            {selectedValue === option.value && (
              <CheckIcon className="w-5 h-5 text-primary" />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
