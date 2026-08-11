import { create } from "zustand";

export interface LibraryNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "overdue" | "borrow" | "return" | "system";
  unread: boolean;
  link?: string;
}

const INITIAL_NOTIFICATIONS: LibraryNotification[] = [
  {
    id: "notif-1",
    title: "Overdue Loan Warning",
    message: "Clean Code (LN-1002) is past due date. Daily fine accrued.",
    time: "10m ago",
    type: "overdue",
    unread: true,
    link: "/dashboard",
  },
  {
    id: "notif-2",
    title: "Book Return Processed",
    message: "Clean Code (LN-1001) successfully returned and restored to inventory.",
    time: "1h ago",
    type: "return",
    unread: true,
    link: "/return",
  },
  {
    id: "notif-3",
    title: "New Catalog Addition",
    message: "Refactoring: Improving Design of Existing Code added to catalog.",
    time: "5h ago",
    type: "system",
    unread: false,
    link: "/books",
  },
];

interface NotificationState {
  notifications: LibraryNotification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
  addNotification: (n: Omit<LibraryNotification, "id" | "unread">) => void;
}

const getInitialNotifications = (): LibraryNotification[] => {
  if (typeof window === "undefined") return INITIAL_NOTIFICATIONS;
  try {
    const saved = localStorage.getItem("booksphere_notifications");
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.warn("Failed to load notifications from localStorage", e);
  }
  return INITIAL_NOTIFICATIONS;
};

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: getInitialNotifications(),
  unreadCount: getInitialNotifications().filter((n) => n.unread).length,

  markAsRead: (id: string) =>
    set((state) => {
      const updated = state.notifications.map((n) =>
        n.id === id ? { ...n, unread: false } : n
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("booksphere_notifications", JSON.stringify(updated));
      }
      return {
        notifications: updated,
        unreadCount: updated.filter((n) => n.unread).length,
      };
    }),

  markAllAsRead: () =>
    set((state) => {
      const updated = state.notifications.map((n) => ({ ...n, unread: false }));
      if (typeof window !== "undefined") {
        localStorage.setItem("booksphere_notifications", JSON.stringify(updated));
      }
      return {
        notifications: updated,
        unreadCount: 0,
      };
    }),

  clearAll: () =>
    set(() => {
      if (typeof window !== "undefined") {
        localStorage.setItem("booksphere_notifications", JSON.stringify([]));
      }
      return {
        notifications: [],
        unreadCount: 0,
      };
    }),

  addNotification: (n) =>
    set((state) => {
      const newNotif: LibraryNotification = {
        ...n,
        id: `notif-${Date.now()}`,
        unread: true,
      };
      const updated = [newNotif, ...state.notifications];
      if (typeof window !== "undefined") {
        localStorage.setItem("booksphere_notifications", JSON.stringify(updated));
      }
      return {
        notifications: updated,
        unreadCount: updated.filter((item) => item.unread).length,
      };
    }),
}));
