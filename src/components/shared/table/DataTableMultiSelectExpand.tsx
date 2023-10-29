import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Table } from "@tanstack/react-table";
import { Check } from "lucide-react";
import { ComponentPropsWithoutRef } from "react";

interface Props<TData, TFilter extends string>
  extends ComponentPropsWithoutRef<typeof Button> {
  table: Table<TData>;
  options: TFilter[];
  columnKey: keyof TData;
}

export function DataTableMultiSelectExpand<TData, TFilter extends string>({
  table,
  options,
  columnKey,
  placeholder,
  ...props
}: Props<TData, TFilter>) {
  // removes duplications
  const selectedEvents = table.getIsSomePageRowsSelected();
  const { rows } = table.getRowModel();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button {...props}>{placeholder}</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandInput placeholder="Enter event" className="border-none" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const rowsWithEventName = rows.filter(
                  (row) => row.getValue(columnKey as string) == option
                );

                const isSelected = rowsWithEventName.every((row) =>
                  row.getIsSelected()
                );

                return (
                  <CommandItem
                    key={option as string}
                    onSelect={() => {
                      // probably will need to pass this filterFn as props for
                      // more complex selectors
                      const filtered = rows.filter(
                        (row) => row.getValue(columnKey as string) == option
                      );
                      if (filtered.every((row) => row.getIsSelected())) {
                        filtered.forEach((row) => row.toggleSelected(false));
                      } else
                        filtered.forEach((row) => row.toggleSelected(true));
                    }}
                  >
                    <div
                      className={cn(
                        "border-primary mr-2 flex h-4 w-4 items-center justify-center rounded-sm border",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <Check className={cn("h-4 w-4")} />
                    </div>
                    {/* {option.icon && <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />} */}
                    <span>{option}</span>
                    {/* {facets?.get(option.value) && (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                        {facets.get(option.value)}
                      </span>
                    )} */}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedEvents && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => table.toggleAllPageRowsSelected(false)}
                    className="justify-center text-center"
                  >
                    Clear selection
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
