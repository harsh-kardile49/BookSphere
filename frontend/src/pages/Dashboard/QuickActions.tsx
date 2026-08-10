import { BookPlus, BookCheck, RotateCcw, UserPlus } from "lucide-react";

const QuickActions = () => {
  const actions = [
    {
      title: "Add New Book",
      desc: "Register catalog item",
      icon: <BookPlus size={18} />,
      href: "/books",
      color: "var(--bs-indigo)",
      bg: "var(--bs-indigo-light)",
    },
    {
      title: "Issue Book Loan",
      desc: "Lend book to member",
      icon: <BookCheck size={18} />,
      href: "/borrow",
      color: "#0891b2",
      bg: "rgba(6, 182, 212, 0.1)",
    },
    {
      title: "Process Return",
      desc: "Restore inventory stock",
      icon: <RotateCcw size={18} />,
      href: "/return",
      color: "#047857",
      bg: "var(--bs-emerald-light)",
    },
    {
      title: "Register Member",
      desc: "Create member account",
      icon: <UserPlus size={18} />,
      href: "/members",
      color: "#b45309",
      bg: "var(--bs-amber-light)",
    },
  ];

  return (
    <div className="card border-0 rounded-4 shadow-sm p-4 bg-white h-100">
      <h5 className="fw-bold text-dark mb-1">Quick Shortcuts</h5>
      <p className="text-muted small mb-3">Fast access to key library management actions.</p>

      <div className="d-flex flex-column gap-2">
        {actions.map((act) => (
          <a
            key={act.title}
            href={act.href}
            className="d-flex align-items-center justify-content-between p-3 rounded-3 text-decoration-none transition-all hover-shadow"
            style={{ background: "var(--surface-page)", border: "1px solid var(--border-subtle)" }}
          >
            <div className="d-flex align-items-center gap-3">
              <div
                className="p-2.5 rounded-3 d-flex align-items-center justify-content-center"
                style={{ background: act.bg, color: act.color }}
              >
                {act.icon}
              </div>
              <div>
                <div className="fw-bold text-dark small mb-0">{act.title}</div>
                <div className="text-muted style-small" style={{ fontSize: "0.74rem" }}>
                  {act.desc}
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
