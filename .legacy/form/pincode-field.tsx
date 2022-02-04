import { PinCode } from "baseui/pin-code";
import React from "react";
import Field, { FieldProps } from "./field";

export interface PincodeProps {
  onChange: (value?: string) => void;
  value?: string;
  length: number;
}

export type PincodeFieldProps = { name: string } & FieldProps & PincodeProps;

export default function PincodeField(props: PincodeFieldProps) {
  const {
    name,
    label,
    caption,
    error,
    value,
    onChange,
    length,
    ...input
  } = props;

  const defaultValue = new Array(length).fill("");
  const splited = value?.split("");
  const v = defaultValue.map((_, i) =>
    splited && splited[i] ? splited[i] : ""
  );

  return (
    <Field error={error} label={label} caption={caption}>
      <PinCode
        name={name}
        values={v}
        error={!!error}
        onChange={({ values }) => onChange(values.join(""))}
      />
    </Field>
  );
}
