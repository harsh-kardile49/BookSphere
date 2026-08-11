import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import type { UserRole } from "../../types/auth";

interface NavMenuItem {
  id: string;
  path: string;
  icon: React.ReactNode;
  roles: UserRole[];
}

const MENU_ITEMS: NavMenuItem[] = [
  {
    id: "dashboard",
    path: "/dashboard",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
    ),
    roles: ["ADMIN", "LIBRARIAN", "STUDENT", "USER"],
  },
  {
    id: "books",
    path: "/books",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
      </svg>
    ),
    roles: ["ADMIN", "LIBRARIAN", "STUDENT", "USER"],
  },
  {
    id: "history",
    path: "/borrow",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
    ),
    roles: ["ADMIN", "LIBRARIAN", "STUDENT", "USER"],
  },
  {
    id: "return",
    path: "/return",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
        <path d="M3 3v5h5"></path>
      </svg>
    ),
    roles: ["ADMIN", "LIBRARIAN", "STUDENT", "USER"],
  },
  {
    id: "members",
    path: "/members",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
    roles: ["ADMIN", "LIBRARIAN", "STUDENT", "USER"],
  },
  {
    id: "saved",
    path: "/saved",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
      </svg>
    ),
    roles: ["STUDENT", "USER"],
  },
  {
    id: "settings",
    path: "/settings",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
      </svg>
    ),
    roles: ["ADMIN", "LIBRARIAN", "STUDENT", "USER"],
  }
];

const Sidebar = () => {
  const { user } = useAuthStore();
  const userRole = user?.role || "STUDENT";

  const visibleMenuItems = MENU_ITEMS.filter((item) =>
    item.roles.includes(userRole)
  );

  return (
    <aside 
      className="min-vh-100 d-flex flex-column align-items-center py-4 position-fixed"
      style={{ 
        width: "90px",
        backgroundColor: "#f6f4ee",
        borderRight: "1px solid rgba(0,0,0,0.06)",
        zIndex: 1000
      }}
    >
      {/* Top Logo / Brand Icon */}
      <div className="mb-5">
        <div 
          className="d-flex align-items-center justify-content-center"
          style={{ width: "40px", height: "40px" }}
        >
          {/* Hand waving icon like in the image */}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#292524" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"></path>
            <path d="M14 4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"></path>
            <path d="M10 4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"></path>
            <path d="M6 6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"></path>
            <path d="M4 14.5c0 3.5 2.5 6.5 6 6.5s6-3 6-6.5V11"></path>
            <path d="M2.5 12l2 2.5"></path>
          </svg>
        </div>
      </div>

      {/* Center Navigation Icons */}
      <div className="d-flex flex-column align-items-center gap-4 flex-grow-1 mt-3">
        {visibleMenuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            title={item.id}
            style={{ textDecoration: "none" }}
          >
            {({ isActive }) => (
              <div 
                className="d-flex align-items-center justify-content-center rounded-circle"
                style={{
                  width: "44px",
                  height: "44px",
                  color: isActive ? "#000" : "#78716c",
                  backgroundColor: isActive ? "#fff" : "transparent",
                  boxShadow: isActive ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
                  transition: "all 0.2s ease"
                }}
              >
                {item.icon}
              </div>
            )}
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
