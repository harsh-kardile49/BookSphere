/**
 * Capitalize the first letter of a string.
 */
export const capitalize = (text: string): string => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
};

/**
 * Format a date into a readable string.
 */
export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

/**
 * Truncate long text with ellipsis.
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.substring(0, maxLength)}...`;
};

/**
 * Check if a value is null, undefined, or an empty string.
 */
export const isEmpty = (value: unknown): boolean => {
  return value === null || value === undefined || value === "";
};
