import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { toast } from "sonner";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const getRoleBadgeColor = (role?: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-danger";
      case "LIBRARIAN":
        return "bg-warning text-dark";
      case "STUDENT":
      case "USER":
        return "bg-info text-dark";
      default:
        return "bg-secondary";
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top shadow-sm">
      <div className="container-fluid px-4">
        <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/dashboard">
          <span className="fs-4">📚</span>
          <span>BookSphere</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          {isAuthenticated && user && (
            <ul className="navbar-nav ms-auto align-items-lg-center gap-2">
              <li className="nav-item">
                <span className={`badge ${getRoleBadgeColor(user.role)} me-2`}>
                  {user.role}
                </span>
              </li>
              <li className="nav-item me-3">
                <span className="text-white opacity-90 fw-medium">
                  👋 Hello, {user.firstName}
                </span>
              </li>
              <li className="nav-item">
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-light btn-sm fw-semibold d-flex align-items-center gap-1"
                >
                  🚪 Logout
                </button>
              </li>
            </ul>
          )}

          {!isAuthenticated && (
            <div className="ms-auto d-flex gap-2">
              <Link to="/login" className="btn btn-outline-light btn-sm fw-semibold">
                Login
              </Link>
              <Link to="/register" className="btn btn-light btn-sm fw-bold">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
