import { z } from 'zod';

export const inviteFormSchema = z
  .object({
    email: z.string().email(),
    first_name: z.string().min(2, 'Too short'),
    last_name: z.string().min(2, 'Too short'),
    phone_number: z
      .string()
      .regex(/^\d{3}-\d{3}-\d{4}$/, 'Phone number must be in the format 123-456-7890'),
  })
  .required();
export type InviteFormSchema = z.infer<typeof inviteFormSchema>;

export const loginFormSchema = z
  .object({
    email: z.string().email(),
    password: z.string().nonempty('Please enter your password'),
    'cf-turnstile-response': z.string().nonempty('Please complete turnstile'),
  })
  .required();
export type LoginFormSchema = z.infer<typeof loginFormSchema>;

// export const resetPasswordFormSchema = z
//   .object({
//     new_password: z
//       .string()
//       .min(8, 'Password must be at least 8 characters long')
//       .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
//       .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
//       .regex(/[0-9]/, 'Password must contain at least one number')
//       .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
//     confirm_new_password: z.string(),
//   })
//   .required()
//   .refine((data) => data.new_password === data.confirm_new_password, {
//     message: 'Passwords must match',
//     path: ['confirm_new_password'], // This specifies where the error will appear
//   });
// export type ResetPasswordFormSchema = z.infer<typeof resetPasswordFormSchema>;
