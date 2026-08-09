import { useAuthStore } from "../../store/authStore";
import KpiCards from "./KpiCards";
import ActivityChart from "./ActivityChart";
import PopularBooks from "./PopularBooks";
import OverdueBooks from "./OverdueBooks";
import RecentActivity from "./RecentActivity";
import QuickActions from "./QuickActions";
import AvailabilityRing from "./AvailabilityRing";
import "./dashboard.css";

const Dashboard = () => {
  const { user } = useAuthStore();
  const firstName = user?.firstName ? user.firstName.replace(/\./g, " ") : "User";

  // Greeting based on time of day
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="dashboard-page">
      {/* ── Header ── */}
      <div className="mb-4">
        <h4
          style={{
            fontWeight: 700,
            color: "var(--text-primary)",
            fontSize: "1.4rem",
            marginBottom: "4px",
          }}
        >
          {greeting}, {firstName}
        </h4>
        <p
          style={{
            fontSize: "0.88rem",
            color: "var(--text-muted)",
            margin: 0,
          }}
        >
          Here's what's happening in your library today.
        </p>
      </div>

      {/* ── KPI Cards ── */}
      <div className="mb-4">
        <KpiCards />
      </div>

      {/* ── Row: Chart + Popular Books ── */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-lg-8">
          <ActivityChart />
        </div>
        <div className="col-12 col-lg-4">
          <PopularBooks />
        </div>
      </div>

      {/* ── Row: Overdue + Availability Ring ── */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-lg-8">
          <OverdueBooks />
        </div>
        <div className="col-12 col-lg-4">
          <AvailabilityRing />
        </div>
      </div>

      {/* ── Row: Recent Activity + Quick Actions ── */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-lg-8">
          <RecentActivity />
        </div>
        <div className="col-12 col-lg-4">
          <QuickActions />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
