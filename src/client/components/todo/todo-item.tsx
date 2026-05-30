import { cn } from "@/lib/utils";
import { CheckIcon, TrashIcon } from "@phosphor-icons/react";

export type Todo = {
  id: number;
  userId: string;
  task: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string | null;
};

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
  isToggling: boolean;
  isDeleting: boolean;
}

export function TodoItem({
  todo,
  onToggle,
  onDelete,
  isToggling,
  isDeleting,
}: TodoItemProps) {
  return (
    <div
      className={cn(
        "group flex items-center justify-between border border-border bg-card/40 p-4 backdrop-blur-sm transition-all duration-200 hover:border-ring/30",
        todo.completed && "bg-muted/10 opacity-75",
      )}
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <button
          onClick={() => onToggle(todo.id, !todo.completed)}
          disabled={isToggling}
          aria-label={todo.completed ? "Mark incomplete" : "Mark complete"}
          className={cn(
            "flex h-5 w-5 shrink-0 items-center justify-center border transition-all duration-150 rounded-none focus:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            todo.completed
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border hover:border-ring",
          )}
        >
          {todo.completed && <CheckIcon weight="bold" className="h-3 w-3" />}
        </button>

        <span
          className={cn(
            "font-mono text-xs font-medium text-foreground break-all select-all",
            todo.completed && "line-through text-muted-foreground",
          )}
        >
          {todo.task}
        </span>
      </div>

      <div className="ml-4 flex items-center gap-2">
        <button
          onClick={() => onDelete(todo.id)}
          disabled={isDeleting}
          aria-label="Delete todo"
          className="flex h-7 w-7 items-center justify-center border border-transparent text-muted-foreground hover:text-destructive hover:border-destructive/20 hover:bg-destructive/5 transition-all duration-150 rounded-none focus:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
