import { BlogCard } from "@/components/blog-card";
import { blogs } from "@/dummy-data/blogs";

export default function Home() {
  return (
    <div className="mx-auto mt-20 h-screen w-full max-w-4xl px-4">
      {/* Heading  */}
      <div className="flex flex-col border-b-2 pb-16">
        <h1 className="mt-20 text-5xl font-semibold">From the blog</h1>
        <p className="text-foreground/70 mt-4">
          Learn how to grow your business with our expert advice.
        </p>
      </div>
      {/* End of heading */}

      {/* Blog list  */}
      <div className="mt-20 flex flex-col gap-30 md:gap-20">
        {blogs.map((blog, idx) => (
          <BlogCard key={idx} blog={blog} />
        ))}
      </div>
      {/* End of blog list  */}

      <div className="h-[2000px]"></div>
    </div>
  );
}
