import { useEffect, useState } from "react";

const sections = [
  { id: "results", label: "Results" },
  { id: "visibility", label: "Visibility" },
  { id: "findings", label: "Findings" },
  { id: "actions", label: "Actions" },
  { id: "proof", label: "Proof" },
  { id: "market", label: "Market" },
  { id: "next", label: "Next Steps" },
];

export function SectionNav() {
  const [activeId, setActiveId] = useState(sections[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-card-border py-3 -mx-4 px-4 md:-mx-0 md:px-0">
      <div className="flex gap-1 overflow-x-auto no-scrollbar">
        {sections.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              activeId === id
                ? "bg-primary/20 text-primary border border-primary/30"
                : "text-muted-foreground hover:text-foreground hover:bg-surface-hover"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}
