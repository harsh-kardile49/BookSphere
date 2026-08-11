import { Search, X } from "lucide-react";

interface BookFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  selectedAuthor: string;
  onAuthorChange: (value: string) => void;
  selectedAvailability: string;
  onAvailabilityChange: (value: string) => void;
  categories: string[];
  authors: string[];
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

const BookFilters = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedAuthor,
  onAuthorChange,
  selectedAvailability,
  onAvailabilityChange,
  categories,
  authors,
  onClearFilters,
  hasActiveFilters,
}: BookFiltersProps) => {
  return (
    <div className="books-filter-bar">
      {/* Search Input */}
      <div className="filter-search-box">
        <Search className="filter-search-icon" size={16} />
        <input
          type="text"
          className="filter-search-input"
          placeholder="Search books, authors, categories..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <span className="filter-search-kbd">⌘ K</span>
      </div>

      {/* Category Filter */}
      <select
        className="filter-select"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Author Filter */}
      <select
        className="filter-select"
        value={selectedAuthor}
        onChange={(e) => onAuthorChange(e.target.value)}
      >
        <option value="">All Authors</option>
        {authors.map((author) => (
          <option key={author} value={author}>
            {author}
          </option>
        ))}
      </select>

      {/* Availability Filter */}
      <select
        className="filter-select"
        value={selectedAvailability}
        onChange={(e) => onAvailabilityChange(e.target.value)}
      >
        <option value="">All Availability</option>
        <option value="Available">Available</option>
        <option value="Issued">Issued</option>
        <option value="Reserved">Reserved</option>
        <option value="Maintenance">Maintenance</option>
      </select>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <button className="btn-clear-filters d-flex align-items-center gap-1" onClick={onClearFilters}>
          <X size={14} />
          <span>Clear Filters</span>
        </button>
      )}
    </div>
  );
};

export default BookFilters;
