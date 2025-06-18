import { z } from "zod";

export const addBlogSchema = z.object({
  title: z.string().min(1, { message: "Required field" }),
  topic: z.string().min(1, { message: "Required field" }),
});

export type AddBlogInputSchema = z.infer<typeof addBlogSchema>;
