import api from "./api";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  JwtResponseDTO,
  User,
} from "../types/auth";
import { saveToken, saveUser, clearStorage } from "../utils/storage";

/**
 * Transforms the backend JwtResponse DTO into the frontend LoginResponse format.
 */
function mapJwtResponseToLoginResponse(dto: JwtResponseDTO): LoginResponse {
  const user: User = {
    id: dto.userId,
    firstName: dto.firstName,
    lastName: dto.lastName,
    email: dto.email,
    role: dto.role.toUpperCase() as User["role"],
  };

  return {
    token: dto.token,
    user,
  };
}

export const AuthService = {
  /**
   * Login user with email and password
   * Backend: POST /auth/login → JwtResponse { token, userId, firstName, lastName, email, role }
   */
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<JwtResponseDTO>("/auth/login", credentials);
    const loginResponse = mapJwtResponseToLoginResponse(response.data);

    // Persist token & user to localStorage
    saveToken(loginResponse.token);
    saveUser(loginResponse.user);

    return loginResponse;
  },

  /**
   * Register a new user (auto-login after registration)
   * Backend: POST /auth/register → JwtResponse { token, userId, firstName, lastName, email, role }
   */
  register: async (data: RegisterRequest): Promise<LoginResponse> => {
    // Send fields the backend expects
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      role: data.role,
      phone: data.phone || undefined,
    };

    const response = await api.post<JwtResponseDTO>("/auth/register", payload);
    const loginResponse = mapJwtResponseToLoginResponse(response.data);

    // Persist token & user to localStorage
    saveToken(loginResponse.token);
    saveUser(loginResponse.user);

    return loginResponse;
  },

  /**
   * Logout user and clear stored tokens
   */
  logout: async (): Promise<void> => {
    try {
      await api.post("/auth/logout");
    } catch {
      // Ignore network errors during logout — backend may not have a logout endpoint
    } finally {
      clearStorage();
    }
  },

  /**
   * Refresh JWT access token (if backend supports it in the future)
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
