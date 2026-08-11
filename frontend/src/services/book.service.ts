import api from "./api";
import type { BookPayload, BackendBook } from "../types/book";

/**
 * BookSphere Backend API Services (Standard REST CRUD)
 * Endpoints matched to BookController.java
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

export const bookService = {
  addBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};

export default bookService;
