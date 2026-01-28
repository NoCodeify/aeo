import { useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import type { ChecklistCategory as CategoryData } from "../../data/checklist-data";
import type { ItemState } from "../../hooks/useChecklistState";
import { ChecklistItemRow } from "./ChecklistItem";
import { cn } from "../../lib/utils";

interface Props {
  category: CategoryData;
  getItem: (id: string) => ItemState;
  onToggleDone: (id: string) => void;
  onUpdate: (id: string, updates: Partial<ItemState>) => void;
}

export function ChecklistCategorySection({ category, getItem, onToggleDone, onUpdate }: Props) {
  const [open, setOpen] = useState(true);

  const doneCount = category.items.filter((i) => getItem(i.id).done).length;
  const total = category.items.length;
  const pct = total > 0 ? Math.round((doneCount / total) * 100) : 0;

  return (
    <section id={category.id} className="scroll-mt-20">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 py-4 px-4 bg-surface hover:bg-surface-hover rounded-lg transition-colors"
      >
        <ChevronRightIcon
          className={cn("w-5 h-5 text-muted transition-transform", open && "rotate-90")}
        />
        <h2 className="font-heading text-lg font-semibold text-foreground flex-1 text-left">
          {category.title}
        </h2>
        <span className="text-xs text-muted-foreground">
          {doneCount}/{total}
        </span>
        <div className="w-20 h-2 bg-card rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="text-xs text-muted-foreground w-10 text-right">{pct}%</span>
      </button>

      {open && (
        <div className="mt-1 border border-card-border rounded-lg overflow-hidden bg-card/50">
          {/* Column headers - structure matches ChecklistItemRow exactly */}
          <div className="flex items-start gap-3 py-2 px-4 text-xs text-muted-foreground border-b border-card-border bg-surface/50">
            {/* Checkbox column */}
            <div className="w-5 flex-shrink-0" />
            {/* Item column */}
            <div className="flex-1 min-w-0">Item</div>
            {/* Controls - same structure as row */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-32 text-center">Evaluation</div>
              <div className="w-12 text-center">Impact</div>
              <div className="w-12 text-center">Cost</div>
              <div className="w-16 text-center">Priority</div>
            </div>
          </div>
          {category.items.map((item) => (
            <ChecklistItemRow
              key={item.id}
              data={item}
              itemState={getItem(item.id)}
              onToggleDone={() => onToggleDone(item.id)}
              onUpdate={(updates) => onUpdate(item.id, updates)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
