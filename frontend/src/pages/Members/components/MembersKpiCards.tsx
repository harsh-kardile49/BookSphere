import { Users, UserCheck, BookOpen, AlertTriangle } from "lucide-react";
import { MEMBERS_KPI } from "../data/membersData";

const MembersKpiCards = () => {
  return (
    <div className="members-kpi-grid">
      {/* 1. Total Members */}
      <div className="members-kpi-card">
        <div
          className="kpi-icon-box"
          style={{ background: "var(--bs-indigo-light)", color: "var(--bs-indigo)" }}
        >
          <Users size={20} />
        </div>
        <div className="kpi-label">Total Members</div>
        <div className="kpi-number">{MEMBERS_KPI.totalMembers.count}</div>
        <div className="kpi-subtext text-success font-medium">
          {MEMBERS_KPI.totalMembers.change}
        </div>
      </div>

      {/* 2. Active Members */}
      <div className="members-kpi-card">
        <div
          className="kpi-icon-box"
          style={{ background: "var(--bs-emerald-light)", color: "#047857" }}
        >
          <UserCheck size={20} />
        </div>
        <div className="kpi-label">Active Members</div>
        <div className="kpi-number">{MEMBERS_KPI.activeMembers.count}</div>
        <div className="kpi-subtext text-emerald" style={{ color: "#047857" }}>
          {MEMBERS_KPI.activeMembers.percent}
        </div>
      </div>

      {/* 3. Currently Borrowing */}
      <div className="members-kpi-card">
        <div
          className="kpi-icon-box"
          style={{ background: "rgba(6, 182, 212, 0.1)", color: "#0891b2" }}
        >
          <BookOpen size={20} />
        </div>
        <div className="kpi-label">Currently Borrowing</div>
        <div className="kpi-number">{MEMBERS_KPI.currentlyBorrowing.count}</div>
        <div className="kpi-subtext">{MEMBERS_KPI.currentlyBorrowing.label}</div>
      </div>

      {/* 4. Overdue Members */}
      <div className="members-kpi-card">
        <div
          className="kpi-icon-box"
          style={{ background: "var(--bs-amber-light)", color: "#b45309" }}
        >
          <AlertTriangle size={20} />
        </div>
        <div className="kpi-label">Overdue Members</div>
        <div className="kpi-number">{MEMBERS_KPI.overdueMembers.count}</div>
        <div className="kpi-subtext" style={{ color: "#b45309" }}>
          {MEMBERS_KPI.overdueMembers.label}
        </div>
      </div>
    </div>
  );
};

export default MembersKpiCards;
