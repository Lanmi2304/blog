"use client";

import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { AddBlogInputSchema, addBlogSchema } from "../_schemas/add-blog.schema";
import { addBlogAction } from "../_actions/add-blog.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const topics = [
  {
    value: "development",
    label: "Development",
  },
  {
    value: "marketing",
    label: "Marketing",
  },
  {
    value: "business",
    label: "Business",
  },
  {
    value: "sales",
    label: "Sales",
  },
];

export type ContentNode = {
  type: string;
  content?: ContentNode[];
  attrs?: Record<string, unknown>;
};

export type EditorContent = {
  type: string;
  content: ContentNode[];
};

export function AddBlogForm() {
  const [content, setContent] = useState<EditorContent | undefined>();
  const form = useForm<AddBlogInputSchema>({
    resolver: zodResolver(addBlogSchema),
    defaultValues: {
      title: "",
      topic: "",
    },
  });
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onSubmit = async (values: AddBlogInputSchema) => {
    startTransition(async () => {
      if (!content) return;
      const blog = {
        ...values,
        content,
      };

      // console.log(123, blog);
      const result = await addBlogAction(blog);

      if (result.serverError || result.validationErrors) {
        toast.error(result.serverError || "An error occurred!");
      } else {
        toast.success("Blog successfully created!");
        router.push("/");
        form.reset();
      }
    });
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-6">
            <div className="grid gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="relative grid gap-3">
                    <FormLabel>Blog title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter blog title" {...field} />
                    </FormControl>
                    <FormMessage className="absolute -bottom-5" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topic</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select topic" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {topics.map((topic) => (
                          <SelectItem key={topic.value} value={topic.value}>
                            {topic.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select a topic for your blog post.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-6">
              <SimpleEditor setContent={setContent} />
              <Button
                type="submit"
                className="w-full cursor-pointer"
                disabled={isPending}
              >
                {isPending ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  "Add Blog"
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}
