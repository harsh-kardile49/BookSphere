import { z } from "zod";

/**
 * Register Form Validation Schema using Zod
 */
export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "First name is required.")
      .min(2, "First name must be at least 2 characters long.")
      .max(50, "First name cannot exceed 50 characters."),
    lastName: z
      .string()
      .min(1, "Last name is required.")
      .min(2, "Last name must be at least 2 characters long.")
      .max(50, "Last name cannot exceed 50 characters."),
    email: z
      .string()
      .min(1, "Email address is required.")
      .email("Please enter a valid email address (e.g. name@domain.com)."),
    password: z
      .string()
      .min(1, "Password is required.")
      .min(6, "Password must be at least 6 characters long.")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number."
      ),
    confirmPassword: z
      .string()
      .min(1, "Please confirm your password."),
    role: z
      .enum(["ADMIN", "LIBRARIAN", "STUDENT", "USER"], {
        message: "Please select a valid role.",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;