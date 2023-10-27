import { publicProcedure, router } from "./trpc";
import { honkaiRouter } from "./routers/honkai";

export const appRouter = router({
  honkai: honkaiRouter,
});

export type AppRouter = typeof appRouter;
