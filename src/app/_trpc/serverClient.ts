import { httpBatchLink } from "@trpc/client";

import { appRouter } from "@/server/trpcRoutes";

export const server = appRouter.createCaller({
  links: [httpBatchLink({ url: "/api/trpc" })],
});
