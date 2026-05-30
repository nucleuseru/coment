import { Db } from "@/db";
import { todos } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getTodoById = async (db: Db, id: number) => {
  const [todo] = await db.select().from(todos).where(eq(todos.id, id)).limit(1);
  return todo;
};

export const getTodosByUserId = async (db: Db, userId: string) => {
  return await db.select().from(todos).where(eq(todos.userId, userId));
};

export const createTodo = async (db: Db, userId: string, task: string) => {
  const [todo] = await db
    .insert(todos)
    .values({ task, userId })
    .returning({ id: todos.id });

  if (!todo) {
    throw new Error("Failed to create todo");
  }

  return todo.id;
};

export const updateTodo = async (db: Db, id: number, completed: boolean) => {
  await db.update(todos).set({ completed }).where(eq(todos.id, id));
};

export const deleteTodo = async (db: Db, id: number) => {
  await db.delete(todos).where(eq(todos.id, id));
};
