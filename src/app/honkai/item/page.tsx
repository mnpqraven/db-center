"use client";

import { trpc } from "@/app/_trpc/client";
import { useTable } from "@/lib/hooks/useTable";
import { useEffect, useMemo, useState } from "react";
import { columns } from "./columns";
import { DataTableToggleColumn } from "@/components/shared/table/DataTableToggleColumn";
import { DataTable } from "@/components/shared/table/DataTable";
import { DataTablePagination } from "@/components/shared/table/DataTablePagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PaginationState } from "@tanstack/react-table";

export default function Page() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 25,
  });

  const { data, isInitialLoading } = trpc.honkai.item.list.useQuery(
    {
      limit: pagination.pageSize,
      page: pagination.pageIndex,
    },
    { keepPreviousData: true }
  );

  const items = useMemo(() => data?.data ?? [], [data]);

  const { table } = useTable({
    data: items,
    columns,
    initialState: {
      columnVisibility: {
        itemDesc: false,
        itemBgdesc: false,
      },
    },
    pageCount: data?.pagination.total
      ? Math.ceil(data?.pagination.total / pagination.pageSize)
      : undefined,
    pagination: { pagination, setPagination },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <DataTableToggleColumn className="w-fit" table={table} />
      </div>

      <ScrollArea viewportClassName="max-h-[70vh]">
        <DataTable table={table} isLoading={isInitialLoading} />
      </ScrollArea>

      <DataTablePagination table={table} sizes={[10, 20, 25, 50, 100]} />
    </div>
  );
}
