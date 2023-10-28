"use client";

import { trpc } from "@/app/_trpc/client";
import { useTable } from "@/lib/hooks/useTable";
import { useMemo, useState } from "react";
import { DataTableToggleColumn } from "@/components/shared/table/DataTableToggleColumn";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DataTable } from "@/components/shared/table/DataTable";
import { DataTablePagination } from "@/components/shared/table/DataTablePagination";
import { Input } from "@/components/ui/input";
import { DEFAULT_PAGINATION, search } from "@/lib/utils";
import { Categories } from "./types";
import {
  EitherArray,
  ValidTableSchemas,
  type ValidTableNames,
} from "@/server/routers/table";
import { TABLE_DICT } from "./_data/dataset";

interface Params {
  params: {
    category: Categories;
    table: ValidTableNames;
  };
}

export default function Page({ params }: Params) {
  const { category: _categorySlug, table: tableName } = params;

  const [keyword, setKeyword] = useState("");
  const [pagination, setPagination] = useState(DEFAULT_PAGINATION);

  const dict = TABLE_DICT[tableName];

  const { data, isInitialLoading } = trpc.table.list.useQuery(
    { tableName, pagination },
    { keepPreviousData: true }
  );

  const chunkData = useMemo(
    () =>
      !!data
        ? search<EitherArray<ValidTableSchemas>[number]>(
            data.data,
            dict?.searchKeys ?? [],
            keyword
          )
        : [],
    [data, dict?.searchKeys, keyword]
  );

  const { table: tableDef } = useTable({
    data: chunkData,
    // @ts-ignore
    columns: dict?.columns ?? [],
    pageCount: data?.pagination.totalPages,
    pagination: { pagination, setPagination },
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
