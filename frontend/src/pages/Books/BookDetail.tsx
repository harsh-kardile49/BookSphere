import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  ChevronUp,
  ChevronDown,
  Bookmark,
  Share2,
  ArrowUpRight,
  CheckCircle2,
  BookOpen,
  MapPin,
  Clock,
  Tag,
  Building2,
  Barcode,
  Layers,
  IndianRupee,
} from "lucide-react";
import { isBookSaved, toggleSaveBook } from "../../utils/savedBooksStore";
import { getBookById, getAllBooks } from "../../services/book.service";
import type { BackendBook } from "../../types/book";
import ProgressiveImage from "../../components/common/ProgressiveImage";
import { toast } from "sonner";
import "./books.css";

const GRADIENTS = [
  "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
  "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
  "linear-gradient(135deg, #06b6d4 0%, #0e7490 100%)",
  "linear-gradient(135deg, #f59e0b 0%, #b45309 100%)",
  "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
  "linear-gradient(135deg, #10b981 0%, #047857 100%)",
];

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [book, setBook] = useState<BackendBook | null>(null);
  const [allBooks, setAllBooks] = useState<BackendBook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (book) {
      setIsBookmarked(isBookSaved(Number(book.id)));
    }
  }, [book]);

  const handleToggleBookmark = () => {
    if (!book) return;
    const newState = toggleSaveBook(Number(book.id));
    setIsBookmarked(newState);
    if (newState) {
      toast.success("Saved to Wishlist", { description: `"${book.title}" added to your saved books` });
    } else {
      toast.info("Removed from Wishlist", { description: `"${book.title}" removed from saved books` });
    }
  };

  // Load current book and all books catalog for carousel navigation
  useEffect(() => {
    let isMounted = true;

    const fetchDetailData = async () => {
      setIsLoading(true);
      try {
        const catalog = await getAllBooks();
        if (isMounted && Array.isArray(catalog) && catalog.length > 0) {
          setAllBooks(catalog);
        }

        if (id) {
          try {
            const single = await getBookById(Number(id));
            if (isMounted && single) {
              setBook(single);
            }
          } catch {
            // Fallback to searching catalog array by id
            if (catalog && Array.isArray(catalog)) {
              const found = catalog.find((b) => String(b.id) === String(id));
              if (isMounted && found) setBook(found);
            }
          }
        }
      } catch (err) {
        console.warn("API error fetching detail data:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchDetailData();
    return () => {
      isMounted = false;
    };
  }, [id]);

  // Current book index in catalog
  const currentIndex = useMemo(() => {
    if (!book || allBooks.length === 0) return 0;
    return allBooks.findIndex((b) => String(b.id) === String(book.id));
  }, [book, allBooks]);

  // Carousel Next / Previous
  const handlePrevBook = () => {
    if (allBooks.length === 0) return;
    const prevIdx = (currentIndex - 1 + allBooks.length) % allBooks.length;
    navigate(`/books/${allBooks[prevIdx].id}`);
  };

  const handleNextBook = () => {
    if (allBooks.length === 0) return;
    const nextIdx = (currentIndex + 1) % allBooks.length;
    navigate(`/books/${allBooks[nextIdx].id}`);
  };

  const handleIssueBook = () => {
    toast.success("Opening issue form", {
      description: `Selected "${book?.title || 'Book'}".`,
    });
    navigate("/borrow");
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    toast.info("Link Copied!", {
      description: "Book detail URL copied to your clipboard.",
    });
  };

  const currentGradient = GRADIENTS[(Number(book?.id || 1)) % GRADIENTS.length];
  const coverInitials = book?.title
    ? book.title
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "BK";

  if (isLoading) {
    return (
      <div className="book-detail-page-container d-flex align-items-center justify-content-center min-vh-100">
        <div className="text-center p-5">
          <div className="spinner-border text-primary mb-3" role="status" style={{ width: 44, height: 44, color: "#1c1917" }} />
          <h5 className="fw-semibold text-secondary">Loading Book Details...</h5>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="book-detail-page-container d-flex align-items-center justify-content-center min-vh-100">
        <div className="text-center p-5 bg-white rounded-4 border shadow-sm" style={{ maxWidth: 450 }}>
          <BookOpen size={48} className="text-secondary mb-3 opacity-50" />
          <h4 className="fw-bold text-dark mb-2">Book Not Found</h4>
          <p className="text-muted small mb-4">
            The book record you are looking for does not exist in the database catalog.
          </p>
          <Link to="/books" className="btn btn-primary rounded-pill px-4 py-2 fw-bold" style={{ background: "var(--bs-indigo)", borderColor: "var(--bs-indigo)" }}>
            <ArrowLeft size={16} className="me-2" />
            Back to Books Catalog
          </Link>
        </div>
      </div>
    );
  }

  const displayBook = book;

  return (
    <div className="book-detail-page-container">
      {/* ── Navigation Header ── */}
      <div className="book-detail-header mb-4">
        <Link to="/books" className="d-inline-flex align-items-center gap-2 text-decoration-none fw-semibold text-dark small card border px-3 py-2 rounded-pill shadow-sm">
          <ArrowLeft size={16} />
          <span>Back to Books Catalog</span>
        </Link>
      </div>

      {/* ── Main Book Hero Showcase Section ── */}
      <div className="book-detail-hero-section">
        {/* Left: Carousel Navigation Controls + 3D Book Cover */}
        <div className="book-detail-cover-showcase">
          {/* Vertical Up / Down Carousel Arrows */}
          <div className="book-detail-carousel-controls">
            <button
              className="book-detail-carousel-btn"
              onClick={handlePrevBook}
              title="Previous Book in Catalog"
            >
              <ChevronUp size={18} />
            </button>
            <button
              className="book-detail-carousel-btn"
              onClick={handleNextBook}
              title="Next Book in Catalog"
            >
              <ChevronDown size={18} />
            </button>
          </div>

          {/* 3D Floating Book Cover Card */}
          <div
            className="book-3d-cover-card"
            style={{
              background: displayBook.imageUrl ? "transparent" : currentGradient,
              padding: displayBook.imageUrl ? 0 : "24px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {displayBook.imageUrl ? (
              <ProgressiveImage
                src={displayBook.imageUrl}
                alt={displayBook.title}
                style={{ borderRadius: "14px" }}
              />
            ) : (
              <>
                <div className="book-3d-spine-effect" />
                <div className="book-3d-cover-content">
                  <span className="book-3d-category-badge">{displayBook.category || "General"}</span>
                  <h2 className="book-3d-title">{displayBook.title}</h2>
                  <div className="book-3d-initials">{coverInitials}</div>
                  <p className="book-3d-author">{displayBook.author}</p>
                </div>
                <div className="book-3d-bottom-glare" />
              </>
            )}
          </div>
        </div>

        {/* Right: Book Headline, Overview & Primary Action Toolbar */}
        <div className="book-detail-hero-content">
          <div className="d-flex align-items-center gap-2 mb-2">
            <span className="badge bg-indigo-subtle text-primary fw-semibold rounded-pill px-3 py-1 text-uppercase tracking-wider small">
              <Tag size={12} className="me-1" />
              {displayBook.category || "General"}
            </span>
            <span className="text-muted small">Published {displayBook.publishedYear || 2026}</span>
          </div>

          <h1 className="book-detail-title">{displayBook.title}</h1>
          <h3 className="book-detail-author">by {displayBook.author}</h3>

          <p className="book-detail-teaser">
            Cataloged in the main library collection. Published by {displayBook.publisher || "Prentice Hall"} with ISBN {displayBook.isbn}. Available for member issuance under standard library policies.
          </p>

          {/* Primary Action Buttons Row */}
          <div className="book-detail-action-bar">
            <button
              className="btn-start-reading"
              onClick={handleIssueBook}
            >
              <span>Issue / Borrow Book</span>
              <ArrowUpRight size={18} />
            </button>

            <div className="d-flex align-items-center gap-2">
              <button
                className={`book-detail-action-btn ${isBookmarked ? "active" : ""}`}
                onClick={handleToggleBookmark}
                title={isBookmarked ? "Remove from Saved Wishlist" : "Save to Wishlist"}
              >
                <Bookmark size={18} fill={isBookmarked ? "currentColor" : "none"} />
              </button>

              <button
                className="book-detail-action-btn"
                onClick={handleShare}
                title="Share Link"
              >
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Lower Elevated Content Card (Physical Library Info) ── */}
      <div className="book-detail-content-card">
        <div className="row g-4 g-lg-5">
          {/* Left Column: Physical Library Inventory & Policy */}
          <div className="col-lg-7">
            <div className="mb-4 pb-2">
              <h4 className="book-detail-section-title">Physical Library Inventory Information</h4>
              <p className="book-detail-paragraph">
                "{displayBook.title}" by {displayBook.author} is cataloged under the {displayBook.category || "General"} section. It provides detailed foundational concepts, practical patterns, and core principles for academic reference and self-study.
              </p>
              <p className="book-detail-paragraph mb-0">
                Authorized library members can borrow this physical copy for up to 14 consecutive days. Late returns accrue standard daily fines as specified in library guidelines.
              </p>
            </div>

            {/* Library Shelf Location & Policy Box */}
            <div className="d-flex flex-wrap gap-3 p-3 rounded-4 card border">
              <div className="d-flex align-items-center gap-2 text-dark small fw-semibold">
                <MapPin size={16} className="text-primary" />
                <span>Section B4 • Shelf 12</span>
              </div>

              <div className="d-flex align-items-center gap-2 text-dark small fw-semibold">
                <Clock size={16} className="text-success" />
                <span>14-Day Standard Loan</span>
              </div>

              <div className="d-flex align-items-center gap-2 text-dark small fw-semibold">
                <BookOpen size={16} className="text-info" />
                <span>Physical Print Copy</span>
              </div>
            </div>
          </div>

          {/* Right Column: Metadata Specifications Grid */}
          <div className="col-lg-5 ps-lg-4 border-start-lg">
            <div className="book-meta-spec-grid">
              {/* Publisher */}
              <div className="book-meta-spec-item">
                <div className="d-flex align-items-center gap-2 mb-1">
                  <Building2 size={14} className="text-muted" />
                  <h6 className="book-meta-label mb-0">Publisher</h6>
                </div>
                <p className="book-meta-value">
                  {displayBook.publisher || "Prentice Hall"}
                </p>
              </div>

              {/* Category & Published Year */}
              <div className="book-meta-spec-item">
                <div className="d-flex align-items-center gap-2 mb-1">
                  <Layers size={14} className="text-muted" />
                  <h6 className="book-meta-label mb-0">Category & Year</h6>
                </div>
                <p className="book-meta-value">
                  {displayBook.category || "General"} • Published {displayBook.publishedYear || 2026}
                </p>
              </div>

              {/* Specifications */}
              <div className="book-meta-spec-item">
                <div className="d-flex align-items-center gap-2 mb-1">
                  <Barcode size={14} className="text-muted" />
                  <h6 className="book-meta-label mb-0">ISBN Reference</h6>
                </div>
                <p className="book-meta-isbn font-monospace fs-6 fw-semibold text-dark">
                  {displayBook.isbn || "978-0132350884"}
                </p>
              </div>

              {/* Price & Inventory */}
              <div className="book-meta-spec-item border-0 pt-2">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <IndianRupee size={14} className="text-muted" />
                      <h6 className="book-meta-label mb-0">Book Value & Copies</h6>
                    </div>
                    <div className="d-flex align-items-baseline gap-2">
                      <span className="book-meta-price">₹{displayBook.price || 699.0}</span>
                      <span className="text-muted small">
                        ({displayBook.quantity ?? 12} copies in stock)
                      </span>
                    </div>
                  </div>

                  <span className="status-pill status-pill--available">
                    <CheckCircle2 size={13} className="me-1" />
                    Available
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
