"use client";

import { trpc } from "@/app/_trpc/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTable } from "@/lib/hooks/useTable";
import { useMemo, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/shared/table/DataTable";
import { DataTableToggleColumn } from "@/components/shared/table/DataTableToggleColumn";

export default function Page() {
  const [charId, setCharId] = useState<number | undefined>(undefined);
  const { data: chars } = trpc.honkai.avatar.list.useQuery();
  const { data, isInitialLoading } = trpc.honkai.skill.byCharId.useQuery(
    { charId: charId! },
    { enabled: !!charId }
  );
  const skills = useMemo(() => data ?? [], [data]);

  const { table } = useTable({
    data: skills,
    columns,
    initialState: {
      columnVisibility: {
        skillDesc: false,
        paramList: false,
      },
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Select onValueChange={(e) => setCharId(Number(e))}>
          <SelectTrigger className="w-60">
            <SelectValue placeholder="Character" />
          </SelectTrigger>
          <SelectContent>
            <ScrollArea className="h-96">
              {chars?.map((meta) => (
                <SelectItem key={meta.id} value={meta.id.toString()}>
                  {meta.name}
                </SelectItem>
              ))}
            </ScrollArea>
          </SelectContent>
        </Select>

        <DataTableToggleColumn table={table} />
      </div>

      <DataTable table={table} isLoading={isInitialLoading} />
    </div>
  );
}
