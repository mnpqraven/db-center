import { InferSelectModel, relations } from "drizzle-orm";
import {
  index,
  int,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { avatars } from ".";

export const avatarToEidolons = sqliteTable(
  "avatarEidolon",
  {
    avatarId: int("avatar_id")
      .references(() => avatars.id)
      .notNull(),
    eidolonId: int("eidolon_id")
      .references(() => eidolons.id)
      .notNull(),
  },
  (t) => ({
    avatarIdx: index("idx_eidolon_avatar_id").on(t.avatarId),
    eidolonIdx: uniqueIndex("idx_eidolon_eidolon_id").on(t.eidolonId),
  })
);

export const avatarToEidolonRelations = relations(
  avatarToEidolons,
  ({ one }) => ({
    avatar: one(avatars, {
      fields: [avatarToEidolons.avatarId],
      references: [avatars.id],
    }),
    skill: one(eidolons, {
      fields: [avatarToEidolons.eidolonId],
      references: [eidolons.id],
    }),
  })
);

export type EidolonSchema = InferSelectModel<typeof eidolons>;
export const eidolons = sqliteTable("eidolon", {
  id: int("id").primaryKey(),
  rank: int("rank"),
  name: text("name"),
  desc: text("desc", { mode: "json" }).$type<string[]>(),
  unlock_cost: text("unlock_cost", { mode: "json" }).$type<{
    item_id: number;
    item_num: number;
  }>(),
  param: text("param", { mode: "json" }).$type<string[]>(),
});

export const eidolonRelations = relations(eidolons, ({ one }) => ({
  avatarToEidolon: one(avatarToEidolons),
}));
