import { Badge } from "@/components/ui/badge";
import { Code, FileCode2, Gamepad2, Layers, Sparkles, FormInput } from "lucide-react";
import { projectCategories, categoryLabels, type ProjectCategory } from "@shared/schema";

interface CategoryFilterProps {
  activeCategory: ProjectCategory;
  onCategoryChange: (category: ProjectCategory) => void;
  projectCounts: Record<ProjectCategory, number>;
}

const categoryIcons: Record<ProjectCategory, React.ElementType> = {
  "all": Layers,
  "html-css": FileCode2,
  "javascript": Code,
  "animations": Sparkles,
  "games": Gamepad2,
  "forms-ui": FormInput,
};

export function CategoryFilter({ activeCategory, onCategoryChange, projectCounts }: CategoryFilterProps) {
  return (
    <div id="categories" className="flex flex-wrap gap-2">
      {projectCategories.map((category) => {
        const Icon = categoryIcons[category];
        const isActive = activeCategory === category;
        const count = projectCounts[category] || 0;

        return (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 hover-elevate active-elevate-2 ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
            data-testid={`button-category-${category}`}
          >
            <Icon className="w-4 h-4" />
            <span>{categoryLabels[category]}</span>
            <Badge
              variant="secondary"
              className={`ml-1 px-1.5 py-0 text-xs font-mono ${
                isActive
                  ? "bg-primary-foreground/20 text-primary-foreground"
                  : "bg-background text-foreground"
              }`}
            >
              {count}
            </Badge>
          </button>
        );
      })}
    </div>
  );
}
