import { useField } from "formik";
import React from "react";
import EditorField, { EditorFieldProps } from "./editor-field";

export type EditorFieldFormProps = { name: string } & Omit<
  EditorFieldProps,
  "value" | "onChange" | "error"
>;

export default function EditorFieldForm(props: EditorFieldFormProps) {
  const { name, ...input } = props;
  const [{ value }, meta, { setValue }] = useField<string>(name);

  return (
    <EditorField
      name={name}
      {...input}
      error={meta.touched && meta.error}
      value={value}
      onChange={setValue}
    />
  );
}
