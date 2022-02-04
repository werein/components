import { Textarea as BaseTextarea } from "baseui/textarea";
import React from "react";
import { border } from "./utils/css";

export interface TextareaProps {
  name?: string;
  value?: string | number;
  onChange?: (event: React.FormEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  autoFocus?: boolean;
}

export default function Textarea(props: TextareaProps) {
  const {
    name,
    value,
    onChange,
    placeholder,
    disabled,
    onBlur,
    error,
    autoFocus,
  } = props;

  return (
    <BaseTextarea
      autoFocus={autoFocus}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      error={error}
      onBlur={onBlur}
      disabled={disabled}
      size="large"
      overrides={{
        InputContainer: {
          style: {
            boxSizing: "border-box",
            ...border(),
          },
        },
      }}
    />
  );
}
