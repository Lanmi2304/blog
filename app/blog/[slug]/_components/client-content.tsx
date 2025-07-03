"use client";

import Markdown from "react-markdown";
import TurndownService from "turndown";
import remarkGfm from "remark-gfm";
import { useMemo } from "react";
import { generateHTML } from "@tiptap/html";

// Extensions
import { Image } from "@tiptap/extension-image";
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Content({ content }: { content: any }) {
  const output = useMemo(() => {
    return generateHTML(content, [
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
      Image,
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
  }, [content]);

  const turndownService = new TurndownService();
  const markdown = turndownService.turndown(output);
  return (
    <div className="prose mt-10">
      <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
    </div>
  );
}
