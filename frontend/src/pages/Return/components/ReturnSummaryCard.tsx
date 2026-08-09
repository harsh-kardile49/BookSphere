import { BookCheck, CheckCircle2, AlertTriangle, AlertOctagon } from "lucide-react";
import type { ActiveLoan } from "../data/loansData";
import type { BookCondition } from "./ReturnConditionForm";

interface ReturnSummaryCardProps {
  loan: ActiveLoan | null;
  returnDate: string;
  condition: BookCondition;
  isOverdue: boolean;
  daysOverdue: number;
  fineAmount: number;
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
  condition,
  isOverdue,
  daysOverdue,
  fineAmount,
  isLoading,
  onConfirm,
  onCancel,
}: ReturnSummaryCardProps) => {
  const isLost = condition === "Lost";
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
              By {loan.author}
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
          {loan ? loan.memberName : "-"}
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

      <div className="summary-row">
        <span className="summary-label">Condition</span>
        <span className="summary-value fw-bold">{condition}</span>
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
            <span>{daysOverdue} days overdue</span>
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
            <span>Returned on time</span>
          </div>
        )
      ) : null}

      {/* Fine Section */}
      {loan && (
        <div className="fine-calc-box mb-3">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <span className="fw-bold small text-dark">
              {isOverdue ? "Late Return Fine" : "Fine Calculation"}
            </span>
            {!isOverdue && (
              <span className="badge bg-success-subtle text-success rounded-pill small">
                No fine
              </span>
            )}
          </div>

          {isOverdue ? (
            <>
              <div className="fine-calc-row">
                <span className="text-muted">Days overdue</span>
                <span className="fw-semibold">{daysOverdue} days</span>
              </div>
              <div className="fine-calc-row">
                <span className="text-muted">Fine rate</span>
                <span className="fw-semibold">₹5 / day</span>
              </div>
              <div className="fine-calc-row pt-2 mt-2 border-top border-warning-subtle">
                <span className="fw-bold text-dark">Total Fine</span>
                <span className="fw-bold fs-6 text-amber" style={{ color: "#b45309" }}>
                  ₹{fineAmount}
                </span>
              </div>
            </>
          ) : (
            <div className="text-muted small">No fine applicable for on-time returns.</div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <button
        type="button"
        className="btn-confirm-borrow"
        style={
          isLost
            ? { background: "var(--bs-red)", boxShadow: "0 4px 12px rgba(239, 68, 68, 0.25)" }
            : {}
        }
        disabled={!isValid || isLoading}
        onClick={onConfirm}
      >
        {isLoading ? (
          <>
            <span className="spinner-border spinner-border-sm" role="status" />
            <span>Processing Return...</span>
          </>
        ) : isLost ? (
          <>
            <AlertOctagon size={18} />
            <span>Confirm Lost Book</span>
          </>
        ) : (
          <>
            <BookCheck size={18} />
            <span>Confirm Return</span>
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
