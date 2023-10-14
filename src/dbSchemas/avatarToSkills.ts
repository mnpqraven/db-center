import { int, primaryKey, sqliteTable } from "drizzle-orm/sqlite-core";
import { avatars, skills } from ".";
import { relations } from "drizzle-orm";

export const avatarToSkills = sqliteTable(
  "avatarSkill",
  {
    avatarId: int("avatar_id")
      .references(() => avatars.id)
      .notNull(),
    skillId: int("skill_id")
      .references(() => skills.id)
      .notNull(),
  },
  (t) => ({ pk: primaryKey(t.avatarId, t.skillId) })
);

export const avatarToSkillRelations = relations(avatarToSkills, ({ one }) => ({
  avatar: one(avatars, {
    fields: [avatarToSkills.avatarId],
    references: [avatars.id],
  }),
  skill: one(skills, {
    fields: [avatarToSkills.skillId],
    references: [skills.id],
  }),
}));
