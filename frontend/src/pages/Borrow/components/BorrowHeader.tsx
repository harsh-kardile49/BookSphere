import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BorrowHeader = () => {
  return (
    <div className="borrow-header">
      <div className="borrow-title-group">
        <h1>Borrow Books</h1>
        <p>Search for a book and create a new borrowing record.</p>
      </div>

      <Link to="/dashboard" className="btn-back-loans">
        <ArrowLeft size={16} />
        <span>Back to Loans</span>
      </Link>
    </div>
  );
};

export default BorrowHeader;
