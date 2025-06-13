import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Input } from "@/components/ui/input";

export default function Page() {
  return (
    <div className="mx-auto mt-20 max-w-4xl px-4">
      <div className="grid gap-4 pt-10">
        <div>
          <h1>Blog title</h1>
          <Input type="text" />
        </div>

        <div>
          <SimpleEditor />
        </div>
      </div>
    </div>
  );
}
