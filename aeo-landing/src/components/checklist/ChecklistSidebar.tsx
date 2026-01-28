import type { ChecklistCategory } from "../../data/checklist-data";
import type { ItemState } from "../../hooks/useChecklistState";
import { cn } from "../../lib/utils";

interface Props {
  categories: ChecklistCategory[];
  getItem: (id: string) => ItemState;
  totalDone: number;
  totalItems: number;
}

export function ChecklistSidebar({ categories, getItem, totalDone, totalItems }: Props) {
  const overallPct = totalItems > 0 ? Math.round((totalDone / totalItems) * 100) : 0;

  return (
    <aside className="w-64 flex-shrink-0 sticky top-4 self-start hidden lg:block">
      <div className="bg-card border border-card-border rounded-xl p-4 space-y-4">
        {/* Overall progress */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-foreground font-semibold">Overall Progress</span>
            <span className="text-primary font-mono">{overallPct}%</span>
          </div>
          <div className="w-full h-3 bg-surface rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${overallPct}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {totalDone} of {totalItems} items complete
          </p>
        </div>

        <hr className="border-card-border" />

        {/* Category list */}
        <nav className="space-y-1">
          {categories.map((cat) => {
            const done = cat.items.filter((i) => getItem(i.id).done).length;
            const total = cat.items.length;
            const pct = total > 0 ? Math.round((done / total) * 100) : 0;

            return (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className={cn(
                  "block px-3 py-2 rounded-lg text-sm hover:bg-surface-hover transition-colors",
                  pct === 100 ? "text-success" : "text-foreground"
                )}
              >
                <div className="flex justify-between mb-1">
                  <span className="truncate">{cat.title}</span>
                  <span className="text-xs text-muted-foreground ml-2">
                    {done}/{total}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-surface rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all",
                      pct === 100 ? "bg-success" : "bg-primary"
                    )}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
