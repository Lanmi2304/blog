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

export type ContentType = {
  type: string;
  content: Array<{ type: string; content?: Array<unknown> }>;
};

export function AddBlogForm() {
  const [content, setContent] = useState<ContentType | undefined>();
  const form = useForm<AddBlogInputSchema>({
    resolver: zodResolver(addBlogSchema),
    defaultValues: {
      title: "",
      topic: "",
    },
  });
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (values: AddBlogInputSchema) => {
    startTransition(async () => {
      if (!content) return;
      const blog = {
        ...values,
        content: { content: content.content, type: content.type },
      };
      const result = await addBlogAction(blog);
      if (result.serverError) {
        toast.error(result.serverError);
      }
      toast.success("Blog successfully created!");
      form.reset();
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
                        {/* TODO: Array instead of hardcoded */}
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Sales">Sales</SelectItem>
                        <SelectItem value="Business">Business</SelectItem>
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
