import type { User } from "../types/auth";

// Fallback Keys in case env is undefined
const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY || "booksphere_token";
const REFRESH_TOKEN_KEY =
  import.meta.env.VITE_REFRESH_TOKEN_KEY || "booksphere_refresh_token";
const USER_KEY = import.meta.env.VITE_USER_KEY || "booksphere_user";

/**
 * Save access token to localStorage
 */
export const saveToken = (token: string): void => {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error("Error saving access token to localStorage", error);
  }
};

/**
 * Retrieve access token from localStorage
 */
export const getToken = (): string | null => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error("Error retrieving access token from localStorage", error);
    return null;
  }
};

/**
 * Remove access token from localStorage
 */
export const removeToken = (): void => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error("Error removing access token from localStorage", error);
  }
};

/**
 * Save refresh token to localStorage
 */
export const saveRefreshToken = (refreshToken: string): void => {
  try {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  } catch (error) {
    console.error("Error saving refresh token to localStorage", error);
  }
};

/**
 * Retrieve refresh token from localStorage
 */
export const getRefreshToken = (): string | null => {
  try {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  } catch (error) {
    console.error("Error retrieving refresh token from localStorage", error);
    return null;
  }
};

/**
 * Save authenticated user details to localStorage
 */
export const saveUser = (user: User): void => {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error("Error saving user details to localStorage", error);
  }
};

/**
 * Retrieve user details from localStorage
 */
export const getUser = (): User | null => {
  try {
    const userStr = localStorage.getItem(USER_KEY);
    return userStr ? (JSON.parse(userStr) as User) : null;
  } catch (error) {
    console.error("Error parsing user details from localStorage", error);
    return null;
  }
};

/**
 * Remove user details from localStorage
 */
export const removeUser = (): void => {
  try {
    localStorage.removeItem(USER_KEY);
  } catch (error) {
    console.error("Error removing user details from localStorage", error);
  }
};

/**
 * Clear all authentication data from localStorage
 */
export const clearStorage = (): void => {
  removeToken();
  try {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  } catch (error) {
    console.error("Error removing refresh token from localStorage", error);
  }
  removeUser();
};
