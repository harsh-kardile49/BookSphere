import { create } from "zustand";
import type { User, UserRole, LoginRequest, RegisterRequest } from "../types/auth";
import { AuthService } from "../services/auth.service";
import { getToken, getRefreshToken, getUser, clearStorage } from "../utils/storage";
import axios from "axios";

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  initAuth: () => void;
  clearError: () => void;
}

/**
 * Extracts a human-readable error message from an API error response.
 * Handles Axios error responses with { message } body, validation error maps, and plain strings.
 */
function extractErrorMessage(err: unknown, fallback: string): string {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data;
    if (data) {
      // Backend ErrorResponse: { status, message, timestamp }
      if (typeof data === "object" && "message" in data && typeof data.message === "string") {
        return data.message;
      }
      // Validation errors: { fieldName: "error message", ... }
      if (typeof data === "object" && !Array.isArray(data)) {
        const messages = Object.values(data).filter((v) => typeof v === "string") as string[];
        if (messages.length > 0) return messages.join(". ");
      }
      // Plain string response
      if (typeof data === "string" && data.length > 0 && data.length < 300) {
        return data;
      }
    }
    // Fallback to Axios message
    if (err.message) return err.message;
  }
  if (err instanceof Error) return err.message;
  return fallback;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  refreshToken: null,
  role: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

  /**
   * Initialize state from localStorage on app boot
   */
  initAuth: () => {
    try {
      const storedToken = getToken();
      const storedRefreshToken = getRefreshToken();
      const storedUser = getUser();

      if (storedToken && storedUser) {
        set({
          user: storedUser,
          token: storedToken,
          refreshToken: storedRefreshToken,
          role: storedUser.role,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } else {
        set({
          user: null,
          token: null,
          refreshToken: null,
          role: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      }
    } catch {
      set({
        user: null,
        token: null,
        refreshToken: null,
        role: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  },

  /**
   * Action to perform Login
   */
  login: async (credentials: LoginRequest) => {
    set({ isLoading: true, error: null });
    try {
      const response = await AuthService.login(credentials);
      set({
        user: response.user,
        token: response.token,
        refreshToken: response.refreshToken || null,
        role: response.user.role,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (err: unknown) {
      const message = extractErrorMessage(
        err,
        "Login failed. Please check your credentials."
      );
      set({
        isLoading: false,
        error: message,
        isAuthenticated: false,
      });
      throw new Error(message, { cause: err });
    }
  },

  /**
   * Action to perform Register
   */
  register: async (data: RegisterRequest) => {
    set({ isLoading: true, error: null });
    try {
      const response = await AuthService.register(data);
      set({
        user: response.user,
        token: response.token,
        refreshToken: response.refreshToken || null,
        role: response.user.role,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (err: unknown) {
      const message = extractErrorMessage(
        err,
        "Registration failed. Please try again."
      );
      set({
        isLoading: false,
        error: message,
        isAuthenticated: false,
      });
      throw new Error(message, { cause: err });
    }
  },

  /**
   * Action to perform Logout
   */
  logout: async () => {
    set({ isLoading: true });
    try {
      await AuthService.logout();
    } finally {
      clearStorage();
      set({
        user: null,
        token: null,
        refreshToken: null,
        role: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  },

  /**
   * Explicitly update logged in user
   */
  setUser: (user: User | null) => {
    set({
      user,
      role: user ? user.role : null,
      isAuthenticated: !!user,
    });
  },

  /**
   * Clear user state
   */
  clearUser: () => {
    clearStorage();
    set({
      user: null,
      token: null,
      refreshToken: null,
      role: null,
      isAuthenticated: false,
      error: null,
    });
  },

  /**
   * Clear error message
   */
  clearError: () => set({ error: null }),
}));
