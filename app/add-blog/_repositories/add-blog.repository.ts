import { db } from "@/server/db";
import { InsertBlog, blogs } from "@/server/db/schema";

export async function addBlog(blog: InsertBlog) {
  console.log("📥 Inserting blog:", JSON.stringify(blog.content, null, 2));
  await db.insert(blogs).values(blog);
}
