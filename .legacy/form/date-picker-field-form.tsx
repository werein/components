import { useField } from "formik";
import React from "react";
import DatePickerField, { DatePickerFieldProps } from "./date-picker-field";

type Props = { name: string } & Omit<
  DatePickerFieldProps,
  "onChange" | "value" | "error"
>;

export default function DatePickerFieldForm(props: Props) {
  const [{ value }, meta, { setValue }] = useField<
    Date | { start?: Date; end?: Date } | undefined
  >(props.name);

  const error = (meta.error as any) as
    | { start?: string; end?: string }
    | string;
  const errorMessage =
    typeof error === "object" ? error.start || error.end : meta.error;

  return (
    <DatePickerField
      value={value}
      error={meta.touched && errorMessage ? errorMessage : undefined}
      onChange={setValue}
      {...props}
    />
  );
}
