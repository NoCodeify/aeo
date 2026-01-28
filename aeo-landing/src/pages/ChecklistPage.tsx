import { checklistCategories, totalItems } from "../data/checklist-data";
import { useChecklistState } from "../hooks/useChecklistState";
import { ChecklistStats } from "../components/checklist/ChecklistStats";
import { ChecklistSidebar } from "../components/checklist/ChecklistSidebar";
import { ChecklistCategorySection } from "../components/checklist/ChecklistCategory";

export function ChecklistPage() {
  const {
    getItem,
    updateItem,
    toggleDone,
    resetAll,
    exportCSV,
    doneCount,
    toImproveCount,
  } = useChecklistState();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ChecklistStats
          totalDone={doneCount}
          totalItems={totalItems}
          toImproveCount={toImproveCount}
          onExportCSV={exportCSV}
          onReset={resetAll}
        />

        <div className="flex gap-8">
          <ChecklistSidebar
            categories={checklistCategories}
            getItem={getItem}
            totalDone={doneCount}
            totalItems={totalItems}
          />

          <main className="flex-1 space-y-6">
            {checklistCategories.map((category) => (
              <ChecklistCategorySection
                key={category.id}
                category={category}
                getItem={getItem}
                onToggleDone={toggleDone}
                onUpdate={updateItem}
              />
            ))}
          </main>
        </div>
      </div>
    </div>
  );
}
