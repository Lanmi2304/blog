import { auth } from "@/server/auth";
import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from "next-safe-action";
import { cookies, headers } from "next/headers";
import { z } from "zod";

class ActionError extends Error {}

// Base client.
export const actionClient = createSafeActionClient({
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
    });
  },
  handleServerError(e) {
    console.error("Action error:", e.message);

    if (e instanceof ActionError) {
      return e.message;
    }

    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
  // Define logging middleware.
})
  .use(async ({ next, clientInput, metadata }) => {
    console.log("LOGGING MIDDLEWARE");

    const startTime = performance.now();

    // Here we await the action execution.
    const result = await next();

    const endTime = performance.now();

    console.log("Result ->", result);
    console.log("Client input ->", clientInput);
    console.log("Metadata ->", metadata);
    console.log("Action execution took", endTime - startTime, "ms");

    // And then return the result of the awaited action.
    return result;
  })
  .use(async ({ next }) => {
    const session = await auth.api.getSession({ headers: await headers() });
    return next({ ctx: { session } });
  })
  .use(async ({ next, ctx }) => {
    const { session } = ctx; // Context contains `sessionId`
    const user = session?.user;
    return next({ ctx: { user } });
  });

// Auth client defined by extending the base one.
// Note that the same initialization options and middleware functions of the base client
// will also be used for this one.
export const authActionClient = actionClient
  // Define authorization middleware.
  .use(async ({ next }) => {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;

    if (!session) {
      throw new Error("Session not found!");
    }

    const sessionData = await auth.api.getSession({ headers: await headers() });
    const user = sessionData?.user;

    if (!user) {
      throw new Error("Session is not valid!");
    }

    // Return the next middleware with `userId` value in the context
    return next({ ctx: { user } });
  });
