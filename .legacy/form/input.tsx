import { Input as BaseInput } from "baseui/input";
import React, { ReactNode } from "react";
import { StyleObject } from "styletron-react";

export interface InputProps {
  name?: string;
  value?: string | number;
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  style?: StyleObject;
  clearable?: boolean;
}

export default function Input(props: InputProps) {
  const {
    name,
    value,
    onChange,
    placeholder,
    disabled,
    onBlur,
    error,
    style = {},
    clearable,
  } = props;

  return (
    <BaseInput
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      onBlur={onBlur}
      error={error}
      startEnhancer={props.prefix}
      endEnhancer={props.suffix}
      clearable={clearable}
      overrides={{
        Root: {
          style,
        },
      }}
    />
  );
}
