import { BookOpen, ArrowRight } from "lucide-react";
import type { BorrowResponseDTO } from "../../services/borrow.service";

interface RecentActivityProps {
  recentBorrows: BorrowResponseDTO[];
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const RecentActivity = ({ recentBorrows }: RecentActivityProps) => {
  return (
    <div className="card border-0 rounded-4 shadow-sm p-4 bg-white h-100">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div>
          <h5 className="fw-bold text-dark mb-1">Recent Borrow Transactions</h5>
          <p className="text-muted small mb-0">Latest book loans issued to library members.</p>
        </div>
        <button
          type="button"
          className="btn btn-sm btn-outline-primary rounded-pill px-3 fw-semibold"
          onClick={() => (window.location.href = "/borrow")}
        >
          <span>Issue Book</span>
          <ArrowRight size={14} className="ms-1" />
        </button>
      </div>

      {recentBorrows.length === 0 ? (
        <div className="text-center py-4 text-muted small">
          <BookOpen size={32} className="mb-2 text-secondary opacity-50" />
          <p className="mb-0">No recent borrowing transactions found in database.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light text-uppercase small text-muted">
              <tr>
                <th style={{ fontSize: "0.75rem" }}>Loan ID</th>
                <th style={{ fontSize: "0.75rem" }}>Member</th>
                <th style={{ fontSize: "0.75rem" }}>Book Title</th>
                <th style={{ fontSize: "0.75rem" }}>Issued</th>
                <th style={{ fontSize: "0.75rem" }}>Due</th>
                <th style={{ fontSize: "0.75rem" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBorrows.slice(0, 5).map((loan) => (
                <tr key={loan.id}>
                  <td className="fw-semibold text-dark small">LN-{1000 + loan.id}</td>
                  <td>
                    <div className="fw-semibold text-dark small">{loan.userName}</div>
                    <div className="text-muted style-small" style={{ fontSize: "0.72rem" }}>
                      {loan.userEmail}
                    </div>
                  </td>
                  <td>
                    <div className="fw-semibold text-primary small">{loan.bookTitle}</div>
                    <div className="text-muted style-small" style={{ fontSize: "0.72rem" }}>
                      {loan.bookAuthor}
                    </div>
                  </td>
                  <td className="small text-muted">{formatDate(loan.borrowDate)}</td>
                  <td className="small text-muted">{formatDate(loan.dueDate)}</td>
                  <td>
                    <span
                      className={`badge ${
                        loan.status === "RETURNED"
                          ? "bg-secondary-subtle text-secondary"
                          : loan.isOverdue
                          ? "bg-warning-subtle text-warning-emphasis"
                          : "bg-success-subtle text-success"
                      } px-2 py-1 rounded-pill small`}
                    >
                      {loan.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;
