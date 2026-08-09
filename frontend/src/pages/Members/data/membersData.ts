export type MembershipType = "Premium" | "Standard" | "Student";
export type MemberStatus = "Active" | "Inactive" | "Suspended";

export interface MemberLoan {
  id: string;
  bookTitle: string;
  author: string;
  coverGradient: string;
  coverInitial: string;
  borrowDate: string;
  dueDate: string;
  isOverdue: boolean;
  daysOverdue?: number;
}

export interface MemberHistory {
  id: string;
  bookTitle: string;
  borrowedDate: string;
  returnedDate: string;
  duration: string;
  status: "Returned" | "On Time" | "Late" | "Lost";
}

export interface MemberActivity {
  id: string;
  date: string;
  action: string;
  detail: string;
}

export interface Member {
  id: string;
  memberCode: string;
  name: string;
  email: string;
  phone: string;
  membershipType: MembershipType;
  avatarBg: string;
  avatarInitials: string;
  booksBorrowedCount: number;
  overdueCount: number;
  totalBorrowedCount: number;
  finesAmount: number;
  status: MemberStatus;
  joinedDate: string;
  address?: string;
  activeLoans: MemberLoan[];
  borrowingHistory: MemberHistory[];
  activityTimeline: MemberActivity[];
}

export const MEMBERS_KPI = {
  totalMembers: {
    count: "1,248",
    change: "+12 this month",
  },
  activeMembers: {
    count: "1,184",
    percent: "94.9% of members",
  },
  currentlyBorrowing: {
    count: "326",
    label: "Members with active loans",
  },
  overdueMembers: {
    count: "42",
    label: "Needs attention",
  },
};

