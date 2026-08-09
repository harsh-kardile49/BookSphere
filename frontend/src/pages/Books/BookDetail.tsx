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
  ShieldCheck,
  BookOpen,
  MapPin,
  Clock,
  Tag,
} from "lucide-react";
import { getBookById, getAllBooks } from "../../services/book.service";
import type { BackendBook } from "../../types/book";
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

const MOCK_REVIEWS = [
  {
    name: "Roberto Jordan",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    role: "Senior Member",
    text: "An indispensable reference book in our library collection. Highly recommended for students and faculty.",
  },
];

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [book, setBook] = useState<BackendBook | null>(null);
  const [allBooks, setAllBooks] = useState<BackendBook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);

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
    toast.success("Proceeding to Book Issue", {
      description: `Opening borrow transaction for "${book?.title || 'Book'}".`,
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

  // Fallback presentation if book is null
  const displayBook = book || {
    id: 1,
    title: "Clean Code",
    author: "Robert C. Martin",
    publisher: "Prentice Hall",
    isbn: "9780132350884",
    category: "Programming",
    price: 699.0,
    quantity: 12,
    publishedYear: 2008,
  };

  return (
    <div className="book-detail-page-container">
      {/* ── Breadcrumb & Navigation Bar ── */}
      <div className="book-detail-header mb-4">
        <Link to="/books" className="d-inline-flex align-items-center gap-2 text-decoration-none fw-semibold text-dark small bg-white border px-3 py-2 rounded-pill shadow-sm">
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
          <div className="book-3d-cover-card" style={{ background: currentGradient }}>
            <div className="book-3d-spine-effect" />
            <div className="book-3d-cover-content">
              <span className="book-3d-category-badge">{displayBook.category || "General"}</span>
              <h2 className="book-3d-title">{displayBook.title}</h2>
              <div className="book-3d-initials">{coverInitials}</div>
              <p className="book-3d-author">{displayBook.author}</p>
            </div>
            <div className="book-3d-bottom-glare" />
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
            Available for member issuance in the main library catalog. Published by {displayBook.publisher || "Prentice Hall"} with ISBN {displayBook.isbn}.
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
                onClick={() => {
                  setIsBookmarked(!isBookmarked);
                  toast.success(isBookmarked ? "Removed from Saved" : "Added to Saved Books!");
                }}
                title="Save Book"
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

      {/* ── Lower Elevated Content Card (White Surface) ── */}
      <div className="book-detail-content-card">
        <div className="row g-4 g-lg-5">
          {/* Left Column: Library Description & Location */}
          <div className="col-lg-7">
            <div className="mb-4 pb-2">
              <h4 className="book-detail-section-title">Library Overview & Details</h4>
              <p className="book-detail-paragraph">
                "{displayBook.title}" by {displayBook.author} is cataloged under the {displayBook.category || "General"} section. It provides detailed foundational concepts, practical patterns, and core principles essential for academic and professional study.
              </p>
              <p className="book-detail-paragraph mb-0">
                Registered members can issue this copy for up to 14 days under standard library borrowing policies. Overdue renewals or reservations can be managed via the Borrow & Return tabs.
              </p>
            </div>

            {/* Library Shelf Location & Policy Box */}
            <div className="d-flex flex-wrap gap-3 mb-4 p-3 rounded-4 bg-light border">
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
                <span>Hardcover / Paperback</span>
              </div>
            </div>

            {/* Member Review / Endorsement Card */}
            <div className="book-detail-review-quote">
              <div className="d-flex align-items-start gap-3">
                <img
                  src={MOCK_REVIEWS[0].avatar}
                  alt={MOCK_REVIEWS[0].name}
                  className="book-detail-review-avatar"
                />
                <div>
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <h6 className="book-detail-review-name mb-0">{MOCK_REVIEWS[0].name}</h6>
                    <span className="badge bg-success-subtle text-success small rounded-pill px-2">
                      <ShieldCheck size={12} className="me-1" />
                      {MOCK_REVIEWS[0].role}
                    </span>
                  </div>
                  <p className="book-detail-review-text mb-0">
                    "{MOCK_REVIEWS[0].text}"
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Metadata Specifications Grid */}
          <div className="col-lg-5 ps-lg-4 border-start-lg">
            <div className="book-meta-spec-grid">
              {/* Publisher */}
              <div className="book-meta-spec-item">
                <h6 className="book-meta-label">Publisher</h6>
                <p className="book-meta-value">
                  {displayBook.publisher || "Prentice Hall"}
                </p>
              </div>

              {/* Category & Published Year */}
              <div className="book-meta-spec-item">
                <h6 className="book-meta-label">Category & Year</h6>
                <p className="book-meta-value">
                  {displayBook.category || "General"} • Published in {displayBook.publishedYear || 2026}
                </p>
              </div>

              {/* Specifications */}
              <div className="book-meta-spec-item">
                <h6 className="book-meta-label">ISBN Reference</h6>
                <p className="book-meta-isbn font-monospace fs-6 fw-semibold text-dark">
                  {displayBook.isbn || "978-0132350884"}
                </p>
              </div>

              {/* Price & Inventory */}
              <div className="book-meta-spec-item border-0 pt-2">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h6 className="book-meta-label">Library Inventory & Replacement Value</h6>
                    <div className="d-flex align-items-baseline gap-2">
                      <span className="book-meta-price">₹{displayBook.price || 699.0}</span>
                      <span className="text-muted small">
                        ({displayBook.quantity ?? 12} copies available)
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
