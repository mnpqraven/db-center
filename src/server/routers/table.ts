import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { db } from "@/lib/database";
import { sql } from "drizzle-orm";
import {
  AvatarSchema,
  ItemSchema,
  SkillSchema,
  avatarToSkills,
  avatarTraces,
  avatars,
  blogs,
  elements,
  frameworks,
  itemRarities,
  itemSubTypes,
  itemTypes,
  items,
  lightConeToSkill,
  lightCones,
  paths,
  skillTypes,
  skills,
  traceMaterials,
  traces,
} from "@/dbSchemas";

export type EitherArray<T> = T extends object ? T[] : never;

export type ValidTableNames = keyof typeof db.query;
export type ValidTableSchemas = AvatarSchema | ItemSchema | SkillSchema;

const VALUES: [ValidTableNames, ...ValidTableNames[]] = [
  "avatars",
  // And then merge in the remaining values from `properties`
  ...(Object.keys(db.query).slice(1) as unknown as ValidTableNames[]),
];
const ValidTableNames = z.enum(VALUES);

const PaginationSearch = z.object({
  pageSize: z.number().positive().default(10),
  pageIndex: z.number().nonnegative().default(0),
});

export const TableSearch = z.object({
  tableName: ValidTableNames,
  pagination: PaginationSearch.optional(),
});

export const tableRouter = router({
  list: publicProcedure
    .input(TableSearch)
    .query(
      async ({ input: { tableName, pagination } }) =>
        await getTableData(tableName, pagination)
    ),
});

function getTableFactory(tableName: z.TypeOf<typeof ValidTableNames>) {
  switch (tableName) {
    case "avatars":
      return avatars;
    case "avatarToSkills":
      return avatarToSkills;
    case "avatarTraces":
      return avatarTraces;
    case "blogs":
      return blogs;
    case "elements":
      return elements;
    case "frameworks":
      return frameworks;
    case "items":
      return items;
    case "itemTypes":
      return itemTypes;
    case "itemSubTypes":
      return itemSubTypes;
    case "itemRarities":
      return itemRarities;
    case "lightCones":
      return lightCones;
    case "lightConeToSkill":
      return lightConeToSkill;
    case "paths":
      return paths;
    case "skills":
      return skills;
    case "skillTypes":
      return skillTypes;
    case "traces":
      return traces;
    case "traceMaterials":
      return traceMaterials;
  }
}

type ServerTableResponse = {
  data: EitherArray<ValidTableSchemas>;
  pagination: {
    pageIndex: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
  };
};

async function getTableData(
  tableName: z.TypeOf<typeof ValidTableNames>,
  pagination: Partial<z.TypeOf<typeof PaginationSearch>> = {}
): Promise<ServerTableResponse> {
  const parsing = ValidTableNames.safeParse(tableName);

  if (!parsing.success) return Promise.reject("invalid table name");
  else {
    const { data: name } = parsing;
    const { pageIndex, pageSize } = PaginationSearch.parse(pagination);

    const dbStruct = getTableFactory(name);

    const totalQ = await db
      .select({ count: sql<number>`count(*)` })
      .from(dbStruct);
    const totalItems = totalQ[0].count;

    const data = (await db
      .select()
      .from(dbStruct)
      .limit(pageSize)
      .offset(
        pageIndex * pageSize
      )) as unknown as EitherArray<ValidTableSchemas>; // safe typecast

    return {
      data,
      pagination: {
        pageIndex,
        pageSize,
        totalItems,
        totalPages: Math.ceil(totalItems / pageSize),
      },
    };
  }
}
