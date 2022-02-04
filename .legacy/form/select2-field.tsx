import { flatten } from "ramda";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import Field, { FieldProps } from "./field";

type Select2 = {
  hideNonExisting?: boolean;
  isMulti?: boolean;
  closeMenuOnSelect?: boolean;
  menuPlacement?: "auto" | "bottom" | "top";
  placeholder?: string;
};

type Select2Type = {
  label: string;
  value: string | number;
  options?: Array<{
    label: string;
    value: string | number;
  }>;
};

export type Select2Props = {
  value?: string | string[] | number | number[];
  options?: Select2Type[];
  onChange?: (value: string | number | (string | number)[]) => void;
} & Select2;

export type Select2FieldProps = { name: string } & FieldProps & Select2Props;

export default function Select2Field(props: Select2FieldProps) {
  const {
    autoHide,
    name,
    label,
    caption,
    error,
    classNameField,
    value,
    options = [],
    placeholder,
    ...input
  } = props;
  const [t] = useTranslation();

  const flat = flatten(
    options.map((o) => [
      ...(o.options || []),
      { label: o.label, value: o.value },
    ])
  );
  const values = value ? (Array.isArray(value) ? value : [value]) : null;
  const findInOptions = (value: string | number) =>
    value
      ? flat.find((o) => value == o.value) ||
        (props.hideNonExisting ? undefined : { label: value.toString(), value })
      : props.hideNonExisting
      ? undefined
      : { label: value.toString(), value };

  const selectValue = values?.map(findInOptions).filter((a) => a) as any;

  //   ValueType<
  //   {
  //     label: string;
  //     value: string | number;
  //   },
  //   false
  // >

  const onChange = (value: any) => {
    if (props.onChange) {
      if (Array.isArray(value)) {
        props.onChange(value.map((v) => v.value));
      } else {
        props.onChange((value as any)?.value);
      }
    }
  };

  return (
    <Field
      autoHide={autoHide}
      error={error}
      label={label}
      caption={caption}
      classNameField={classNameField}
    >
      <Select
        name={name}
        {...input}
        placeholder={placeholder || t("form.select2-field.placeholder")}
        options={options}
        value={selectValue}
        onChange={onChange}
      />
    </Field>
  );
}
