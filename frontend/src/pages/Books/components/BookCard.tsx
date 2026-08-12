import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, Bookmark, Edit, Trash2 } from "lucide-react";
import type { Book } from "../data/booksData";
import ProgressiveImage from "../../../components/common/ProgressiveImage";
import { isBookSaved, toggleSaveBook } from "../../../utils/savedBooksStore";
import { useAuthStore } from "../../../store/authStore";
import { toast } from "sonner";

interface BookCardProps {
  book: Book;
  onSelectBook: (book: Book) => void;
  onEditBook?: (book: Book) => void;
  onDeleteBook?: (book: Book) => void;
}

const BookCard = ({ book, onSelectBook, onEditBook, onDeleteBook }: BookCardProps) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const isLibrarianOrAdmin = user?.role === "LIBRARIAN" || user?.role === "ADMIN";
  const [saved, setSaved] = useState(() => isBookSaved(Number(book.id)));

  const handleCardClick = () => {
    onSelectBook(book);
    navigate(`/books/${book.id}`);
  };

  const handleToggleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newState = toggleSaveBook(Number(book.id));
    setSaved(newState);
    if (newState) {
      toast.success("Saved to Wishlist", { description: `"${book.title}" added to your saved books` });
    } else {
      toast.info("Removed from Wishlist", { description: `"${book.title}" removed from saved books` });
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEditBook) onEditBook(book);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDeleteBook) onDeleteBook(book);
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Available":
        return "status-pill--available";
      case "Issued":
        return "status-pill--issued";
      case "Reserved":
        return "status-pill--reserved";
      case "Maintenance":
        return "status-pill--maintenance";
      default:
        return "status-pill--available";
    }
  };

  return (
    <div className="book-card" onClick={handleCardClick}>
      {/* Cover Image Wrapper */}
      <div
        className="book-card-cover-wrapper position-relative"
        style={{ background: book.coverGradient }}
      >
        {/* Save Book Wishlist Bookmark Button (Hidden for Librarian/Admin workflow) */}
        {!isLibrarianOrAdmin && (
          <button
            type="button"
            className="btn p-1.5 position-absolute top-0 end-0 m-2 rounded-circle border-0 d-flex align-items-center justify-content-center"
            style={{
              zIndex: 10,
              background: saved ? "rgba(99, 102, 241, 0.9)" : "rgba(0, 0, 0, 0.35)",
              color: "#fff",
              backdropFilter: "blur(4px)",
              transition: "all 0.2s ease",
            }}
            onClick={handleToggleBookmark}
            title={saved ? "Remove from Saved Wishlist" : "Save to Wishlist"}
          >
            <Bookmark size={14} fill={saved ? "#fff" : "none"} />
          </button>
        )}

        {book.imageUrl ? (
          <ProgressiveImage
            src={book.imageUrl}
            alt={book.title}
            fallback={<div className="book-card-cover-initials">{book.coverInitial}</div>}
          />
        ) : (
          <div className="book-card-cover-initials">{book.coverInitial}</div>
        )}
        <div className="book-card-cover-overlay">
          <span className="btn-view-details">View Details →</span>
        </div>
      </div>

      {/* Content */}
      <div className="book-card-body">
        <span className="book-card-category">{book.category}</span>

        {/* Title, Author & Librarian Edit/Delete Action Row */}
        <div className="d-flex align-items-start justify-content-between gap-2 my-1">
          <div className="min-w-0 flex-grow-1">
            <h3 className="book-card-title">{book.title}</h3>
            <p className="book-card-author">{book.author}</p>
          </div>

          {/* Librarian / Admin Edit & Delete Buttons beside title & author */}
          {isLibrarianOrAdmin && (
            <div className="d-flex align-items-center gap-1 flex-shrink-0 mt-1">
              {onEditBook && (
                <button
                  type="button"
                  className="btn p-1 rounded-2 border border-primary-subtle text-primary bg-primary-subtle bg-opacity-25 d-flex align-items-center justify-content-center"
                  style={{
                    width: 28,
                    height: 28,
                    transition: "all 0.2s ease",
                  }}
                  onClick={handleEdit}
                  title="Edit Book Details"
                >
                  <Edit size={13} />
                </button>
              )}

              {onDeleteBook && (
                <button
                  type="button"
                  className="btn p-1 rounded-2 border border-danger-subtle text-danger bg-danger-subtle bg-opacity-25 d-flex align-items-center justify-content-center"
                  style={{
                    width: 28,
                    height: 28,
                    transition: "all 0.2s ease",
                  }}
                  onClick={handleDelete}
                  title="Delete Book Entry"
                >
                  <Trash2 size={13} />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Card Footer: Rating, Price & Availability Status */}
        <div className="book-card-footer">
          <div className="d-flex align-items-center gap-2">
            <div className="book-card-rating">
              <Star size={13} fill="#d97706" color="#d97706" />
              <span>{book.rating}</span>
            </div>
            <span className="fw-bold text-dark small" style={{ fontSize: "0.82rem" }}>
              ₹{book.price ?? 499}
            </span>
          </div>

          <span className={`status-pill ${getStatusClass(book.availability)}`}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "currentColor",
              }}
            />
            {book.availability}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
