import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Input } from "@/components/ui/input";

export default function Page() {
  return (
    <div className="mx-auto mt-30 max-w-4xl px-4 md:mt-20 md:mt-36">
      <div className="p10 grid gap-4">
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
