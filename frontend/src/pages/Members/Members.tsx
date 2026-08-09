import { useState, useMemo } from "react";
import { INITIAL_MEMBERS_DATA, type Member, type MembershipType, type MemberStatus } from "./data/membersData";
import MembersHeader from "./components/MembersHeader";
import MembersKpiCards from "./components/MembersKpiCards";
import MembersToolbar from "./components/MembersToolbar";
import MembersTable from "./components/MembersTable";
import AddMemberModal from "./components/AddMemberModal";
import MemberDetailsDrawer from "./components/MemberDetailsDrawer";
import DeleteMemberModal from "./components/DeleteMemberModal";
import { toast } from "sonner";
import "./members.css";

const Members = () => {
  const [membersList, setMembersList] = useState<Member[]>(INITIAL_MEMBERS_DATA);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [selectedMembership, setSelectedMembership] = useState("ALL");
  const [selectedSort, setSelectedSort] = useState("recently_added");

  // Selection states
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deletingMember, setDeletingMember] = useState<Member | null>(null);

  // Filter & Sort logic
  const filteredMembers = useMemo(() => {
    return membersList
      .filter((m) => {
        // Search term filter
        const matchesSearch =
          m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          m.memberCode.toLowerCase().includes(searchTerm.toLowerCase());

        // Status filter
        const matchesStatus =
          selectedStatus === "ALL" || m.status === selectedStatus;

        // Membership filter
        const matchesMembership =
          selectedMembership === "ALL" || m.membershipType === selectedMembership;

        return matchesSearch && matchesStatus && matchesMembership;
      })
      .sort((a, b) => {
        if (selectedSort === "name_asc") return a.name.localeCompare(b.name);
        if (selectedSort === "name_desc") return b.name.localeCompare(a.name);
        if (selectedSort === "most_active") return b.totalBorrowedCount - a.totalBorrowedCount;
        if (selectedSort === "most_borrowed") return b.booksBorrowedCount - a.booksBorrowedCount;
        return 0; // recently added default order
      });
  }, [membersList, searchTerm, selectedStatus, selectedMembership, selectedSort]);

  // Handlers
  const handleAddMember = (newMemberData: {
    name: string;
    email: string;
    phone: string;
    membershipType: MembershipType;
    status: MemberStatus;
    address: string;
  }) => {
    const initials = newMemberData.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    const randomNum = Math.floor(1030 + Math.random() * 900);
    const newMember: Member = {
      id: `mem-${randomNum}`,
      memberCode: `MEM-${randomNum}`,
      name: newMemberData.name,
      email: newMemberData.email,
      phone: newMemberData.phone || "+91 98765 00000",
      membershipType: newMemberData.membershipType,
      avatarBg: "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
      avatarInitials: initials || "MB",
      booksBorrowedCount: 0,
      overdueCount: 0,
      totalBorrowedCount: 0,
      finesAmount: 0,
      status: newMemberData.status,
      joinedDate: "Today",
      address: newMemberData.address,
      activeLoans: [],
      borrowingHistory: [],
      activityTimeline: [
        {
          id: `act-${Date.now()}`,
          date: "Today",
          action: "Account Created",
          detail: "Member account registered",
        },
      ],
    };

    setMembersList([newMember, ...membersList]);
    toast.success("Member created successfully!", {
      description: `${newMember.name} (${newMember.memberCode}) added to library system.`,
    });
  };

  const handleDeleteConfirm = (memberId: string) => {
    const target = membersList.find((m) => m.id === memberId);
    setMembersList((prev) => prev.filter((m) => m.id !== memberId));
    setDeletingMember(null);
    if (selectedMember?.id === memberId) setSelectedMember(null);

    toast.success("Member deleted", {
      description: `${target?.name || "Member"} removed from library records.`,
    });
  };

  const handleExport = () => {
    toast.info("Exporting member directory...", {
      description: "Member directory CSV download initiated.",
    });
  };

  return (
    <div className="members-container">
      {/* ── Page Header ── */}
      <MembersHeader
        onAddMember={() => setIsAddModalOpen(true)}
        onExport={handleExport}
      />

      {/* ── Top Statistics Overview Cards ── */}
      <MembersKpiCards />

      {/* ── Main Members Directory Card ── */}
      <div className="members-main-card">
        <div className="members-card-header">
          <h2 className="members-card-title">All Members</h2>
          <p className="members-card-subtitle">
            View, filter, and manage registered library member accounts.
          </p>
        </div>

        {/* Search & Filters Toolbar */}
        <MembersToolbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          selectedMembership={selectedMembership}
          onMembershipChange={setSelectedMembership}
          selectedSort={selectedSort}
          onSortChange={setSelectedSort}
        />

        {/* Directory Table */}
        <MembersTable
          members={filteredMembers}
          onSelectMember={(m) => setSelectedMember(m)}
          onEditMember={(m) => {
            setSelectedMember(m);
            toast.info(`Editing member ${m.name}`);
          }}
          onDeleteMember={(m) => setDeletingMember(m)}
          onClearSearch={() => setSearchTerm("")}
          searchTerm={searchTerm}
        />
      </div>

      {/* ── Add Member Modal ── */}
      <AddMemberModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddMemberSubmit={handleAddMember}
      />

      {/* ── Member Profile Drawer ── */}
      <MemberDetailsDrawer
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
        onEdit={(m) => toast.info(`Editing ${m.name}`)}
      />

      {/* ── Delete Member Confirmation Modal ── */}
      <DeleteMemberModal
        member={deletingMember}
        onClose={() => setDeletingMember(null)}
        onConfirmDelete={handleDeleteConfirm}
      />
    </div>
  );
};

export default Members;
