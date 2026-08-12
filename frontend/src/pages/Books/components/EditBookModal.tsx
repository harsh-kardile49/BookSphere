import { useState, useEffect } from "react";
import { Edit, Check, X, Image, Sparkles, BookPlus } from "lucide-react";
import { updateBook } from "../../../services/book.service";
import type { BookPayload, BackendBook } from "../../../types/book";
import type { Book } from "../data/booksData";
import { toast } from "sonner";

interface EditBookModalProps {
  book: Book | BackendBook | null;
  onClose: () => void;
  onSuccess: (updatedBook: BackendBook) => void;
}

const CATEGORY_OPTIONS = [
  "Programming",
  "Technology",
  "Self Development",
  "Finance",
  "Science",
  "Fiction",
  "History",
  "Philosophy",
  "Design",
  "Software Development",
  "Software Engineering",
  "Algorithms",
  "Database",
  "General",
];

const EditBookModal = ({ book, onClose, onSuccess }: EditBookModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<BookPayload>({
    title: "",
    author: "",
    publisher: "",
    isbn: "",
    category: "General",
    price: 499,
    quantity: 1,
    publishedYear: new Date().getFullYear(),
    imageUrl: "",
  });

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || "",
        author: book.author || "",
        publisher: book.publisher || "",
        isbn: book.isbn || "",
        category: book.category || "General",
        price: "price" in book && typeof book.price === "number" ? book.price : 499,
        quantity: "quantity" in book && typeof book.quantity === "number" 
          ? book.quantity 
          : ("issuesCount" in book ? (book.issuesCount ?? 1) : 1),
        publishedYear: book.publishedYear || new Date().getFullYear(),
        imageUrl: book.imageUrl || "",
      });
    }
  }, [book]);

  if (!book) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.author || !formData.publisher || !formData.isbn) {
      toast.error("Validation Error", {
        description: "Please fill in all mandatory fields (Title, Author, Publisher, ISBN).",
      });
      return;
    }

    if (formData.price <= 0) {
      toast.error("Validation Error", {
        description: "Price must be greater than 0.",
      });
      return;
    }

    if (formData.quantity < 0) {
      toast.error("Validation Error", {
        description: "Quantity cannot be negative.",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Call PUT /books/{id} endpoint
      const updated = await updateBook(book.id, formData);
      toast.success("Book Updated Successfully", {
        description: `"${updated.title}" updated in catalog.`,
      });
      onSuccess(updated);
      onClose();
    } catch (err: unknown) {
      console.warn("Error updating book:", err);
      toast.error("Update Failed", {
        description: "An error occurred while updating the book on the server.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="modal fade show d-block"
      style={{ background: "rgba(15, 23, 42, 0.65)", backdropFilter: "blur(8px)", zIndex: 1065 }}
      tabIndex={-1}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden" style={{ background: "var(--surface-page, #ffffff)" }}>
          {/* Header */}
          <div className="modal-header border-bottom p-4 bg-surface-elevated">
            <div className="d-flex align-items-center gap-2">
              <div className="p-2 bg-indigo-subtle rounded-3 text-primary d-flex align-items-center justify-content-center">
                <Edit size={20} color="var(--bs-indigo)" />
              </div>
              <div>
                <h5 className="modal-title fw-bold text-dark mb-0">Update Book Details</h5>
                <small className="text-muted">Edit information for "{book.title}" (ID: {book.id})</small>
              </div>
            </div>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            />
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit}>
            <div className="modal-body p-4 p-md-5" style={{ maxHeight: "70vh", overflowY: "auto" }}>
              {/* Section 1: Book Details */}
              <div className="d-flex align-items-center gap-2 mb-3 pb-2 border-bottom">
                <Sparkles size={16} color="var(--bs-indigo)" />
                <h6 className="fw-bold text-primary small text-uppercase tracking-wider mb-0">
                  Book Specifications
                </h6>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold text-dark small mb-1">
                  Book Title *
                </label>
                <input
                  type="text"
                  name="title"
                  className="form-control rounded-3 p-2.5 text-dark small"
                  style={{ background: "var(--surface-card, #f8fafc)" }}
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold text-dark small mb-1">
                    Author *
                  </label>
                  <input
                    type="text"
                    name="author"
                    className="form-control rounded-3 p-2.5 text-dark small"
                    style={{ background: "var(--surface-card, #f8fafc)" }}
                    value={formData.author}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold text-dark small mb-1">
                    Publisher *
                  </label>
                  <input
                    type="text"
                    name="publisher"
                    className="form-control rounded-3 p-2.5 text-dark small"
                    style={{ background: "var(--surface-card, #f8fafc)" }}
                    value={formData.publisher}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold text-dark small mb-1">
                    ISBN Number *
                  </label>
                  <input
                    type="text"
                    name="isbn"
                    className="form-control rounded-3 p-2.5 text-dark small font-monospace"
                    style={{ background: "var(--surface-card, #f8fafc)" }}
                    value={formData.isbn}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold text-dark small mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    className="form-select rounded-3 p-2.5 text-dark small"
                    style={{ background: "var(--surface-card, #f8fafc)" }}
                    value={formData.category}
                    onChange={handleChange}
                  >
                    {CATEGORY_OPTIONS.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Cover Image URL */}
              <div className="mb-4">
                <label className="form-label fw-semibold text-dark small mb-1 d-flex align-items-center gap-1">
                  <Image size={14} className="text-muted" />
                  <span>Cover Image URL (Optional)</span>
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  className="form-control rounded-3 p-2.5 text-dark small"
                  style={{ background: "var(--surface-card, #f8fafc)" }}
                  value={formData.imageUrl || ""}
                  onChange={handleChange}
                />
              </div>

              {/* Section 2: Pricing & Stock */}
              <div className="d-flex align-items-center gap-2 mb-3 pb-2 border-bottom">
                <BookPlus size={16} color="var(--bs-indigo)" />
                <h6 className="fw-bold text-primary small text-uppercase tracking-wider mb-0">
                  Inventory & Pricing
                </h6>
              </div>

              <div className="row g-3 mb-2">
                <div className="col-md-4">
                  <label className="form-label fw-semibold text-dark small mb-1">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    min="1"
                    step="0.01"
                    className="form-control rounded-3 p-2.5 text-dark small"
                    style={{ background: "var(--surface-card, #f8fafc)" }}
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold text-dark small mb-1">
                    Quantity (Copies) *
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    min="0"
                    className="form-control rounded-3 p-2.5 text-dark small"
                    style={{ background: "var(--surface-card, #f8fafc)" }}
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold text-dark small mb-1">
                    Published Year
                  </label>
                  <input
                    type="number"
                    name="publishedYear"
                    min="1800"
                    max={new Date().getFullYear()}
                    className="form-control rounded-3 p-2.5 text-dark small"
                    style={{ background: "var(--surface-card, #f8fafc)" }}
                    value={formData.publishedYear}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="modal-footer border-top p-3 bg-surface-elevated">
              <button
                type="button"
                className="btn btn-outline-secondary fw-semibold rounded-3 px-4"
                onClick={onClose}
                disabled={isLoading}
              >
                <X size={15} className="me-1" />
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary fw-bold rounded-3 px-4 d-inline-flex align-items-center gap-2"
                disabled={isLoading}
                style={{ background: "var(--bs-indigo)", borderColor: "var(--bs-indigo)" }}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status" />
                    <span>Saving Changes...</span>
                  </>
                ) : (
                  <>
                    <Check size={16} />
                    <span>Update Book</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBookModal;
