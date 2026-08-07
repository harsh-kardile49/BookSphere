/**
 * Application Routes
 */

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "register",
  DASHBOARD: "/dashboard",
  BOOKS: "/books",
  MEMBERS: "/members",
  BORROW: "/borrow",
  RETURN: "/return",
} as const;

/**
 * API Endpoints
 */

export const API_ENDPOINTS = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",

  BOOKS: "/auth/books",
  MEMBERS: "/auth/members",

  BORROW: "/auth/borrow",
  RETURN: "/auth/return",
} as const;

/**
 * User Roles
 */

export const USER_ROLES = {
  ADMIN: "ADMIN",
  USER: "USER",
} as const;
