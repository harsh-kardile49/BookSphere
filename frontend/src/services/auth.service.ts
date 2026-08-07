import api from "./api";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
  UserRole,
} from "../types/auth";
import { saveToken, saveRefreshToken, saveUser, clearStorage } from "../utils/storage";

// Mock users for offline demo/testing when backend is not active
const MOCK_USERS: Record<string, { user: User; passwordHash: string }> = {
  "admin@booksphere.com": {
    user: {
      id: "u-admin-1",
      firstName: "Super",
      lastName: "Admin",
      email: "admin@booksphere.com",
      role: "ADMIN",
    },
    passwordHash: "password123",
  },
  "librarian@booksphere.com": {
    user: {
      id: "u-lib-1",
      firstName: "Sarah",
      lastName: "Jenkins",
      email: "librarian@booksphere.com",
      role: "LIBRARIAN",
    },
    passwordHash: "password123",
  },
  "student@booksphere.com": {
    user: {
      id: "u-stu-1",
      firstName: "Alex",
      lastName: "Morgan",
      email: "student@booksphere.com",
      role: "STUDENT",
    },
    passwordHash: "password123",
  },
};

export const AuthService = {
  /**
   * Login user with email and password
   */
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse>("/auth/login", credentials);
      const data = response.data;
      if (data.token) {
        saveToken(data.token);
        if (data.refreshToken) saveRefreshToken(data.refreshToken);
        saveUser(data.user);
      }
      return data;
    } catch (error) {
      // Fallback mock authentication logic for frontend demo testing
      console.warn("Backend API unavailable or error occurred. Running fallback mock login check...");
      const mockRecord = MOCK_USERS[credentials.email.toLowerCase()];

      if (mockRecord && credentials.password === mockRecord.passwordHash) {
        const mockResponse: LoginResponse = {
          token: `mock_jwt_token_${mockRecord.user.role.toLowerCase()}_${Date.now()}`,
          refreshToken: `mock_refresh_token_${Date.now()}`,
          user: mockRecord.user,
        };

        saveToken(mockResponse.token);
        if (mockResponse.refreshToken) saveRefreshToken(mockResponse.refreshToken);
        saveUser(mockResponse.user);

        return mockResponse;
      }

      // If credentials don't match mock record or user wants to attempt dynamic login
      if (!mockRecord && credentials.password.length >= 6) {
        const dynamicUser: User = {
          id: `u-dyn-${Date.now()}`,
          firstName: credentials.email.split("@")[0],
          lastName: "User",
          email: credentials.email,
          role: "STUDENT",
        };
        const mockResponse: LoginResponse = {
          token: `mock_jwt_token_student_${Date.now()}`,
          refreshToken: `mock_refresh_token_${Date.now()}`,
          user: dynamicUser,
        };
        saveToken(mockResponse.token);
        if (mockResponse.refreshToken) saveRefreshToken(mockResponse.refreshToken);
        saveUser(mockResponse.user);
        return mockResponse;
      }

      throw error;
    }
  },

  /**
   * Register a new user
   */
  register: async (data: RegisterRequest): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse>("/auth/register", data);
      const resData = response.data;
      if (resData.token) {
        saveToken(resData.token);
        if (resData.refreshToken) saveRefreshToken(resData.refreshToken);
        saveUser(resData.user);
      }
      return resData;
    } catch (error) {
      console.warn("Backend API unavailable. Running fallback mock registration...");
      const newUser: User = {
        id: `u-reg-${Date.now()}`,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        role: (data.role as UserRole) || "STUDENT",
      };

      const mockResponse: LoginResponse = {
        token: `mock_jwt_token_reg_${Date.now()}`,
        refreshToken: `mock_refresh_token_reg_${Date.now()}`,
        user: newUser,
      };

      saveToken(mockResponse.token);
      if (mockResponse.refreshToken) saveRefreshToken(mockResponse.refreshToken);
      saveUser(mockResponse.user);

      return mockResponse;
    }
  },

  /**
   * Logout user and clear stored tokens
   */
  logout: async (): Promise<void> => {
    try {
      await api.post("/auth/logout");
    } catch {
      // Ignore network errors during logout
    } finally {
      clearStorage();
    }
  },

  /**
   * Refresh JWT access token
   */
  refreshToken: async (): Promise<string | null> => {
    try {
      const response = await api.post<{ token: string }>("/auth/refresh-token");
      const newToken = response.data.token;
      saveToken(newToken);
      return newToken;
    } catch {
      return null;
    }
  },
};
