import { useState } from "react";
import type { ActiveLoan } from "./data/loansData";
import ReturnHeader from "./components/ReturnHeader";
import FindLoanSelector from "./components/FindLoanSelector";
import SelectedLoanCard from "./components/SelectedLoanCard";
import ReturnConditionForm, {
  type BookCondition,
} from "./components/ReturnConditionForm";
import ReturnSummaryCard from "./components/ReturnSummaryCard";
import ReturnSuccessView from "./components/ReturnSuccessView";
import { toast } from "sonner";
import "./return.css";

const toInputDate = (d: Date) => d.toISOString().split("T")[0];

const Return = () => {
  const today = new Date();
  const [selectedLoan, setSelectedLoan] = useState<ActiveLoan | null>(null);
  const [returnDate, setReturnDate] = useState<string>(toInputDate(today));
  const [condition, setCondition] = useState<BookCondition>("Good");
  const [damageDescription, setDamageDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [returnId, setReturnId] = useState("");

  // Calculate dynamic overdue days based on chosen returnDate vs selectedLoan.dueDate
  let daysOverdue = 0;
  let isOverdue = false;

  if (selectedLoan && returnDate) {
    const rDate = new Date(returnDate);
    const dDate = new Date(selectedLoan.dueDate);
    if (!isNaN(rDate.getTime()) && !isNaN(dDate.getTime())) {
      const diffTime = rDate.getTime() - dDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays > 0) {
        daysOverdue = diffDays;
        isOverdue = true;
      }
    }
  }

  // Fine calculation: ₹5 / day
  const fineAmount = daysOverdue * 5;

  const handleConfirm = () => {
    if (!selectedLoan) return;

    setIsLoading(true);
    setTimeout(() => {
      const randomId = `RTN-${Math.floor(3000 + Math.random() * 9000)}`;
      setReturnId(randomId);
      setIsLoading(false);
      setIsSuccess(true);
      toast.success("Book returned successfully!", {
        description: `${selectedLoan.bookTitle} returned by ${selectedLoan.memberName}`,
      });
    }, 1000);
  };

  const handleReset = () => {
    setSelectedLoan(null);
    setReturnDate(toInputDate(new Date()));
    setCondition("Good");
    setDamageDescription("");
    setNotes("");
    setIsSuccess(false);
    setReturnId("");
  };

  return (
    <div className="return-container">
      {/* ── Page Header ── */}
      <ReturnHeader />

      {isSuccess && selectedLoan ? (
        /* ── Success Confirmation Screen ── */
        <ReturnSuccessView
          returnId={returnId}
          loan={selectedLoan}
          returnDate={returnDate}
          condition={condition}
          fineAmount={fineAmount}
          onReset={handleReset}
        />
      ) : (
        /* ── Return Workflow Form ── */
        <div className="return-grid">
          {/* Left Column: Form Workflow */}
          <div className="return-card">
            <div className="return-card-header">
              <h2 className="return-card-title">Process Book Return</h2>
              <p className="return-card-subtitle">
                Select an active loan, review borrowing status, and process the return.
              </p>
            </div>

            {/* Step 1: Find Borrowing Record */}
            <FindLoanSelector
              selectedLoan={selectedLoan}
              onSelectLoan={setSelectedLoan}
            />

            {/* Step 2: Selected Loan Details */}
            {selectedLoan && (
              <>
                <SelectedLoanCard
                  loan={selectedLoan}
                  onClear={() => setSelectedLoan(null)}
                />

                {/* Step 3 & 4 & 5: Return Status, Date & Condition Form */}
                <ReturnConditionForm
                  loan={selectedLoan}
                  returnDate={returnDate}
                  onReturnDateChange={setReturnDate}
                  condition={condition}
                  onConditionChange={setCondition}
                  damageDescription={damageDescription}
                  onDamageDescriptionChange={setDamageDescription}
                  notes={notes}
                  onNotesChange={setNotes}
                  isOverdue={isOverdue}
                  daysOverdue={daysOverdue}
                />
              </>
            )}
          </div>

          {/* Right Column: Sticky Return Summary Card */}
          <div>
            <ReturnSummaryCard
              loan={selectedLoan}
              returnDate={returnDate}
              condition={condition}
              isOverdue={isOverdue}
              daysOverdue={daysOverdue}
              fineAmount={fineAmount}
              isLoading={isLoading}
              onConfirm={handleConfirm}
              onCancel={handleReset}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Return;
