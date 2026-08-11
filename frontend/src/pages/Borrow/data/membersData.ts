export interface Member {
  id: string;
  name: string;
  memberCode: string;
  avatarInitials: string;
  avatarBg: string;
  email: string;
  phone: string;
  currentBorrowedCount: number;
  borrowingLimit: number;
  accountStatus: "Active" | "Suspended" | "Pending";
  eligible: boolean;
  ineligibilityReason?: string;
}

export const MEMBERS_DATA: Member[] = [
  {
    id: "mem-1024",
    name: "Aarav Sharma",
    memberCode: "MEM-1024",
    avatarInitials: "AS",
    avatarBg: "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
    email: "aarav.sharma@example.com",
    phone: "+91 98765 43210",
    currentBorrowedCount: 2,
    borrowingLimit: 4,
    accountStatus: "Active",
    eligible: true,
  },
  {
    id: "mem-1088",
    name: "Priya Patel",
    memberCode: "MEM-1088",
    avatarInitials: "PP",
    avatarBg: "linear-gradient(135deg, #10b981 0%, #047857 100%)",
    email: "priya.patel@example.com",
    phone: "+91 98123 45678",
    currentBorrowedCount: 1,
    borrowingLimit: 4,
    accountStatus: "Active",
    eligible: true,
  },
  {
    id: "mem-1102",
    name: "Rohan Verma",
    memberCode: "MEM-1102",
    avatarInitials: "RV",
    avatarBg: "linear-gradient(135deg, #f59e0b 0%, #b45309 100%)",
    email: "rohan.verma@example.com",
    phone: "+91 97654 32109",
    currentBorrowedCount: 4,
    borrowingLimit: 4,
    accountStatus: "Active",
    eligible: false,
    ineligibilityReason: "Maximum borrowing limit reached (4/4 books)",
  },
  {
    id: "mem-1145",
    name: "Ananya Gupta",
    memberCode: "MEM-1145",
    avatarInitials: "AG",
    avatarBg: "linear-gradient(135deg, #ec4899 0%, #be185d 100%)",
    email: "ananya.gupta@example.com",
    phone: "+91 96543 21098",
    currentBorrowedCount: 0,
    borrowingLimit: 4,
    accountStatus: "Active",
    eligible: true,
  },
  {
    id: "mem-1201",
    name: "Vikram Singh",
    memberCode: "MEM-1201",
    avatarInitials: "VS",
    avatarBg: "linear-gradient(135deg, #06b6d4 0%, #0e7490 100%)",
    email: "vikram.singh@example.com",
    phone: "+91 95432 10987",
    currentBorrowedCount: 3,
    borrowingLimit: 4,
    accountStatus: "Active",
    eligible: true,
  },
];
