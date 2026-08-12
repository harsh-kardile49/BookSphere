import { ChevronLeft, ChevronRight } from "lucide-react";

interface BookPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const BookPagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: BookPaginationProps) => {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate array of page numbers to render
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      if (!pages.includes(totalPages)) pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between gap-3 mt-4 pt-3 border-top">
      {/* Item Range Info */}
      <div className="text-secondary small fw-medium">
        Showing <strong className="text-dark">{startItem}–{endItem}</strong> of{" "}
        <strong className="text-dark">{totalItems}</strong> books
      </div>

      {/* Pagination Nav */}
      <div className="d-flex align-items-center gap-1.5">
        {/* Previous Button */}
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm rounded-3 d-flex align-items-center justify-content-center p-2"
          style={{ width: 36, height: 36 }}
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          title="Previous Page"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Page Numbers */}
        {getPageNumbers().map((num, idx) => {
          if (num === "...") {
            return (
              <span key={`dots-${idx}`} className="px-2 text-muted small">
                ...
              </span>
            );
          }

          const isCurrent = num === currentPage;

          return (
            <button
              key={num}
              type="button"
              className={`btn btn-sm rounded-3 fw-bold d-flex align-items-center justify-content-center ${
                isCurrent ? "btn-primary text-white" : "btn-outline-secondary"
              }`}
              style={{
                width: 36,
                height: 36,
                background: isCurrent ? "var(--bs-indigo)" : undefined,
                borderColor: isCurrent ? "var(--bs-indigo)" : undefined,
              }}
              onClick={() => onPageChange(Number(num))}
            >
              {num}
            </button>
          );
        })}

        {/* Next Button */}
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm rounded-3 d-flex align-items-center justify-content-center p-2"
          style={{ width: 36, height: 36 }}
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          title="Next Page"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default BookPagination;
