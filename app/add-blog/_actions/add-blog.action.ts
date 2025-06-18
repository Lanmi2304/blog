"use server";

import { actionClient } from "@/lib/safe-action";
import { z } from "zod";
import { addBlog } from "../_repositories/add-blog.repository";

const inputSchema = z.object({
  title: z.string().min(1),
  topic: z.string().min(1),
  content: z.object({
    type: z.string(),
    content: z.array(
      z.object({
        type: z.string(),
        content: z.array(z.unknown()).optional(),
      }),
    ),
  }),
});

export const addBlogAction = actionClient
  .metadata({ actionName: "addBlogAction" })
  .inputSchema(inputSchema)
  .action(async ({ parsedInput: { title, topic, content } }) => {
    const blog = { title, topic, content };

    await addBlog(blog);
  });
