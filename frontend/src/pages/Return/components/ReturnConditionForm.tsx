import {
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Info,
  HelpCircle,
  CheckCircle,
} from "lucide-react";
import type { ActiveLoan } from "../data/loansData";

export type BookCondition = "Good" | "Minor Wear" | "Damaged" | "Lost";

interface ReturnConditionFormProps {
  loan: ActiveLoan;
  returnDate: string;
  onReturnDateChange: (date: string) => void;
  condition: BookCondition;
  onConditionChange: (condition: BookCondition) => void;
  damageDescription: string;
  onDamageDescriptionChange: (desc: string) => void;
  notes: string;
  onNotesChange: (notes: string) => void;
  isOverdue: boolean;
  daysOverdue: number;
}

const ReturnConditionForm = ({
  loan,
  returnDate,
  onReturnDateChange,
  condition,
  onConditionChange,
  damageDescription,
  onDamageDescriptionChange,
  notes,
  onNotesChange,
  isOverdue,
  daysOverdue,
}: ReturnConditionFormProps) => {
  return (
    <div className="form-section mb-0">
      {/* ── Return Status Banner ── */}
      <div
        className={`return-status-banner ${
          isOverdue ? "return-status-banner--overdue" : "return-status-banner--ontime"
        }`}
      >
        <div
          className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
          style={{
            width: 38,
            height: 38,
            background: isOverdue ? "rgba(245, 158, 11, 0.2)" : "rgba(16, 185, 129, 0.2)",
          }}
        >
          {isOverdue ? <AlertTriangle size={20} /> : <CheckCircle2 size={20} />}
        </div>
        <div>
          <h6 className="fw-bold mb-1" style={{ fontSize: ".92rem" }}>
            {isOverdue ? `Overdue — ${daysOverdue} Days` : "Returned on time"}
          </h6>
          <p className="mb-0 small opacity-90">
            {isOverdue
              ? `This book is ${daysOverdue} days past its due date (${loan.dueDate}).`
              : "This book is being returned within the standard 14-day borrowing period."}
          </p>
        </div>
      </div>

      {/* ── Return Date Field ── */}
      <div className="mb-4">
        <div className="d-flex align-items-center justify-content-between mb-1">
          <label className="form-section-label mb-0">Return Date</label>
          {isOverdue && (
            <span className="badge bg-warning-subtle text-warning-emphasis px-2 py-1 rounded-pill small">
              {daysOverdue} days overdue
            </span>
          )}
        </div>

        <div className="search-input-group">
          <Calendar className="search-input-icon" size={16} />
          <input
            type="date"
            className="borrow-input"
            value={returnDate}
            onChange={(e) => onReturnDateChange(e.target.value)}
          />
        </div>
      </div>

      {/* ── Book Condition Cards ── */}
      <div className="mb-4">
        <label className="form-section-label">Book Condition</label>
        <div className="condition-grid">
          {([
            {
              id: "Good",
              label: "Good",
              desc: "Normal condition",
              icon: <CheckCircle size={18} />,
            },
            {
              id: "Minor Wear",
              label: "Minor Wear",
              desc: "Small signs of use",
              icon: <Info size={18} />,
            },
            {
              id: "Damaged",
              label: "Damaged",
              desc: "Physical damage",
              icon: <AlertTriangle size={18} />,
            },
            {
              id: "Lost",
              label: "Lost",
              desc: "Book not returned",
              icon: <HelpCircle size={18} />,
            },
          ] as const).map((opt) => (
            <div
              key={opt.id}
              className={`condition-card ${
                condition === opt.id ? "condition-card--selected" : ""
              }`}
              onClick={() => onConditionChange(opt.id)}
            >
              <div className="condition-icon">{opt.icon}</div>
              <div className="condition-label">{opt.label}</div>
              <div className="condition-desc">{opt.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Damage Description Field (if Damaged) */}
      {condition === "Damaged" && (
        <div className="mb-4">
          <label className="form-section-label text-warning-emphasis">
            Describe the Damage
          </label>
          <textarea
            className="form-control border-warning-subtle rounded-3 p-3 text-dark small"
            style={{
              background: "var(--bs-amber-light)",
              fontSize: ".86rem",
              minHeight: 70,
              resize: "none",
            }}
            placeholder="Describe torn pages, liquid spills, cover damage..."
            value={damageDescription}
            onChange={(e) => onDamageDescriptionChange(e.target.value)}
          />
        </div>
      )}

      {/* Lost Book Alert (if Lost) */}
      {condition === "Lost" && (
        <div className="alert alert-danger p-3 mb-4 rounded-3 small d-flex align-items-center gap-2 border-0">
          <AlertTriangle size={18} />
          <span>
            This will mark <strong>"{loan.bookTitle}"</strong> as lost and may apply a replacement charge to <strong>{loan.memberName}</strong>.
          </span>
        </div>
      )}

      {/* Return Notes */}
      <div>
        <label className="form-section-label">Return Notes (Optional)</label>
        <textarea
          className="form-control border-light rounded-3 p-3 text-dark small"
          style={{
            background: "var(--surface-page)",
            fontSize: ".86rem",
            minHeight: 80,
            resize: "none",
          }}
          placeholder="Add notes about the book's condition, damage, or other details..."
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ReturnConditionForm;
