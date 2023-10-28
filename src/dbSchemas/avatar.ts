import { int, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { InferSelectModel, relations } from "drizzle-orm";
import { avatarToSkills } from "./avatarToSkill";
import { elements, paths, traces } from ".";

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

export const avatarTraces = sqliteTable(
  "avatarTrace",
  {
    avatarId: int("avatar_id")
      .references(() => avatars.id)
      .notNull(),
    pointId: int("point_id")
      .references(() => traces.id)
      .notNull(),
  },
  (t) => ({ pk: primaryKey(t.avatarId, t.pointId) })
);

export const traceRelations = relations(avatarTraces, ({ one }) => ({
  avatar: one(avatars, {
    fields: [avatarTraces.avatarId],
    references: [avatars.id],
  }),
  trace: one(traces, {
    fields: [avatarTraces.pointId],
    references: [traces.id],
  }),
}));
