import { Link } from "react-router-dom";
import { Plus, Download } from "lucide-react";
import { useAuthStore } from "../../../store/authStore";

interface BooksHeaderProps {
  onExportCSV?: () => void;
}

const BooksHeader = ({ onExportCSV }: BooksHeaderProps) => {
  const { user } = useAuthStore();
  const role = user?.role || "STUDENT";
  const canAddBook = role === "ADMIN" || role === "LIBRARIAN";

  return (
    <div className="books-header">
      <div className="books-title-group">
        <h1 className="books-main-title">Books</h1>
        <p className="books-subtitle">
          Explore our vast collection of knowledge. Find, discover, and borrow books to grow your mind.
        </p>
      </div>

      <div className="d-flex align-items-center gap-3" style={{ gap: "12px" }}>
        {onExportCSV && (
          <button
            type="button"
            className="btn btn-outline-secondary btn-md rounded-3 px-3 py-2 fw-semibold d-inline-flex align-items-center gap-2 border shadow-sm bg-white text-dark"
            onClick={onExportCSV}
            title="Export catalog as CSV file"
            style={{ fontSize: "0.88rem" }}
          >
            <Download size={16} />
            <span>Export CSV</span>
          </button>
        )}

        {canAddBook && (
          <Link to="/books/add" className="btn-add-book">
            <Plus size={16} />
            <span>Add Book</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default BooksHeader;
