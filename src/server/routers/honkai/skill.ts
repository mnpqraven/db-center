import { SkillSchema, skills } from "@/dbSchemas/skill";
import { db } from "@/lib/database";
import { publicProcedure, router } from "@/server/trpc";
import { z } from "zod";

export const skillRouter = router({
  list: publicProcedure.input(z.object({})).query(async ({ input }) => {
    const data: SkillSchema[] = await db.select().from(skills);
    return data;
  }),
  byCharId: publicProcedure
    .input(
      z.object({
        charId: z.number(),
        // withDescription: z.boolean().default(false),
      })
    )
    .query(async ({ input }) => {
      const t = await db.query.avatarToSkills.findMany({
        where: (map, { eq }) => eq(map.avatarId, input.charId),
        columns: {},
        with: { skill: true },
      });
      const data: SkillSchema[] = t.map((e) => e.skill);
      return data;
    }),
});
