import { FastFieldProps, Field } from "formik";
import React from "react";
import ValueRangeField, { ValueRangeFieldProps } from "./value-range-field";

type ValueRangeFieldFormProps = { name: string } & Omit<
  ValueRangeFieldProps,
  "onChange" | "value"
>;

export default function ValueRangeFieldForm(props: ValueRangeFieldFormProps) {
  const { name, ...input } = props;

  return (
    <Field name={name}>
      {({
        field,
        form,
        meta,
      }: FastFieldProps<[number | null, number | null] | undefined>) => (
        <ValueRangeField
          name={name}
          value={field.value}
          onChange={(v) => form.setFieldValue(name, v)}
          error={(meta.touched && meta.error) ?? meta.error}
          {...input}
        />
      )}
    </Field>
  );
}
