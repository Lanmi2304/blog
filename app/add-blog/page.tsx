import { AddBlogForm } from "./_components/add-blog-form";

export default function Page() {
  return (
    <div className="mx-auto my-30 max-w-4xl px-4 md:mt-20 md:mt-36">
      <div className="grid gap-4">
        <h1 className="mb-4 text-4xl font-semibold">Add blog</h1>
        <AddBlogForm />
      </div>
    </div>
  );
}
