import { ArrowDownTrayIcon, TrashIcon } from "@heroicons/react/20/solid";

interface Props {
  totalDone: number;
  totalItems: number;
  toImproveCount: number;
  onExportCSV: () => void;
  onReset: () => void;
}

export function ChecklistStats({
  totalDone,
  totalItems,
  toImproveCount,
  onExportCSV,
  onReset,
}: Props) {
  const pct = totalItems > 0 ? Math.round((totalDone / totalItems) * 100) : 0;

  return (
    <div className="flex flex-wrap items-center gap-4 mb-8">
      <div className="flex-1 min-w-0">
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
          AEO Checklist
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          {totalItems} items across 9 categories. Progress saved automatically.
        </p>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary font-mono">{pct}%</div>
          <div className="text-xs text-muted-foreground">Complete</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground font-mono">{totalDone}</div>
          <div className="text-xs text-muted-foreground">Done</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-warning font-mono">{toImproveCount}</div>
          <div className="text-xs text-muted-foreground">To Improve</div>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onExportCSV}
          className="flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg bg-surface hover:bg-surface-hover border border-card-border text-foreground transition-colors"
        >
          <ArrowDownTrayIcon className="w-4 h-4" />
          Export
        </button>
        <button
          onClick={() => {
            if (window.confirm("Reset all progress? This cannot be undone.")) {
              onReset();
            }
          }}
          className="flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg bg-surface hover:bg-destructive/20 border border-card-border text-muted-foreground hover:text-destructive transition-colors"
        >
          <TrashIcon className="w-4 h-4" />
          Reset
        </button>
      </div>
    </div>
  );
}
