import { db } from "@/server/db";
import { blogs } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function getBlog(id: number) {
  try {
    const blog = await db.select().from(blogs).where(eq(blogs.id, id));
    return blog[0];
  } catch (error) {
    console.log(error);
  }
}
