import api from "./api";
import type { BookPayload, BackendBook, PageResponse } from "../types/book";

/**
 * BookSphere Backend API Services
 * Endpoints matched to docs/BACKEND_API_DOCUMENTATION.md
 * Base URL: http://localhost:8080 (configured in api.ts)
 */

/**
 * 1. Add Book
 * Endpoint: POST /books
 */
export const addBook = async (book: BookPayload): Promise<BackendBook> => {
  const response = await api.post<BackendBook>("/books", book);
  return response.data;
};

/**
 * 2. Get All Books
 * Endpoint: GET /books
 */
export const getAllBooks = async (): Promise<BackendBook[]> => {
  const response = await api.get<BackendBook[]>("/books");
  return response.data;
};

/**
 * 3. Get Book By ID
 * Endpoint: GET /books/{id}
 */
export const getBookById = async (id: number | string): Promise<BackendBook> => {
  const response = await api.get<BackendBook>(`/books/${id}`);
  return response.data;
};

/**
 * 4. Update Book
 * Endpoint: PUT /books/{id}
 */
export const updateBook = async (
  id: number | string,
  book: BookPayload
): Promise<BackendBook> => {
  const response = await api.put<BackendBook>(`/books/${id}`, book);
  return response.data;
};

/**
 * 5. Delete Book
 * Endpoint: DELETE /books/{id}
 */
export const deleteBook = async (id: number | string): Promise<void> => {
  await api.delete(`/books/${id}`);
};

/**
 * 6. Search Books By Title
 * Endpoint: GET /books/search/title?title={title}
 */
export const searchBooksByTitle = async (
  title: string
): Promise<BackendBook[]> => {
  const response = await api.get<BackendBook[]>("/books/search/title", {
    params: { title },
  });
  return response.data;
};

/**
 * 7. Search Books By Author
 * Endpoint: GET /books/search/author?author={author}
 */
export const searchBooksByAuthor = async (
  author: string
): Promise<BackendBook[]> => {
  const response = await api.get<BackendBook[]>("/books/search/author", {
    params: { author },
  });
  return response.data;
};

/**
 * 8. Filter Books By Category
 * Endpoint: GET /books/category?category={category}
 */
export const filterBooksByCategory = async (
  category: string
): Promise<BackendBook[]> => {
  const response = await api.get<BackendBook[]>("/books/category", {
    params: { category },
  });
  return response.data;
};

/**
 * 9. Pagination & Sorting
 * Endpoint: GET /books/page?page=0&size=5&sortBy=price
 */
export const getBooksPage = async (
  page = 0,
  size = 10,
  sortBy = "id"
): Promise<PageResponse<BackendBook>> => {
  const response = await api.get<PageResponse<BackendBook>>("/books/page", {
    params: { page, size, sortBy },
  });
  return response.data;
};

export const bookService = {
  addBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  searchBooksByTitle,
  searchBooksByAuthor,
  filterBooksByCategory,
  getBooksPage,
};

export default bookService;
