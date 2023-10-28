import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { db } from "@/lib/database";
import { sql } from "drizzle-orm";
import {
  AvatarSchema,
  ItemSchema,
  SkillSchema,
  avatars,
  items,
} from "@/dbSchemas";

export type ValidTableNames = keyof typeof db.query;
export type ValidTableSchemas = AvatarSchema | ItemSchema | SkillSchema;

const VALUES: [ValidTableNames, ...ValidTableNames[]] = [
  "avatars",
  // And then merge in the remaining values from `properties`
  Object.keys(db.query).slice(1) as unknown as ValidTableNames,
];
const ValidTableNames = z.enum(VALUES);

const PaginationSearch = z.object({
  pageSize: z.number().positive().default(10),
  pageIndex: z.number().nonnegative().default(0),
});

export const tableRouter = router({
  list: publicProcedure
    .input(
      z
        .object({ tableName: ValidTableNames })
        .merge(z.object({ pagination: PaginationSearch }))
    )
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
    case "blogs":
    case "elements":
    case "frameworks":
    case "items":
    case "itemTypes":
    case "itemSubTypes":
    case "itemRarities":
    case "paths":
    case "skills":
    case "skillTypes":
    case "traces":
    case "traceMaterials":
      return items;
  }
}

type ServerTableResponse = {
  data: ValidTableSchemas[];
  pagination: {
    pageIndex: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
  };
};

async function getTableData(
  tableName: z.TypeOf<typeof ValidTableNames>,
  pagination: z.TypeOf<typeof PaginationSearch>
): Promise<ServerTableResponse> {
  const parsing = ValidTableNames.safeParse(tableName);

  if (!parsing.success) return Promise.reject("invalid table name");
  else {
    const { data: name } = parsing;
    const { pageIndex, pageSize } = pagination;

    const dbStruct = getTableFactory(name);

    const totalQ = await db
      .select({ count: sql<number>`count(*)` })
      .from(dbStruct);
    const totalItems = totalQ[0].count;

    const data = (await db
      .select()
      .from(dbStruct)
      .limit(pageSize)
      .offset(pageIndex * pageSize)) as unknown as ValidTableSchemas[];

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
