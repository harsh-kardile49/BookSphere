interface BooksSkeletonProps {
  count?: number;
}

const BooksSkeleton = ({ count = 6 }: BooksSkeletonProps) => {
  return (
    <div className="books-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={`book-skeleton-${i}`}
          className="book-card p-0 overflow-hidden bg-white border rounded-4 shadow-sm"
          style={{ minHeight: 340 }}
        >
          <div className="progressive-img-skeleton" style={{ height: 210, width: "100%" }} />
          <div className="p-3">
            <div className="progressive-img-skeleton mb-2" style={{ height: 12, width: "35%", borderRadius: 4 }} />
            <div className="progressive-img-skeleton mb-2" style={{ height: 18, width: "85%", borderRadius: 4 }} />
            <div className="progressive-img-skeleton mb-3" style={{ height: 13, width: "60%", borderRadius: 4 }} />
            <div className="d-flex justify-content-between align-items-center pt-1 border-top border-light">
              <div className="progressive-img-skeleton" style={{ height: 14, width: "30%", borderRadius: 10 }} />
              <div className="progressive-img-skeleton" style={{ height: 18, width: "25%", borderRadius: 10 }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BooksSkeleton;
