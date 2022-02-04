import {
  FastFieldProps,
  Field,
  FieldInputProps,
  FieldMetaProps,
  FormikProps,
} from "formik";
import React, { useState } from "react";
import InputField, { InputFieldProps } from "./input-field";

type InputFieldFormProps = { name: string; numeric?: boolean } & Omit<
  InputFieldProps,
  "onChange" | "onBlur" | "value" | "name" | "error"
>;

function Wrapper(
  props: InputFieldFormProps & {
    field: FieldInputProps<string | number | undefined>;
    form: FormikProps<string | number | undefined>;
    meta: FieldMetaProps<string | number | undefined>;
  }
) {
  const { name, field, form, meta, numeric, ...input } = props;
  const val =
    field.value === undefined || field.value === null ? "" : field.value;
  const [value, setValue] = useState(val);

  return (
    <InputField
      {...input}
      name={name}
      value={value}
      onChange={(e: any) => {
        if (numeric) {
          if (!e.target.value) {
            form.setFieldValue(name, undefined);
            setValue("");
          } else {
            form.setFieldValue(
              name,
              parseInt(e.target.value.replace(/\s/g, "") || undefined)
            );
            setValue(e.target.value);
          }
        } else {
          form.setFieldValue(name, e.target.value);
          setValue(e.target.value);
        }
      }}
      onBlur={field.onBlur}
      error={(meta.touched && meta.error) ?? meta.error}
      caption={meta.error || input.caption}
    />
  );
}

export default function InputFieldForm(props: InputFieldFormProps) {
  const { name, ...input } = props;

  return (
    <Field name={name}>
      {({ field, form, meta }: FastFieldProps<string | number | undefined>) => (
        <Wrapper name={name} field={field} form={form} meta={meta} {...input} />
      )}
    </Field>
  );
}
