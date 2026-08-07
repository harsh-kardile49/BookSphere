/**
 * Author Model
 */
export interface Author {
  id: number;
  firstName: string;
  lastName: string;
}

/**
 * Book Model
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
