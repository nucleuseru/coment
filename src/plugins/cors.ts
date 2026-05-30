import fastifyCors from "@fastify/cors";
import fp from "fastify-plugin";

export default fp(async (fastify) => {
  fastify.register(fastifyCors, {
    origin: [process.env.SITE_URL ?? ""],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  });
});
