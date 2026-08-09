import { useState, useRef, useEffect } from "react";
import { Search, AlertCircle, X } from "lucide-react";
import { MEMBERS_DATA, type Member } from "../data/membersData";

interface MemberSelectorProps {
  selectedMember: Member | null;
  onSelectMember: (member: Member | null) => void;
}

const MemberSelector = ({
  selectedMember,
  onSelectMember,
}: MemberSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredMembers = MEMBERS_DATA.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.memberCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="form-section" ref={containerRef}>
      <label className="form-section-label">Member</label>

      {!selectedMember ? (
        <div className="dropdown-search-wrapper">
          <div className="search-input-group">
            <Search className="search-input-icon" size={16} />
            <input
              type="text"
              className="borrow-input"
              placeholder="Search member by name, ID, or email..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
            />
          </div>

          {/* Results Dropdown */}
          {isOpen && (
            <div className="dropdown-results-menu">
              {filteredMembers.length === 0 ? (
                <div className="p-3 text-center text-muted small">
                  No members found matching "{searchTerm}"
                </div>
              ) : (
                filteredMembers.map((member) => (
                  <div
                    key={member.id}
                    className="dropdown-result-row"
                    onClick={() => {
                      onSelectMember(member);
                      setIsOpen(false);
                      setSearchTerm("");
                    }}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className="member-avatar"
                        style={{
                          background: member.avatarBg,
                          width: 36,
                          height: 36,
                          fontSize: ".8rem",
                        }}
                      >
                        {member.avatarInitials}
                      </div>
                      <div>
                        <div className="fw-semibold text-dark small">
                          {member.name}
                        </div>
                        <div className="text-muted" style={{ fontSize: ".74rem" }}>
                          ID: {member.memberCode} · {member.email}
                        </div>
                      </div>
                    </div>

                    <div>
                      {member.eligible ? (
                        <span className="badge bg-success-subtle text-success px-2 py-1 rounded-pill small">
                          Eligible
                        </span>
                      ) : (
                        <span className="badge bg-warning-subtle text-warning-emphasis px-2 py-1 rounded-pill small">
                          Limit Reached
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      ) : (
        /* Selected Member Summary Card */
        <div className="selected-member-card">
          <div className="d-flex align-items-center gap-3">
            <div
              className="member-avatar"
              style={{ background: selectedMember.avatarBg }}
            >
              {selectedMember.avatarInitials}
            </div>
            <div>
              <div className="d-flex align-items-center gap-2">
                <h6 className="fw-bold text-dark mb-0">
                  {selectedMember.name}
                </h6>
                <span className="badge bg-success-subtle text-success px-2 py-1 rounded-pill style-small">
                  ● {selectedMember.accountStatus}
                </span>
              </div>
              <div className="text-muted small mt-1">
                ID: <strong>{selectedMember.memberCode}</strong> · {selectedMember.phone}
              </div>
            </div>
          </div>

          <div className="d-flex align-items-center gap-4">
            <div className="text-end">
              <div className="small text-muted">Current Loans</div>
              <div className="fw-bold text-dark">
                {selectedMember.currentBorrowedCount} / {selectedMember.borrowingLimit} books
              </div>
            </div>

            <button
              type="button"
              className="btn btn-outline-secondary btn-sm border-0 rounded-circle p-1"
              onClick={() => onSelectMember(null)}
              title="Change member"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Eligibility Warning if ineligible */}
      {selectedMember && !selectedMember.eligible && (
        <div className="alert alert-warning mt-2 p-2 px-3 small d-flex align-items-center gap-2 rounded-3 border-0">
          <AlertCircle size={16} />
          <span>{selectedMember.ineligibilityReason}</span>
        </div>
      )}
    </div>
  );
};

export default MemberSelector;
