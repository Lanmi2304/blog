"use client";

import * as React from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { useQueryState } from "nuqs";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const topics = [
  {
    value: "all",
    label: "All",
  },
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

export function BrowseTopic() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [topic, setTopic] = useQueryState("topic", { defaultValue: "" });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? topics.find((topic) => topic.value === value)?.label
            : "Select topic..."}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search topic..." />
          <CommandList>
            <CommandEmpty>No topic found.</CommandEmpty>
            <CommandGroup>
              {topics.map((topic) => (
                <CommandItem
                  key={topic.value}
                  value={topic.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    if (currentValue === "all") {
                      setTopic(null);
                    } else {
                      setTopic(currentValue === value ? "" : currentValue);
                    }
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === topic.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {topic.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
