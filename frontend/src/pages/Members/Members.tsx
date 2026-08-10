import { useState, useEffect, useMemo } from "react";
import { INITIAL_MEMBERS_DATA, type Member, type MembershipType, type MemberStatus, type MemberLoan } from "./data/membersData";
import MembersHeader from "./components/MembersHeader";
import MembersKpiCards from "./components/MembersKpiCards";
import MembersToolbar from "./components/MembersToolbar";
import MembersTable from "./components/MembersTable";
import AddMemberModal from "./components/AddMemberModal";
import EditMemberModal from "./components/EditMemberModal";
import MemberDetailsDrawer from "./components/MemberDetailsDrawer";
import DeleteMemberModal from "./components/DeleteMemberModal";
import { userService, type BackendUserDTO } from "../../services/user.service";
import { borrowService, type BorrowResponseDTO } from "../../services/borrow.service";
import { toast } from "sonner";
import "./members.css";

const GRADIENTS = [
  "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
  "linear-gradient(135deg, #10b981 0%, #047857 100%)",
  "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
  "linear-gradient(135deg, #f97316 0%, #c2410c 100%)",
  "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
];

function mapBackendUserToMember(
  user: BackendUserDTO,
  index: number,
  allBorrows: BorrowResponseDTO[] = []
): Member {
  const name = `${user.firstName} ${user.lastName}`.trim();
  const initials = ((user.firstName[0] || "") + (user.lastName[0] || "")).toUpperCase() || "MB";
  const gradient = GRADIENTS[index % GRADIENTS.length];

  // Filter borrows belonging to this user
  const userBorrows = allBorrows.filter((b) => Number(b.userId) === Number(user.id));
  const activeBorrows = userBorrows.filter((b) => b.status === "ACTIVE");

  const activeLoans: MemberLoan[] = activeBorrows.map((b, i) => ({
    id: String(b.id),
    bookTitle: b.bookTitle || "Issued Book",
    author: b.bookAuthor || "Author",
    coverGradient: GRADIENTS[i % GRADIENTS.length],
    coverInitial: (b.bookTitle[0] || "B").toUpperCase(),
    borrowDate: b.borrowDate,
    dueDate: b.dueDate,
    isOverdue: Boolean(b.isOverdue),
  }));

  const overdueCount = activeLoans.filter((l) => l.isOverdue).length;

  return {
    id: String(user.id),
    memberCode: `MEM-${1000 + user.id}`,
    name,
    email: user.email,
    phone: user.phone || "+91 98765 43210",
    membershipType: (user.role === "ADMIN" ? "Premium" : user.role === "LIBRARIAN" ? "Standard" : "Student") as MembershipType,
    avatarBg: gradient,
    avatarInitials: initials,
    booksBorrowedCount: activeLoans.length,
    overdueCount: overdueCount,
    totalBorrowedCount: userBorrows.length,
    finesAmount: 0,
    status: "Active" as MemberStatus,
    joinedDate: "2026",
    address: "Library Registered Member",
    activeLoans: activeLoans,
    borrowingHistory: [],
    activityTimeline: [],
  };
}

