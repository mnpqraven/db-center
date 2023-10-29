import { ComponentPropsWithoutRef, ReactNode } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

export interface FormSelectProps<
  TOptions,
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> extends Omit<
    ComponentPropsWithoutRef<typeof FormField<TFieldValues, TName>>,
    "render"
  > {
  control: Control<TFieldValues>;
  name: TName;
  options: TOptions[];
  valueAccessor: (value: TOptions) => string | number;
  labelAccessor: ((value: TOptions) => ReactNode) | ReactNode;
  isNumber?: boolean;
  orientation?: "horizontal" | "vertical";
  label?: string | ReactNode;
  placeholder?: string;
  className?: string;
  wrapperClassName?: string;
}

export function FormSelect<O, V extends FieldValues, A extends FieldPath<V>>({
  control,
  name,
  label,
  options,
  labelAccessor,
  valueAccessor,
  className,
  isNumber = false,
  orientation = "vertical",
  wrapperClassName,
  ...props
}: FormSelectProps<O, V, A>) {
  return (
    <FormField
      control={control}
      name={name}
      {...props}
      render={({ field }) => (
        <FormItem className={wrapperClassName}>
          {label && <FormLabel>{label}</FormLabel>}
          <Select
            defaultValue={isNumber ? `${field.value}` : field.value}
            onValueChange={(val) =>
              isNumber ? field.onChange(Number(val)) : field.onChange(val)
            }
          >
            <FormControl>
              <SelectTrigger className={className}>
                <SelectValue />
              </SelectTrigger>
            </FormControl>

            <SelectContent position="popper">
              {options.map((item, index) => (
                <SelectItem key={index} value={valueAccessor(item).toString()}>
                  {typeof labelAccessor === "function"
                    ? labelAccessor(item)
                    : labelAccessor}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
