import { useState } from "react";
import { Trash2, AlertTriangle, X } from "lucide-react";
import { deleteBook } from "../../../services/book.service";
import type { Book } from "../data/booksData";
import type { BackendBook } from "../../../types/book";
import { toast } from "sonner";

interface DeleteBookModalProps {
  book: Book | BackendBook | null;
  onClose: () => void;
  onSuccess: (bookId: number | string) => void;
}

const DeleteBookModal = ({ book, onClose, onSuccess }: DeleteBookModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!book) return null;

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      // Call DELETE /books/{id} REST endpoint
      await deleteBook(book.id);
      toast.success("Book Deleted", {
        description: `"${book.title}" has been removed from the catalog.`,
      });
      onSuccess(book.id);
      onClose();
    } catch (err: unknown) {
      console.warn("Error deleting book:", err);
      toast.error("Delete Failed", {
        description: "An error occurred while deleting the book from the catalog.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="modal fade show d-block"
      style={{ background: "rgba(15, 23, 42, 0.65)", backdropFilter: "blur(8px)", zIndex: 1070 }}
      tabIndex={-1}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        style={{ maxWidth: 440 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden" style={{ background: "#ffffff" }}>
          <div className="modal-body p-4 text-center">
            {/* Warning Icon Badge */}
            <div
              className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
              style={{
                width: 56,
                height: 56,
                background: "rgba(239, 68, 68, 0.1)",
                color: "#ef4444",
              }}
            >
              <AlertTriangle size={28} />
            </div>

            <h5 className="fw-bold text-dark mb-2">Delete Book Entry?</h5>
            <p className="text-secondary small mb-3">
              Are you sure you want to delete <strong className="text-dark">"{book.title}"</strong> from the library catalog?
            </p>
            <div className="p-3 bg-light rounded-3 text-start small text-muted mb-4 font-monospace">
              <div><strong>ISBN:</strong> {book.isbn || "N/A"}</div>
              <div><strong>Author:</strong> {book.author || "Unknown"}</div>
              <div><strong>Category:</strong> {book.category || "General"}</div>
            </div>
            <p className="text-danger small fw-semibold mb-4 opacity-75">
              ⚠️ Warning: This operation is permanent and cannot be undone.
            </p>

            {/* Actions */}
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary fw-semibold rounded-3 py-2 flex-fill"
                onClick={onClose}
                disabled={isLoading}
              >
                <X size={15} className="me-1" />
                Cancel
              </button>

              <button
                type="button"
                className="btn btn-danger fw-bold rounded-3 py-2 flex-fill d-inline-flex align-items-center justify-content-center gap-1.5"
                onClick={handleDelete}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 size={16} />
                    <span>Confirm Delete</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteBookModal;
