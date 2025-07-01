import { db } from "@/server/db";
import { blogs } from "@/server/db/schema";
import { desc } from "drizzle-orm";

export async function getBlogs() {
  try {
    const response = await db
      .select()
      .from(blogs)
      .orderBy(desc(blogs.createdAt));
    console.log("SERVER ", response);

    return response;
  } catch (error) {
    console.log(error);
  }
}
