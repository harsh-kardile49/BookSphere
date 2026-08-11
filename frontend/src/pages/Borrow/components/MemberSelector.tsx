import { useState, useRef, useEffect } from "react";
import { Search, AlertCircle, X } from "lucide-react";
import { userService } from "../../../services/user.service";

export interface BorrowableMember {
  id: number;
  name: string;
  email: string;
  phone: string;
  memberCode: string;
  avatarBg: string;
  avatarInitials: string;
  eligible: boolean;
  accountStatus: string;
  currentBorrowedCount: number;
  borrowingLimit: number;
  ineligibilityReason?: string;
}

interface MemberSelectorProps {
  selectedMember: BorrowableMember | null;
  onSelectMember: (member: BorrowableMember | null) => void;
}

const GRADIENTS = [
  "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
  "linear-gradient(135deg, #10b981 0%, #047857 100%)",
  "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
  "linear-gradient(135deg, #f97316 0%, #c2410c 100%)",
  "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
];

const MemberSelector = ({
  selectedMember,
  onSelectMember,
}: MemberSelectorProps) => {
  const [membersList, setMembersList] = useState<BorrowableMember[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load real members from backend API
  useEffect(() => {
    let isMounted = true;
    const loadUsers = async () => {
      try {
        const users = await userService.getAllUsers();
        if (isMounted && Array.isArray(users)) {
          const mapped: BorrowableMember[] = users.map((u, i) => ({
            id: u.id,
            name: `${u.firstName} ${u.lastName}`.trim(),
            email: u.email,
            phone: u.phone || "+91 98765 43210",
            memberCode: `MEM-${1000 + u.id}`,
            avatarBg: GRADIENTS[i % GRADIENTS.length],
            avatarInitials: ((u.firstName[0] || "") + (u.lastName[0] || "")).toUpperCase() || "MB",
            eligible: true,
            accountStatus: "Active",
            currentBorrowedCount: 0,
            borrowingLimit: 5,
          }));
          setMembersList(mapped);
        }
      } catch (err) {
        console.warn("Error fetching members for selector:", err);
      }
    };

    loadUsers();
    return () => {
      isMounted = false;
    };
  }, []);

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

  const filteredMembers = membersList.filter(
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
              placeholder="Search registered member by name, ID, or email..."
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
