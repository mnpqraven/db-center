"use client";

import { trpc } from "@/app/_trpc/client";
import { useTable } from "@/lib/hooks/useTable";
import { useMemo, useState } from "react";
import { avatarColumns } from "./_columns/avatar";
import { DataTableToggleColumn } from "@/components/shared/table/DataTableToggleColumn";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DataTable } from "@/components/shared/table/DataTable";
import { DataTablePagination } from "@/components/shared/table/DataTablePagination";
import { Input } from "@/components/ui/input";
import { AvatarSchema, ItemSchema, SkillSchema } from "@/dbSchemas";
import { search } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { itemColumns } from "./_columns/item";
import { skillColumns } from "./_columns/skill";
import { Categories, TableStructs, Tables } from "./types";

const DICT: Record<Tables, { columns: ColumnDef<any, any>[]; keys: string[] }> =
  {
    avatar: {
      columns: avatarColumns,
      keys: ["id", "name", "votag"] satisfies (keyof AvatarSchema)[],
    },
    item: {
      columns: itemColumns,
      keys: ["id", "itemName"] satisfies (keyof ItemSchema)[],
    },
    skill: {
      columns: skillColumns,
      keys: ["id", "name", "attackType"] satisfies (keyof SkillSchema)[],
    },
  };

interface Params {
  params: {
    category: Categories;
    table: Tables;
  };
}

export default function Page({ params }: Params) {
  const { category: categorySlug, table: tableSlug } = params;
  const [keyword, setKeyword] = useState("");

  const dict = DICT[tableSlug];

  const { data, isInitialLoading } =
    // @ts-ignore
    trpc[categorySlug][tableSlug].list.useQuery();

  const chunkData = useMemo(
    () => (data ? search(data, dict.keys, keyword) : []),
    [data, dict.keys, keyword]
  ) satisfies TableStructs[];

  const { table: tableDef } = useTable({
    data: chunkData,
    columns: dict.columns,
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Input
          placeholder="Search"
          onChange={(e) => setKeyword(e.target.value)}
          className="w-fit"
        />

        <DataTableToggleColumn className="w-fit" table={tableDef} />
      </div>

      <ScrollArea>
        <DataTable table={tableDef} isLoading={isInitialLoading} />
      </ScrollArea>

      <DataTablePagination table={tableDef} sizes={[10, 20, 25, 50, 100]} />
    </div>
  );
}
