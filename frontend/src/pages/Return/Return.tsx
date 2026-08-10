import { useState } from "react";
import ReturnHeader from "./components/ReturnHeader";
import FindLoanSelector, { type ActiveBorrowLoan } from "./components/FindLoanSelector";
import SelectedLoanCard from "./components/SelectedLoanCard";
import ReturnSummaryCard from "./components/ReturnSummaryCard";
import ReturnSuccessView from "./components/ReturnSuccessView";
import { borrowService } from "../../services/borrow.service";
import { toast } from "sonner";
import "./return.css";

const toInputDate = (d: Date) => d.toISOString().split("T")[0];

const Return = () => {
  const today = new Date();
  const [selectedLoan, setSelectedLoan] = useState<ActiveBorrowLoan | null>(null);
  const [returnDate] = useState<string>(toInputDate(today));
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [returnId, setReturnId] = useState("");

  const handleConfirmReturn = async () => {
    if (!selectedLoan) return;

    setIsLoading(true);
    try {
      await borrowService.returnBook(selectedLoan.id);
      setReturnId(`RTN-${1000 + selectedLoan.id}`);
      setIsSuccess(true);
      toast.success("Book Returned & Stock Restored!", {
        description: `"${selectedLoan.bookTitle}" returned by ${selectedLoan.userName}. Stock (+1) restored in MySQL.`,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to process return";
      toast.error("Return Failed", { description: msg });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedLoan(null);
    setIsSuccess(false);
    setReturnId("");
  };

  return (
    <div className="return-container">
      {/* Page Header */}
      <ReturnHeader />

      {isSuccess && selectedLoan ? (
        /* Success Screen */
        <ReturnSuccessView
          returnId={returnId}
          loan={selectedLoan}
          returnDate={returnDate}
          onReset={handleReset}
        />
      ) : (
        /* Return Workflow Form */
        <div className="return-grid">
          {/* Left Column: Form */}
          <div className="return-card">
            <div className="return-card-header">
              <h2 className="return-card-title">Process Book Return</h2>
              <p className="return-card-subtitle">
                Select an active loan record to return the book and restore catalog stock.
              </p>
            </div>

            {/* Step 1: Find Active Borrowing */}
            <FindLoanSelector
              selectedLoan={selectedLoan}
              onSelectLoan={setSelectedLoan}
            />

            {/* Step 2: Selected Loan Preview Card */}
            {selectedLoan && (
              <SelectedLoanCard
                loan={selectedLoan}
                onClear={() => setSelectedLoan(null)}
              />
            )}
          </div>

          {/* Right Column: Sticky Summary Card */}
          <div>
            <ReturnSummaryCard
              loan={selectedLoan}
              returnDate={returnDate}
              isOverdue={Boolean(selectedLoan?.isOverdue)}
              isLoading={isLoading}
              onConfirm={handleConfirmReturn}
              onCancel={handleReset}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Return;
