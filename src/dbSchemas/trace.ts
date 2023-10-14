import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { items } from ".";

const ANCHORS = [
  "Point01",
  "Point02",
  "Point03",
  "Point04",
  "Point05",
  "Point06",
  "Point07",
  "Point08",
  "Point09",
  "Point10",
  "Point11",
  "Point12",
  "Point13",
  "Point14",
  "Point15",
  "Point16",
  "Point17",
  "Point18",
] as const;

export const traces = sqliteTable("trace", {
  id: int("id").primaryKey(),
  maxLevel: int("maxLevel"),
  pointType: int("pointType"),
  anchor: text("anchor", { enum: ANCHORS }),
  defaultUnlock: int("defaultUnlock", { mode: "boolean" }),
  avatarPromotionLimit: int("avatarPromotionLimit"),
  prePoint: text("prePoint", { mode: "json" }).$type<{ list: number[] }>(),
  pointDesc: text("pointDesc", { mode: "json" }).$type<{ list: string[] }>(),
  paramList: text("paramList", { mode: "json" }).$type<{ list: string[][] }>(),
});

export const traceMaterials = sqliteTable("traceMaterial", {
  requestId: int("requestId").primaryKey({ autoIncrement: true }),
  itemId: int("itemId").references(() => items.id),
  pointId: int("pointId").references(() => traces.id),
  level: int("level"),
  num: int("itemNum"),
});
