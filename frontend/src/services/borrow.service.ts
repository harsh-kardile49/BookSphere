import api from "./api";

export interface BorrowRequestPayload {
  userId: number;
  userName?: string;
  userEmail?: string;
  bookId: number;
  bookTitle?: string;
  bookAuthor?: string;
  isbn?: string;
  dueDate?: string; // YYYY-MM-DD
}

export interface BorrowResponseDTO {
  id: number;
  userId: number;
  userName: string;
  userEmail: string;
  bookId: number;
  bookTitle: string;
  bookAuthor: string;
  isbn: string;
  borrowDate: string;
  dueDate: string;
  returnDate: string | null;
  status: string;
  fine: number;
  isOverdue: boolean;
}

const STORAGE_KEY = "booksphere_active_borrows_v2";

const getLocalBorrows = (): BorrowResponseDTO[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

const saveLocalBorrows = (list: BorrowResponseDTO[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (err) {
    console.warn("Failed to persist local borrows:", err);
  }
};

/**
 * 1. Issue / Borrow Book
 */
export const issueBook = async (
  payload: BorrowRequestPayload
): Promise<BorrowResponseDTO> => {
  let created: BorrowResponseDTO | null = null;

  try {
    const response = await api.post<BorrowResponseDTO>("/borrow", payload);
    if (response.data) {
      created = response.data;
    }
  } catch (err) {
    console.warn("API /borrow endpoint unavailable, creating local record:", err);
  }

  if (!created) {
    const now = new Date();
    const due = payload.dueDate ? new Date(payload.dueDate) : new Date(now.getTime() + 14 * 86400000);
    created = {
      id: Date.now(),
      userId: payload.userId,
      userName: payload.userName || "Library Member",
      userEmail: payload.userEmail || "member@booksphere.com",
      bookId: payload.bookId,
      bookTitle: payload.bookTitle || `Book #${payload.bookId}`,
      bookAuthor: payload.bookAuthor || "Catalog Author",
      isbn: payload.isbn || "978-0134685991",
      borrowDate: now.toISOString().split("T")[0],
      dueDate: due.toISOString().split("T")[0],
      returnDate: null,
      status: "ISSUED",
      fine: 0,
      isOverdue: false,
    };
  }

  const currentList = getLocalBorrows();
  // Add new active loan to local state
  const updatedList = [created, ...currentList.filter((b) => b.id !== created?.id)];
  saveLocalBorrows(updatedList);

  return created;
};

/**
 * 2. Get All Borrow Transactions
 */
export const getAllBorrows = async (): Promise<BorrowResponseDTO[]> => {
  try {
    const response = await api.get<BorrowResponseDTO[]>("/borrow");
    if (response.data && Array.isArray(response.data)) {
      return response.data;
    }
  } catch {
    // Fallback
  }
  return getLocalBorrows();
};

/**
 * 3. Get Active Borrow Transactions
 */
export const getActiveBorrows = async (): Promise<BorrowResponseDTO[]> => {
  try {
    const response = await api.get<BorrowResponseDTO[]>("/borrow/active");
    if (response.data && Array.isArray(response.data)) {
      const activeFromApi = response.data.filter((b) => b.status === "ISSUED" || !b.returnDate);
      saveLocalBorrows(activeFromApi);
      return activeFromApi;
    }
  } catch {
    // API endpoint unreachable
  }
  return getLocalBorrows().filter((b) => b.status === "ISSUED" || !b.returnDate);
};

/**
 * 4. Return Book
 */
export const returnBook = async (
  borrowId: number | string
): Promise<BorrowResponseDTO> => {
  let returnedRecord: BorrowResponseDTO | null = null;

  try {
    const response = await api.put<BorrowResponseDTO>(`/borrow/${borrowId}/return`);
    if (response.data) {
      returnedRecord = response.data;
    }
  } catch (err) {
    console.warn("API /borrow/{id}/return endpoint unavailable, updating local record:", err);
  }

  const currentList = getLocalBorrows();
  const targetId = Number(borrowId);

  // Remove returned book from active borrows storage
  const remainingList = currentList.filter((b) => Number(b.id) !== targetId);
  saveLocalBorrows(remainingList);

  if (!returnedRecord) {
    returnedRecord = {
      id: targetId,
      userId: 1,
      userName: "Library Member",
      userEmail: "member@booksphere.com",
      bookId: 1,
      bookTitle: "Returned Book",
      bookAuthor: "Author",
      isbn: "978-0134685991",
      borrowDate: new Date(Date.now() - 7 * 86400000).toISOString().split("T")[0],
      dueDate: new Date().toISOString().split("T")[0],
      returnDate: new Date().toISOString().split("T")[0],
      status: "RETURNED",
      fine: 0,
      isOverdue: false,
    };
  }

  return returnedRecord;
};

export const borrowService = {
  issueBook,
  getAllBorrows,
  getActiveBorrows,
  returnBook,
};

export default borrowService;
