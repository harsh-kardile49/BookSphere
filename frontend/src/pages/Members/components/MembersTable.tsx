import { useState } from "react";
import { MoreVertical, BookOpen, User, Eye, Edit, Clock, ShieldAlert, Trash2 } from "lucide-react";
import type { Member } from "../data/membersData";

interface MembersTableProps {
  members: Member[];
  onSelectMember: (member: Member) => void;
  onEditMember: (member: Member) => void;
  onDeleteMember: (member: Member) => void;
  onClearSearch: () => void;
  searchTerm: string;
}

const MembersTable = ({
  members,
  onSelectMember,
  onEditMember,
  onDeleteMember,
  onClearSearch,
  searchTerm,
}: MembersTableProps) => {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  if (members.length === 0) {
    return (
      <div className="p-5 text-center my-4 card border rounded-4 shadow-sm" style={{ background: "var(--surface-card)" }}>
        <div
          className="rounded-circle mx-auto d-flex align-items-center justify-content-center mb-3"
          style={{ width: 56, height: 56, background: "rgba(99, 102, 241, 0.15)", color: "#818cf8" }}
        >
          <User size={28} />
        </div>
        <h5 className="fw-bold mb-1" style={{ color: "var(--text-primary)" }}>No members found</h5>
        <p className="small mb-3" style={{ color: "var(--text-muted)" }}>
          {searchTerm
            ? `Try searching with a different name, email, or member ID matching "${searchTerm}".`
            : "No library members registered under this section."}
        </p>
        {searchTerm && (
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm rounded-3 fw-semibold px-3"
            onClick={onClearSearch}
          >
            Clear Search
          </button>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="members-table-wrapper">
        <table className="members-table">
          <thead>
            <tr>
              <th>Member</th>
              <th>Member ID</th>
              <th>Contact</th>
              <th>Membership</th>
              <th>Borrowed</th>
              <th>Overdue</th>
              <th>Status</th>
              <th>Joined</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr
                key={member.id}
                className="members-table-row"
                onClick={() => onSelectMember(member)}
              >
                {/* Member */}
                <td>
                  <div className="d-flex align-items-center gap-3">
                    <div
                      className="member-avatar-circle"
                      style={{ background: member.avatarBg }}
                    >
                      {member.avatarInitials}
                    </div>
                    <div>
                      <div className="fw-bold text-dark" style={{ fontSize: ".9rem" }}>
                        {member.name}
                      </div>
                      <div className="text-muted" style={{ fontSize: ".76rem" }}>
                        {member.email}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Member ID */}
                <td>
                  <span className="fw-bold text-secondary font-monospace" style={{ fontSize: ".82rem" }}>
                    {member.memberCode}
                  </span>
                </td>

                {/* Contact */}
                <td>
                  <div className="text-dark small">{member.email}</div>
                  <div className="text-muted" style={{ fontSize: ".76rem" }}>
                    {member.phone}
                  </div>
                </td>

                {/* Membership Badge */}
                <td>
                  <span
                    className={`badge ${
                      member.membershipType === "Premium"
                        ? "badge-membership-premium"
                        : member.membershipType === "Student"
                        ? "badge-membership-student"
                        : "badge-membership-standard"
                    } px-2.5 py-1 rounded-pill small`}
                  >
                    {member.membershipType}
                  </span>
                </td>

                {/* Borrowed */}
                <td>
                  <div className="d-flex align-items-center gap-1.5 small fw-semibold text-dark">
                    <BookOpen size={14} className="text-muted" />
                    <span>{member.booksBorrowedCount} books</span>
                  </div>
                </td>

                {/* Overdue */}
                <td>
                  {member.overdueCount > 0 ? (
                    <span className="badge bg-warning-subtle text-warning-emphasis px-2 py-1 rounded-pill fw-bold small">
                      {member.overdueCount} overdue
                    </span>
                  ) : (
                    <span className="text-muted small">0</span>
                  )}
                </td>

                {/* Status */}
                <td>
                  <span
                    className={`badge ${
                      member.status === "Active"
                        ? "badge-status-active"
                        : member.status === "Suspended"
                        ? "badge-status-suspended"
                        : "badge-status-inactive"
                    } px-2.5 py-1 rounded-pill small`}
                  >
                    {member.status}
                  </span>
                </td>

                {/* Joined */}
                <td>
                  <span className="text-secondary small">{member.joinedDate}</span>
                </td>

                {/* Actions */}
                <td className="text-end" onClick={(e) => e.stopPropagation()}>
                  <div className="dropdown d-inline-block">
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm border-0 rounded-circle p-1"
                      onClick={() =>
                        setActiveMenuId(activeMenuId === member.id ? null : member.id)
                      }
                    >
                      <MoreVertical size={16} />
                    </button>

                    {activeMenuId === member.id && (
                      <div
                        className="dropdown-menu show dropdown-menu-end shadow-sm border-light rounded-3 py-1 position-absolute"
                        style={{ right: 0, top: "100%", zIndex: 100, minWidth: 160 }}
                      >
                        <button
                          type="button"
                          className="dropdown-item small d-flex align-items-center gap-2 py-2"
                          onClick={() => {
                            onSelectMember(member);
                            setActiveMenuId(null);
                          }}
                        >
                          <Eye size={14} /> View Profile
                        </button>
                        <button
                          type="button"
                          className="dropdown-item small d-flex align-items-center gap-2 py-2"
                          onClick={() => {
                            onEditMember(member);
                            setActiveMenuId(null);
                          }}
                        >
                          <Edit size={14} /> Edit Member
                        </button>
                        <button
                          type="button"
                          className="dropdown-item small d-flex align-items-center gap-2 py-2"
                          onClick={() => {
                            onSelectMember(member);
                            setActiveMenuId(null);
                          }}
                        >
                          <Clock size={14} /> View Loans
                        </button>
                        <hr className="dropdown-divider my-1" />
                        <button
                          type="button"
                          className="dropdown-item small d-flex align-items-center gap-2 py-2 text-warning-emphasis"
                          onClick={() => setActiveMenuId(null)}
                        >
                          <ShieldAlert size={14} /> Suspend Member
                        </button>
                        <button
                          type="button"
                          className="dropdown-item small d-flex align-items-center gap-2 py-2 text-danger"
                          onClick={() => {
                            onDeleteMember(member);
                            setActiveMenuId(null);
                          }}
                        >
                          <Trash2 size={14} /> Delete Member
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Bar */}
      <div className="members-pagination-bar">
        <span className="text-muted small">
          Showing 1–{members.length} of 1,248 members
        </span>

        <div className="d-flex align-items-center gap-1">
          <button type="button" className="btn btn-outline-secondary btn-sm rounded-3 disabled">
            Previous
          </button>
          <button type="button" className="btn btn-primary btn-sm rounded-3 fw-bold px-3" style={{ background: "var(--bs-indigo)" }}>
            1
          </button>
          <button type="button" className="btn btn-outline-secondary btn-sm rounded-3 px-3">
            2
          </button>
          <button type="button" className="btn btn-outline-secondary btn-sm rounded-3 px-3">
            3
          </button>
          <button type="button" className="btn btn-outline-secondary btn-sm rounded-3">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MembersTable;
