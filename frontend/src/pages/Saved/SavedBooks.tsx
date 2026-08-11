import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllBooks } from "../../services/book.service";
import type { BackendBook } from "../../types/book";
import ProgressiveImage from "../../components/common/ProgressiveImage";
import { Bookmark, BookOpen, Trash2, ArrowRight } from "lucide-react";
import { toast } from "sonner";

import { getSavedBookIds, toggleSaveBook } from "../../utils/savedBooksStore";

const SavedBooks = () => {
  const navigate = useNavigate();
  const [savedBooks, setSavedBooks] = useState<BackendBook[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchSavedBooks = async () => {
      setIsLoading(true);
      try {
        const savedIds = getSavedBookIds();
        const catalog = await getAllBooks();
        if (isMounted && Array.isArray(catalog)) {
          const userSaved = catalog.filter((b) => savedIds.includes(b.id));
          setSavedBooks(userSaved);
        }
      } catch (err) {
        console.warn("Error fetching saved books:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchSavedBooks();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleRemoveSaved = (bookId: number) => {
    toggleSaveBook(bookId);
    setSavedBooks((prev) => prev.filter((b) => b.id !== bookId));
    toast.success("Removed from Saved List");
  };

  return (
    <div className="container-fluid p-4" style={{ maxWidth: 1400 }}>
      {/* Editorial Header */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <Bookmark size={22} color="var(--bs-indigo)" />
            <h3 className="fw-bold text-dark mb-0" style={{ fontSize: "1.5rem" }}>
              My Saved Reading List
            </h3>
          </div>
          <p className="text-muted small mb-0">
            Bookmarked books and reading list items saved to your student profile.
          </p>
        </div>

        <Link
          to="/books"
          className="btn text-white fw-semibold rounded-3 d-flex align-items-center gap-2 border-0 px-3 py-2"
          style={{ background: "var(--bs-indigo)", fontSize: ".86rem" }}
        >
          <BookOpen size={16} />
          Explore Catalog
        </Link>
      </div>

      {isLoading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary mb-2" role="status" />
          <p className="text-muted small">Loading your saved reading list...</p>
        </div>
      ) : savedBooks.length === 0 ? (
        <div className="card border-0 rounded-4 shadow-sm p-5 text-center bg-white my-4">
          <div
            className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
            style={{ width: 64, height: 64, background: "rgba(99, 102, 241, 0.1)", color: "var(--bs-indigo)" }}
          >
            <Bookmark size={32} />
          </div>
          <h5 className="fw-bold text-dark mb-1">No Saved Books Yet</h5>
          <p className="text-muted small mb-4" style={{ maxWidth: 420, margin: "0 auto" }}>
            Bookmark titles from the Books Catalog to save them to your personal reading wishlist.
          </p>
          <div>
            <Link
              to="/books"
              className="btn btn-outline-primary fw-semibold rounded-3 px-4 py-2"
              style={{ fontSize: ".88rem" }}
            >
              Browse Catalog <ArrowRight size={15} className="ms-1" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="row g-3">
          {savedBooks.map((book) => (
            <div key={`saved-${book.id}`} className="col-12 col-sm-6 col-md-4 col-xl-3">
              <div className="card border-0 rounded-4 shadow-sm overflow-hidden h-100 bg-white">
                <div style={{ height: 210, overflow: "hidden", background: "var(--surface-page)" }}>
                  <ProgressiveImage
                    src={book.imageUrl || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80"}
                    alt={book.title}
                  />
                </div>

                <div className="p-3 d-flex flex-column justify-content-between flex-grow-1">
                  <div>
                    <span className="badge bg-indigo-subtle text-primary rounded-pill px-2.5 py-1 small mb-1.5" style={{ fontSize: ".72rem" }}>
                      {book.category || "General"}
                    </span>
                    <h6 className="fw-bold text-dark text-truncate mb-1" style={{ fontSize: ".92rem" }}>
                      {book.title}
                    </h6>
                    <p className="text-muted text-truncate small mb-3" style={{ fontSize: ".78rem" }}>
                      by {book.author}
                    </p>
                  </div>

                  <div className="pt-2 border-top d-flex align-items-center justify-content-between gap-2">
                    <button
                      className="btn btn-sm btn-light border text-muted rounded-2 p-1.5"
                      onClick={() => handleRemoveSaved(book.id)}
                      title="Remove from saved list"
                    >
                      <Trash2 size={15} />
                    </button>

                    <button
                      className="btn btn-sm text-white fw-semibold rounded-2 flex-grow-1 py-1.5"
                      style={{ background: "var(--bs-indigo)", fontSize: ".78rem" }}
                      onClick={() => navigate(`/books/${book.id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedBooks;
