import api from "./api";
import type { UserRole } from "../types/auth";

export interface BackendUserDTO {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: UserRole;
}

export interface UserCreatePayload {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  phone?: string;
  role?: UserRole;
}

/**
 * 1. Get All Users / Members
 * Endpoint: GET /users
 */
export const getAllUsers = async (): Promise<BackendUserDTO[]> => {
  const response = await api.get<BackendUserDTO[]>("/users");
  return response.data;
};

/**
 * 2. Get User By ID
 * Endpoint: GET /users/{id}
 */
export const getUserById = async (id: number | string): Promise<BackendUserDTO> => {
  const response = await api.get<BackendUserDTO>(`/users/${id}`);
  return response.data;
};

/**
 * 3. Create User / Member
 * Endpoint: POST /users
 */
export const createUser = async (user: UserCreatePayload): Promise<BackendUserDTO> => {
  const response = await api.post<BackendUserDTO>("/users", user);
  return response.data;
};

/**
 * 4. Update User / Member
 * Endpoint: PUT /users/{id}
 */
export const updateUser = async (
  id: number | string,
  user: Partial<UserCreatePayload>
): Promise<BackendUserDTO> => {
  const response = await api.put<BackendUserDTO>(`/users/${id}`, user);
  return response.data;
};

/**
 * 5. Delete User / Member
 * Endpoint: DELETE /users/{id}
 */
export const deleteUser = async (id: number | string): Promise<void> => {
  await api.delete(`/users/${id}`);
};

export const userService = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

export default userService;
