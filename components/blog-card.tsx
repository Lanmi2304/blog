import Image from "next/image";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { BlogType } from "@/dummy-data/blogs";

interface BlogCardProps {
  blog: BlogType;
}
export function BlogCard({ blog }: BlogCardProps) {
  return (
    <div className="flex w-full flex-col gap-10 md:flex-row">
      <div className="relative h-80 w-full rounded-xl md:h-auto md:w-1/3">
        <Image
          src={blog.postImage}
          alt="Blog image"
          fill
          className="absolute inset-0 rounded-xl bg-contain"
        />
      </div>

      <div className="flex w-full flex-col gap-6 md:w-2/3">
        {/* First component */}
        <div className="flex items-center gap-4">
          <span className="text-foreground/50 text-sm font-semibold">
            {blog.date}
          </span>
          <Badge variant="outline" className="bg-muted">
            {blog.tag}
          </Badge>
        </div>
        {/* End of first  component */}

        <Link href="/" className="group flex flex-col gap-4">
          <h3 className="peer group-hover:text-muted-foreground text-lg font-bold">
            {blog.title}
          </h3>
          <p className="text-foreground/60 text-sm font-medium">
            {blog.description}
          </p>
        </Link>

        <div className="bg-foreground/10 h-[1px] w-full"></div>

        <div className="flex gap-3">
          <Avatar className="size-12">
            <AvatarImage src={blog.authorImage} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="grid">
            <p className="font-semibold">{blog.author}</p>
            <p className="text-foreground/60">{blog.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
