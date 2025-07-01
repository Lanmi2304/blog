import { db } from "@/server/db";
import { InsertBlog, blogs } from "@/server/db/schema";

export async function addBlog(blog: InsertBlog) {
  console.log(
    "🟢 Sanity check:",
    JSON.stringify(blog, (_key, value) =>
      typeof value === "function" ? "[Function]" : value,
    ),
    null,
    2,
  );
  await db.insert(blogs).values(blog);
}
