import { useState, useEffect } from "react";
import { UserCheck } from "lucide-react";
import type { Member, MembershipType, MemberStatus } from "../data/membersData";

interface EditMemberModalProps {
  member: Member | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateMemberSubmit: (updatedMember: {
    id: string;
    name: string;
    email: string;
    phone: string;
    membershipType: MembershipType;
    status: MemberStatus;
    address: string;
  }) => void;
}

const EditMemberModal = ({
  member,
  isOpen,
  onClose,
  onUpdateMemberSubmit,
}: EditMemberModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [membershipType, setMembershipType] = useState<MembershipType>("Standard");
  const [status, setStatus] = useState<MemberStatus>("Active");
  const [address, setAddress] = useState("");

  // Populate state when member changes
  useEffect(() => {
    if (member) {
      setName(member.name || "");
      setEmail(member.email || "");
      setPhone(member.phone || "");
      setMembershipType(member.membershipType || "Standard");
      setStatus(member.status || "Active");
      setAddress(member.address || "");
    }
  }, [member]);

  if (!isOpen || !member) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    onUpdateMemberSubmit({
      id: member.id,
      name,
      email,
      phone,
      membershipType,
      status,
      address,
    });

    onClose();
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)", zIndex: 1100 }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
          {/* Modal Header */}
          <div className="modal-header border-bottom border-subtle p-4">
            <div>
              <h5 className="modal-title fw-bold text-dark mb-1">Edit Member Profile</h5>
              <p className="text-muted small mb-0">
                Update account details for <span className="fw-semibold text-dark">{member.name}</span> ({member.memberCode}).
              </p>
            </div>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            />
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit}>
            <div className="modal-body p-4">
              {/* Personal Information */}
              <h6 className="fw-bold text-primary small text-uppercase tracking-wider mb-3">
                Personal Information
              </h6>

              <div className="mb-3">
                <label className="form-label fw-semibold text-dark small">Full Name *</label>
                <input
                  type="text"
                  className="form-control rounded-3 p-2.5 text-dark small"
                  style={{ background: "var(--surface-page)" }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <label className="form-label fw-semibold text-dark small">Email Address *</label>
                  <input
                    type="email"
                    className="form-control rounded-3 p-2.5 text-dark small"
                    style={{ background: "var(--surface-page)" }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold text-dark small">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control rounded-3 p-2.5 text-dark small"
                    style={{ background: "var(--surface-page)" }}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              {/* Membership & Account */}
              <h6 className="fw-bold text-primary small text-uppercase tracking-wider mb-3">
                Membership & Account
              </h6>

              <div className="row g-3 mb-4">
                <div className="col-md-4">
                  <label className="form-label fw-semibold text-dark small">Membership Type</label>
                  <select
                    className="form-select rounded-3 p-2.5 text-dark small"
                    style={{ background: "var(--surface-page)" }}
                    value={membershipType}
                    onChange={(e) => setMembershipType(e.target.value as MembershipType)}
                  >
                    <option value="Standard">Standard</option>
                    <option value="Premium">Premium</option>
                    <option value="Student">Student</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold text-dark small">Member ID</label>
                  <input
                    type="text"
                    className="form-control rounded-3 p-2.5 text-muted small bg-light font-monospace"
                    value={member.memberCode}
                    disabled
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold text-dark small">Account Status</label>
                  <select
                    className="form-select rounded-3 p-2.5 text-dark small"
                    style={{ background: "var(--surface-page)" }}
                    value={status}
                    onChange={(e) => setStatus(e.target.value as MemberStatus)}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>

              {/* Address */}
              <div className="mb-2">
                <label className="form-label fw-semibold text-dark small">Address</label>
                <textarea
                  className="form-control rounded-3 p-2.5 text-dark small"
                  style={{ background: "var(--surface-page)", minHeight: 70, resize: "none" }}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="modal-footer border-top border-subtle p-3 bg-light d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary fw-semibold rounded-3 px-4 py-2"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary fw-bold rounded-3 px-4 py-2"
                style={{ background: "var(--bs-indigo)", borderColor: "var(--bs-indigo)" }}
              >
                <UserCheck size={16} className="me-2" />
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditMemberModal;
