import { Calendar, Info } from "lucide-react";

interface BorrowDetailsFormProps {
  borrowDate: string;
  onBorrowDateChange: (date: string) => void;
  dueDate: string;
  onDueDateChange: (date: string) => void;
}

const BorrowDetailsForm = ({
  borrowDate,
  onBorrowDateChange,
  dueDate,
  onDueDateChange,
}: BorrowDetailsFormProps) => {
  return (
    <div className="form-section mb-0">
      <div className="date-fields-grid mb-3">
        {/* Borrow Date */}
        <div>
          <label className="form-section-label">Borrow Date</label>
          <div className="search-input-group">
            <Calendar className="search-input-icon" size={16} />
            <input
              type="date"
              className="borrow-input"
              value={borrowDate}
              onChange={(e) => onBorrowDateChange(e.target.value)}
            />
          </div>
        </div>

        {/* Due Date */}
        <div>
          <label className="form-section-label">Due Date</label>
          <div className="search-input-group">
            <Calendar className="search-input-icon" size={16} />
            <input
              type="date"
              className="borrow-input"
              value={dueDate}
              onChange={(e) => onDueDateChange(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="info-note">
        <Info size={14} color="var(--bs-indigo)" />
        <span>Standard borrowing period: 14 days</span>
      </div>
    </div>
  );
};

export default BorrowDetailsForm;
