import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import type { ChecklistItem as ItemData } from "../../data/checklist-data";
import type { ItemState } from "../../hooks/useChecklistState";
import { computePriority } from "../../hooks/useChecklistState";
import { cn } from "../../lib/utils";

const evaluationOptions = [
  { value: null, label: "---" },
  { value: "good" as const, label: "Good" },
  { value: "can-improve" as const, label: "Can be Improved" },
  { value: "bad" as const, label: "Bad" },
  { value: "not-relevant" as const, label: "Not Relevant" },
];

interface Props {
  data: ItemData;
  itemState: ItemState;
  onToggleDone: () => void;
  onUpdate: (updates: Partial<ItemState>) => void;
}

export function ChecklistItemRow({ data, itemState, onToggleDone, onUpdate }: Props) {
  const [showExample, setShowExample] = useState(false);
  const priority = computePriority(itemState, data.impact, data.cost);

  const priorityColor =
    priority >= 5
      ? "bg-success"
      : priority >= 3
        ? "bg-warning"
        : priority > 0
          ? "bg-orange-500"
          : "bg-card-border";

  return (
    <div
      className={cn(
        "border-b border-card-border transition-colors",
        itemState.done && "opacity-50"
      )}
    >
      <div className="flex items-start gap-3 py-3 px-4">
        {/* Checkbox */}
        <button
          onClick={onToggleDone}
          className={cn(
            "mt-0.5 w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors",
            itemState.done
              ? "bg-primary border-primary text-primary-foreground"
              : "border-muted hover:border-primary"
          )}
        >
          {itemState.done && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>

        {/* Item text + description + example toggle */}
        <div className="flex-1 min-w-0">
          <p className={cn("text-sm text-foreground", itemState.done && "line-through")}>
            {data.item}
          </p>
          {data.description && (
            <p className="text-xs text-muted-foreground mt-1">
              {data.description}
            </p>
          )}
          <button
            onClick={() => setShowExample(!showExample)}
            className="text-xs text-muted hover:text-primary flex items-center gap-1 mt-1"
          >
            <ChevronDownIcon
              className={cn("w-3 h-3 transition-transform", showExample && "rotate-180")}
            />
            Example
          </button>
          {showExample && (
            <p className="text-xs text-muted mt-1 pl-4 border-l-2 border-card-border whitespace-pre-line">
              {data.example}
            </p>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Evaluation */}
          <select
            value={itemState.evaluation || ""}
            onChange={(e) =>
              onUpdate({
                evaluation: (e.target.value || null) as ItemState["evaluation"],
              })
            }
            className="bg-surface text-foreground text-xs border border-card-border rounded px-2 py-1 w-32"
          >
            {evaluationOptions.map((opt) => (
              <option key={opt.label} value={opt.value || ""}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Impact bar (1-3 scale, 3 = high/green) */}
          <div className="w-12 h-4 bg-surface rounded overflow-hidden" title={`Impact: ${data.impact === 3 ? 'High' : data.impact === 2 ? 'Medium' : 'Low'}`}>
            <div
              className={cn(
                "h-full rounded transition-all",
                data.impact === 3 ? "bg-success" : data.impact === 2 ? "bg-warning" : "bg-orange-500"
              )}
              style={{ width: `${(data.impact / 3) * 100}%` }}
            />
          </div>

          {/* Cost bar (1-3 scale, 1 = easy/green, 3 = hard/orange) */}
          <div className="w-12 h-4 bg-surface rounded overflow-hidden" title={`Cost: ${data.cost === 1 ? 'Easy' : data.cost === 2 ? 'Medium' : 'Hard'}`}>
            <div
              className={cn(
                "h-full rounded transition-all",
                data.cost === 1 ? "bg-success" : data.cost === 2 ? "bg-warning" : "bg-orange-500"
              )}
              style={{ width: `${(data.cost / 3) * 100}%` }}
            />
          </div>

          {/* Priority bar */}
          <div className="w-16 h-4 bg-surface rounded overflow-hidden" title={`Priority: ${priority}`}>
            <div
              className={cn("h-full rounded transition-all", priorityColor)}
              style={{ width: `${Math.min((priority / 8) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
