import { ComponentPropsWithoutRef, ReactNode } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { Combobox } from "@/components/ui/combobox";

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
  valueAccessor: (value: TOptions) => string;
  labelAccessor: (value: TOptions) => string;
  isNumber?: boolean;
  orientation?: "horizontal" | "vertical";
  label?: string | ReactNode;
  placeholder?: string;
  className?: string;
  isLoading?: boolean;
  wrapperClassName?: string;
}

export function FormCombobox<O, V extends FieldValues, A extends FieldPath<V>>({
  control,
  name,
  label,
  options,
  labelAccessor,
  valueAccessor,
  className,
  isNumber = false,
  isLoading = false,
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

          <FormControl>
            <Combobox
              className={className}
              options={options}
              isLoading={isLoading}
              value={isNumber ? `${field.value}` : field.value}
              onValueChange={(val) =>
                isNumber ? field.onChange(Number(val)) : field.onChange(val)
              }
              labelAccessor={(e) =>
                isNumber ? labelAccessor(e).toString() : labelAccessor(e)
              }
              valueAccessor={valueAccessor}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
