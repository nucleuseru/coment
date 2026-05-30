import { createAuth, getSession, Session } from "@/lib/auth";
import fp from "fastify-plugin";

export default fp(
  async (fastify) => {
    const auth = createAuth({ db: fastify.db });

    fastify.decorate("auth", auth);
    fastify.decorateRequest("user", null as unknown as Session["user"]);
    fastify.decorateRequest("session", null as unknown as Session["session"]);

    fastify.addHook("onRequest", async (request) => {
      const pathname = new URL(request.url, `http://${request.headers.host}`)
        .pathname;

      if (
        pathname === "/" ||
        !pathname.startsWith("/api") ||
        pathname.startsWith("/api/auth")
      )
        return;

      const session = await getSession(auth, request);

      if (!session) {
        throw fastify.httpErrors.unauthorized();
      }

      request.user = session.user;
      request.session = session.session;
    });
  },
  {
    name: "auth",
    dependencies: ["database"],
  },
);
