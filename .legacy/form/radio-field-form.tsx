import { RadioGroup } from "baseui/radio";
import { useField } from "formik";
import React, { PropsWithChildren } from "react";
import Field, { FieldProps } from "./field";

export type RadioFormProps = PropsWithChildren<
  { name: string; align?: "horizontal" | "vertical" } & Omit<
    FieldProps,
    "error"
  >
>;

export default function RadioFieldForm(props: RadioFormProps) {
  const { name, children, align, label, caption, autoHide, ...input } = props;

  const [{ value, onChange }, meta] = useField<string | undefined>(name);

  return (
    <Field
      error={meta.touched && meta.error}
      label={label}
      caption={meta.touched && meta.error ? meta.error : caption}
      autoHide={autoHide}
    >
      <RadioGroup
        value={value}
        onChange={onChange}
        name={name}
        error={meta.touched && meta.error ? true : false}
        align={align}
      >
        {children}
      </RadioGroup>
    </Field>
  );
}
