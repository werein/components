import { useField } from "formik";
import { PropsWithChildren } from "react";
import { FieldProps } from "../field/field";
import { CheckboxProps } from "./checkbox";
import CheckboxField from "./checkbox-field";

export type CheckboxFieldFormProps = { name: string } & Omit<
  CheckboxProps,
  "onChange" | "value"
> &
  Omit<FieldProps, "error">;

export default function CheckboxFieldForm(
  props: PropsWithChildren<CheckboxFieldFormProps>
) {
  const { name, label, caption, autoHide, children, disabled, ...input } =
    props;
  const [{ value }, meta, { setValue }] = useField(name);

  return (
    <CheckboxField
      label={label}
      caption={caption}
      autoHide={autoHide}
      name={name}
      error={meta.touched && meta.error}
      onChange={setValue}
      value={value}
      disabled={disabled}
      {...input}
    >
      {children}
    </CheckboxField>
  );
}
