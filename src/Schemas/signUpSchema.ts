import {z} from 'zod';
export const usernameValidation = z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be at most 20 characters long")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores")
    .trim();

export const signUpSchema = z.object({
    username : usernameValidation,
    email : z.string().email("Please provide a valid email address").trim(),
    password : z.string().min(6, "Password must be at least 6 characters long")
              .max(50, "Password must be at most 50 characters long").trim()
})