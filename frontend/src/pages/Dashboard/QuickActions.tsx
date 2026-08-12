import { Link } from "react-router-dom";
import { BookPlus, BookCheck, RotateCcw, UserPlus, BookOpen, Bookmark } from "lucide-react";
import { useAuthStore } from "../../store/authStore";

const QuickActions = () => {
  const { user } = useAuthStore();
  const isLibrarianOrAdmin = user?.role === "LIBRARIAN" || user?.role === "ADMIN";

  const librarianActions = [
    {
      title: "Add New Book",
      desc: "Register catalog item",
      icon: <BookPlus size={18} />,
      href: "/books/add",
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

  const studentActions = [
    {
      title: "Browse Books Catalog",
      desc: "Explore & search books",
      icon: <BookOpen size={18} />,
      href: "/books",
      color: "var(--bs-indigo)",
      bg: "var(--bs-indigo-light)",
    },
    {
      title: "Borrow Book",
      desc: "Issue a book for your account",
      icon: <BookCheck size={18} />,
      href: "/borrow",
      color: "#0891b2",
      bg: "rgba(6, 182, 212, 0.1)",
    },
    {
      title: "Return Book",
      desc: "Process a book return",
      icon: <RotateCcw size={18} />,
      href: "/return",
      color: "#047857",
      bg: "var(--bs-emerald-light)",
    },
    {
      title: "Saved Wishlist",
      desc: "View saved favorite books",
      icon: <Bookmark size={18} />,
      href: "/saved",
      color: "#b45309",
      bg: "var(--bs-amber-light)",
    },
  ];

  const actions = isLibrarianOrAdmin ? librarianActions : studentActions;

  return (
    <div className="card border-0 rounded-4 shadow-sm p-4 bg-white h-100">
      <h5 className="fw-bold text-dark mb-1">Quick Shortcuts</h5>
      <p className="text-muted small mb-3">
        {isLibrarianOrAdmin
          ? "Fast access to key library management actions."
          : "Fast access to key student library actions."}
      </p>

      <div className="d-flex flex-column gap-2">
        {actions.map((act) => (
          <Link
            key={act.title}
            to={act.href}
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
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
