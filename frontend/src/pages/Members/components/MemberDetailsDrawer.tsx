import { X, Edit, ShieldAlert, BookOpen, Calendar, Mail, Phone, MapPin } from "lucide-react";
import type { Member } from "../data/membersData";

interface MemberDetailsDrawerProps {
  member: Member | null;
  onClose: () => void;
  onEdit: (member: Member) => void;
}

const MemberDetailsDrawer = ({
  member,
  onClose,
  onEdit,
}: MemberDetailsDrawerProps) => {
  if (!member) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-content p-4" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="d-flex align-items-start justify-content-between pb-3 border-bottom mb-4">
          <div className="d-flex align-items-center gap-3">
            <div
              className="member-avatar-circle"
              style={{ width: 48, height: 48, fontSize: "1.1rem", background: member.avatarBg }}
            >
              {member.avatarInitials}
            </div>
            <div>
              <div className="d-flex align-items-center gap-2">
                <h5 className="fw-bold text-dark mb-0">{member.name}</h5>
                <span
                  className={`badge ${
                    member.status === "Active"
                      ? "badge-status-active"
                      : member.status === "Suspended"
                      ? "badge-status-suspended"
                      : "badge-status-inactive"
                  } px-2 py-1 rounded-pill small`}
                >
                  {member.status}
                </span>
              </div>
              <div className="text-muted small mt-0.5">
                Member ID: <span className="font-monospace fw-semibold text-secondary">{member.memberCode}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-outline-secondary border-0 rounded-circle p-1"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="d-flex gap-2 mb-4">
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm rounded-3 fw-semibold flex-fill py-1.5"
            onClick={() => onEdit(member)}
          >
            <Edit size={14} className="me-1" /> Edit Member
          </button>
          <button
            type="button"
            className="btn btn-outline-warning btn-sm rounded-3 fw-semibold flex-fill py-1.5 text-warning-emphasis"
          >
            <ShieldAlert size={14} className="me-1" /> Suspend
          </button>
        </div>

        {/* Member Overview 4 Stats */}
        <div className="row g-2 mb-4">
          <div className="col-3">
            <div className="p-2.5 rounded-3 bg-light text-center">
              <div className="text-muted" style={{ fontSize: ".7rem" }}>Borrowed</div>
              <div className="fw-bold text-dark fs-6">{member.booksBorrowedCount}</div>
            </div>
          </div>
          <div className="col-3">
            <div className="p-2.5 rounded-3 bg-light text-center">
              <div className="text-muted" style={{ fontSize: ".7rem" }}>Total</div>
              <div className="fw-bold text-dark fs-6">{member.totalBorrowedCount}</div>
            </div>
          </div>
          <div className="col-3">
            <div className="p-2.5 rounded-3 bg-light text-center">
              <div className="text-muted" style={{ fontSize: ".7rem" }}>Overdue</div>
              <div className={`fw-bold fs-6 ${member.overdueCount > 0 ? "text-amber" : "text-dark"}`} style={member.overdueCount > 0 ? { color: "#b45309" } : {}}>
                {member.overdueCount}
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="p-2.5 rounded-3 bg-light text-center">
              <div className="text-muted" style={{ fontSize: ".7rem" }}>Fines</div>
              <div className={`fw-bold fs-6 ${member.finesAmount > 0 ? "text-amber" : "text-emerald"}`} style={member.finesAmount > 0 ? { color: "#b45309" } : { color: "#047857" }}>
                ₹{member.finesAmount}
              </div>
            </div>
          </div>
        </div>

        {/* Member Information Card */}
        <div className="card border-light rounded-3 p-3 mb-4 bg-light">
          <h6 className="fw-bold text-dark mb-3 small text-uppercase tracking-wider">
            Member Information
          </h6>
          <div className="d-flex flex-column gap-2.5 text-dark small">
            <div className="d-flex align-items-center gap-2">
              <Mail size={15} className="text-muted" />
              <span className="text-muted">Email:</span>
              <span className="fw-semibold ms-auto">{member.email}</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <Phone size={15} className="text-muted" />
              <span className="text-muted">Phone:</span>
              <span className="fw-semibold ms-auto">{member.phone}</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <BookOpen size={15} className="text-muted" />
              <span className="text-muted">Membership:</span>
              <span className="badge bg-indigo-subtle text-primary ms-auto">{member.membershipType}</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <Calendar size={15} className="text-muted" />
              <span className="text-muted">Joined:</span>
              <span className="fw-semibold ms-auto">{member.joinedDate}</span>
            </div>
            {member.address && (
              <div className="d-flex align-items-start gap-2 pt-2 border-top">
                <MapPin size={15} className="text-muted mt-0.5" />
                <span className="text-muted">Address:</span>
                <span className="fw-semibold ms-auto text-end" style={{ maxWidth: 220 }}>
                  {member.address}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Current Loans Section */}
        <div className="mb-4">
          <h6 className="fw-bold text-dark mb-3 small text-uppercase tracking-wider d-flex align-items-center justify-content-between">
            <span>Current Loans</span>
            <span className="badge bg-slate-100 text-secondary rounded-pill">{member.activeLoans.length} active</span>
          </h6>

          {member.activeLoans.length === 0 ? (
            <div className="p-3 text-center text-muted small bg-light rounded-3">
              No active borrowed books for this member.
            </div>
          ) : (
            <div className="d-flex flex-column gap-2">
              {member.activeLoans.map((loan) => (
                <div
                  key={loan.id}
                  className="p-3 rounded-3 border border-subtle bg-white d-flex align-items-center justify-content-between gap-3"
                >
                  <div className="d-flex align-items-center gap-3">
                    <div
                      className="selected-book-cover"
                      style={{
                        background: loan.coverGradient,
                        width: 32,
                        height: 44,
                        fontSize: ".7rem",
                      }}
                    >
                      {loan.coverInitial}
                    </div>
                    <div>
                      <div className="fw-bold text-dark small">{loan.bookTitle}</div>
                      <div className="text-muted" style={{ fontSize: ".74rem" }}>
                        By {loan.author}
                      </div>
                      <div className="text-muted" style={{ fontSize: ".72rem" }}>
                        Due: {loan.dueDate}
                      </div>
                    </div>
                  </div>

                  <div>
                    {loan.isOverdue ? (
                      <span className="badge bg-warning-subtle text-warning-emphasis rounded-pill small">
                        {loan.daysOverdue}d Overdue
                      </span>
                    ) : (
                      <span className="badge bg-success-subtle text-success rounded-pill small">
                        On Time
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Activity Timeline */}
        {member.activityTimeline.length > 0 && (
          <div>
            <h6 className="fw-bold text-dark mb-3 small text-uppercase tracking-wider">
              Recent Activity
            </h6>
            <div className="ps-2 border-start border-2 border-subtle d-flex flex-column gap-3">
              {member.activityTimeline.map((act) => (
                <div key={act.id} className="ps-3 position-relative">
                  <div
                    className="position-absolute rounded-circle bg-primary"
                    style={{ left: -11, top: 4, width: 8, height: 8 }}
                  />
                  <div className="fw-semibold text-dark small">{act.detail}</div>
                  <div className="text-muted" style={{ fontSize: ".72rem" }}>
                    {act.date} · {act.action}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberDetailsDrawer;
