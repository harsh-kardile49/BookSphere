import { useState, useMemo, useEffect } from "react";
import { BOOKS_DATA, CATEGORIES_DATA, type Book } from "./data/booksData";
import BooksHeader from "./components/BooksHeader";
import BookFilters from "./components/BookFilters";
import BookGrid from "./components/BookGrid";
import CategoryPanel from "./components/CategoryPanel";
import LibraryStatsWidget from "./components/LibraryStatsWidget";
import BookDetailsModal from "./components/BookDetailsModal";
import "./books.css";

const Books = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState("");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  // Extract unique categories and authors
  const categoriesList = useMemo(() => {
    return Array.from(new Set(BOOKS_DATA.map((b) => b.category))).sort();
  }, []);

  const authorsList = useMemo(() => {
    return Array.from(new Set(BOOKS_DATA.map((b) => b.author))).sort();
  }, []);

  // Keyboard shortcut (⌘ K / Ctrl K) to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        const searchInput = document.querySelector<HTMLInputElement>(".filter-search-input");
        searchInput?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Combined reactive filter
  const filteredBooks = useMemo(() => {
    return BOOKS_DATA.filter((book) => {
      // Search term matching title, author, or category
      const matchSearch =
        !searchTerm.trim() ||
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.category.toLowerCase().includes(searchTerm.toLowerCase());

      // Category match
      const matchCategory =
        !selectedCategory || book.category === selectedCategory;

      // Author match
      const matchAuthor = !selectedAuthor || book.author === selectedAuthor;

      // Availability match
      const matchAvailability =
        !selectedAvailability || book.availability === selectedAvailability;

      return matchSearch && matchCategory && matchAuthor && matchAvailability;
    });
  }, [searchTerm, selectedCategory, selectedAuthor, selectedAvailability]);

  const hasActiveFilters = Boolean(
    searchTerm || selectedCategory || selectedAuthor || selectedAvailability
  );

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedAuthor("");
    setSelectedAvailability("");
  };

  return (
    <div className="books-container">
      {/* ── Editorial Header ── */}
      <BooksHeader />

      {/* ── Search & Filter Toolbar ── */}
      <BookFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedAuthor={selectedAuthor}
        onAuthorChange={setSelectedAuthor}
        selectedAvailability={selectedAvailability}
        onAvailabilityChange={setSelectedAvailability}
        categories={categoriesList}
        authors={authorsList}
        onClearFilters={handleClearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* ── Main Layout: Grid + Side Panels ── */}
      <div className="books-main-grid">
        {/* Left: Book Cards Grid */}
        <BookGrid
          books={filteredBooks}
          onSelectBook={setSelectedBook}
          onClearFilters={handleClearFilters}
        />

        {/* Right: Side Panels */}
        <div className="books-side-panel">
          <CategoryPanel
            categories={CATEGORIES_DATA}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          <LibraryStatsWidget />
        </div>
      </div>

      {/* ── Book Quick View Modal ── */}
      <BookDetailsModal
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
      />
    </div>
  );
};

export default Books;
