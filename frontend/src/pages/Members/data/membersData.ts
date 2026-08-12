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
  role: string;
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

export const INITIAL_MEMBERS_DATA: Member[] = [];

