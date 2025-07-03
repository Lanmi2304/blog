import { getBlog } from "@/lib/utils/get-post";
import { Content } from "./_components/client-content";
import Image from "next/image";
import ImagePlaceHolder from "@/public/images/blog-placeholder.webp";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlog(Number(slug));

  // Blog image is exist
  const imageObject = blog?.content?.content.find(
    (el) => el.type === "image",
  ) as {
    type: string;
    attrs?: { src?: string };
  };
  const displayImage = imageObject?.attrs?.src;

  const blogContentWithoutImage = blog?.content?.content.filter(
    (el) => el && el.type !== "image",
  );

  console.log(blogContentWithoutImage);
  const blogToPass = { ...blog?.content, content: blogContentWithoutImage };

  console.log(123, blog);
  return (
    <div className="mx-auto my-30 w-full max-w-4xl px-4">
      <h1 className="text-5xl font-semibold">{blog?.title}</h1>
      <div className="relative mt-10 h-96 w-full overflow-hidden rounded-xl">
        {displayImage && displayImage.trim() !== "" ? (
          <Image src={displayImage} alt="Blog post image" fill />
        ) : (
          <Image src={ImagePlaceHolder} alt="Blog post image" fill />
        )}
      </div>
      {blog ? <Content content={blogToPass} /> : null}
    </div>
  );
}
