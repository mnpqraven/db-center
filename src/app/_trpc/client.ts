import { createTRPCReact } from "@trpc/react-query";

import { type AppRouter } from "@/server/trpcRoutes";

export const trpc = createTRPCReact<AppRouter>({});