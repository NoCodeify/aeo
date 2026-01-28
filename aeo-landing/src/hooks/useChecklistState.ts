import { useState, useCallback, useEffect } from "react";
import { checklistCategories, type ChecklistItem } from "../data/checklist-data";

export interface ItemState {
  done: boolean;
  evaluation: "good" | "can-improve" | "bad" | "not-relevant" | null;
}

export type ChecklistState = Record<string, ItemState>;

const STORAGE_KEY = "aeo-checklist-state";

const defaultItemState: ItemState = {
  done: false,
  evaluation: null,
};

function loadState(): ChecklistState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return {};
}

function saveState(state: ChecklistState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

// Build lookup for item data (impact/cost)
const itemLookup: Record<string, ChecklistItem> = {};
checklistCategories.forEach((cat) => {
  cat.items.forEach((item) => {
    itemLookup[item.id] = item;
  });
});

export function useChecklistState() {
  const [state, setState] = useState<ChecklistState>(loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const getItem = useCallback(
    (id: string): ItemState => state[id] || defaultItemState,
    [state]
  );

  const updateItem = useCallback(
    (id: string, updates: Partial<ItemState>) => {
      setState((prev) => ({
        ...prev,
        [id]: { ...(prev[id] || defaultItemState), ...updates },
      }));
    },
    []
  );

  const toggleDone = useCallback((id: string) => {
    setState((prev) => {
      const current = prev[id] || defaultItemState;
      return { ...prev, [id]: { ...current, done: !current.done } };
    });
  }, []);

  const resetAll = useCallback(() => {
    setState({});
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const exportCSV = useCallback(() => {
    const rows: string[] = [
      ["Category", "Done", "Item", "Description", "Example", "Evaluation", "Impact", "Cost", "Priority"].join(","),
    ];

    checklistCategories.forEach((cat) => {
      cat.items.forEach((item) => {
        const s = state[item.id] || defaultItemState;
        const priority = computePriority(s, item.impact, item.cost);
        const row = [
          `"${cat.title}"`,
          s.done ? "TRUE" : "FALSE",
          `"${item.item.replace(/"/g, '""')}"`,
          `"${item.description.replace(/"/g, '""')}"`,
          `"${item.example.replace(/"/g, '""')}"`,
          s.evaluation || "",
          item.impact,
          item.cost,
          priority,
        ];
        rows.push(row.join(","));
      });
    });

    const blob = new Blob([rows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "aeo-checklist-export.csv";
    a.click();
    URL.revokeObjectURL(url);
  }, [state]);

  const doneCount = Object.values(state).filter((s) => s.done).length;
  const toImproveCount = Object.values(state).filter(
    (s) => s.evaluation === "bad" || s.evaluation === "can-improve"
  ).length;

  return {
    state,
    getItem,
    updateItem,
    toggleDone,
    resetAll,
    exportCSV,
    doneCount,
    toImproveCount,
  };
}

export function computePriority(
  itemState: ItemState,
  impact: 1 | 2 | 3,
  cost: 1 | 2 | 3
): number {
  if (!itemState.evaluation) return 0;
  if (itemState.evaluation === "good" || itemState.evaluation === "not-relevant") return 0;
  const factor = itemState.evaluation === "bad" ? 1.33 : 1;
  const costForSum = cost === 1 ? 3 : cost === 2 ? 2 : 1;
  return Math.ceil((costForSum + impact) * factor * 10) / 10;
}

export function getItemData(id: string): ChecklistItem | undefined {
  return itemLookup[id];
}
