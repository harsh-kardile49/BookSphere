import { Users, UserCheck, BookOpen, AlertTriangle } from "lucide-react";
import type { Member } from "../data/membersData";

interface MembersKpiCardsProps {
  members: Member[];
}

const MembersKpiCards = ({ members }: MembersKpiCardsProps) => {
  const totalCount = members.length;
  const activeCount = members.filter((m) => m.status === "Active").length;
  const activePercent = totalCount > 0 ? ((activeCount / totalCount) * 100).toFixed(1) : "0";

  const borrowingCount = members.filter((m) => m.booksBorrowedCount > 0 || (m.activeLoans && m.activeLoans.length > 0)).length;
  const overdueCount = members.filter((m) => m.overdueCount > 0 || (m.activeLoans && m.activeLoans.some((l) => l.isOverdue))).length;

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
        <div className="kpi-number">{totalCount.toLocaleString()}</div>

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
        <div className="kpi-number">{activeCount.toLocaleString()}</div>
        <div className="kpi-subtext text-emerald" style={{ color: "#047857" }}>
          {activePercent}% of members
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
        <div className="kpi-number">{borrowingCount.toLocaleString()}</div>
        <div className="kpi-subtext">Members with active loans</div>
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
        <div className="kpi-number">{overdueCount.toLocaleString()}</div>
        <div className="kpi-subtext" style={{ color: "#b45309" }}>
          {overdueCount > 0 ? "Action required" : "No overdue loans"}
        </div>
      </div>
    </div>
  );
};

export default MembersKpiCards;
