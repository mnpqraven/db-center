import { ItemSchema } from "@/dbSchemas";
import { createColumnHelper } from "@tanstack/react-table";

const helper = createColumnHelper<ItemSchema>();

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
  helper.accessor("itemName", {}),
  helper.accessor("rarity", {}),
  helper.accessor("itemMainType", {}),
  helper.accessor("itemSubType", {}),
  helper.accessor("inventoryDisplayTag", {}),
  helper.accessor("purposeType", {}),
  helper.accessor("itemDesc", {}),
  helper.accessor("itemBgdesc", {}),
  helper.accessor("pileLimit", {}),
];
