import { ItemSchema, items } from "@/dbSchemas/item";
import { db } from "@/lib/database";
import { publicProcedure, router } from "@/server/trpc";
import { sql } from "drizzle-orm";
import * as z from "zod";

export const itemRouter = router({
  list: publicProcedure.query(
    async () =>
      (await db.select().from(items).all()) satisfies Awaited<ItemSchema[]>
  ),
  paginated: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        page: z.number().min(0).optional(),
        cursor: z.number().nullish(),
      })
    )
    .query(async ({ input: { limit: mightLimit, page = 0 } }) => {
      const limit = mightLimit ?? 25;
      // const cursor = mightCursor ?? 0;
      const offset = page * limit;
      const total = await db
        .select({ count: sql<number>`count(*)` })
        .from(items);
      const data = await db.query.items.findMany({
        limit,
        offset,
      });

      const nextCursor = page + 1;

      return {
        data,
        pagination: {
          limit,
          offset,
          page,
          total: total[0].count,
        },
        nextCursor,
      };
    }),
});
