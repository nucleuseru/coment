import { FolderIcon } from "@phosphor-icons/react";
import type { Todo } from "./todo-item";
import { TodoItem } from "./todo-item";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
  togglingIds: Set<number>;
  deletingIds: Set<number>;
}

export function TodoList({
  todos,
  onToggle,
  onDelete,
  togglingIds,
  deletingIds,
}: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center border border-dashed border-border py-12 px-4 text-center">
        <FolderIcon className="h-8 w-8 text-muted-foreground/60 mb-3" />
        <span className="font-mono text-xs font-bold text-muted-foreground uppercase tracking-wider">
          No tasks found
        </span>
        <p className="mt-1 font-mono text-[10px] text-muted-foreground/60 max-w-[200px]">
          Create a new task using the form above.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 max-h-[500px] overflow-y-auto pr-1">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          isToggling={togglingIds.has(todo.id)}
          isDeleting={deletingIds.has(todo.id)}
        />
      ))}
    </div>
  );
}
