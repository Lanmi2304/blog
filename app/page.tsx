import { BrowseTopic } from "@/components/home/browse-topic.-combobox";
import { DisplayBlogs } from "@/components/home/display-blogs";
import { getBlogs } from "@/lib/_repositories/get-blogs.repository";

export default async function Home() {
  const blogs = await getBlogs();

  // console.log(blogs);

  return (
    <div className="mx-auto mt-10 w-full max-w-4xl px-4">
      {/* Heading  */}
      <div className="flex w-full flex-col items-start justify-between gap-6 border-b-2 pt-18 pb-10 md:flex-row md:items-center md:gap-0">
        <div className="flex flex-col">
          <h1 className="text-5xl font-semibold">From the blog</h1>
          <p className="text-foreground/70 mt-4">
            Learn how to grow your business with our expert advice.
          </p>
        </div>
        <BrowseTopic />
      </div>

      {/* End of heading */}

      {/* DB blogs */}
      <DisplayBlogs blogs={blogs} />
    </div>
  );
}
