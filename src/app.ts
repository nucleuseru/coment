import AutoLoad from "@fastify/autoload";
import path from "node:path";
import { AppFastifyInstance, AppOptions } from "./types";

const options: AppOptions = {};

export default async function app(
  fastify: AppFastifyInstance,
  opts: AppOptions,
): Promise<void> {
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
