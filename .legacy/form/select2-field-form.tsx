import { Field, FieldProps } from "formik";
import React from "react";
import { StyleObject } from "styletron-react";
import Select2Field, { Select2FieldProps } from "./select2-field";

type Select2FieldFormProps = { name: string; style?: StyleObject } & Omit<
  Select2FieldProps,
  "onChange" | "value" | "name" | "error"
>;

export default function Select2FieldForm(props: Select2FieldFormProps) {
  const { name, style, ...input } = props;

  return (
    <Field name={name}>
      {({
        field,
        form,
        meta,
      }: FieldProps<string | string[] | number | number[] | undefined>) => (
        <Select2Field
          name={name}
          {...input}
          value={field.value}
          onChange={(v) => form.setFieldValue(name, v)}
          error={(meta.touched && meta.error) ?? meta.error}
        />
      )}
    </Field>
  );
}
