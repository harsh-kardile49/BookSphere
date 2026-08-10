import { BookCheck, CheckCircle2, AlertTriangle } from "lucide-react";
import type { ActiveBorrowLoan } from "./FindLoanSelector";

interface ReturnSummaryCardProps {
  loan: ActiveBorrowLoan | null;
  returnDate: string;
  isOverdue: boolean;
  isLoading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
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

const ReturnSummaryCard = ({
  loan,
  returnDate,
  isOverdue,
  isLoading,
  onConfirm,
  onCancel,
}: ReturnSummaryCardProps) => {
  const isValid = Boolean(loan);

  return (
    <div className="sticky-summary-card">
      <h3 className="summary-header">Return Summary</h3>

      {/* Book Thumbnail Row */}
      {loan ? (
        <div className="d-flex align-items-center gap-3 mb-3 pb-3 border-bottom border-subtle">
          <div
            className="selected-book-cover"
            style={{
              background: loan.coverGradient,
              width: 40,
              height: 54,
              fontSize: ".85rem",
            }}
          >
            {loan.coverInitial}
          </div>
          <div>
            <div className="fw-bold text-dark small">{loan.bookTitle}</div>
            <div className="text-muted" style={{ fontSize: ".76rem" }}>
              By {loan.bookAuthor}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-3 text-center text-muted small bg-light rounded-3 mb-3">
          Select an active loan to view summary
        </div>
      )}

      {/* Details List */}
      <div className="summary-row">
        <span className="summary-label">Borrower</span>
        <span className="summary-value">
          {loan ? loan.userName : "-"}
        </span>
      </div>

      <div className="summary-row">
        <span className="summary-label">Borrowed</span>
        <span className="summary-value">
          {loan ? formatDate(loan.borrowDate) : "-"}
        </span>
      </div>

      <div className="summary-row">
        <span className="summary-label">Due Date</span>
        <span className="summary-value">
          {loan ? formatDate(loan.dueDate) : "-"}
        </span>
      </div>

      <div className="summary-row">
        <span className="summary-label">Returning</span>
        <span className="summary-value">{formatDate(returnDate)}</span>
      </div>

      <div className="summary-divider" />

      {/* Status Pill */}
      {loan ? (
        isOverdue ? (
          <div
            className="ready-status-pill"
            style={{
              background: "var(--bs-amber-light)",
              color: "#b45309",
              borderColor: "rgba(245, 158, 11, 0.3)",
            }}
          >
            <AlertTriangle size={15} />
            <span>Overdue Loan</span>
          </div>
        ) : (
          <div
            className="ready-status-pill"
            style={{
              background: "var(--bs-emerald-light)",
              color: "#047857",
              borderColor: "rgba(16, 185, 129, 0.3)",
            }}
          >
            <CheckCircle2 size={15} />
            <span>Active Loan</span>
          </div>
        )
      ) : null}

      {/* Action Buttons */}
      <button
        type="button"
        className="btn-confirm-borrow mt-3"
        disabled={!isValid || isLoading}
        onClick={onConfirm}
      >
        {isLoading ? (
          <>
            <span className="spinner-border spinner-border-sm" role="status" />
            <span>Restoring Inventory...</span>
          </>
        ) : (
          <>
            <BookCheck size={18} />
            <span>Confirm & Return Book</span>
          </>
        )}
      </button>

      <button type="button" className="btn-cancel-borrow" onClick={onCancel}>
        Cancel
      </button>
    </div>
  );
};

export default ReturnSummaryCard;
