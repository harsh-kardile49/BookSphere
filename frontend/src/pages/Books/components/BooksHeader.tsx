import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { useAuthStore } from "../../../store/authStore";

const BooksHeader = () => {
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

      {canAddBook && (
        <Link to="/books/add" className="btn-add-book">
          <Plus size={16} />
          <span>Add Book</span>
        </Link>
      )}
    </div>
  );
};

export default BooksHeader;
