import { AvatarSchema, avatars } from "@/dbSchemas/avatar";
import { db } from "@/lib/database";
import { publicProcedure, router } from "@/server/trpc";

export const avatarRouter = router({
  list: publicProcedure.query(async () => {
    return (await db.select().from(avatars).all()) satisfies Awaited<
      AvatarSchema[]
    >;
  }),
});
