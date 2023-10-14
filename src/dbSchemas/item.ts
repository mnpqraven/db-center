import { InferSelectModel, relations } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const items = sqliteTable("item", {
  id: int("id").primaryKey(),
  itemName: text("name"),
  rarity: text("rarity")
    .references(() => itemRarities.name)
    .notNull(),
  itemMainType: text("main_type")
    .references(() => itemTypes.name)
    .notNull(),
  itemSubType: text("sub_type")
    .references(() => itemSubTypes.name)
    .notNull(),
  inventoryDisplayTag: int("inventory_display_tag"),
  purposeType: int("purpose_type"),
  itemDesc: text("desc"),
  itemBgdesc: text("bgdesc"),
  pileLimit: int("pile_limit"),
});

export type ItemSchema = InferSelectModel<typeof items>

export const itemRelations = relations(items, ({ one }) => ({
  mainType: one(itemTypes, {
    fields: [items.itemMainType],
    references: [itemTypes.name],
  }),
  subType: one(itemSubTypes, {
    fields: [items.itemSubType],
    references: [itemSubTypes.name],
  }),
  rarity: one(itemRarities, {
    fields: [items.rarity],
    references: [itemRarities.name],
  }),
}));

export const itemTypes = sqliteTable("itemType", {
  name: text("name", {
    enum: ["Usable", "Mission", "Display", "Virtual", "Material"],
  }).primaryKey(),
  type: int("type").notNull(),
});

export const itemTypeRelation = relations(itemTypes, ({ many }) => ({
  items: many(items),
}));

export const itemSubTypes = sqliteTable("itemSubType", {
  name: text("name", {
    enum: [
      "Book",
      "Virtual",
      "Gift",
      "ChatBubble",
      "Food",
      "PhoneTheme",
      "GameplayCounter",
      "RelicRarityShowOnly",
      "ForceOpitonalGift",
      "Material",
      "MuseumExhibit",
      "RelicSetShowOnly",
      "MuseumStuff",
      "Formula",
      "Mission",
    ],
  }).primaryKey(),
  type: int("type").notNull(),
});

export const itemSubTypeRelations = relations(itemSubTypes, ({ many }) => ({
  items: many(items),
}));

export const itemRarities = sqliteTable("itemRarity", {
  name: text("name", {
    enum: ["VeryRare", "SuperRare", "Rare", "NotNormal", "Normal"],
  }).primaryKey(),
  type: int("type").notNull(),
});

export const itemRarityRelations = relations(itemRarities, ({ many }) => ({
  items: many(items),
}));
