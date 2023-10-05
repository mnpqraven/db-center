import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { elements } from "./element";
import { paths } from "./path";

export const avatars = sqliteTable("avatar", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  rarity: integer("rarity").notNull(),
  votag: text("votag"),
  damageType: text("damage_type")
    .references(() => elements.name)
    .notNull(),
  path: text("path")
    .references(() => paths.name)
    .notNull(),
  spneed: integer("spneed"),
});
