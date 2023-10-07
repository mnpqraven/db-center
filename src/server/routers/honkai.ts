import { db } from "@/lib/database";
import { publicProcedure, router } from "../trpc";
import { avatars } from "@/dbSchemas/avatar";
import { items } from "@/dbSchemas/item";

export const honkaiRouter = router({
  avatar: publicProcedure.query(async () => {
    return db.select().from(avatars).all();
  }),
  item: publicProcedure.query(async () => {
    return db.select().from(items).all();
  }),
});
