"use server";

import { actionClient } from "@/lib/safe-action";
import { z } from "zod";
import { addBlog } from "../_repositories/add-blog.repository";

const inputSchema = z.object({
  title: z.string().min(1),
  topic: z.string().min(1),
  authorImage: z.string().optional(),
  content: z.object({
    type: z.string(),
    content: z.array(
      z.object({
        type: z.string(),
        content: z.array(z.unknown()).optional(),
        attrs: z.any().optional(),
      }),
    ),
  }),
});

export type AddBlogInput = z.infer<typeof inputSchema>;

export const addBlogAction = actionClient
  .metadata({ actionName: "addBlogAction" })
  .inputSchema(inputSchema)
  .action(async ({ parsedInput: { title, topic, content }, ctx: { user } }) => {
    console.log("USER: ", user);

    const cleanContent = JSON.parse(JSON.stringify(content));
    console.log("Logging from action: ", cleanContent);

    await addBlog({
      title,
      topic,
      content: cleanContent,
      author: user?.name || "",
      authorImage: user?.image || "",
    });
  });
