import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import type { UserRole } from "../../types/auth";

interface NavMenuItem {
  label: string;
  path: string;
  icon: string;
  roles: UserRole[];
}

const MENU_ITEMS: NavMenuItem[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: "📊",
    roles: ["ADMIN", "LIBRARIAN", "STUDENT", "USER"],
  },
  {
    label: "Books Catalogue",
    path: "/books",
    icon: "📖",
    roles: ["ADMIN", "LIBRARIAN"],
  },
  {
    label: "Members Directory",
    path: "/members",
    icon: "👥",
    roles: ["ADMIN", "LIBRARIAN"],
  },
  {
    label: "Borrowing Management",
    path: "/borrow",
    icon: "🔄",
    roles: ["ADMIN", "LIBRARIAN"],
  },
  {
    label: "Analytics & Reports",
    path: "/reports",
    icon: "📈",
    roles: ["ADMIN"],
  },
  {
    label: "My Borrowed Books",
    path: "/my-books",
    icon: "📚",
    roles: ["STUDENT", "USER"],
  },
  {
    label: "My Profile",
    path: "/profile",
    icon: "👤",
    roles: ["STUDENT", "USER"],
  },
];

const Sidebar = () => {
  const { user } = useAuthStore();
  const userRole = user?.role || "STUDENT";

  const visibleMenuItems = MENU_ITEMS.filter((item) =>
    item.roles.includes(userRole)
  );

  return (
    <aside className="bg-white min-vh-100 border-end shadow-sm">
      <div className="p-3">
        <div className="d-flex align-items-center justify-content-between mb-3 px-2">
          <small className="text-uppercase text-muted fw-bold tracking-wider">
            Navigation Menu
          </small>
        </div>

        <div className="list-group list-group-flush gap-1">
          {visibleMenuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `list-group-item list-group-item-action rounded-3 border-0 py-2 px-3 fw-medium d-flex align-items-center gap-2 ${
                  isActive
                    ? "bg-primary text-white shadow-sm"
                    : "text-secondary bg-transparent hover-bg-light"
                }`
              }
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
