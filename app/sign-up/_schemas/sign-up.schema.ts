import { z } from "zod";

export const signUpSchema = z
  .object({
    firstName: z.string().min(1, {
      message: "Required *",
    }),
    lastName: z.string().min(1, {
      message: "Required *",
    }),
    email: z.string().email().min(1),
    password: z.string().min(1, {
      message: "Required *",
    }),
    confirmPassword: z.string().min(1, {
      message: "Required *",
    }),
    image: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignUpSchemaInput = z.infer<typeof signUpSchema>;
