import { z } from "zod";

/**
 * Login Form Validation Schema using Zod
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email address is required.")
    .email("Please enter a valid email address (e.g. user@booksphere.com)."),
  password: z
    .string()
    .min(1, "Password is required.")
    .min(6, "Password must be at least 6 characters long."),
});

export type LoginFormData = z.infer<typeof loginSchema>;
