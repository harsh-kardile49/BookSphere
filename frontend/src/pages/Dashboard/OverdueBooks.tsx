import { ArrowRight, AlertTriangle } from "lucide-react";

interface OverdueItem {
  id: number;
  member: string;
  book: string;
  dueDate: string;
  daysOverdue: number;
}

const overdueData: OverdueItem[] = [
  {
    id: 1,
    member: "Rahul Sharma",
    book: "Data Structures & Algorithms",
    dueDate: "Aug 02, 2026",
    daysOverdue: 7,
  },
  {
    id: 2,
    member: "Priya Patel",
    book: "Introduction to Machine Learning",
    dueDate: "Aug 04, 2026",
    daysOverdue: 5,
  },
  {
    id: 3,
    member: "Alex Morgan",
    book: "Clean Architecture",
    dueDate: "Aug 06, 2026",
    daysOverdue: 3,
  },
  {
    id: 4,
    member: "Sneha Kulkarni",
    book: "Refactoring",
    dueDate: "Aug 08, 2026",
    daysOverdue: 1,
  },
];

const OverdueBooks = () => {
  return (
    <div className="dash-card" style={{ height: "100%" }}>
      <div className="dash-card-header">
        <div className="d-flex align-items-center gap-2">
          <h6 className="section-title mb-0">Overdue Books</h6>
          <span
            style={{
              fontSize: "0.68rem",
              fontWeight: 600,
              background: "var(--bs-red-light)",
              color: "var(--bs-red)",
              padding: "2px 8px",
              borderRadius: "4px",
            }}
          >
            {overdueData.length}
          </span>
        </div>
        <a href="#" className="section-link">
          View all <ArrowRight size={13} />
        </a>
      </div>

      <div>
        {overdueData.map((item) => (
          <div className="overdue-row" key={item.id}>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: "var(--bs-amber-light)",
                color: "var(--bs-amber)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <AlertTriangle size={14} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: "0.82rem",
                  fontWeight: 500,
                  color: "var(--text-primary)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.book}
              </div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                {item.member} · Due {item.dueDate}
              </div>
            </div>
            <span
              className={`overdue-badge ${item.daysOverdue >= 5 ? "overdue-badge--danger" : "overdue-badge--warning"}`}
            >
              {item.daysOverdue}d overdue
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverdueBooks;
