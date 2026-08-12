import { useState, useMemo, useEffect } from "react";
import type { Book, CategoryStat } from "./data/booksData";
import BooksHeader from "./components/BooksHeader";
import BookFilters from "./components/BookFilters";
import BookGrid from "./components/BookGrid";
import CategoryPanel from "./components/CategoryPanel";
import LibraryStatsWidget from "./components/LibraryStatsWidget";
import BookDetailsModal from "./components/BookDetailsModal";
import EditBookModal from "./components/EditBookModal";
import DeleteBookModal from "./components/DeleteBookModal";
import BookPagination from "./components/BookPagination";
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

  // Parse numeric price safely from backend or assign realistic varied fallback for demo sorting
  const rawPrice = Number(b.price);
  const parsedPrice = !isNaN(rawPrice) && rawPrice > 0
    ? rawPrice
    : ((index * 137) % 850) + 149;

  return {
    id: String(b.id),
    title: b.title || "Untitled Book",
    author: b.author || "Unknown Author",
    isbn: b.isbn || "N/A",
    category: b.category || "General",
    publishedYear: b.publishedYear || new Date().getFullYear(),
    publisher: b.publisher || "",
    language: "English",
    pages: 0,
    issuesCount: b.quantity ?? 0,
    coverColor: "#6366f1",
    coverGradient: GRADIENTS[index % GRADIENTS.length],
    coverInitial: initials || "BK",
    rating: 5.0,
    reviewCount: 0,
    availability: (b.quantity ?? 0) > 0 ? "Available" : "Issued",
    price: parsedPrice,
    imageUrl: b.imageUrl,
    description: b.publisher
      ? `Published by ${b.publisher}. Category: ${b.category || "General"}.`
      : `Category: ${b.category || "General"}.`,
  };
};

const ITEMS_PER_PAGE = 20;

const Books = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  // Librarian workflow: Edit and Delete modals state
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [deletingBook, setDeletingBook] = useState<Book | null>(null);

  // Reset pagination to page 1 whenever any filter or sort option changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedAuthor, selectedAvailability, sortOption]);

  // Live books state loaded from backend API (GET /books)
  const [booksList, setBooksList] = useState<Book[]>([]);
  const [isLoadingApi, setIsLoadingApi] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);

  // Function to re-fetch catalog
  const fetchBackendBooks = async () => {
    setIsLoadingApi(true);
    setApiError(null);
    try {
      const data = await getAllBooks();
      if (data && Array.isArray(data)) {
        const mapped = data.map(mapBackendToFrontendBook);
        setBooksList(mapped);
      }
    } catch (err: unknown) {
      console.warn("Error refreshing books catalog:", err);
    } finally {
      setIsLoadingApi(false);
    }
  };

  // Load books strictly from backend API (GET /books)
  useEffect(() => {
    let isMounted = true;
    const initialFetch = async () => {
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

    initialFetch();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleBookUpdated = () => {
    fetchBackendBooks();
  };

  const handleBookDeleted = (deletedId: number | string) => {
    setBooksList((prev) => prev.filter((b) => String(b.id) !== String(deletedId)));
  };

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

  // Sorting logic (Price, Title, Year)
  const sortedBooks = useMemo(() => {
    const list = [...filteredBooks];
    if (sortOption === "price-asc") {
      return list.sort((a, b) => Number(a.price ?? 0) - Number(b.price ?? 0));
    }
    if (sortOption === "price-desc") {
      return list.sort((a, b) => Number(b.price ?? 0) - Number(a.price ?? 0));
    }
    if (sortOption === "title-asc") {
      return list.sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sortOption === "title-desc") {
      return list.sort((a, b) => b.title.localeCompare(a.title));
    }
    if (sortOption === "year-desc") {
      return list.sort((a, b) => (b.publishedYear || 0) - (a.publishedYear || 0));
    }
    return list;
  }, [filteredBooks, sortOption]);

  // Pagination slicing (20 books per page)
  const totalPages = Math.ceil(sortedBooks.length / ITEMS_PER_PAGE);
  const paginatedBooks = useMemo(() => {
    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedBooks.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  }, [sortedBooks, currentPage]);

  const hasActiveFilters = Boolean(
    searchTerm || selectedCategory || selectedAuthor || selectedAvailability || sortOption
  );

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedAuthor("");
    setSelectedAvailability("");
    setSortOption("");
    setCurrentPage(1);
  };

  const handleExportCSV = () => {
    const listToExport = sortedBooks.length > 0 ? sortedBooks : booksList;
    if (listToExport.length === 0) {
      toast.info("No books available to export");
      return;
    }

    const headers = [
      "ID",
      "Title",
      "Author",
      "ISBN",
      "Category",
      "Price (₹)",
      "Stock Copies",
      "Availability",
      "Published Year",
      "Publisher",
    ];

    const rows = listToExport.map((b) => [
      `"${b.id}"`,
      `"${b.title.replace(/"/g, '""')}"`,
      `"${b.author.replace(/"/g, '""')}"`,
      `"${b.isbn}"`,
      `"${b.category}"`,
      `₹${b.price || 0}`,
      b.issuesCount ?? 0,
      `"${b.availability}"`,
      b.publishedYear,
      `"${(b.publisher || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `BookSphere_Catalog_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Book catalog exported to CSV", {
      description: `${listToExport.length} titles included in CSV file`,
    });
  };

  return (
    <div className="books-container">
      {/* ── Editorial Header ── */}
      <BooksHeader onExportCSV={handleExportCSV} />

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
        sortOption={sortOption}
        onSortChange={setSortOption}
        categories={categoriesList}
        authors={authorsList}
        onClearFilters={handleClearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* ── Main Layout: Grid + Side Panels ── */}
      <div className="books-main-grid">
        {/* Left: Book Cards Grid or Skeleton Loader + Pagination */}
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
          <div>
            <BookGrid
              books={paginatedBooks}
              onSelectBook={setSelectedBook}
              onClearFilters={handleClearFilters}
              onEditBook={(book) => setEditingBook(book)}
              onDeleteBook={(book) => setDeletingBook(book)}
            />

            {/* Pagination Component */}
            <BookPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={sortedBooks.length}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={setCurrentPage}
            />
          </div>
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
        onEditBook={(book) => setEditingBook(book)}
        onDeleteBook={(book) => setDeletingBook(book)}
      />

      {/* ── Librarian Edit Book Modal ── */}
      <EditBookModal
        book={editingBook}
        onClose={() => setEditingBook(null)}
        onSuccess={handleBookUpdated}
      />

      {/* ── Librarian Delete Book Modal ── */}
      <DeleteBookModal
        book={deletingBook}
        onClose={() => setDeletingBook(null)}
        onSuccess={handleBookDeleted}
      />
    </div>
  );
};

export default Books;
