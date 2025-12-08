import { CATEGORIES, StoryCategory } from "@/types/story";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  selected: StoryCategory | "all";
  onSelect: (category: StoryCategory | "all") => void;
}

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <button
        onClick={() => onSelect("all")}
        className={cn(
          "shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
          selected === "all"
            ? "gradient-primary text-primary-foreground shadow-lg shadow-primary/30"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        )}
      >
        ✨ All Stories
      </button>
      {CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onSelect(cat.value)}
          className={cn(
            "shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
            selected === cat.value
              ? "gradient-primary text-primary-foreground shadow-lg shadow-primary/30"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          )}
        >
          {cat.emoji} {cat.label}
        </button>
      ))}
    </div>
  );
}
