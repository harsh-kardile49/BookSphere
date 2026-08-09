import {
  BookPlus,
  BookCheck,
  RotateCcw,
  UserPlus,
  CalendarPlus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

interface QuickAction {
  label: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  roles: string[];
  path: string;
}

const actions: QuickAction[] = [
  {
    label: "Add Book",
    description: "Add to library catalog",
    icon: <BookPlus size={16} />,
    iconBg: "var(--bs-indigo-light)",
    iconColor: "var(--bs-indigo)",
    roles: ["ADMIN", "LIBRARIAN"],
    path: "/books",
  },
  {
    label: "Issue Book",
    description: "Issue to a member",
    icon: <BookCheck size={16} />,
    iconBg: "var(--bs-emerald-light)",
    iconColor: "var(--bs-emerald)",
    roles: ["ADMIN", "LIBRARIAN"],
    path: "/borrow",
  },
  {
    label: "Return Book",
    description: "Process a return",
    icon: <RotateCcw size={16} />,
    iconBg: "var(--bs-cyan-light)",
    iconColor: "var(--bs-cyan)",
    roles: ["ADMIN", "LIBRARIAN"],
    path: "/borrow",
  },
  {
    label: "Add Member",
    description: "Register new member",
    icon: <UserPlus size={16} />,
    iconBg: "var(--bs-amber-light)",
    iconColor: "var(--bs-amber)",
    roles: ["ADMIN", "LIBRARIAN"],
    path: "/members",
  },
  {
    label: "Reservation",
    description: "Create a reservation",
    icon: <CalendarPlus size={16} />,
    iconBg: "var(--bs-red-light)",
    iconColor: "var(--bs-red)",
    roles: ["ADMIN", "LIBRARIAN", "STUDENT", "USER"],
    path: "/borrow",
  },
  {
    label: "Browse Books",
    description: "Search the catalog",
    icon: <BookPlus size={16} />,
    iconBg: "var(--bs-indigo-light)",
    iconColor: "var(--bs-indigo)",
    roles: ["STUDENT", "USER"],
    path: "/books",
  },
];

const QuickActions = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const role = user?.role || "STUDENT";

  const visible = actions.filter((a) => a.roles.includes(role));

  return (
    <div className="dash-card" style={{ height: "100%" }}>
      <div className="dash-card-header">
        <h6 className="section-title">Quick Actions</h6>
      </div>

      <div className="quick-action-grid">
        {visible.map((action) => (
          <button
            key={action.label}
            className="quick-action-btn"
            onClick={() => navigate(action.path)}
          >
            <div
              className="quick-action-icon"
              style={{
                background: action.iconBg,
                color: action.iconColor,
              }}
            >
              {action.icon}
            </div>
            <div className="quick-action-label">{action.label}</div>
            <div className="quick-action-desc">{action.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