const Members = () => {
  const [membersList, setMembersList] = useState<Member[]>(INITIAL_MEMBERS_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [selectedMembership, setSelectedMembership] = useState("ALL");
  const [selectedSort, setSelectedSort] = useState("recently_added");

  // Selection & Modal states
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deletingMember, setDeletingMember] = useState<Member | null>(null);

  // Fetch users & borrow transactions from Spring Boot backend on mount
  useEffect(() => {
    let isMounted = true;
    const fetchUsersAndLoans = async () => {
      setIsLoading(true);
      try {
        const [usersResult, borrowsResult] = await Promise.allSettled([
          userService.getAllUsers(),
          borrowService.getAllBorrows(),
        ]);

        const backendUsers = usersResult.status === "fulfilled" ? usersResult.value : [];
        const allBorrows = borrowsResult.status === "fulfilled" ? borrowsResult.value : [];

        if (isMounted && Array.isArray(backendUsers) && backendUsers.length > 0) {
          const mapped = backendUsers.map((u, i) => mapBackendUserToMember(u, i, allBorrows));
          setMembersList(mapped);
        }
      } catch (err) {
        console.warn("Backend /users API call error:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchUsersAndLoans();
    return () => {
      isMounted = false;
    };
  }, []);

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
        return 0;
      });
  }, [membersList, searchTerm, selectedStatus, selectedMembership, selectedSort]);

  // Handlers for Add Member
  const handleAddMemberSubmit = async (data: {
    name: string;
    email: string;
    phone: string;
    membershipType: MembershipType;
    status: MemberStatus;
    address: string;
  }) => {
    const nameParts = data.name.trim().split(" ");
    const firstName = nameParts[0] || "Member";
    const lastName = nameParts.slice(1).join(" ") || "User";

    try {
      const created = await userService.createUser({
        firstName,
        lastName,
        email: data.email,
        phone: data.phone,
        password: "password123",
        role: data.membershipType === "Premium" ? "ADMIN" : data.membershipType === "Standard" ? "LIBRARIAN" : "STUDENT",
      });

      const newMember = mapBackendUserToMember(created, membersList.length, []);
      setMembersList((prev) => [newMember, ...prev]);
      toast.success("Member registered", {
        description: `${data.name} added`,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to register member";
      toast.error("Registration Error", { description: msg });
    }
  };

  // Handlers for Edit Member
  const handleEditMember = (m: Member) => {
    setEditingMember(m);
  };

  const handleUpdateMemberSubmit = async (data: {
    id: string;
    name: string;
    email: string;
    phone: string;
    membershipType: MembershipType;
    status: MemberStatus;
    address: string;
  }) => {
    const nameParts = data.name.trim().split(" ");
    const firstName = nameParts[0] || "Member";
    const lastName = nameParts.slice(1).join(" ") || "User";

    try {
      const numId = Number(data.id);
      if (!isNaN(numId)) {
        await userService.updateUser(numId, {
          firstName,
          lastName,
          email: data.email,
          phone: data.phone,
          role: data.membershipType === "Premium" ? "ADMIN" : data.membershipType === "Standard" ? "LIBRARIAN" : "STUDENT",
        });
      }

      setMembersList((prev) =>
        prev.map((m) =>
          m.id === data.id
            ? {
                ...m,
                name: data.name,
                email: data.email,
                phone: data.phone,
                membershipType: data.membershipType,
                status: data.status,
                address: data.address,
                avatarInitials: ((firstName[0] || "") + (lastName[0] || "")).toUpperCase() || "MB",
              }
            : m
        )
      );

      if (selectedMember?.id === data.id) {
        setSelectedMember((prev) =>
          prev
            ? {
                ...prev,
                name: data.name,
                email: data.email,
                phone: data.phone,
                membershipType: data.membershipType,
                status: data.status,
                address: data.address,
              }
            : null
        );
      }

      toast.success("Member updated", {
        description: `${data.name}'s details saved`,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to update member";
      toast.error("Update Failed", { description: msg });
    }
  };

  // Handlers for Delete Member
  const handleDeleteConfirm = async () => {
    if (!deletingMember) return;
    const memberToDelete = deletingMember;

    try {
      const numId = Number(memberToDelete.id);
      if (!isNaN(numId)) {
        await userService.deleteUser(numId);
      }
      setMembersList((prev) => prev.filter((m) => m.id !== memberToDelete.id));
      if (selectedMember?.id === memberToDelete.id) {
        setSelectedMember(null);
      }
      toast.success("Member removed");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to delete member";
      toast.error("Delete Failed", { description: msg });
    } finally {
      setDeletingMember(null);
    }
  };

  const handleExport = () => {
    toast.info("Exporting Members List", {
      description: `Exporting ${filteredMembers.length} member records to CSV.`,
    });
  };

  return (
    <div className="members-page-container">
      {/* Top Header */}
      <MembersHeader
        onAddMember={() => setIsAddModalOpen(true)}
        onExport={handleExport}
      />

      {/* KPI Stats Cards */}
      <MembersKpiCards members={membersList} />

      {/* Toolbar & Filter Bar */}
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

      {/* Main Members Table Component */}
      {isLoading ? (
        <div className="text-center py-5">
          <div className="spinner-border mb-2" role="status" style={{ color: "var(--bs-indigo)" }} />
          <p className="text-muted small">Loading library members from database...</p>
        </div>
      ) : (
        <MembersTable
          members={filteredMembers}
          onSelectMember={(m) => setSelectedMember(m)}
          onEditMember={handleEditMember}
          onDeleteMember={(m) => setDeletingMember(m)}
          onClearSearch={() => setSearchTerm("")}
          searchTerm={searchTerm}
        />
      )}

      {/* Member Details Drawer */}
      <MemberDetailsDrawer
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
        onEdit={handleEditMember}
      />

      {/* Add Member Modal */}
      <AddMemberModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddMemberSubmit={handleAddMemberSubmit}
      />

      {/* Edit Member Modal */}
      <EditMemberModal
        member={editingMember}
        isOpen={Boolean(editingMember)}
        onClose={() => setEditingMember(null)}
        onUpdateMemberSubmit={handleUpdateMemberSubmit}
      />

      {/* Delete Member Confirmation Modal */}
      <DeleteMemberModal
        member={deletingMember}
        onClose={() => setDeletingMember(null)}
        onConfirmDelete={handleDeleteConfirm}
      />
    </div>
  );
};

export default Members;
