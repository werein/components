import {
  OnChangeParams,
  Select,
  SelectProps as BaseSelectProps,
} from "baseui/select";
import { isNil, reject } from "ramda";
import React from "react";
import { useTranslation } from "react-i18next";
import Field, { FieldProps } from "./field";

type SelectOption = {
  id: string;
  label: string;
};

export type SelectProps = {
  value?: string | string[];
  onChange?: (values?: string | string[]) => void;
  options: Array<SelectOption>;
} & Omit<BaseSelectProps, "value" | "onChange" | "options" | "error">;

export type SelectFieldProps = { name: string } & FieldProps & SelectProps;

export default function SelectField(props: SelectFieldProps) {
  const [t] = useTranslation();
  const {
    autoHide,
    name,
    label,
    caption,
    error,
    value,
    options,
    onChange,
    ...input
  } = props;

  const selectedValue = options.filter(({ id }) =>
    Array.isArray(value) ? value.find((v) => v === id) : id === value
  );

  const onSelect = (params: OnChangeParams) => {
    if (input.multi) {
      const fields = reject(isNil)(params.value.map(({ id }) => id));
      onChange && onChange(fields as any);
    } else {
      onChange && onChange(params.option?.id?.toString());
    }
  };

  return (
    <Field autoHide={autoHide} error={error} label={label} caption={caption}>
      <Select
        placeholder={input.placeholder || t("form.select-field.placeholder")}
        value={selectedValue}
        options={options}
        onChange={onSelect}
        error={!!error}
        {...input}
      />
    </Field>
  );
}