export const INITIAL_MEMBERS_DATA: Member[] = [
  {
    id: "mem-1024",
    memberCode: "MEM-1024",
    name: "Aarav Sharma",
    email: "aarav@example.com",
    phone: "+91 98765 43210",
    membershipType: "Premium",
    avatarBg: "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
    avatarInitials: "AS",
    booksBorrowedCount: 3,
    overdueCount: 1,
    totalBorrowedCount: 24,
    finesAmount: 25,
    status: "Active",
    joinedDate: "Aug 12, 2025",
    address: "B-402, Green Valley Heights, MG Road, Bengaluru, KA - 560001",
    activeLoans: [
      {
        id: "loan-1",
        bookTitle: "Atomic Habits",
        author: "James Clear",
        coverGradient: "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
        coverInitial: "AH",
        borrowDate: "Aug 9, 2026",
        dueDate: "Aug 23, 2026",
        isOverdue: false,
      },
      {
        id: "loan-2",
        bookTitle: "Clean Code",
        author: "Robert C. Martin",
        coverGradient: "linear-gradient(135deg, #06b6d4 0%, #0e7490 100%)",
        coverInitial: "CC",
        borrowDate: "Jul 20, 2026",
        dueDate: "Aug 4, 2026",
        isOverdue: true,
        daysOverdue: 5,
      },
      {
        id: "loan-3",
        bookTitle: "The Psychology of Money",
        author: "Morgan Housel",
        coverGradient: "linear-gradient(135deg, #10b981 0%, #047857 100%)",
        coverInitial: "PM",
        borrowDate: "Aug 2, 2026",
        dueDate: "Aug 16, 2026",
        isOverdue: false,
      },
    ],
    borrowingHistory: [
      {
        id: "hist-1",
        bookTitle: "Atomic Habits",
        borrowedDate: "Aug 9, 2026",
        returnedDate: "In Progress",
        duration: "14 days",
        status: "On Time",
      },
      {
        id: "hist-2",
        bookTitle: "Clean Code",
        borrowedDate: "Jul 20, 2026",
        returnedDate: "Overdue",
        duration: "14 days",
        status: "Late",
      },
      {
        id: "hist-3",
        bookTitle: "Deep Work",
        borrowedDate: "Jun 10, 2026",
        returnedDate: "Jun 24, 2026",
        duration: "14 days",
        status: "Returned",
      },
    ],
    activityTimeline: [
      {
        id: "act-1",
        date: "Today",
        action: "Returned",
        detail: "Returned Atomic Habits",
      },
      {
        id: "act-2",
        date: "Aug 9",
        action: "Borrowed",
        detail: "Borrowed Atomic Habits",
      },
      {
        id: "act-3",
        date: "Aug 2",
        action: "Borrowed",
        detail: "Borrowed The Psychology of Money",
      },
      {
        id: "act-4",
        date: "Jul 28",
        action: "Updated",
        detail: "Account membership upgraded to Premium",
      },
    ],
  },
  {
    id: "mem-1088",
    memberCode: "MEM-1088",
    name: "Priya Patel",
    email: "priya.patel@example.com",
    phone: "+91 98123 45678",
    membershipType: "Student",
    avatarBg: "linear-gradient(135deg, #10b981 0%, #047857 100%)",
    avatarInitials: "PP",
    booksBorrowedCount: 1,
    overdueCount: 0,
    totalBorrowedCount: 12,
    finesAmount: 0,
    status: "Active",
    joinedDate: "Jan 15, 2026",
    address: "74 Park Street, Indiranagar, Bengaluru, KA - 560038",
    activeLoans: [
      {
        id: "loan-4",
        bookTitle: "Design Patterns",
        author: "Erich Gamma et al.",
        coverGradient: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
        coverInitial: "DP",
        borrowDate: "Aug 1, 2026",
        dueDate: "Aug 15, 2026",
        isOverdue: false,
      },
    ],
    borrowingHistory: [
      {
        id: "hist-4",
        bookTitle: "Design Patterns",
        borrowedDate: "Aug 1, 2026",
        returnedDate: "In Progress",
        duration: "14 days",
        status: "On Time",
      },
    ],
    activityTimeline: [
      {
        id: "act-5",
        date: "Aug 1",
        action: "Borrowed",
        detail: "Borrowed Design Patterns",
      },
    ],
  },
  {
    id: "mem-1012",
    memberCode: "MEM-1012",
    name: "Rahul Sharma",
    email: "rahul.s@example.com",
    phone: "+91 97654 32109",
    membershipType: "Standard",
    avatarBg: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
    avatarInitials: "RS",
    booksBorrowedCount: 2,
    overdueCount: 2,
    totalBorrowedCount: 18,
    finesAmount: 40,
    status: "Suspended",
    joinedDate: "Nov 20, 2025",
    address: "12 Church Street, Richmond Town, Bengaluru, KA - 560025",
    activeLoans: [
      {
        id: "loan-5",
        bookTitle: "The Pragmatic Programmer",
        author: "Andrew Hunt",
        coverGradient: "linear-gradient(135deg, #f59e0b 0%, #b45309 100%)",
        coverInitial: "PP",
        borrowDate: "Jul 10, 2026",
        dueDate: "Jul 24, 2026",
        isOverdue: true,
        daysOverdue: 16,
      },
    ],
    borrowingHistory: [],
    activityTimeline: [
      {
        id: "act-6",
        date: "Jul 25",
        action: "Suspended",
        detail: "Account suspended due to overdue loans",
      },
    ],
  },
  {
    id: "mem-1045",
    memberCode: "MEM-1045",
    name: "Alex Morgan",
    email: "alex.m@example.com",
    phone: "+91 91234 56789",
    membershipType: "Premium",
    avatarBg: "linear-gradient(135deg, #f97316 0%, #c2410c 100%)",
    avatarInitials: "AM",
    booksBorrowedCount: 0,
    overdueCount: 0,
    totalBorrowedCount: 30,
    finesAmount: 0,
    status: "Active",
    joinedDate: "Mar 04, 2025",
    address: "55 Palm Grove, Koramangala, Bengaluru, KA - 560034",
    activeLoans: [],
    borrowingHistory: [],
    activityTimeline: [],
  },
  {
    id: "mem-1056",
    memberCode: "MEM-1056",
    name: "Ananya Roy",
    email: "ananya.roy@example.com",
    phone: "+91 98760 12345",
    membershipType: "Student",
    avatarBg: "linear-gradient(135deg, #ec4899 0%, #be185d 100%)",
    avatarInitials: "AR",
    booksBorrowedCount: 1,
    overdueCount: 0,
    totalBorrowedCount: 8,
    finesAmount: 0,
    status: "Active",
    joinedDate: "Feb 18, 2026",
    address: "88 Residency Road, Ashok Nagar, Bengaluru, KA - 560025",
    activeLoans: [],
    borrowingHistory: [],
    activityTimeline: [],
  },
  {
    id: "mem-1067",
    memberCode: "MEM-1067",
    name: "Vikram Singh",
    email: "vikram.singh@example.com",
    phone: "+91 94567 89012",
    membershipType: "Standard",
    avatarBg: "linear-gradient(135deg, #64748b 0%, #334155 100%)",
    avatarInitials: "VS",
    booksBorrowedCount: 0,
    overdueCount: 0,
    totalBorrowedCount: 5,
    finesAmount: 0,
    status: "Inactive",
    joinedDate: "Oct 10, 2024",
    address: "10 Outer Ring Road, HSR Layout, Bengaluru, KA - 560102",
    activeLoans: [],
    borrowingHistory: [],
    activityTimeline: [],
  },
];
