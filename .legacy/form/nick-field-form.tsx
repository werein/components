import { useField } from "formik";
import { ReactNode } from "react";
import { InputFieldProps } from "./input-field";
import InputFieldForm from "./input-field-form";

export function NickFieldForm(
  props: InputFieldProps & {
    caption?: (n: string) => ReactNode;
  }
) {
  const [{ value }] = useField(props.name);
  return (
    <InputFieldForm
      {...props}
      caption={props.caption && props.caption(value)}
    />
  );
}
