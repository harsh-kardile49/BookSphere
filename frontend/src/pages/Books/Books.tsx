import { useState, useMemo, useEffect } from "react";
import type { Book, CategoryStat } from "./data/booksData";
import BooksHeader from "./components/BooksHeader";
import BookFilters from "./components/BookFilters";
import BookGrid from "./components/BookGrid";
import CategoryPanel from "./components/CategoryPanel";
import LibraryStatsWidget from "./components/LibraryStatsWidget";
import BookDetailsModal from "./components/BookDetailsModal";
import BooksSkeleton from "./components/BooksSkeleton";
import { getAllBooks } from "../../services/book.service";
import type { BackendBook } from "../../types/book";
import { toast } from "sonner";
import "./books.css";

const GRADIENTS = [
  "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
  "linear-gradient(135deg, #06b6d4 0%, #0e7490 100%)",
  "linear-gradient(135deg, #f59e0b 0%, #b45309 100%)",
  "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
  "linear-gradient(135deg, #10b981 0%, #047857 100%)",
  "linear-gradient(135deg, #ec4899 0%, #be185d 100%)",
];

const mapBackendToFrontendBook = (b: BackendBook, index: number): Book => {
  const initials = b.title
    ? b.title
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "BK";

  return {
    id: String(b.id),
    title: b.title || "Untitled Book",
    author: b.author || "Unknown Author",
    isbn: b.isbn || "N/A",
    category: b.category || "General",
    publishedYear: b.publishedYear || 2026,
    publisher: b.publisher || "Prentice Hall",
    language: "English",
    pages: 350,
    issuesCount: b.quantity ?? 10,
    coverColor: "#6366f1",
    coverGradient: GRADIENTS[index % GRADIENTS.length],
    coverInitial: initials || "BK",
    rating: 4.8,
    reviewCount: 24,
    availability: (b.quantity ?? 1) > 0 ? "Available" : "Issued",
    imageUrl: b.imageUrl,
    description: `Published by ${b.publisher || "BookSphere"}. A comprehensive title in ${
      b.category || "General"
    }. Price: ₹${b.price || 499}.`,
  };
};

const Books = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState("");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  // Live books state loaded from backend API (GET /books)
  const [booksList, setBooksList] = useState<Book[]>([]);
  const [isLoadingApi, setIsLoadingApi] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);

  // Load books strictly from backend API (GET /books)
  useEffect(() => {
    let isMounted = true;
    const fetchBackendBooks = async () => {
      setIsLoadingApi(true);
      setApiError(null);
      try {
        const data = await getAllBooks();

        if (isMounted && data && Array.isArray(data)) {
          const mapped = data.map(mapBackendToFrontendBook);
          setBooksList(mapped);
        } else if (isMounted && data && typeof data === "object" && "error" in data) {
          const errObj = data as { message?: string; error?: string };
          setApiError(errObj.message || errObj.error || "Unable to load catalog.");
        }
      } catch (err: unknown) {
        const errObj = err as { response?: { data?: { message?: string; error?: string } }; message?: string };
        const errMsg =
          errObj?.response?.data?.message ||
          errObj?.response?.data?.error ||
          errObj?.message ||
          "Unable to load books catalog.";

        if (isMounted) {
          setApiError(errMsg);
          toast.error("Unable to load catalog", { description: errMsg });
        }
      } finally {
        if (isMounted) setIsLoadingApi(false);
      }
    };

    fetchBackendBooks();
    return () => {
      isMounted = false;
    };
  }, []);

  // Compute category statistics dynamically from API books
  const categoryStatsList = useMemo<CategoryStat[]>(() => {
    const countsMap: Record<string, number> = {};
    booksList.forEach((b) => {
      const cat = b.category || "General";
      countsMap[cat] = (countsMap[cat] || 0) + 1;
    });

    return Object.entries(countsMap).map(([name, count]) => ({
      name,
      count,
      iconName: name === "Programming" ? "Code" : "BookOpen",
    }));
  }, [booksList]);

  // Extract unique category names and author names for filter dropdowns
  const categoriesList = useMemo(() => {
    return Array.from(new Set(booksList.map((b) => b.category))).sort();
  }, [booksList]);

  const authorsList = useMemo(() => {
    return Array.from(new Set(booksList.map((b) => b.author))).sort();
  }, [booksList]);

  // Dynamic Library Statistics from API books
  const libraryStats = useMemo(() => {
    const totalBooks = booksList.length;
    const availableBooks = booksList.filter((b) => b.availability === "Available").length;
    const issuedBooks = booksList.filter((b) => b.availability === "Issued").length;
    const overdueBooks = booksList.filter((b) => b.availability === "Maintenance").length;

    return { totalBooks, availableBooks, issuedBooks, overdueBooks };
  }, [booksList]);

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
    return booksList.filter((book) => {
      const matchSearch =
        !searchTerm.trim() ||
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchCategory =
        !selectedCategory || book.category === selectedCategory;

      const matchAuthor = !selectedAuthor || book.author === selectedAuthor;

      const matchAvailability =
        !selectedAvailability || book.availability === selectedAvailability;

      return matchSearch && matchCategory && matchAuthor && matchAvailability;
    });
  }, [booksList, searchTerm, selectedCategory, selectedAuthor, selectedAvailability]);

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
        {/* Left: Book Cards Grid or Skeleton Loader */}
        {isLoadingApi ? (
          <BooksSkeleton />
        ) : apiError ? (
          <div className="p-5 text-center my-4 bg-white rounded-4 border border-danger-subtle shadow-sm">
            <div className="text-danger mb-2 fw-bold" style={{ fontSize: "1.1rem" }}>
              Unable to load catalog
            </div>
            <p className="text-secondary small mb-3">{apiError}</p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-outline-danger btn-sm rounded-3 px-3 py-1.5 fw-semibold"
            >
              Retry Connection
            </button>
          </div>
        ) : (
          <BookGrid
            books={filteredBooks}
            onSelectBook={setSelectedBook}
            onClearFilters={handleClearFilters}
          />
        )}

        {/* Right: Side Panels */}
        <div className="books-side-panel">
          <CategoryPanel
            categories={categoryStatsList}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          <LibraryStatsWidget
            totalBooks={libraryStats.totalBooks}
            availableBooks={libraryStats.availableBooks}
            issuedBooks={libraryStats.issuedBooks}
            overdueBooks={libraryStats.overdueBooks}
          />
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
