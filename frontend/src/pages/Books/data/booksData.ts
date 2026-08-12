export type AvailabilityStatus = "Available" | "Issued" | "Reserved" | "Maintenance";

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  rating: number;
  reviewCount: number;
  availability: AvailabilityStatus;
  coverColor: string;
  coverGradient: string;
  coverInitial: string;
  isbn: string;
  publishedYear: number;
  publisher: string;
  language: string;
  pages: number;
  description: string;
  issuesCount: number;
  price?: number;
  imageUrl?: string;
}

export interface CategoryStat {
  name: string;
  count: number;
  iconName: string;
}

/**
 * Empty array — All book data is dynamically fetched from backend REST API (GET /books)
 */
export const BOOKS_DATA: Book[] = [];

export const CATEGORIES_DATA: CategoryStat[] = [
  { name: "Programming", count: 0, iconName: "Code" },
  { name: "Fiction", count: 0, iconName: "BookOpen" },
  { name: "Self Development", count: 0, iconName: "Sparkles" },
  { name: "Science & Technology", count: 0, iconName: "Cpu" },
  { name: "History", count: 0, iconName: "Landmark" },
  { name: "Business", count: 0, iconName: "TrendingUp" },
  { name: "Health & Wellness", count: 0, iconName: "Heart" },
];

export const LIBRARY_STATS = {
  totalBooks: 0,
  availableBooks: 0,
  issuedBooks: 0,
  overdueBooks: 0,
};
