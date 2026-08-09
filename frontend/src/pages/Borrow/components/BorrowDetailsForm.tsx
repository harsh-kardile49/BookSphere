import { Calendar, Info } from "lucide-react";

interface BorrowDetailsFormProps {
  borrowDate: string;
  onBorrowDateChange: (date: string) => void;
  dueDate: string;
  onDueDateChange: (date: string) => void;
  notes: string;
  onNotesChange: (notes: string) => void;
}

const BorrowDetailsForm = ({
  borrowDate,
  onBorrowDateChange,
  dueDate,
  onDueDateChange,
  notes,
  onNotesChange,
}: BorrowDetailsFormProps) => {
  return (
    <div className="form-section mb-0">
      <div className="date-fields-grid">
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

      <div className="info-note mb-4">
        <Info size={14} color="var(--bs-indigo)" />
        <span>Standard borrowing period: 14 days</span>
      </div>

      {/* Notes Field */}
      <div>
        <label className="form-section-label">Notes (Optional)</label>
        <div className="position-relative">
          <textarea
            className="form-control border-light rounded-3 p-3 text-dark small"
            style={{
              background: "var(--surface-page)",
              fontSize: ".86rem",
              minHeight: 80,
              resize: "none",
            }}
            placeholder="Add any notes about this borrowing..."
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default BorrowDetailsForm;
