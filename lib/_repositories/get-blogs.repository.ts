import { db } from "@/server/db";
import { blogs } from "@/server/db/schema";

export async function getBlogs() {
  try {
    const response = await db.select().from(blogs);
    console.log("SERVER ", response);

    return response;
  } catch (error) {
    console.log(error);
  }
}
