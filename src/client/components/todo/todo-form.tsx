import { PlusIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface TodoFormProps {
  onSubmit: (task: string) => void;
  isSubmitting: boolean;
}

export function TodoForm({ onSubmit, isSubmitting }: TodoFormProps) {
  const [task, setTask] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = task.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    setTask("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative flex-1">
        <Input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Type a task and press enter..."
          disabled={isSubmitting}
          className="h-10 w-full rounded-none border-border font-mono text-xs placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-ring"
        />
      </div>
      <Button
        type="submit"
        disabled={isSubmitting || !task.trim()}
        className="h-10 px-4 rounded-none border border-border bg-background hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-150 font-mono text-xs font-semibold shrink-0"
      >
        <PlusIcon className="h-4 w-4 mr-1" /> Add
      </Button>
    </form>
  );
}
