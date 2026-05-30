import { apiRequest } from "@/lib/api";
import { cn } from "@/lib/utils";
import { SpinnerIcon } from "@phosphor-icons/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { TodoForm } from "./todo-form";
import type { Todo } from "./todo-item";
import { TodoList } from "./todo-list";

type FilterType = "all" | "active" | "completed";

export function TodoContainer() {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<FilterType>("all");

  const [togglingIds, setTogglingIds] = useState<Set<number>>(new Set());
  const [deletingIds, setDeletingIds] = useState<Set<number>>(new Set());

  const {
    data: todos = [],
    isLoading,
    error,
  } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: () => apiRequest<Todo[]>("/api/todos"),
  });

  const createMutation = useMutation({
    mutationFn: (task: string) =>
      apiRequest<{ todoId: number }>("/api/todos", {
        method: "POST",
        body: JSON.stringify({ task }),
      }),
    onMutate: async (task: string) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]) || [];

      const newTodo: Todo = {
        id: -Date.now() - Math.floor(Math.random() * 1000),
        userId: "",
        task,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: null,
      };

      queryClient.setQueryData<Todo[]>(["todos"], (old = []) => [...old, newTodo]);

      return { previousTodos };
    },
    onError: (_err, _task, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(["todos"], context.previousTodos);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, completed }: { id: number; completed: boolean }) =>
      apiRequest(`/api/todos/${id}`, {
        method: "PUT",
        body: JSON.stringify({ completed }),
      }),
    onMutate: async ({ id, completed }) => {
      setTogglingIds((prev) => {
        const next = new Set(prev);
        next.add(id);
        return next;
      });

      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);

      queryClient.setQueryData<Todo[]>(["todos"], (old = []) =>
        old.map((todo) => (todo.id === id ? { ...todo, completed } : todo)),
      );

      return { previousTodos };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(["todos"], context.previousTodos);
      }
    },
    onSettled: (_, __, { id }) => {
      setTogglingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      apiRequest(`/api/todos/${id}`, {
        method: "DELETE",
      }),
    onMutate: async (id) => {
      setDeletingIds((prev) => {
        const next = new Set(prev);
        next.add(id);
        return next;
      });

      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);

      queryClient.setQueryData<Todo[]>(["todos"], (old = []) =>
        old.filter((todo) => todo.id !== id),
      );

      return { previousTodos };
    },
    onError: (_err, _id, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(["todos"], context.previousTodos);
      }
    },
    onSettled: (_, __, id) => {
      setDeletingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleCreate = (task: string) => {
    createMutation.mutate(task);
  };

  const handleToggle = (id: number, completed: boolean) => {
    toggleMutation.mutate({ id, completed });
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.length - activeCount;

  return (
    <div className="flex flex-col gap-6">
      {/* Form area */}
      <TodoForm
        onSubmit={handleCreate}
        isSubmitting={false}
      />

      {/* Filter tab bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
        <div className="flex gap-2">
          {(["all", "active", "completed"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={cn(
                "h-8 px-3 text-[10px] font-mono font-bold tracking-wider uppercase border transition-all duration-150 rounded-none focus:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                filter === type
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-border",
              )}
            >
              {type} (
              {type === "all"
                ? todos.length
                : type === "active"
                  ? activeCount
                  : completedCount}
              )
            </button>
          ))}
        </div>

        {/* Status text */}
        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
          {activeCount} active task{activeCount !== 1 && "s"} remaining
        </span>
      </div>

      {/* Content list or Loading/Error indicator */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <SpinnerIcon className="h-6 w-6 animate-spin text-muted-foreground" />
          <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
            Fetching tasks...
          </span>
        </div>
      ) : error ? (
        <div className="border border-destructive/20 bg-destructive/10 p-4 text-center">
          <span className="font-mono text-xs text-destructive uppercase font-bold block mb-1">
            Failed to sync tasks
          </span>
          <p className="font-mono text-[10px] text-muted-foreground">
            {error instanceof Error
              ? error.message
              : "Please reload and try again."}
          </p>
        </div>
      ) : (
        <TodoList
          todos={filteredTodos}
          onToggle={handleToggle}
          onDelete={handleDelete}
          togglingIds={togglingIds}
          deletingIds={deletingIds}
        />
      )}
    </div>
  );
}
