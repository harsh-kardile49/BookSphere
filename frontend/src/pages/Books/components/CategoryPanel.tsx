import {
  Code,
  BookOpen,
  Sparkles,
  Cpu,
  Landmark,
  TrendingUp,
  Heart,
  ArrowRight,
} from "lucide-react";
import type { CategoryStat } from "../data/booksData";

interface CategoryPanelProps {
  categories: CategoryStat[];
  selectedCategory: string;
  onSelectCategory: (categoryName: string) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Code: <Code size={14} />,
  BookOpen: <BookOpen size={14} />,
  Sparkles: <Sparkles size={14} />,
  Cpu: <Cpu size={14} />,
  Landmark: <Landmark size={14} />,
  TrendingUp: <TrendingUp size={14} />,
  Heart: <Heart size={14} />,
};

const CategoryPanel = ({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryPanelProps) => {
  return (
    <div className="panel-card">
      <div className="panel-title-row">
        <h3 className="panel-title">Categories</h3>
        <span
          className="section-link"
          style={{ cursor: "pointer" }}
          onClick={() => onSelectCategory("")}
        >
          View all <ArrowRight size={12} />
        </span>
      </div>

      <div className="d-flex flex-column gap-1">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.name;
          return (
            <div
              key={cat.name}
              className={`category-item ${isActive ? "category-item--active" : ""}`}
              onClick={() => onSelectCategory(isActive ? "" : cat.name)}
            >
              <div className="d-flex align-items-center gap-2">
                <span
                  style={{
                    color: isActive ? "var(--bs-indigo)" : "var(--text-muted)",
                  }}
                >
                  {ICON_MAP[cat.iconName] || <BookOpen size={14} />}
                </span>
                <span className="category-name">{cat.name}</span>
              </div>
              <span className="category-count">{cat.count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryPanel;
