import { useState, useRef, useEffect } from "react";
import { Search, X, AlertCircle } from "lucide-react";
import { BOOKS_DATA, type Book } from "../../Books/data/booksData";

interface BookSelectorProps {
  selectedBook: Book | null;
  onSelectBook: (book: Book | null) => void;
}

const BookSelector = ({ selectedBook, onSelectBook }: BookSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredBooks = BOOKS_DATA.filter(
    (b) =>
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.isbn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="form-section" ref={containerRef}>
      <label className="form-section-label">Book</label>

      {!selectedBook ? (
        <div className="dropdown-search-wrapper">
          <div className="search-input-group">
            <Search className="search-input-icon" size={16} />
            <input
              type="text"
              className="borrow-input"
              placeholder="Search by title, author, or ISBN..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
            />
          </div>

          {/* Results Dropdown */}
          {isOpen && (
            <div className="dropdown-results-menu">
              {filteredBooks.length === 0 ? (
                <div className="p-3 text-center text-muted small">
                  No books found matching "{searchTerm}"
                </div>
              ) : (
                filteredBooks.map((book) => (
                  <div
                    key={book.id}
                    className="dropdown-result-row"
                    onClick={() => {
                      onSelectBook(book);
                      setIsOpen(false);
                      setSearchTerm("");
                    }}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className="selected-book-cover"
                        style={{
                          background: book.coverGradient,
                          width: 34,
                          height: 46,
                          fontSize: ".75rem",
                        }}
                      >
                        {book.coverInitial}
                      </div>
                      <div>
                        <div className="fw-semibold text-dark small">
                          {book.title}
                        </div>
                        <div className="text-muted" style={{ fontSize: ".74rem" }}>
                          {book.author} · ISBN: {book.isbn}
                        </div>
                      </div>
                    </div>

                    <div>
                      <span
                        className={`badge ${
                          book.availability === "Available"
                            ? "bg-success-subtle text-success"
                            : "bg-secondary-subtle text-secondary"
                        } px-2 py-1 rounded-pill small`}
                      >
                        {book.availability}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      ) : (
        /* Selected Book Preview Card */
        <div className="selected-book-card">
          <div
            className="selected-book-cover"
            style={{ background: selectedBook.coverGradient }}
          >
            {selectedBook.coverInitial}
          </div>

          <div className="flex-grow-1">
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="badge bg-indigo-subtle text-primary px-2 py-1 rounded-pill small">
                {selectedBook.category}
              </span>
              <span className="badge bg-success-subtle text-success px-2 py-1 rounded-pill small">
                ● {selectedBook.availability}
              </span>
            </div>

            <h6 className="fw-bold text-dark mb-0">{selectedBook.title}</h6>
            <div className="text-muted small mt-1">
              By <strong>{selectedBook.author}</strong> · ISBN: {selectedBook.isbn}
            </div>
          </div>

          <div className="d-flex align-items-center gap-3">
            <div className="text-end d-none d-sm-block">
              <div className="small text-muted">Copies</div>
              <div className="fw-bold text-success">5 available</div>
            </div>

            <button
              type="button"
              className="btn btn-outline-secondary btn-sm border-0 rounded-circle p-1"
              onClick={() => onSelectBook(null)}
              title="Change book"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Warning if selected book is unavailable */}
      {selectedBook && selectedBook.availability !== "Available" && (
        <div className="alert alert-danger mt-2 p-2 px-3 small d-flex align-items-center gap-2 rounded-3 border-0">
          <AlertCircle size={16} />
          <span>
            This book is currently <strong>{selectedBook.availability}</strong> and cannot be borrowed.
          </span>
        </div>
      )}
    </div>
  );
};

export default BookSelector;
