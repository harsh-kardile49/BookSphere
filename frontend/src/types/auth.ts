/**
 * User Model
 */
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: "ADMIN" | "USER";
}

/**
 * Login Request
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Login Response
 */
export interface LoginResponse {
  token: string;
  user: User;
}

/**
 * Register Request
 */
export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
