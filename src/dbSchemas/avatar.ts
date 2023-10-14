import { int, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { InferSelectModel, relations } from "drizzle-orm";
import { avatarToSkills } from "./avatarToSkills";
import { elements, paths } from ".";

export const avatars = sqliteTable("avatar", {
  id: int("id").primaryKey(),
  name: text("name").notNull(),
  rarity: int("rarity").notNull(),
  votag: text("votag"),
  damageType: text("damage_type")
    .references(() => elements.name)
    .notNull(),
  path: text("path")
    .references(() => paths.name)
    .notNull(),
  spneed: int("spneed"),
});

export type AvatarSchema = InferSelectModel<typeof avatars>;

export const avatarRelations = relations(avatars, ({ many }) => ({
  avatarToSkills: many(avatarToSkills),
}));

// export const avatarTraces = sqliteTable(
//   "avatarTrace",
//   {
//     avatarId: int("avatarId").references(() => avatars.id),
//     pointId: int("pointId").references(() => traces.id),
//   },
//   (t) => ({
//     pk: primaryKey(t.avatarId, t.pointId),
//   })
// );
