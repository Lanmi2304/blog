"use client";

import { SelectBlog } from "@/server/db/schema";
import { BlogCard } from "../blog-card";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export function DisplayBlogs({ blogs }: { blogs?: SelectBlog[] }) {
  const [showBlogs, setShowBlogs] = useState(blogs);
  const searchParams = useSearchParams();
  const filter = searchParams.get("topic");

  useEffect(() => {
    if (!filter) {
      setShowBlogs(blogs);
      return;
    }

    const filteredBlogs = blogs?.filter((el) => el.topic === filter);
    setShowBlogs(filteredBlogs);
  }, [filter, blogs]);
  return (
    <div className="mt-10 flex flex-col gap-30 pb-20 md:gap-20">
      {showBlogs?.map((blog, idx) => <BlogCard key={idx} blog={blog} />)}
    </div>
  );
}
