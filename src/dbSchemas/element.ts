import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const elements = sqliteTable("element", {
  name: text("name", {
    enum: [
      "Fire",
      "Ice",
      "Physical",
      "Wind",
      "Lightning",
      "Quantum",
      "Imaginary",
    ],
  }).primaryKey(),
  type: integer("type").notNull(),
});
