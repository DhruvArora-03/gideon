import { z } from "zod";

export const inviteFormSchema = z
  .object({
    email: z.string().email(),
  })
  .required();
export type InviteFormSchema = z.infer<typeof inviteFormSchema>;

export const loginFormSchema = z
  .object({
    email: z.string().email(),
    password: z.string(),
  })
  .required();
export type LoginFormSchema = z.infer<typeof loginFormSchema>;

// const registrationFormSchema = z
//   .object({
//     email: z.string().email(),
//     password: z
//       .string()
//       .min(8, "Password must be at least 8 characters long")
//       .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
//       .regex(/[a-z]/, "Password must contain at least one lowercase letter")
//       .regex(/[0-9]/, "Password must contain at least one number")
//       .regex(
//         /[!@#$%^&*(),.?":{}|<>]/,
//         "Password must contain at least one special character"
//       ),
//   })
//   .required();
