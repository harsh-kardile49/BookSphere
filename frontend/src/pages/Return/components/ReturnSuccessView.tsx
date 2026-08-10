import { Check, BookOpen, RotateCcw } from "lucide-react";
import type { ActiveBorrowLoan } from "./FindLoanSelector";

interface ReturnSuccessViewProps {
  returnId: string;
  loan: ActiveBorrowLoan;
  returnDate: string;
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

const ReturnSuccessView = ({
  returnId,
  loan,
  returnDate,
  onReset,
}: ReturnSuccessViewProps) => {
  return (
    <div className="borrow-success-card">
      {/* Icon */}
      <div className="success-icon-circle">
        <Check size={36} strokeWidth={3} />
      </div>

      <h2 className="fw-bold text-dark mb-2">Book Returned & Stock Restored</h2>
      <p className="text-secondary small mb-0">
        <strong>"{loan.bookTitle}"</strong> has been successfully returned by{" "}
        <strong>{loan.userName}</strong>. Inventory stock has been restored in MySQL.
      </p>

      {/* Receipt Box */}
      <div className="success-receipt-box">
        <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
          <span className="small text-muted fw-semibold">Return Transaction ID</span>
          <span className="badge bg-indigo-subtle text-primary fw-bold px-3 py-1 rounded-pill">
            {returnId}
          </span>
        </div>

        <div className="row g-3">
          <div className="col-6">
            <small className="text-muted d-block">Book Title</small>
            <span className="fw-semibold text-dark small">{loan.bookTitle}</span>
          </div>

          <div className="col-6">
            <small className="text-muted d-block">Borrower</small>
            <span className="fw-semibold text-dark small">{loan.userName}</span>
          </div>

          <div className="col-6">
            <small className="text-muted d-block">Return Date</small>
            <span className="fw-semibold text-dark small">
              {formatDate(returnDate)}
            </span>
          </div>

          <div className="col-6">
            <small className="text-muted d-block">Inventory Status</small>
            <span className="badge bg-success-subtle text-success px-2 py-1 rounded-pill small">
              Restored (+1 Stock)
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="d-flex gap-3 justify-content-center">
        <button
          type="button"
          className="btn btn-outline-secondary fw-semibold rounded-3 px-4 py-2"
          onClick={() => (window.location.href = "/books")}
        >
          <BookOpen size={16} className="me-2" />
          View Catalog
        </button>

        <button
          type="button"
          className="btn btn-primary fw-bold rounded-3 px-4 py-2"
          onClick={onReset}
          style={{ background: "var(--bs-indigo)", borderColor: "var(--bs-indigo)" }}
        >
          <RotateCcw size={16} className="me-2" />
          Process Another Return
        </button>
      </div>
    </div>
  );
};

export default ReturnSuccessView;
