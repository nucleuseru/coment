import "fastify";
import { getDb } from "./db";
import { createAuth, Session } from "./lib/auth";

declare module "fastify" {
  export interface FastifyInstance {
    db: ReturnType<typeof getDb>;
    auth: ReturnType<typeof createAuth>;
  }

  export interface FastifyRequest {
    user: Session["user"];
    session: Session["session"];
  }
}
