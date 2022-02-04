import React, { PropsWithChildren } from "react";
import { useStyletron } from "styletron-react";
import Field, { FieldProps } from "./field";
import Input, { InputProps } from "./input";

export type InputFieldProps = PropsWithChildren<{ name: string }> &
  FieldProps &
  Omit<InputProps, "error">;

export default function InputField(props: InputFieldProps) {
  const {
    children,
    autoHide,
    classNameField,
    name,
    label,
    caption,
    error,
    value,
    onChange,
    onBlur,
    inline,
    ...input
  } = props;
  const [css] = useStyletron();

  return (
    <Field
      classNameField={classNameField}
      autoHide={autoHide}
      error={error}
      label={label}
      caption={error || caption}
      inline={inline}
    >
      <div
        className={css({
          display: "flex",
          gap: "0.5rem",
        })}
      >
        <Input
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={!!error}
          {...input}
        />
        {children}
      </div>
    </Field>
  );
}
