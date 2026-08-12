import { BookX } from "lucide-react";
import BookCard from "./BookCard";
import type { Book } from "../data/booksData";

interface BookGridProps {
  books: Book[];
  onSelectBook: (book: Book) => void;
  onClearFilters: () => void;
  onEditBook?: (book: Book) => void;
  onDeleteBook?: (book: Book) => void;
}

const BookGrid = ({ books, onSelectBook, onClearFilters, onEditBook, onDeleteBook }: BookGridProps) => {
  if (books.length === 0) {
    return (
      <div className="books-empty-state">
        <div className="books-empty-icon">
          <BookX size={26} />
        </div>
        <h3 className="books-empty-title">No books found</h3>
        <p className="books-empty-desc">
          We couldn't find any books matching your search or filter criteria.
        </p>
        <button
          className="btn btn-outline-secondary btn-sm fw-semibold rounded-pill px-3"
          onClick={onClearFilters}
        >
          Reset All Filters
        </button>
      </div>
    );
  }

  return (
    <div className="book-cards-grid">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onSelectBook={onSelectBook}
          onEditBook={onEditBook}
          onDeleteBook={onDeleteBook}
        />
      ))}
    </div>
  );
};

export default BookGrid;
