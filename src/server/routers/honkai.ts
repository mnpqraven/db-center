import { db } from "@/lib/database";
import { publicProcedure, router } from "../trpc";
import { avatars } from "@/dbSchemas/avatar";

export const honkaiRouter = router({
  avatar: publicProcedure.query(async () => {
    return db.select().from(avatars).all();
  }),
});
