import { useAuthStore } from "../../store/authStore";

const Dashboard = () => {
  const { user } = useAuthStore();
  const role = user?.role || "STUDENT";

  const stats = [
    {
      title: "Total Books",
      value: "1,248",
      icon: "📚",
      color: "border-primary",
      badgeColor: "bg-primary-subtle text-primary",
      change: "+12 this week",
    },
    {
      title: "Active Members",
      value: "452",
      icon: "👥",
      color: "border-success",
      badgeColor: "bg-success-subtle text-success",
      change: "+8 new users",
    },
    {
      title: "Borrowed Books",
      value: "318",
      icon: "🔄",
      color: "border-warning",
      badgeColor: "bg-warning-subtle text-warning-emphasis",
      change: "24 due today",
    },
    {
      title: "Returned / Overdue",
      value: "84",
      icon: "⏰",
      color: "border-danger",
      badgeColor: "bg-danger-subtle text-danger",
      change: "5 overdue loans",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      user: "Sarah Jenkins",
      action: "Borrowed 'Clean Code'",
      time: "10 mins ago",
      badge: "Borrow",
      badgeClass: "bg-info-subtle text-info-emphasis",
    },
    {
      id: 2,
      user: "Alex Morgan",
      action: "Returned 'Design Patterns'",
      time: "45 mins ago",
      badge: "Return",
      badgeClass: "bg-success-subtle text-success",
    },
    {
      id: 3,
      user: "John Doe",
      action: "Registered as new Student",
      time: "2 hours ago",
      badge: "Member",
      badgeClass: "bg-primary-subtle text-primary",
    },
  ];

  return (
    <div className="container-fluid p-0">
      {/* Header Banner */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 pb-3 border-bottom">
        <div>
          <h2 className="fw-bold text-dark mb-1">
            Welcome back, {user?.firstName || "User"}! 👋
          </h2>
          <p className="text-secondary mb-0">
            Here is what's happening with BookSphere library today.
          </p>
        </div>
        <div className="mt-3 mt-md-0 d-flex gap-2">
          <span className="badge bg-primary fs-6 px-3 py-2 align-self-start align-self-md-center">
            Role: {role}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="row g-3 mb-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="col-12 col-sm-6 col-xl-3">
            <div className={`card border-0 shadow-sm border-start border-4 ${stat.color} h-100`}>
              <div className="card-body p-3">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="text-muted fw-semibold small">{stat.title}</span>
                  <span className="fs-3">{stat.icon}</span>
                </div>
                <h3 className="fw-bold text-dark mb-1">{stat.value}</h3>
                <span className={`badge ${stat.badgeColor} small`}>{stat.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="row g-4">
        {/* Left Column - Recent Activity */}
        <div className="col-12 col-lg-8">
          <div className="card border-0 shadow-sm rounded-3">
            <div className="card-header bg-white border-bottom py-3 d-flex justify-content-between align-items-center">
              <h5 className="fw-bold mb-0 text-dark">📋 Recent Library Activity</h5>
              <small className="text-muted">Live Stream</small>
            </div>
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                {recentActivity.map((act) => (
                  <div
                    key={act.id}
                    className="list-group-item d-flex justify-content-between align-items-center p-3 border-bottom-0"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div className="bg-light rounded-circle p-2 fs-5">📖</div>
                      <div>
                        <h6 className="mb-0 fw-semibold text-dark">{act.action}</h6>
                        <small className="text-muted">By {act.user}</small>
                      </div>
                    </div>
                    <div className="text-end">
                      <span className={`badge ${act.badgeClass} mb-1`}>{act.badge}</span>
                      <div className="text-muted small">{act.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Quick Actions */}
        <div className="col-12 col-lg-4">
          <div className="card border-0 shadow-sm rounded-3">
            <div className="card-header bg-white border-bottom py-3">
              <h5 className="fw-bold mb-0 text-dark">⚡ Quick Actions</h5>
            </div>
            <div className="card-body p-3">
              <div className="d-grid gap-2">
                {(role === "ADMIN" || role === "LIBRARIAN") && (
                  <>
                    <button className="btn btn-outline-primary fw-semibold d-flex align-items-center justify-content-between p-2">
                      <span>➕ Add New Book</span>
                      <span>📖</span>
                    </button>
                    <button className="btn btn-outline-success fw-semibold d-flex align-items-center justify-content-between p-2">
                      <span>🔄 Issue / Return Loan</span>
                      <span>🏷️</span>
                    </button>
                    <button className="btn btn-outline-info fw-semibold d-flex align-items-center justify-content-between p-2">
                      <span>👤 Register Member</span>
                      <span>🆔</span>
                    </button>
                  </>
                )}
                {(role === "STUDENT" || role === "USER") && (
                  <>
                    <button className="btn btn-outline-primary fw-semibold d-flex align-items-center justify-content-between p-2">
                      <span>🔍 Search Book Catalog</span>
                      <span>📚</span>
                    </button>
                    <button className="btn btn-outline-secondary fw-semibold d-flex align-items-center justify-content-between p-2">
                      <span>📖 My Active Loans</span>
                      <span>🏷️</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
