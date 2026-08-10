import api from "./api";

export interface BorrowRequestPayload {
  userId: number;
  bookId: number;
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

/**
 * 1. Issue / Borrow Book
 * Endpoint: POST /borrow
 */
export const issueBook = async (
  payload: BorrowRequestPayload
): Promise<BorrowResponseDTO> => {
  const response = await api.post<BorrowResponseDTO>("/borrow", payload);
  return response.data;
};

/**
 * 2. Get All Borrow Transactions
 * Endpoint: GET /borrow
 */
export const getAllBorrows = async (): Promise<BorrowResponseDTO[]> => {
  const response = await api.get<BorrowResponseDTO[]>("/borrow");
  return response.data;
};

/**
 * 3. Get Active Borrow Transactions
 * Endpoint: GET /borrow/active
 */
export const getActiveBorrows = async (): Promise<BorrowResponseDTO[]> => {
  const response = await api.get<BorrowResponseDTO[]>("/borrow/active");
  return response.data;
};

/**
 * 4. Return Book
 * Endpoint: PUT /borrow/{id}/return
 */
export const returnBook = async (
  borrowId: number | string
): Promise<BorrowResponseDTO> => {
  const response = await api.put<BorrowResponseDTO>(`/borrow/${borrowId}/return`);
  return response.data;
};

export const borrowService = {
  issueBook,
  getAllBorrows,
  getActiveBorrows,
  returnBook,
};

export default borrowService;
