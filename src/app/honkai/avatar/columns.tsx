import { AvatarSchema } from "@/dbSchemas";
import { createColumnHelper } from "@tanstack/react-table";

const helper = createColumnHelper<AvatarSchema>();

export const columns = [
  helper.display({
    id: "index",
    size: 40,
    header: () => <div className="text-center">#</div>,
    cell: ({ row }) => (
      <div className="text-center">
        {String(row.index + 1).padStart(2, "0")}
      </div>
    ),
  }),
  helper.accessor("id", {}),
  helper.accessor("name", {}),
  helper.accessor("rarity", {}),
  helper.accessor("votag", {}),
  helper.accessor("damageType", {}),
  helper.accessor("path", {}),
  helper.accessor("spneed", {}),
];
