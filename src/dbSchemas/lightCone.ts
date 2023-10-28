import { InferSelectModel, relations } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { lightConeToSkill, paths } from ".";

export const lightCones = sqliteTable("lightCone", {
  id: int("id").primaryKey(),
  release: int("release", { mode: "boolean" }),
  name: text("name"),
  rarity: int("rarity"),
  path: text("path")
    .references(() => paths.name)
    .notNull(),
  maxPromotion: int("max_promotion"),
  maxRank: int("max_rank"),
  skillId: int("skill_id")
    .references(() => lightConeToSkill.id)
    .notNull(),
  // exp_type: u32,
  // exp_provide: u32,
  // coin_cost: u32,
  // rank_up_cost_list: Vec<u32>,
});

export type LightConeSchema = InferSelectModel<typeof lightCones>;

export const lightConeRelations = relations(lightCones, ({ one }) => ({
  lightConeToSkill: one(lightConeToSkill),
}));
