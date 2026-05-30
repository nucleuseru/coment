import { getDb } from "@/db";
import fp from "fastify-plugin";

export default fp(async (fastify) => {
  fastify.decorate("db", getDb());
});
