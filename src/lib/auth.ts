import { betterAuth } from "better-auth";
import { drizzleAdapter, type DB } from "better-auth/adapters/drizzle";
import { fromNodeHeaders } from "better-auth/node";
import { FastifyRequest } from "fastify";

export interface ICreateAuthOptions {
  db: DB;
}

export const createAuth = (opts: ICreateAuthOptions) => {
  return betterAuth({
    trustedOrigins: ["http://localhost:3000"],
    database: drizzleAdapter(opts.db, {
      provider: "pg",
      transaction: true,
      usePlural: true,
    }),
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID ?? "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      },
    },
  });
};

export const auth = createAuth({
  db: {} as DB,
});

export const getSession = async (
  auth: ReturnType<typeof createAuth>,
  request: FastifyRequest,
) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(request.headers),
  });

  return session;
};

export type Session = NonNullable<Awaited<ReturnType<typeof getSession>>>;
