/**
 * User Roles Supported in BookSphere
 */
export type UserRole = "ADMIN" | "LIBRARIAN" | "STUDENT" | "USER";

/**
 * User Entity Interface
 */
export interface User {
  id: number | string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

/**
 * Login Request Payload
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Register Request Payload
 */
export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role?: UserRole;
}

/**
 * Authentication API Response
 */
export interface LoginResponse {
  token: string;
  refreshToken?: string;
  user: User;
}

export type AuthResponse = LoginResponse;
