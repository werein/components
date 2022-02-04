import { useField } from "formik";
import Textarea, { TextareaProps } from "../textarea";
import Field, { FieldProps } from "./field";

export type TextareaFieldFormProps = { name: string } & Omit<
  FieldProps,
  "error"
> &
  Omit<TextareaProps, "onChange" | "onBlur" | "value" | "name">;

export default function TextareaFieldForm(props: TextareaFieldFormProps) {
  const { name, label, caption, autoHide, ...input } = props;
  const [{ value, onBlur, onChange }, meta] = useField(name);

  return (
    <Field
      error={meta.touched && meta.error}
      label={label}
      caption={meta.touched && meta.error ? meta.error : caption}
      autoHide={autoHide}
    >
      <Textarea
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={meta.touched && !!meta.error}
        {...input}
      />
    </Field>
  );
}
