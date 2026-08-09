import { Search } from "lucide-react";

interface MembersToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (value: string) => void;
  selectedMembership: string;
  onMembershipChange: (value: string) => void;
  selectedSort: string;
  onSortChange: (value: string) => void;
}

const MembersToolbar = ({
  searchTerm,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  selectedMembership,
  onMembershipChange,
  selectedSort,
  onSortChange,
}: MembersToolbarProps) => {
  return (
    <div className="members-toolbar">
      {/* Search Input */}
      <div className="members-search-group">
        <Search className="members-search-icon" size={16} />
        <input
          type="text"
          className="members-search-input"
          placeholder="Search members by name, email, or member ID..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Status Filter */}
      <select
        className="members-filter-select"
        value={selectedStatus}
        onChange={(e) => onStatusChange(e.target.value)}
      >
        <option value="ALL">All Statuses</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
        <option value="Suspended">Suspended</option>
      </select>

      {/* Membership Filter */}
      <select
        className="members-filter-select"
        value={selectedMembership}
        onChange={(e) => onMembershipChange(e.target.value)}
      >
        <option value="ALL">All Memberships</option>
        <option value="Standard">Standard</option>
        <option value="Premium">Premium</option>
        <option value="Student">Student</option>
      </select>

      {/* Sort Dropdown */}
      <select
        className="members-filter-select"
        value={selectedSort}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="recently_added">Recently Added</option>
        <option value="name_asc">Name A–Z</option>
        <option value="name_desc">Name Z–A</option>
        <option value="most_active">Most Active</option>
        <option value="most_borrowed">Most Borrowed</option>
      </select>
    </div>
  );
};

export default MembersToolbar;
