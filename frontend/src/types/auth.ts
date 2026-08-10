/**
 * User Roles Supported in BookSphere
 */
export type UserRole = "ADMIN" | "LIBRARIAN" | "STUDENT" | "USER";

/**
 * User Entity Interface (frontend-side representation)
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
 * Matches backend: POST /auth/login → LoginRequest.java
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Register Request Payload
 * Matches backend: POST /auth/register → RegisterRequest.java
 * Note: confirmPassword is frontend-only (Zod validation), not sent to backend
 */
export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role?: UserRole;
  phone?: string;
}

/**
 * Backend JWT Response
 * Matches backend: JwtResponse.java
 * Returned by both POST /auth/login and POST /auth/register
 */
export interface JwtResponseDTO {
  token: string;
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

/**
 * Frontend Authentication Response (normalized from JwtResponseDTO)
 * Used by authStore and auth.service
 */
export interface LoginResponse {
  token: string;
  refreshToken?: string;
  user: User;
}

export type AuthResponse = LoginResponse;
