import { AutoloadPluginOptions } from "@fastify/autoload";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import {
  FastifyBaseLogger,
  FastifyHttpOptions,
  FastifyInstance,
  RawServerDefault,
} from "fastify";
import { IncomingMessage, Server, ServerResponse } from "node:http";

export type AppFastifyInstance = FastifyInstance<
  RawServerDefault,
  IncomingMessage,
  ServerResponse<IncomingMessage>,
  FastifyBaseLogger,
  TypeBoxTypeProvider
>;

export type AppOptions = Partial<AutoloadPluginOptions> &
  FastifyHttpOptions<Server>;
