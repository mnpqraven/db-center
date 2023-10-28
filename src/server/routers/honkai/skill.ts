import { SkillSchema, skills } from "@/dbSchemas/lightConeToSkill";
import { db } from "@/lib/database";
import { publicProcedure, router } from "@/server/trpc";
import { z } from "zod";

export const skillRouter = router({
  list: publicProcedure.query(async ({ input }) => {
    return (await db.select().from(skills)) satisfies Awaited<SkillSchema[]>;
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
