import { useState, useRef, useEffect } from "react";
import { Search, ScanBarcode } from "lucide-react";
import { ACTIVE_LOANS_DATA, type ActiveLoan } from "../data/loansData";
import { toast } from "sonner";

interface FindLoanSelectorProps {
  selectedLoan: ActiveLoan | null;
  onSelectLoan: (loan: ActiveLoan | null) => void;
}

const FindLoanSelector = ({
  selectedLoan,
  onSelectLoan,
}: FindLoanSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const filteredLoans = ACTIVE_LOANS_DATA.filter(
    (l) =>
      l.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.loanCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.isbn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleScanBarcode = () => {
    // Simulate barcode scan
    const randomLoan = ACTIVE_LOANS_DATA[0];
    onSelectLoan(randomLoan);
    toast.info("Barcode Scanned Successfully!", {
      description: `Matched active loan ${randomLoan.loanCode} for ${randomLoan.bookTitle}`,
    });
  };

  return (
    <div className="form-section" ref={containerRef}>
      <div className="d-flex align-items-center justify-content-between mb-2">
        <label className="form-section-label mb-0">Find Borrowing</label>

        {!selectedLoan && (
          <button
            type="button"
            className="btn-scan-barcode"
            onClick={handleScanBarcode}
          >
            <ScanBarcode size={15} />
            <span>Scan Barcode</span>
          </button>
        )}
      </div>

      {!selectedLoan ? (
        <div className="dropdown-search-wrapper">
          <div className="search-input-group">
            <Search className="search-input-icon" size={16} />
            <input
              type="text"
              className="borrow-input"
              placeholder="Search member, book title, or loan ID (e.g. LN-2048)..."
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
                  No active loan records found matching "{searchTerm}"
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
                          Borrowed by <strong>{loan.memberName}</strong> · Loan: {loan.loanCode}
                        </div>
                      </div>
                    </div>

                    <div>
                      <span
                        className={`badge ${
                          loan.status === "Active"
                            ? "bg-success-subtle text-success"
                            : "bg-warning-subtle text-warning-emphasis"
                        } px-2 py-1 rounded-pill small`}
                      >
                        {loan.status === "Overdue" ? `${loan.daysOverdue}d Overdue` : "Active"}
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
