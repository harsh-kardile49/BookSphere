import { useState } from "react";
import BorrowHeader from "./components/BorrowHeader";
import MemberSelector, { type BorrowableMember } from "./components/MemberSelector";
import BookSelector, { type BorrowableBook } from "./components/BookSelector";
import BorrowDetailsForm from "./components/BorrowDetailsForm";
import BorrowSummaryCard from "./components/BorrowSummaryCard";
import BorrowSuccessView from "./components/BorrowSuccessView";
import { borrowService } from "../../services/borrow.service";
import { toast } from "sonner";
import "./borrow.css";

// Helper: Format date to YYYY-MM-DD for date inputs
const toInputDate = (d: Date) => d.toISOString().split("T")[0];

const Borrow = () => {
  const today = new Date();
  const defaultDue = new Date(today);
  defaultDue.setDate(defaultDue.getDate() + 14);

  const [selectedMember, setSelectedMember] = useState<BorrowableMember | null>(null);
  const [selectedBook, setSelectedBook] = useState<BorrowableBook | null>(null);
  const [borrowDate, setBorrowDate] = useState<string>(toInputDate(today));
  const [dueDate, setDueDate] = useState<string>(toInputDate(defaultDue));
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [borrowId, setBorrowId] = useState("");

  // When borrowDate changes, auto-update dueDate to borrowDate + 14 days
  const handleBorrowDateChange = (newDateStr: string) => {
    setBorrowDate(newDateStr);
    if (newDateStr) {
      const d = new Date(newDateStr);
      if (!isNaN(d.getTime())) {
        d.setDate(d.getDate() + 14);
        setDueDate(toInputDate(d));
      }
    }
  };

  // Validation rule
  const isValid = Boolean(
    selectedMember &&
      selectedMember.eligible &&
      selectedBook &&
      selectedBook.availability === "Available"
  );

  const handleConfirm = async () => {
    if (!isValid || !selectedMember || !selectedBook) return;

    setIsLoading(true);
    try {
      const result = await borrowService.issueBook({
        userId: selectedMember.id,
        bookId: selectedBook.id,
        dueDate: dueDate,
      });

      setBorrowId(`BRW-${1000 + result.id}`);
      setIsSuccess(true);
      toast.success("Book issued", {
        description: `"${selectedBook.title}" → ${selectedMember.name}`,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to issue book";
      toast.error("Unable to issue book", { description: msg });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedMember(null);
    setSelectedBook(null);
    const now = new Date();
    const due = new Date(now);
    due.setDate(due.getDate() + 14);
    setBorrowDate(toInputDate(now));
    setDueDate(toInputDate(due));
    setIsSuccess(false);
    setBorrowId("");
  };

  return (
    <div className="borrow-container">
      {/* ── Page Header ── */}
      <BorrowHeader />

      {isSuccess && selectedMember && selectedBook ? (
        /* ── Success Confirmation Screen ── */
        <BorrowSuccessView
          borrowId={borrowId}
          member={selectedMember}
          book={selectedBook}
          borrowDate={borrowDate}
          dueDate={dueDate}
          onReset={handleReset}
        />
      ) : (
        /* ── Borrowing Workflow Form ── */
        <div className="borrow-grid">
          {/* Left Column: Form Workflow */}
          <div className="borrow-card">
            <div className="borrow-card-header">
              <h2 className="borrow-card-title">Create Borrowing</h2>
              <p className="borrow-card-subtitle">
                Select a member and the book they want to borrow.
              </p>
            </div>

            {/* Step 1: Member Selection */}
            <MemberSelector
              selectedMember={selectedMember}
              onSelectMember={setSelectedMember}
            />

            {/* Step 2: Book Selection */}
            <BookSelector
              selectedBook={selectedBook}
              onSelectBook={setSelectedBook}
            />

            {/* Step 3: Dates */}
            <BorrowDetailsForm
              borrowDate={borrowDate}
              onBorrowDateChange={handleBorrowDateChange}
              dueDate={dueDate}
              onDueDateChange={setDueDate}
            />
          </div>

          {/* Right Column: Sticky Summary Card */}
          <div>
            <BorrowSummaryCard
              member={selectedMember}
              book={selectedBook}
              borrowDate={borrowDate}
              dueDate={dueDate}
              isValid={isValid}
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

export default Borrow;
