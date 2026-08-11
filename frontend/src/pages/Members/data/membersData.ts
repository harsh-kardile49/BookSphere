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

export const INITIAL_MEMBERS_DATA: Member[] = [
  {
    id: "1",
    memberCode: "MEM-1001",
    name: "System Admin",
    email: "admin@booksphere.com",
    phone: "+91 98765 43210",
    membershipType: "Premium",
    avatarBg: "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
    avatarInitials: "SA",
    booksBorrowedCount: 0,
    overdueCount: 0,
    totalBorrowedCount: 12,
    finesAmount: 0,
    status: "Active",
    joinedDate: "Aug 2026",
    address: "BookSphere Central Library",
    activeLoans: [],
    borrowingHistory: [],
    activityTimeline: [],
  },
  {
    id: "2",
    memberCode: "MEM-1002",
    name: "Student Member",
    email: "student@booksphere.com",
    phone: "+91 98123 45678",
    membershipType: "Student",
    avatarBg: "linear-gradient(135deg, #10b981 0%, #047857 100%)",
    avatarInitials: "SM",
    booksBorrowedCount: 0,
    overdueCount: 0,
    totalBorrowedCount: 4,
    finesAmount: 0,
    status: "Active",
    joinedDate: "Aug 2026",
    address: "University Campus",
    activeLoans: [],
    borrowingHistory: [],
    activityTimeline: [],
  },
];
