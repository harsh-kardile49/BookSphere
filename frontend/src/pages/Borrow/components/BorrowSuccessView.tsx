import { Check, BookOpen, RotateCcw } from "lucide-react";
import type { Member } from "../data/membersData";
import type { Book } from "../../Books/data/booksData";

interface BorrowSuccessViewProps {
  borrowId: string;
  member: Member;
  book: Book;
  borrowDate: string;
  dueDate: string;
  onReset: () => void;
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const BorrowSuccessView = ({
  borrowId,
  member,
  book,
  borrowDate,
  dueDate,
  onReset,
}: BorrowSuccessViewProps) => {
  return (
    <div className="borrow-success-card">
      {/* Icon */}
      <div className="success-icon-circle">
        <Check size={36} strokeWidth={3} />
      </div>

      <h2 className="fw-bold text-dark mb-2">Book Borrowed Successfully</h2>
      <p className="text-secondary small mb-0">
        <strong>"{book.title}"</strong> has been successfully borrowed by{" "}
        <strong>{member.name}</strong>.
      </p>

      {/* Receipt Box */}
      <div className="success-receipt-box">
        <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
          <span className="small text-muted fw-semibold">Borrow ID</span>
          <span className="badge bg-indigo-subtle text-primary fw-bold px-3 py-1 rounded-pill">
            {borrowId}
          </span>
        </div>

        <div className="row g-3">
          <div className="col-6">
            <small className="text-muted d-block">Book Title</small>
            <span className="fw-semibold text-dark small">{book.title}</span>
          </div>

          <div className="col-6">
            <small className="text-muted d-block">Member</small>
            <span className="fw-semibold text-dark small">{member.name}</span>
          </div>

          <div className="col-6">
            <small className="text-muted d-block">Borrow Date</small>
            <span className="fw-semibold text-dark small">
              {formatDate(borrowDate)}
            </span>
          </div>

          <div className="col-6">
            <small className="text-muted d-block">Due Date</small>
            <span className="fw-semibold text-success small">
              {formatDate(dueDate)}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="d-flex gap-3 justify-content-center">
        <button
          type="button"
          className="btn btn-outline-secondary fw-semibold rounded-3 px-4 py-2"
          onClick={() => (window.location.href = "/dashboard")}
        >
          <BookOpen size={16} className="me-2" />
          View Loans
        </button>

        <button
          type="button"
          className="btn btn-primary fw-bold rounded-3 px-4 py-2"
          onClick={onReset}
          style={{ background: "var(--bs-indigo)", borderColor: "var(--bs-indigo)" }}
        >
          <RotateCcw size={16} className="me-2" />
          Borrow Another Book
        </button>
      </div>
    </div>
  );
};

export default BorrowSuccessView;
