import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { InferSelectModel, relations } from "drizzle-orm";
import { avatarToSkills, skillTypes } from ".";

export const skills = sqliteTable("skill", {
  id: int("id").primaryKey(),
  name: text("name"),
  tag: text("tag"),
  typeDesc: text("type_desc"),
  maxLevel: int("max_level"),
  spGain: int("spbase"),
  spNeed: int("spneed"),
  attackType: text("attack_type").references(() => skillTypes.name),
  skillDesc: text("skill_desc", { mode: "json" }).$type<string[]>(),
  paramList: text("param_list", { mode: "json" }).$type<string[][]>(),
});

export type SkillSchema = InferSelectModel<typeof skills>;

export const skillRelations = relations(skills, ({ many }) => ({
  avatarToSkills: many(avatarToSkills),
}));
