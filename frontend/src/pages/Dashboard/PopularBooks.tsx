import { ArrowRight } from "lucide-react";

interface Book {
  rank: number;
  title: string;
  author: string;
  category: string;
  issues: number;
  coverColor: string;
  coverInitial: string;
}

const books: Book[] = [
  {
    rank: 1,
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self Development",
    issues: 42,
    coverColor: "#4f46e5",
    coverInitial: "AH",
  },
  {
    rank: 2,
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Programming",
    issues: 35,
    coverColor: "#0891b2",
    coverInitial: "CC",
  },
  {
    rank: 3,
    title: "Design Patterns",
    author: "Gang of Four",
    category: "Software Engineering",
    issues: 28,
    coverColor: "#7c3aed",
    coverInitial: "DP",
  },
  {
    rank: 4,
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    category: "Psychology",
    issues: 24,
    coverColor: "#059669",
    coverInitial: "TF",
  },
  {
    rank: 5,
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    category: "Programming",
    issues: 21,
    coverColor: "#dc2626",
    coverInitial: "PP",
  },
];

const maxIssues = Math.max(...books.map((b) => b.issues));

const PopularBooks = () => {
  return (
    <div className="dash-card" style={{ height: "100%" }}>
      <div className="dash-card-header">
        <h6 className="section-title">Most Popular Books</h6>
        <a href="#" className="section-link">
          View all <ArrowRight size={13} />
        </a>
      </div>

      <div>
        {books.map((book) => (
          <div className="popular-book-row" key={book.rank}>
            <div
              className="popular-book-rank"
              style={{
                background:
                  book.rank <= 3 ? "var(--bs-indigo-light)" : "var(--bs-slate-100)",
                color:
                  book.rank <= 3 ? "var(--bs-indigo)" : "var(--text-muted)",
              }}
            >
              {book.rank}
            </div>
            <div
              className="popular-book-cover"
              style={{
                background: book.coverColor,
                color: "#fff",
              }}
            >
              {book.coverInitial}
            </div>
            <div className="popular-book-info">
              <div className="popular-book-title">{book.title}</div>
              <div className="popular-book-author">{book.author}</div>
            </div>
            <div className="popular-book-bar">
              <div
                className="popular-book-bar-fill"
                style={{ width: `${(book.issues / maxIssues) * 100}%` }}
              />
            </div>
            <div className="popular-book-count">{book.issues}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularBooks;
