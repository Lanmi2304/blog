import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email().min(1, { message: "Required field" }),
  password: z.string().min(1, { message: "Required field" }),
});

export type LoginInputSchema = z.infer<typeof loginSchema>;
