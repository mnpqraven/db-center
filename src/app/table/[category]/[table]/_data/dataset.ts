import { AvatarSchema, ItemSchema, SkillSchema } from "@/dbSchemas";
import {
  ValidTableSchemas,
  type ValidTableNames,
} from "@/server/routers/table";
import { ColumnDef } from "@tanstack/react-table";
import { avatarColumns } from "../_columns/avatar";
import { itemColumns } from "../_columns/item";
import { skillColumns } from "../_columns/skill";

export type EitherArrayKeyof<T> = T extends object ? (keyof T)[] : never;
export type EitherArrayColumns<T> = T extends object
  ? ColumnDef<T, any>[]
  : never;

type PageDataSet = {
  columns: EitherArrayColumns<ValidTableSchemas>;
  searchKeys: EitherArrayKeyof<ValidTableSchemas>;
};

export const TABLE_DICT: Partial<Record<ValidTableNames, PageDataSet>> = {
  avatars: {
    columns: avatarColumns,
    searchKeys: ["id", "name", "votag"] satisfies (keyof AvatarSchema)[],
  },
  items: {
    columns: itemColumns,
    searchKeys: ["id", "itemName"] satisfies (keyof ItemSchema)[],
  },
  skills: {
    columns: skillColumns,
    searchKeys: ["id", "name", "attackType"] satisfies (keyof SkillSchema)[],
  },
};
