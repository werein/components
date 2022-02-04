import { PropsWithChildren } from "react";
import Field, { FieldProps } from "../field/field";
import Checkbox, { CheckboxProps } from "./checkbox";

export type CheckboxFieldProps = { name: string } & FieldProps &
  Omit<CheckboxProps, "error">;

export default function CheckboxField(
  props: PropsWithChildren<CheckboxFieldProps>
) {
  const { name, label, caption, autoHide, error, inline, ...input } = props;

  return (
    <Field
      error={error}
      label={label}
      caption={caption}
      autoHide={autoHide}
      inline={inline}
    >
      <Checkbox name={name} error={!!error} {...input} />
    </Field>
  );
}
