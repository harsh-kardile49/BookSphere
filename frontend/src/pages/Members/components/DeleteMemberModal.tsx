import { AlertTriangle, Trash2 } from "lucide-react";
import type { Member } from "../data/membersData";

interface DeleteMemberModalProps {
  member: Member | null;
  onClose: () => void;
  onConfirmDelete: (memberId: string) => void;
}

const DeleteMemberModal = ({
  member,
  onClose,
  onConfirmDelete,
}: DeleteMemberModalProps) => {
  if (!member) return null;

  const hasActiveLoans = member.booksBorrowedCount > 0 || member.activeLoans.length > 0;

  return (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)", zIndex: 1150 }}
    >
      <div className="modal-dialog modal-dialog-centered modal-sm" style={{ maxWidth: 420 }}>
        <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden p-4">
          <div className="text-center mb-3">
            <div
              className="rounded-circle mx-auto d-flex align-items-center justify-content-center mb-3"
              style={{
                width: 52,
                height: 52,
                background: "var(--bs-red-light)",
                color: "var(--bs-red)",
              }}
            >
              <AlertTriangle size={24} />
            </div>
            <h5 className="fw-bold text-dark mb-1">Delete Member?</h5>
            <p className="text-secondary small mb-0">
              Are you sure you want to delete <strong>{member.name}</strong> ({member.memberCode})? This action cannot be undone.
            </p>
          </div>

          {/* Active Loans Safety Check Alert */}
          {hasActiveLoans && (
            <div className="alert alert-warning border-0 p-3 mb-4 rounded-3 small text-start d-flex align-items-start gap-2">
              <AlertTriangle size={16} className="mt-0.5 flex-shrink-0" />
              <span>
                This member has <strong>{member.booksBorrowedCount} active borrowed books</strong>. Return all borrowed books before deleting the account.
              </span>
            </div>
          )}

          {/* Modal Actions */}
          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-outline-secondary fw-semibold rounded-3 flex-fill py-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger fw-bold rounded-3 flex-fill py-2 d-flex align-items-center justify-content-center gap-1.5"
              disabled={hasActiveLoans}
              onClick={() => onConfirmDelete(member.id)}
            >
              <Trash2 size={16} /> Delete Member
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteMemberModal;
