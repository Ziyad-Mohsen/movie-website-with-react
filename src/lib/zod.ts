import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    pattern: z.regexes.rfc5322Email,
    message: "Invalid email address",
  }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(32, { message: "Password must be no more than 32 characters" }),
});

export const SignupSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(20, { message: "Username must be at most 20 characters" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores",
    }),
  email: z.string().email({
    pattern: z.regexes.rfc5322Email,
    message: "Invalid email address",
  }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(32, { message: "Password must be no more than 32 characters" }),
});

export type LoginFormType = z.infer<typeof LoginSchema>;
