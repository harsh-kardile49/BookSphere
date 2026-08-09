export interface ActiveLoan {
  id: string;
  loanCode: string;
  bookTitle: string;
  author: string;
  isbn: string;
  category: string;
  coverGradient: string;
  coverInitial: string;
  memberName: string;
  memberCode: string;
  memberAvatarInitials: string;
  memberAvatarBg: string;
  borrowDate: string;
  dueDate: string;
  status: "Active" | "Overdue";
  daysOverdue: number;
  alreadyReturned?: boolean;
}

export const ACTIVE_LOANS_DATA: ActiveLoan[] = [
  {
    id: "loan-2048",
    loanCode: "LN-2048",
    bookTitle: "Atomic Habits",
    author: "James Clear",
    isbn: "9780735211292",
    category: "Self Development",
    coverGradient: "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
    coverInitial: "AH",
    memberName: "Aarav Sharma",
    memberCode: "MEM-1024",
    memberAvatarInitials: "AS",
    memberAvatarBg: "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
    borrowDate: "2026-08-09",
    dueDate: "2026-08-23",
    status: "Active",
    daysOverdue: 0,
  },
  {
    id: "loan-2012",
    loanCode: "LN-2012",
    bookTitle: "Clean Code",
    author: "Robert C. Martin",
    isbn: "9780132350884",
    category: "Programming",
    coverGradient: "linear-gradient(135deg, #06b6d4 0%, #0e7490 100%)",
    coverInitial: "CC",
    memberName: "Rahul Sharma",
    memberCode: "MEM-1012",
    memberAvatarInitials: "RS",
    memberAvatarBg: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
    borrowDate: "2026-07-20",
    dueDate: "2026-08-04",
    status: "Overdue",
    daysOverdue: 5,
  },
  {
    id: "loan-2035",
    loanCode: "LN-2035",
    bookTitle: "Design Patterns",
    author: "Erich Gamma et al.",
    isbn: "9780201633610",
    category: "Programming",
    coverGradient: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
    coverInitial: "DP",
    memberName: "Priya Patel",
    memberCode: "MEM-1088",
    memberAvatarInitials: "PP",
    memberAvatarBg: "linear-gradient(135deg, #10b981 0%, #047857 100%)",
    borrowDate: "2026-08-01",
    dueDate: "2026-08-15",
    status: "Active",
    daysOverdue: 0,
  },
  {
    id: "loan-1994",
    loanCode: "LN-1994",
    bookTitle: "The Alchemist",
    author: "Paulo Coelho",
    isbn: "9780062315007",
    category: "Fiction",
    coverGradient: "linear-gradient(135deg, #f59e0b 0%, #b45309 100%)",
    coverInitial: "TA",
    memberName: "Alex Morgan",
    memberCode: "MEM-1045",
    memberAvatarInitials: "AM",
    memberAvatarBg: "linear-gradient(135deg, #f97316 0%, #c2410c 100%)",
    borrowDate: "2026-07-15",
    dueDate: "2026-07-29",
    status: "Overdue",
    daysOverdue: 11,
  },
];
