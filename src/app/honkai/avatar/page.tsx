"use client";
import { trpc } from "@/app/_trpc/client";
import { useTable } from "@/lib/hooks/useTable";
import { useMemo } from "react";
import { columns } from "./columns";
import { DataTableToggleColumn } from "@/components/shared/table/DataTableToggleColumn";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DataTable } from "@/components/shared/table/DataTable";
import { DataTablePagination } from "@/components/shared/table/DataTablePagination";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

export default function Page() {
  const { data, isInitialLoading } = trpc.honkai.avatar.list.useQuery();
  const avatars = useMemo(() => data ?? [], [data]);

  const { table } = useTable({
    data: avatars,
    columns,
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
