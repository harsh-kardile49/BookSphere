import { Star, BookOpen, Calendar, Globe, Hash, Layers } from "lucide-react";
import type { Book } from "../data/booksData";

interface BookDetailsModalProps {
  book: Book | null;
  onClose: () => void;
}

const BookDetailsModal = ({ book, onClose }: BookDetailsModalProps) => {
  if (!book) return null;

  return (
    <div
      className="modal fade show d-block"
      style={{ background: "rgba(15, 23, 42, 0.6)", backdropFilter: "blur(6px)" }}
      tabIndex={-1}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="modal-content border-0 shadow-lg rounded-4 overflow-hidden"
          style={{ background: "#ffffff" }}
        >
          {/* Header */}
          <div className="modal-header border-0 pb-0 pe-4 pt-4">
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            />
          </div>

          <div className="modal-body p-4 p-md-5 pt-0">
            <div className="row g-4 align-items-start">
              {/* Left: Book Cover */}
              <div className="col-12 col-md-4">
                <div
                  className="rounded-4 d-flex align-items-center justify-content-center text-white shadow-lg"
                  style={{
                    aspectRatio: "3 / 4",
                    background: book.coverGradient,
                  }}
                >
                  <span className="display-4 fw-bold">{book.coverInitial}</span>
                </div>
              </div>

              {/* Right: Meta Details */}
              <div className="col-12 col-md-8">
                <span className="badge bg-indigo-subtle text-primary fw-semibold mb-2 px-3 py-1 rounded-pill">
                  {book.category}
                </span>

                <h3 className="fw-bold text-dark mb-1">{book.title}</h3>
                <p className="text-secondary fw-medium mb-3">By {book.author}</p>

                {/* Rating & Status */}
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="d-flex align-items-center gap-1 text-warning fw-bold">
                    <Star size={16} fill="#d97706" color="#d97706" />
                    <span>{book.rating}</span>
                    <span className="text-muted fw-normal small">
                      ({book.reviewCount} reviews)
                    </span>
                  </div>

                  <span
                    className={`badge ${
                      book.availability === "Available"
                        ? "bg-success-subtle text-success"
                        : book.availability === "Issued"
                        ? "bg-primary-subtle text-primary"
                        : book.availability === "Reserved"
                        ? "bg-warning-subtle text-warning-emphasis"
                        : "bg-danger-subtle text-danger"
                    } px-3 py-1 rounded-pill`}
                  >
                    ● {book.availability}
                  </span>
                </div>

                {/* Description */}
                <h6 className="fw-bold text-dark mb-2">Description</h6>
                <p className="text-secondary small lh-base mb-4">
                  {book.description}
                </p>

                {/* Meta Grid */}
                <div className="row g-3 p-3 bg-light rounded-3 mb-4">
                  <div className="col-6 col-sm-3">
                    <small className="text-muted d-block flex align-items-center gap-1">
                      <Hash size={12} /> ISBN
                    </small>
                    <span className="fw-semibold text-dark small">{book.isbn}</span>
                  </div>
                  <div className="col-6 col-sm-3">
                    <small className="text-muted d-block flex align-items-center gap-1">
                      <Calendar size={12} /> Year
                    </small>
                    <span className="fw-semibold text-dark small">
                      {book.publishedYear}
                    </span>
                  </div>
                  <div className="col-6 col-sm-3">
                    <small className="text-muted d-block flex align-items-center gap-1">
                      <Layers size={12} /> Pages
                    </small>
                    <span className="fw-semibold text-dark small">{book.pages}</span>
                  </div>
                  <div className="col-6 col-sm-3">
                    <small className="text-muted d-block flex align-items-center gap-1">
                      <Globe size={12} /> Language
                    </small>
                    <span className="fw-semibold text-dark small">
                      {book.language}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="d-flex gap-2">
                  <button className="btn btn-dark fw-bold rounded-3 px-4 py-2 flex-grow-1">
                    <BookOpen size={16} className="me-2" />
                    {book.availability === "Available"
                      ? "Issue Book"
                      : "Reserve Book"}
                  </button>
                  <button
                    className="btn btn-outline-secondary fw-semibold rounded-3 px-4"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsModal;
