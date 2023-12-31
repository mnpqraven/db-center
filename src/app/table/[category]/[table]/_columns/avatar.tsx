import { AvatarSchema } from "@/dbSchemas";
import { createColumnHelper } from "@tanstack/react-table";

const col = createColumnHelper<AvatarSchema>();

export const avatarColumns = [
  col.display({
    id: "index",
    size: 40,
    header: () => <div className="text-center">#</div>,
    cell: ({ row }) => (
      <div className="text-center">
        {String(row.index + 1).padStart(2, "0")}
      </div>
    ),
  }),
  col.accessor("id", {}),
  col.accessor("name", {}),
  col.accessor("rarity", {}),
  col.accessor("votag", {}),
  col.accessor("damageType", {}),
  col.accessor("path", {}),
  col.accessor("spneed", {}),
];
