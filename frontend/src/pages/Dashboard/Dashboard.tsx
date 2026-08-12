import { useState, useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import KpiCards from "./KpiCards";
import RecentActivity from "./RecentActivity";
import QuickActions from "./QuickActions";
import { bookService } from "../../services/book.service";
import { userService } from "../../services/user.service";
import { borrowService, type BorrowResponseDTO } from "../../services/borrow.service";
import OverdueBooks from "./OverdueBooks";
import "./dashboard.css";

const Dashboard = () => {
  const { user } = useAuthStore();
  const firstName = user?.firstName ? user.firstName.replace(/\./g, " ") : "Librarian";

  // Dynamic KPI Counts
  const [totalBooks, setTotalBooks] = useState(0);
  const [availableStock, setAvailableStock] = useState(0);
  const [activeLoans, setActiveLoans] = useState(0);
  const [totalMembers, setTotalMembers] = useState(0);

  // Recent Borrows
  const [recentBorrows, setRecentBorrows] = useState<BorrowResponseDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Greeting based on time of day
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  // Fetch real counts on mount
  useEffect(() => {
    let isMounted = true;
    const fetchDashboardMetrics = async () => {
      setIsLoading(true);
      try {
        const [books, users, borrows] = await Promise.allSettled([
          bookService.getAllBooks(),
          userService.getAllUsers(),
          borrowService.getAllBorrows(),
        ]);

        if (isMounted) {
          if (books.status === "fulfilled" && Array.isArray(books.value)) {
            setTotalBooks(books.value.length);
            const stock = books.value.reduce((acc, b) => acc + (b.quantity ?? 1), 0);
            setAvailableStock(stock);
          }

          if (users.status === "fulfilled" && Array.isArray(users.value)) {
            setTotalMembers(users.value.length);
          }

          if (borrows.status === "fulfilled" && Array.isArray(borrows.value)) {
            const isStudent = user?.role === "STUDENT" || user?.role === "USER";
            const filteredBorrows = isStudent
              ? borrows.value.filter((b) => b.userId === user?.id || b.userEmail?.toLowerCase() === user?.email?.toLowerCase())
              : borrows.value;

            setRecentBorrows(filteredBorrows);
            const activeCount = filteredBorrows.filter((b) => b.status === "ACTIVE").length;
            setActiveLoans(activeCount);
          }
        }
      } catch (err) {
        console.warn("Dashboard metrics load error:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchDashboardMetrics();
    return () => {
      isMounted = false;
    };
  }, [user]);

  const userRoleTitle =
    user?.role === "ADMIN"
      ? "System Administrator Portal"
      : user?.role === "LIBRARIAN"
      ? "Librarian Operations Portal"
      : "Student Learning Workspace";

  return (
    <div className="dashboard-page">
      {/* Header */}
      <div className="mb-4 d-flex align-items-center justify-content-between flex-wrap gap-2">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <h4 className="fw-bold text-dark mb-0" style={{ fontSize: "1.4rem" }}>
              {greeting}, {firstName}
            </h4>
            <span
              className="badge rounded-pill px-3 py-1"
              style={{
                background: user?.role === "ADMIN" ? "rgba(99,102,241,0.12)" : user?.role === "LIBRARIAN" ? "rgba(249,115,22,0.12)" : "rgba(16,185,129,0.12)",
                color: user?.role === "ADMIN" ? "#4338ca" : user?.role === "LIBRARIAN" ? "#c2410c" : "#047857",
                fontSize: ".75rem",
                fontWeight: 600,
              }}
            >
              {user?.role || "STUDENT"}
            </span>
          </div>
          <p className="text-muted small mb-0">
            Welcome to BookSphere. Here's your tailored {userRoleTitle.toLowerCase()}.
          </p>
        </div>
      </div>

      {/* 4 Live KPI Cards */}
      <div className="mb-4">
        <KpiCards
          totalBooks={totalBooks}
          availableStock={availableStock}
          activeLoans={activeLoans}
          totalMembers={totalMembers}
        />
      </div>

      {/* Main Grid: Recent Activity Table + Quick Actions */}
      {isLoading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary mb-2" role="status" />
          <p className="text-muted small">Loading library operational data...</p>
        </div>
      ) : (
        <div className="row g-3">
          <div className="col-12 col-lg-8">
            <RecentActivity recentBorrows={recentBorrows} />
          </div>
          <div className="col-12 col-lg-4 d-flex flex-column gap-3">
            <OverdueBooks borrows={recentBorrows} />
            <QuickActions />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
