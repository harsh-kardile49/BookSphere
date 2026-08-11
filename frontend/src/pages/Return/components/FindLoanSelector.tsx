import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { borrowService, type BorrowResponseDTO } from "../../../services/borrow.service";

export interface ActiveBorrowLoan {
  id: number;
  loanCode: string;
  userName: string;
  userEmail: string;
  bookTitle: string;
  bookAuthor: string;
  isbn: string;
  borrowDate: string;
  dueDate: string;
  status: string;
  isOverdue: boolean;
  coverGradient: string;
  coverInitial: string;
}

interface FindLoanSelectorProps {
  selectedLoan: ActiveBorrowLoan | null;
  onSelectLoan: (loan: ActiveBorrowLoan | null) => void;
  refreshKey?: number;
}

const GRADIENTS = [
  "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
  "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
  "linear-gradient(135deg, #06b6d4 0%, #0e7490 100%)",
  "linear-gradient(135deg, #f59e0b 0%, #b45309 100%)",
  "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
  "linear-gradient(135deg, #10b981 0%, #047857 100%)",
];

const FindLoanSelector = ({
  selectedLoan,
  onSelectLoan,
  refreshKey = 0,
}: FindLoanSelectorProps) => {
  const [loansList, setLoansList] = useState<ActiveBorrowLoan[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load real active loans from backend
  useEffect(() => {
    let isMounted = true;
    const fetchActiveLoans = async () => {
      try {
        const activeBorrows: BorrowResponseDTO[] = await borrowService.getActiveBorrows();
        if (isMounted && Array.isArray(activeBorrows)) {
          const mapped: ActiveBorrowLoan[] = activeBorrows.map((b, i) => ({
            id: b.id,
            loanCode: `LN-${1000 + b.id}`,
            userName: b.userName || "Library User",
            userEmail: b.userEmail || "",
            bookTitle: b.bookTitle || "Unknown Book",
            bookAuthor: b.bookAuthor || "Unknown Author",
            isbn: b.isbn || "978-0132350884",
            borrowDate: b.borrowDate,
            dueDate: b.dueDate,
            status: b.status,
            isOverdue: Boolean(b.isOverdue),
            coverGradient: GRADIENTS[i % GRADIENTS.length],
            coverInitial: (b.bookTitle[0] || "B").toUpperCase(),
          }));
          setLoansList(mapped);
        }
      } catch (err) {
        console.warn("Error loading active borrows from API:", err);
      }
    };

    fetchActiveLoans();
    return () => {
      isMounted = false;
    };
  }, [refreshKey]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredLoans = loansList.filter(
    (l) =>
      l.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.loanCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.isbn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="form-section" ref={containerRef}>
      <div className="d-flex align-items-center justify-content-between mb-2">
        <label className="form-section-label mb-0">Find Active Borrowing</label>
      </div>

      {!selectedLoan ? (
        <div className="dropdown-search-wrapper">
          <div className="search-input-group">
            <Search className="search-input-icon" size={16} />
            <input
              type="text"
              className="borrow-input"
              placeholder="Search member, book title, or loan ID..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
            />
          </div>

          {/* Results Dropdown */}
          {isOpen && (
            <div className="dropdown-results-menu">
              {filteredLoans.length === 0 ? (
                <div className="p-3 text-center text-muted small">
                  No active loan records found.
                </div>
              ) : (
                filteredLoans.map((loan) => (
                  <div
                    key={loan.id}
                    className="dropdown-result-row"
                    onClick={() => {
                      onSelectLoan(loan);
                      setIsOpen(false);
                      setSearchTerm("");
                    }}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className="selected-book-cover"
                        style={{
                          background: loan.coverGradient,
                          width: 34,
                          height: 46,
                          fontSize: ".75rem",
                        }}
                      >
                        {loan.coverInitial}
                      </div>
                      <div>
                        <div className="fw-semibold text-dark small">
                          {loan.bookTitle}
                        </div>
                        <div className="text-muted" style={{ fontSize: ".74rem" }}>
                          Borrowed by <strong>{loan.userName}</strong> · Loan: {loan.loanCode}
                        </div>
                      </div>
                    </div>

                    <div>
                      <span
                        className={`badge ${
                          loan.isOverdue
                            ? "bg-warning-subtle text-warning-emphasis"
                            : "bg-success-subtle text-success"
                        } px-2 py-1 rounded-pill small`}
                      >
                        {loan.isOverdue ? "Overdue" : "Active Loan"}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default FindLoanSelector;
