import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { InferSelectModel, relations } from "drizzle-orm";
import { lightCones } from "./lightCone";

export const lightConeToSkill = sqliteTable("honkai_lightConeSkill", {
  id: int("id").primaryKey(),
  name: text("name"),
  desc: text("desc", { mode: "json" }).$type<string[]>(),
  paramList: text("param_list", { mode: "json" }).$type<string[][]>(), // string[][]
  abilityProperty: text("ability_property", { mode: "json" }).$type<
    // TODO: Property type
    { propertyType: string; value: { value: number } }[][]
  >(),
});

export type LightConeSkillSchema = InferSelectModel<typeof lightConeToSkill>;

export const lightConeToSkillRelations = relations(
  lightConeToSkill,
  ({ one }) => ({ lightCone: one(lightCones, {
    fields: [lightConeToSkill.id],
    references: [lightCones.skillId]
  }) })
);
