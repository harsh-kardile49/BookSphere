import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { toast } from "sonner";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setShowUserMenu(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    setShowUserMenu(false);
    await logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const displayName = user?.firstName ? user.firstName.replace(/\./g, " ") : "User";
  const displayLastName = user?.lastName ? user.lastName.replace(/\./g, " ") : "";
  const userInitials = (displayName[0] + (displayLastName[0] || displayName.split(" ")[1]?.[0] || "")).toUpperCase();

  const demoNotifications = [
    {
      id: 1,
      text: "New book 'Clean Code' added to library",
      time: "5 min ago",
      unread: true,
    },
    {
      id: 2,
      text: "Your borrowed book is due tomorrow",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      text: "System maintenance scheduled tonight",
      time: "3 hours ago",
      unread: false,
    },
  ];

  const unreadCount = demoNotifications.filter((n) => n.unread).length;

  return (
    <nav
      className="navbar sticky-top py-2"
      style={{
        background: "rgba(246, 244, 238, 0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
        boxShadow: "0 2px 12px rgba(0, 0, 0, 0.02)",
      }}
    >
      <div className="container-fluid px-3 px-md-4" style={{ maxWidth: 1760, margin: "0 auto" }}>
        <div className="d-flex align-items-center w-100 gap-3">

          {/* ── Search Bar ── */}
          <div className="flex-grow-1" style={{ maxWidth: 480 }}>
            <div className="position-relative">
              <span
                className="position-absolute top-50 translate-middle-y d-flex align-items-center"
                style={{ left: 14, color: "#78716c", opacity: 0.6 }}
              >
                {/* Search icon SVG */}
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
              <input
                type="text"
                className="form-control border-0"
                placeholder="Search books, members, records…"
                style={{
                  paddingLeft: 38,
                  borderRadius: 50,
                  background: "rgba(255, 255, 255, 0.8)",
                  border: "1px solid rgba(0, 0, 0, 0.06)",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                  fontSize: ".85rem",
                  height: 38,
                  color: "#1c1917",
                }}
              />
            </div>
          </div>

          {/* ── Right Actions ── */}
          <div className="d-flex align-items-center gap-2 ms-auto flex-shrink-0">
            {isAuthenticated && user ? (
              <>
                {/* User Avatar Circle */}
                <div className="position-relative" ref={userMenuRef}>
                  <button
                    className="btn d-flex align-items-center gap-2 rounded-pill ps-1 pe-3 py-1 border-0"
                    style={{
                      background: "rgba(255,255,255,0.75)",
                      border: "1px solid rgba(0,0,0,0.06)",
                      backdropFilter: "blur(4px)",
                      transition: "all .2s",
                    }}
                    onClick={() => {
                      setShowUserMenu(!showUserMenu);
                      setShowNotifications(false);
                    }}
                  >
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0"
                      style={{
                        width: 32,
                        height: 32,
                        background:
                          "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                        fontSize: ".75rem",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {userInitials}
                    </div>
                    <span
                      className="fw-semibold d-none d-md-inline"
                      style={{ color: "#292524", fontSize: ".84rem" }}
                    >
                      {displayName}
                    </span>
                    {/* Chevron SVG */}
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#9a3412"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        transform: showUserMenu
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                        transition: "transform .2s",
                      }}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>

                  {/* User Dropdown Menu */}
                  {showUserMenu && (
                    <div
                      className="position-absolute end-0 mt-2 rounded-4 shadow-lg overflow-hidden"
                      style={{
                        width: 240,
                        zIndex: 1050,
                        background: "rgba(255,252,248,0.95)",
                        backdropFilter: "blur(16px)",
                        border: "1px solid rgba(234,88,12,0.1)",
                      }}
                    >
                      {/* User Info Header */}
                      <div
                        className="px-3 py-3 d-flex align-items-center gap-2"
                        style={{
                          borderBottom: "1px solid rgba(234,88,12,0.08)",
                        }}
                      >
                        <div
                          className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0"
                          style={{
                            width: 38,
                            height: 38,
                            background:
                              "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                            fontSize: ".82rem",
                          }}
                        >
                          {userInitials}
                        </div>
                        <div>
                          <div
                            className="fw-bold"
                            style={{
                              fontSize: ".88rem",
                              color: "#292524",
                            }}
                          >
                            {user.firstName} {user.lastName}
                          </div>
                          <div style={{ fontSize: ".72rem", color: "#a8a29e" }}>
                            {user.email}
                          </div>
                        </div>
                      </div>

                      {/* Role badge */}
                      <div
                        className="px-3 py-2"
                        style={{
                          borderBottom: "1px solid rgba(234,88,12,0.06)",
                        }}
                      >
                        <span
                          className="badge rounded-pill px-3 py-1"
                          style={{
                            background: "rgba(249,115,22,0.12)",
                            color: "#c2410c",
                            fontSize: ".72rem",
                            fontWeight: 600,
                          }}
                        >
                          {user.role}
                        </span>
                      </div>

                      {/* Menu Items */}
                      <div className="py-1">
                        <button
                          className="dropdown-item d-flex align-items-center gap-2 px-3 py-2 border-0 w-100 text-start"
                          style={{ fontSize: ".84rem", color: "#44403c" }}
                          onClick={() => {
                            setShowUserMenu(false);
                            navigate("/profile");
                          }}
                        >
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                          My Profile
                        </button>
                        <button
                          className="dropdown-item d-flex align-items-center gap-2 px-3 py-2 border-0 w-100 text-start"
                          style={{ fontSize: ".84rem", color: "#44403c" }}
                          onClick={() => {
                            setShowUserMenu(false);
                            navigate("/dashboard");
                          }}
                        >
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect
                              x="3"
                              y="3"
                              width="7"
                              height="7"
                              rx="1"
                            />
                            <rect
                              x="14"
                              y="3"
                              width="7"
                              height="7"
                              rx="1"
                            />
                            <rect
                              x="3"
                              y="14"
                              width="7"
                              height="7"
                              rx="1"
                            />
                            <rect
                              x="14"
                              y="14"
                              width="7"
                              height="7"
                              rx="1"
                            />
                          </svg>
                          Dashboard
                        </button>
                      </div>

                      {/* Logout */}
                      <div
                        className="px-2 py-2"
                        style={{
                          borderTop: "1px solid rgba(234,88,12,0.08)",
                        }}
                      >
                        <button
                          className="btn btn-sm w-100 fw-semibold rounded-3 d-flex align-items-center justify-content-center gap-2"
                          style={{
                            background: "rgba(239,68,68,0.08)",
                            color: "#dc2626",
                            fontSize: ".82rem",
                            border: "1px solid rgba(239,68,68,0.15)",
                          }}
                          onClick={handleLogout}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                          </svg>
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                {/* Notification Bell */}
                <div className="position-relative" ref={notifRef}>
                  <button
                    className="btn position-relative d-flex align-items-center justify-content-center rounded-circle p-0 border-0"
                    style={{
                      width: 40,
                      height: 40,
                      background: "rgba(255,255,255,0.55)",
                      backdropFilter: "blur(4px)",
                      color: "#9a3412",
                      transition: "all .2s",
                    }}
                    onClick={() => {
                      setShowNotifications(!showNotifications);
                      setShowUserMenu(false);
                    }}
                    aria-label="Notifications"
                  >
                    {/* Bell icon SVG */}
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                    {unreadCount > 0 && (
                      <span
                        className="position-absolute d-flex align-items-center justify-content-center rounded-circle text-white fw-bold"
                        style={{
                          width: 18,
                          height: 18,
                          fontSize: ".65rem",
                          top: -2,
                          right: -2,
                          background: "#ef4444",
                        }}
                      >
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {/* Notification Dropdown */}
                  {showNotifications && (
                    <div
                      className="position-absolute end-0 mt-2 rounded-4 shadow-lg overflow-hidden"
                      style={{
                        width: 320,
                        zIndex: 1050,
                        background: "rgba(255,252,248,0.95)",
                        backdropFilter: "blur(16px)",
                        border: "1px solid rgba(234,88,12,0.1)",
                      }}
                    >
                      <div
                        className="px-3 py-2 fw-bold d-flex justify-content-between align-items-center"
                        style={{
                          borderBottom: "1px solid rgba(234,88,12,0.08)",
                          color: "#9a3412",
                          fontSize: ".85rem",
                        }}
                      >
                        <span>Notifications</span>
                        <span
                          className="badge rounded-pill text-white"
                          style={{ background: "#f97316", fontSize: ".7rem" }}
                        >
                          {unreadCount} new
                        </span>
                      </div>
                      {demoNotifications.map((n) => (
                        <div
                          key={n.id}
                          className="px-3 py-2 d-flex align-items-start gap-2"
                          style={{
                            borderBottom: "1px solid rgba(0,0,0,0.04)",
                            background: n.unread
                              ? "rgba(249,115,22,0.04)"
                              : "transparent",
                            cursor: "pointer",
                          }}
                        >
                          <span
                            className="rounded-circle mt-1 flex-shrink-0"
                            style={{
                              width: 8,
                              height: 8,
                              background: n.unread ? "#f97316" : "#d1d5db",
                            }}
                          />
                          <div>
                            <div
                              className="fw-medium"
                              style={{
                                fontSize: ".82rem",
                                color: "#292524",
                              }}
                            >
                              {n.text}
                            </div>
                            <div
                              style={{ fontSize: ".72rem", color: "#a8a29e" }}
                            >
                              {n.time}
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="text-center py-2">
                        <button
                          className="btn btn-sm fw-semibold border-0"
                          style={{ color: "#ea580c", fontSize: ".8rem" }}
                        >
                          View all notifications
                        </button>
                      </div>
                    </div>
                  )}
                </div>

              </>
            ) : (
              <div className="d-flex gap-2">
                <Link
                  to="/login"
                  className="btn btn-sm fw-semibold rounded-pill px-3 border-0"
                  style={{
                    color: "#9a3412",
                    background: "rgba(255,255,255,0.55)",
                  }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-sm fw-bold rounded-pill px-3 text-white border-0"
                  style={{
                    background:
                      "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                  }}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
