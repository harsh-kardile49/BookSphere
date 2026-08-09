import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ReturnHeader = () => {
  return (
    <div className="return-header">
      <div className="return-title-group">
        <h1>Return Books</h1>
        <p>Process returned books and keep your library records up to date.</p>
      </div>

      <Link to="/dashboard" className="btn-back-loans">
        <ArrowLeft size={16} />
        <span>Back to Loans</span>
      </Link>
    </div>
  );
};

export default ReturnHeader;
