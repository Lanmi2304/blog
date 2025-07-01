import { db } from "@/server/db";
import { InsertBlog, blogs } from "@/server/db/schema";

export async function addBlog(blog: InsertBlog) {
  console.log("Repository logger: ", blog);
  await db.insert(blogs).values(blog);
}
