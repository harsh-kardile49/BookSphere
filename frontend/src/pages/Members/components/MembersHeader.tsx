import { Plus, Download } from "lucide-react";

interface MembersHeaderProps {
  onAddMember: () => void;
  onExport: () => void;
}

const MembersHeader = ({ onAddMember, onExport }: MembersHeaderProps) => {
  return (
    <div className="members-header">
      <div className="members-title-group">
        <h1>Members</h1>
        <p>Manage library members, accounts, and borrowing activity.</p>
      </div>

      <div className="d-flex align-items-center gap-2">
        <button
          type="button"
          className="btn-export-members"
          onClick={onExport}
        >
          <Download size={16} />
          <span>Export</span>
        </button>

        <button
          type="button"
          className="btn-add-member"
          onClick={onAddMember}
        >
          <Plus size={18} />
          <span>Add Member</span>
        </button>
      </div>
    </div>
  );
};

export default MembersHeader;
