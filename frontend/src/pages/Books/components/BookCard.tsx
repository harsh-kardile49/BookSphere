import { Star } from "lucide-react";
import type { Book } from "../data/booksData";

interface BookCardProps {
  book: Book;
  onSelectBook: (book: Book) => void;
}

const BookCard = ({ book, onSelectBook }: BookCardProps) => {
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
    <div className="book-card" onClick={() => onSelectBook(book)}>
      {/* Cover Image Placeholder */}
      <div
        className="book-card-cover-wrapper"
        style={{ background: book.coverGradient }}
      >
        <div className="book-card-cover-initials">{book.coverInitial}</div>
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
