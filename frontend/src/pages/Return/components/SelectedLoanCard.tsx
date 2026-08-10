import { X } from "lucide-react";
import type { ActiveBorrowLoan } from "./FindLoanSelector";

interface SelectedLoanCardProps {
  loan: ActiveBorrowLoan;
  onClear: () => void;
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

const SelectedLoanCard = ({ loan, onClear }: SelectedLoanCardProps) => {
  return (
    <div className="selected-book-card mb-4">
      {/* Book Cover */}
      <div
        className="selected-book-cover"
        style={{ background: loan.coverGradient }}
      >
        {loan.coverInitial}
      </div>

      {/* Meta Details */}
      <div className="flex-grow-1">
        <div className="d-flex align-items-center gap-2 mb-1">
          <span className="badge bg-slate-100 text-secondary px-2 py-1 rounded-pill small fw-bold">
            {loan.loanCode}
          </span>
          <span
            className={`badge ${
              loan.isOverdue
                ? "bg-warning-subtle text-warning-emphasis"
                : "bg-success-subtle text-success"
            } px-2 py-1 rounded-pill small`}
          >
            {loan.isOverdue ? "Overdue" : "Active Loan"}
          </span>
        </div>

        <h6 className="fw-bold text-dark mb-0">{loan.bookTitle}</h6>
        <div className="text-muted small mt-1">
          By <strong>{loan.bookAuthor}</strong> · ISBN: {loan.isbn}
        </div>

        <div className="mt-2 pt-2 border-top border-subtle d-flex flex-wrap gap-4 text-muted small">
          <div>
            Borrower: <strong className="text-dark">{loan.userName}</strong> ({loan.userEmail})
          </div>
          <div>
            Borrowed: <strong className="text-dark">{formatDate(loan.borrowDate)}</strong>
          </div>
          <div>
            Due Date: <strong className="text-dark">{formatDate(loan.dueDate)}</strong>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="btn btn-outline-secondary btn-sm border-0 rounded-circle p-1 align-self-start"
        onClick={onClear}
        title="Change loan"
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default SelectedLoanCard;
