import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Bell,
  ChevronUp,
  ChevronDown,
  Bookmark,
  Share2,
  Download,
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
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
    text: "What a delightful and magical book it is! It indeed transports readers to the wizarding world with unmatched depth and mastery.",
  },
  {
    name: "Sophia Chen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    role: "Verified Reader",
    text: "An imperative read for anyone serious about improving their craft and understanding core foundational principles.",
  },
];

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [book, setBook] = useState<BackendBook | null>(null);
  const [allBooks, setAllBooks] = useState<BackendBook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleStartReading = () => {
    toast.success("Loan Request Initiated!", {
      description: `"${book?.title || 'Book'}" has been added to your active borrowing queue.`,
    });
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    toast.info("Link Copied!", {
      description: "Book detail URL copied to your clipboard.",
    });
  };

  const handleDownload = () => {
    toast.success("Download Started", {
      description: `Downloading catalog preview for "${book?.title || 'Book'}".`,
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
    title: "Harry Potter: Half Blood Prince",
    author: "J.K. Rowling",
    publisher: "Bloomsbury Publishing",
    isbn: "9780132350884",
    category: "Fiction / Fantasy",
    price: 699.0,
    quantity: 12,
    publishedYear: 2005,
  };

  return (
    <div className="book-detail-page-container">
      {/* ── Top Header Navigation Bar ── */}
      <div className="book-detail-header">
        <div className="d-flex align-items-center gap-3">
          <Link to="/books" className="book-detail-back-btn" title="Back to Catalog">
            <ArrowLeft size={18} />
          </Link>

          {/* Search bar inside header */}
          <div className="book-detail-search-box">
            <Search size={16} className="text-muted me-2" />
            <input
              type="text"
              placeholder="Search book name, author, edition..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="book-detail-search-input"
            />
          </div>
        </div>

        {/* User Profile & Notifications */}
        <div className="d-flex align-items-center gap-3">
          <button className="book-detail-icon-btn" title="Notifications">
            <Bell size={18} />
          </button>

          <div className="book-detail-user-badge">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"
              alt="Alexander Mark"
              className="book-detail-user-avatar"
            />
            <span className="book-detail-user-name">Alexander Mark</span>
          </div>
        </div>
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
              title="Previous Book"
            >
              <ChevronUp size={18} />
            </button>
            <button
              className="book-detail-carousel-btn"
              onClick={handleNextBook}
              title="Next Book"
            >
              <ChevronDown size={18} />
            </button>
          </div>

          {/* 3D Floating Book Cover Card */}
          <div className="book-3d-cover-card" style={{ background: currentGradient }}>
            <div className="book-3d-spine-effect" />
            <div className="book-3d-cover-content">
              <span className="book-3d-category-badge">{displayBook.category || "Fantasy"}</span>
              <h2 className="book-3d-title">{displayBook.title}</h2>
              <div className="book-3d-initials">{coverInitials}</div>
              <p className="book-3d-author">{displayBook.author}</p>
            </div>
            <div className="book-3d-bottom-glare" />
          </div>
        </div>

        {/* Right: Book Headline, Teaser & Primary Action Toolbar */}
        <div className="book-detail-hero-content">
          <h1 className="book-detail-title">{displayBook.title}</h1>
          <h3 className="book-detail-author">{displayBook.author}</h3>

          <p className="book-detail-teaser">
            Get ready to uncover the dark secrets and betrayals in the book. A thrilling adventure awaits you with deep storytelling and profound mastery.
          </p>

          {/* Primary Action Buttons Row */}
          <div className="book-detail-action-bar">
            <button
              className="btn-start-reading"
              onClick={handleStartReading}
            >
              <span>Start reading</span>
              <ArrowUpRight size={18} />
            </button>

            <div className="d-flex align-items-center gap-2">
              <button
                className={`book-detail-action-btn ${isBookmarked ? "active" : ""}`}
                onClick={() => {
                  setIsBookmarked(!isBookmarked);
                  toast.success(isBookmarked ? "Removed from Saved" : "Added to Saved Books!");
                }}
                title="Bookmark Book"
              >
                <Bookmark size={18} fill={isBookmarked ? "currentColor" : "none"} />
              </button>

              <button
                className="book-detail-action-btn"
                onClick={handleShare}
                title="Share Book"
              >
                <Share2 size={18} />
              </button>

              <button
                className="book-detail-action-btn"
                onClick={handleDownload}
                title="Download Details"
              >
                <Download size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Lower Elevated Content Card (White Surface) ── */}
      <div className="book-detail-content-card">
        <div className="row g-4 g-lg-5">
          {/* Left Column: Description & Verified Review Quote */}
          <div className="col-lg-7">
            <div className="mb-4 pb-2">
              <h4 className="book-detail-section-title">Description</h4>
              <p className="book-detail-paragraph">
                The story takes place during the transformative journey where deep secrets, heart-wrenching decisions, and high-stakes choices define the characters' paths. It explores profound themes of mastery, resilience, and personal growth.
              </p>
              <p className="book-detail-paragraph mb-0">
                With action-packed sequences, shocking twists, and moments of emotional depth, "{displayBook.title}" is a must-read for any enthusiast of classic literature and modern storytelling.
              </p>
            </div>

            {/* Verified Reader Endorsement Card */}
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
              {/* Publisher / Editors */}
              <div className="book-meta-spec-item">
                <h6 className="book-meta-label">Publisher & Editors</h6>
                <p className="book-meta-value">
                  {displayBook.publisher || "Prentice Hall"}, {displayBook.author} (author), Christopher Reath, Alena Cestabon
                </p>
              </div>

              {/* Language */}
              <div className="book-meta-spec-item">
                <h6 className="book-meta-label">Language</h6>
                <p className="book-meta-value">Standard English (USA & UK)</p>
              </div>

              {/* Specifications */}
              <div className="book-meta-spec-item">
                <h6 className="book-meta-label">Specifications & Format</h6>
                <p className="book-meta-value mb-1">
                  Paperback, textured finish, full color, 345 pages
                </p>
                <p className="book-meta-isbn font-monospace">
                  ISBN: {displayBook.isbn || "978-0132350884"}
                </p>
              </div>

              {/* Price & Stock Availability */}
              <div className="book-meta-spec-item border-0 pt-2">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h6 className="book-meta-label">Inventory & Price</h6>
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
