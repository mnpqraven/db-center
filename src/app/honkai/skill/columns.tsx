import { SkillSchema } from "@/dbSchemas/skill";
import { sanitizeNewline } from "@/lib/utils";
import { createColumnHelper } from "@tanstack/react-table";

const helper = createColumnHelper<SkillSchema>();
export const columns = [
  helper.accessor("id", {}),
  helper.accessor("name", {}),
  helper.accessor("tag", {}),
  helper.accessor("typeDesc", {}),
  helper.accessor("attackType", {}),
  helper.accessor("maxLevel", {}),
  helper.accessor("spGain", {}),
  helper.accessor("spNeed", {}),
  helper.accessor("skillDesc", {
    cell: ({ getValue }) => (
      <div>
        {sanitizeNewline(
          getValue()?.reduce((a, b, i) => {
            const len = getValue()?.length;
            if (len && len - 1 == i) {
              return a + b;
            } else return a + b + `(${i + 1})`;
          }, "")
        )}
      </div>
    ),
  }),
  helper.accessor("paramList", {
    cell: ({ getValue }) => (
      <div className="flex flex-col">
        {getValue()?.at(0)?.join(", ")}
        <span>...</span>
        {getValue()?.at(-1)?.join(", ")}
      </div>
    ),
    size: 200,
  }),
];
