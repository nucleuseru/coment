import {
  createTodo,
  deleteTodo,
  getTodoById,
  getTodosByUserId,
  updateTodo,
} from "@/services/todo";
import { AppFastifyInstance } from "@/types";
import T from "typebox";

const ParamsSchema = T.Object({
  id: T.Number(),
});

export default async (fastify: AppFastifyInstance) => {
  fastify.route({
    url: "/",
    method: "GET",
    handler: async (req) => {
      const todos = await getTodosByUserId(fastify.db, req.user.id);
      return todos;
    },
  });

  fastify.route({
    url: "/",
    method: "POST",
    schema: {
      body: T.Object({
        task: T.String(),
      }),
    },
    handler: async (req) => {
      const todoId = await createTodo(fastify.db, req.user.id, req.body.task);
      return { todoId };
    },
  });

  fastify.route({
    url: "/:id",
    method: "PUT",
    schema: {
      params: ParamsSchema,
      body: T.Object({
        completed: T.Boolean(),
      }),
    },
    handler: async (req) => {
      const todo = await getUserTodoById(req.user.id, req.params.id);
      await updateTodo(fastify.db, todo.id, req.body.completed);
    },
  });

  fastify.route({
    url: "/:id",
    method: ["GET", "DELETE"],
    schema: {
      params: ParamsSchema,
    },
    handler: async (req) => {
      const todo = await getUserTodoById(req.user.id, req.params.id);
      if (req.method === "GET") return todo;
      await deleteTodo(fastify.db, todo.id);
    },
  });

  async function getUserTodoById(userId: string, id: number) {
    const todo = await getTodoById(fastify.db, id);

    if (!todo) {
      throw fastify.httpErrors.notFound("Todo not found");
    }

    if (todo.userId !== userId) {
      throw fastify.httpErrors.unauthorized();
    }

    return todo;
  }
};
