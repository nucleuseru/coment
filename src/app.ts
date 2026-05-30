import AutoLoad from "@fastify/autoload";
import Static from "@fastify/static";
import "dotenv/config";
import path from "node:path";
import { AppFastifyInstance, AppOptions } from "./types";

const options: AppOptions = {
  logger: {
    transport: {
      target: "@fastify/one-line-logger",
    },
  },
};

export default async function app(
  fastify: AppFastifyInstance,
  opts: AppOptions,
): Promise<void> {
  void fastify.register(Static, {
    root: path.join(process.cwd(), "dist/client"),
  });

  void fastify.register(AutoLoad, {
    dir: path.join(__dirname, "plugins"),
    options: opts,
  });

  void fastify.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    options: opts,
  });
}

export { app, options };
