import Image from "next/image";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { BlogType } from "@/dummy-data/blogs";
import BlogPlaceholder from "@/public/images/blog-placeholder.webp";

interface BlogCardProps {
  blog: BlogType;
}

interface DescriptionType {
  text: string;
  type: "text";
}

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export function BlogCard({ blog }: BlogCardProps) {
  console.log(blog); // TESTING

  // Image
  const imageObject = blog.content?.content.find(
    (el) => el.type === "image",
  ) as {
    type: string;
    attrs?: { src?: string };
  };
  const displayImage = imageObject?.attrs?.src;

  // Description
  const descriptionObject = blog.content?.content.find(
    (el) => el.type === "paragraph",
  );
  const displayDescription = (
    descriptionObject?.content as DescriptionType[] | undefined
  )?.find((el) => "text" in el)?.text;

  // Date
  const blogDate = new Date(String(blog.createdAt));
  const formattedDate = !isNaN(blogDate.getTime())
    ? new Intl.DateTimeFormat("en-US", options).format(blogDate)
    : "Invalid Date";

  return (
    <div className="flex w-full flex-col gap-10 md:flex-row">
      <div className="relative h-80 w-full rounded-xl bg-cover md:h-auto md:w-1/3">
        <Image
          src={blog.postImage || displayImage || BlogPlaceholder}
          alt="Blog image"
          fill
          className="absolute inset-0 rounded-xl bg-cover"
        />
      </div>

      <div className="flex w-full flex-col gap-6 md:w-2/3">
        {/* First component */}
        <div className="flex items-center gap-4">
          <span className="text-foreground/50 text-sm font-semibold">
            {blog.date || formattedDate}
          </span>
          <Badge variant="outline" className="bg-muted">
            {blog.tag || blog.topic}
          </Badge>
        </div>
        {/* End of first  component */}

        <Link href="/" className="group flex flex-col gap-4">
          <h3 className="peer group-hover:text-muted-foreground text-lg font-bold">
            {blog.title}
          </h3>
          <p className="text-foreground/60 text-sm font-medium">
            {blog.description || displayDescription}
          </p>
        </Link>

        <div className="bg-foreground/10 h-[1px] w-full"></div>

        <div className="flex gap-3">
          <Avatar className="size-12">
            <AvatarImage src={blog.authorImage} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="flex flex-col items-start justify-center">
            <p className="font-semibold">{blog.author}</p>
            {blog.role ? (
              <p className="text-foreground/60">{blog.role}</p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
