import { BookCheck, CheckCircle2 } from "lucide-react";
import type { BorrowableMember } from "./MemberSelector";
import type { BorrowableBook } from "./BookSelector";

interface BorrowSummaryCardProps {
  member: BorrowableMember | null;
  book: BorrowableBook | null;
  borrowDate: string;
  dueDate: string;
  isValid: boolean;
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

const BorrowSummaryCard = ({
  member,
  book,
  borrowDate,
  dueDate,
  isValid,
  isLoading,
  onConfirm,
  onCancel,
}: BorrowSummaryCardProps) => {
  return (
    <div className="sticky-summary-card">
      <h3 className="summary-header">Borrow Summary</h3>

      <div className="summary-row">
        <span className="summary-label">Member</span>
        <span className="summary-value">
          {member ? member.name : "Select member"}
        </span>
      </div>

      <div className="summary-row">
        <span className="summary-label">Book</span>
        <span className="summary-value" style={{ maxWidth: 180, textAlign: "right" }}>
          {book ? book.title : "Select book"}
        </span>
      </div>

      <div className="summary-row">
        <span className="summary-label">Borrow Date</span>
        <span className="summary-value">{formatDate(borrowDate)}</span>
      </div>

      <div className="summary-row">
        <span className="summary-label">Due Date</span>
        <span className="summary-value">{formatDate(dueDate)}</span>
      </div>

      <div className="summary-row">
        <span className="summary-label">Borrowing Period</span>
        <span className="summary-value">14 days</span>
      </div>

      <div className="summary-divider" />

      {/* Ready Status */}
      <div className="ready-status-pill">
        <CheckCircle2 size={15} />
        <span>{isValid ? "Ready to borrow" : "Complete required fields"}</span>
      </div>

      {/* Action Buttons */}
      <button
        type="button"
        className="btn-confirm-borrow"
        disabled={!isValid || isLoading}
        onClick={onConfirm}
      >
        {isLoading ? (
          <>
            <span
              className="spinner-border spinner-border-sm"
              role="status"
            />
            <span>Processing Borrow...</span>
          </>
        ) : (
          <>
            <BookCheck size={18} />
            <span>Confirm Borrow</span>
          </>
        )}
      </button>

      <button type="button" className="btn-cancel-borrow" onClick={onCancel}>
        Cancel
      </button>
    </div>
  );
};

export default BorrowSummaryCard;
