import { useMemo } from "react";
import { ArrowRight, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { BorrowResponseDTO } from "../../services/borrow.service";

interface OverdueBooksProps {
  borrows: BorrowResponseDTO[];
}

const OverdueBooks = ({ borrows }: OverdueBooksProps) => {
  const overdueItems = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return borrows
      .filter((b) => {
        if (b.status !== "ACTIVE" || !b.dueDate) return false;
        const due = new Date(b.dueDate);
        due.setHours(0, 0, 0, 0);
        return due < today || b.isOverdue;
      })
      .map((b) => {
        const todayMs = new Date().getTime();
        const dueMs = new Date(b.dueDate).getTime();
        const diffDays = Math.max(1, Math.floor((todayMs - dueMs) / (1000 * 60 * 60 * 24)));
        const d = new Date(b.dueDate);

        return {
          id: b.id,
          member: b.userName,
          book: b.bookTitle,
          dueDate: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          daysOverdue: diffDays,
        };
      });
  }, [borrows]);

  return (
    <div className="card border-0 rounded-4 shadow-sm p-4 bg-white h-100">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center gap-2">
          <h5 className="fw-bold text-dark mb-0" style={{ fontSize: "1rem" }}>
            Overdue Alerts
          </h5>
          <span
            className={`badge rounded-pill px-2.5 py-1 ${
              overdueItems.length > 0 ? "bg-danger-subtle text-danger" : "bg-success-subtle text-success"
            }`}
            style={{ fontSize: "0.72rem", fontWeight: 600 }}
          >
            {overdueItems.length}
          </span>
        </div>

        <Link
          to="/return"
          className="btn btn-link p-0 text-decoration-none small text-muted d-flex align-items-center gap-1 hover-primary"
          style={{ fontSize: "0.8rem" }}
        >
          Process Return <ArrowRight size={13} />
        </Link>
      </div>

      {overdueItems.length === 0 ? (
        <div className="text-center py-4 my-auto">
          <div
            className="rounded-circle d-inline-flex align-items-center justify-content-center mb-2"
            style={{ width: 44, height: 44, background: "rgba(16, 185, 129, 0.1)", color: "#10b981" }}
          >
            <CheckCircle2 size={24} />
          </div>
          <h6 className="fw-semibold text-dark mb-1" style={{ fontSize: "0.9rem" }}>
            All Loans Current
          </h6>
          <p className="text-muted small mb-0" style={{ fontSize: "0.78rem" }}>
            No overdue books requiring action right now.
          </p>
        </div>
      ) : (
        <div className="d-flex flex-column gap-2.5">
          {overdueItems.slice(0, 4).map((item) => (
            <div
              key={`overdue-${item.id}`}
              className="p-2.5 rounded-3 d-flex align-items-center justify-content-between gap-2 border border-warning-subtle"
              style={{ background: "rgba(254, 243, 199, 0.3)" }}
            >
              <div
                className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                style={{
                  width: 30,
                  height: 30,
                  background: "rgba(245, 158, 11, 0.15)",
                  color: "#d97706",
                }}
              >
                <AlertTriangle size={14} />
              </div>

              <div className="min-w-0 flex-grow-1">
                <div
                  className="fw-semibold text-dark text-truncate"
                  style={{ fontSize: "0.82rem" }}
                >
                  {item.book}
                </div>
                <div className="text-muted text-truncate" style={{ fontSize: "0.72rem" }}>
                  {item.member} · Due {item.dueDate}
                </div>
              </div>

              <span
                className={`badge rounded-pill px-2 py-1 flex-shrink-0 ${
                  item.daysOverdue >= 5 ? "bg-danger text-white" : "bg-warning text-dark"
                }`}
                style={{ fontSize: "0.68rem" }}
              >
                {item.daysOverdue}d overdue
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OverdueBooks;
