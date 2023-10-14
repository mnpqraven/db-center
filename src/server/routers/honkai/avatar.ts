import { AvatarSchema, avatars } from "@/dbSchemas/avatar";
import { db } from "@/lib/database";
import { publicProcedure, router } from "@/server/trpc";

export const avatarRouter = router({
  list: publicProcedure.query(async () => {
    const data: AvatarSchema[] = await db.select().from(avatars).all();
    return data;
  }),
});
