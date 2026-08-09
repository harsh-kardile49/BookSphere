/**
 * Backend API Book Request Payload (Do not send 'id' field when creating)
 */
export interface BookPayload {
  title: string;
  author: string;
  publisher: string;
  isbn: string;
  category: string;
  price: number;
  quantity: number;
  publishedYear: number;
}

/**
 * Backend API Book Response Model
 */
export interface BackendBook extends BookPayload {
  id: number;
}

/**
 * Pagination Response Wrapper
 */
export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

/**
 * Author Model (for frontend legacy compatibility)
 */
export interface Author {
  id: number;
  firstName: string;
  lastName: string;
}

/**
 * Legacy Book Model (for frontend mock components)
 */
export interface Book {
  id: number;
  title: string;
  isbn: string;
  category: string;
  publishedYear: number;
  availableCopies: number;
  totalCopies: number;
  author: Author;
}
