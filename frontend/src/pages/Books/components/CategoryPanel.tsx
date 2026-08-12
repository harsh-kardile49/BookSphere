import { useState } from "react";
import {
  Code,
  BookOpen,
  Sparkles,
  Cpu,
  Landmark,
  TrendingUp,
  Heart,
  ArrowRight,
  ChevronDown,
  ChevronUp,
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
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const displayedCategories = showAll ? categories : categories.slice(0, 7);
  const hasMore = categories.length > 7;

  return (
    <div className="panel-card transition-all">
      <div
        className="panel-title-row d-flex align-items-center justify-content-between"
        style={{ cursor: "pointer", userSelect: "none" }}
        onClick={() => setIsCollapsed((prev) => !prev)}
      >
        <div className="d-flex align-items-center gap-2">
          <h3 className="panel-title mb-0">Categories</h3>
          {selectedCategory && (
            <span className="badge bg-indigo-subtle text-primary rounded-pill small ms-1">
              {selectedCategory}
            </span>
          )}
        </div>

        <div className="d-flex align-items-center gap-2">
          {!isCollapsed && hasMore && (
            <span
              className="section-link small"
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                e.stopPropagation();
                setShowAll((prev) => !prev);
              }}
            >
              {showAll ? "Show less" : "View all"}{" "}
              <ArrowRight
                size={12}
                style={{
                  transform: showAll ? "rotate(-90deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease",
                }}
              />
            </span>
          )}

          <button
            type="button"
            className="btn btn-sm btn-link text-secondary p-0 border-0 shadow-none d-flex align-items-center"
            aria-label={isCollapsed ? "Expand categories panel" : "Collapse categories panel"}
          >
            {isCollapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
          </button>
        </div>
      </div>

      {!isCollapsed && (
        <div className="d-flex flex-column gap-1 mt-3 transition-all">
          {displayedCategories.map((cat) => {
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

          {hasMore && (
            <button
              type="button"
              className="btn btn-sm btn-light text-primary border-0 rounded-3 mt-2 py-1.5 fw-semibold style-small d-flex align-items-center justify-content-center gap-1"
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? "Show Less Categories" : `View All Categories (${categories.length})`}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryPanel;
