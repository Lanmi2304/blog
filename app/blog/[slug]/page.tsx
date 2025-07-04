import Markdown from "react-markdown";
import TurndownService from "turndown";
import remarkGfm from "remark-gfm";

import { generateHTML } from "@tiptap/html";

// Extensions
import { Image as TipTapImage } from "@tiptap/extension-image";
import { HardBreak } from "@tiptap/extension-hard-break";
import { TaskItem } from "@tiptap/extension-task-item";
import { TaskList } from "@tiptap/extension-task-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { Underline } from "@tiptap/extension-underline";
import { Link } from "@/components/tiptap-extension/link-extension";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Heading from "@tiptap/extension-heading";
import Italic from "@tiptap/extension-italic";
import CodeBlock from "@tiptap/extension-code-block";
import Code from "@tiptap/extension-code";
import Strike from "@tiptap/extension-strike";
import BlockQuote from "@tiptap/extension-blockquote";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import HorizontalRule from "@tiptap/extension-horizontal-rule";

import { getBlog } from "@/lib/utils/get-post";
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
  const content = { ...blog?.content, content: blogContentWithoutImage };

  const output = () =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    generateHTML(content as any, [
      Document,
      Paragraph,
      Text,
      Bold,
      Heading,
      Italic,
      Highlight,
      Link,
      CodeBlock,
      Code,
      BlockQuote,
      Strike,
      TipTapImage,
      Superscript,
      Subscript,
      Underline,
      Typography,
      ListItem,
      TextAlign,
      BulletList,
      HorizontalRule,
      TaskItem,
      TaskList,
      HardBreak,

      // other extensions …
    ]);

  const turndownService = new TurndownService();
  const markdown = turndownService.turndown(output());

  return (
    <div className="mx-auto my-30 w-full max-w-4xl px-4">
      <h1 className="text-3xl font-semibold md:text-5xl">{blog?.title}</h1>
      <div className="relative mt-10 h-80 w-full overflow-hidden rounded-xl md:h-96">
        {displayImage && displayImage.trim() !== "" ? (
          <Image src={displayImage} alt="Blog post image" fill />
        ) : (
          <Image src={ImagePlaceHolder} alt="Blog post image" fill />
        )}
      </div>
      <div className="prose mt-10 w-full max-w-none">
        <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
      </div>
    </div>
  );
}
