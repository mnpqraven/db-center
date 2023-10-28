import { AvatarSchema, ItemSchema, SkillSchema } from "@/dbSchemas";
import {
  ValidTableSchemas,
  type ValidTableNames,
} from "@/server/routers/table";
import { ColumnDef } from "@tanstack/react-table";
import { avatarColumns } from "../_columns/avatar";
import { itemColumns } from "../_columns/item";
import { skillColumns } from "../_columns/skill";

export const TABLE_DICT: Partial<
  Record<
    ValidTableNames,
    { columns: ColumnDef<any, any>[]; searchKeys: EitherArrayKeyof<ValidTableSchemas> }
  >
> = {
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


type EitherArray<T> = T extends object ? Array<T> : never
type EitherArrayKeyof<T> = T extends object ? Array<keyof T> : never