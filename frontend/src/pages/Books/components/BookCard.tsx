import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, Bookmark } from "lucide-react";
import type { Book } from "../data/booksData";
import ProgressiveImage from "../../../components/common/ProgressiveImage";
import { isBookSaved, toggleSaveBook } from "../../../utils/savedBooksStore";
import { toast } from "sonner";

interface BookCardProps {
  book: Book;
  onSelectBook: (book: Book) => void;
}

const BookCard = ({ book, onSelectBook }: BookCardProps) => {
  const navigate = useNavigate();
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
        <h3 className="book-card-title">{book.title}</h3>
        <p className="book-card-author">{book.author}</p>

        {/* Card Footer: Rating & Status */}
        <div className="book-card-footer">
          <div className="book-card-rating">
            <Star size={13} fill="#d97706" color="#d97706" />
            <span>{book.rating}</span>
            <span style={{ color: "var(--text-muted)", fontSize: "0.68rem" }}>
              ({book.reviewCount})
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
