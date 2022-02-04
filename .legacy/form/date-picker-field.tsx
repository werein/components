import { Datepicker, DatepickerProps } from "baseui/datepicker";
import * as locales from "date-fns/locale";
import React from "react";
import { useLanguage } from "../utils/language";
import Field, { FieldProps } from "./field";

export type DateInterval = { start?: Date; end?: Date };

type OnChangeDate = (date?: Date) => void;
type OnChangeDateInterval = (date: DateInterval) => void;
type OnChange = OnChangeDate & OnChangeDateInterval;

export type DatePickerFieldProps = {
  name?: string;
  value?: Date | DateInterval;
  onChange: OnChange;
} & FieldProps &
  Omit<DatepickerProps, "onChange" | "value" | "error" | "locale">;

export default function DatePickerField(props: DatePickerFieldProps) {
  const {
    name,
    autoHide,
    caption,
    label,
    value,
    onChange,
    error,
    classNameField,
    ...input
  } = props;

  const { lang } = useLanguage();

  const locale = lang === "en" ? locales["enUS"] : locales[lang];

  const setValue = (args: { date: Date | Date[] }) => {
    if (Array.isArray(args.date)) {
      const [start, end] = args.date;
      onChange({ start, end });
    } else {
      onChange(args.date);
    }
  };

  const formattedValue = [];

  if (value && "start" in value) {
    if (value.start) formattedValue.push(value.start);

    if (value.start && value.end) {
      formattedValue.push(value.end);
    }
  }

  return (
    <Field
      classNameField={classNameField}
      label={label}
      error={error}
      caption={caption}
      autoHide={autoHide}
    >
      <Datepicker
        formatString="dd.MM.yyyy"
        locale={locale}
        onChange={setValue}
        value={props.range ? formattedValue : (value as Date)}
        error={!!error}
        {...input}
      />
    </Field>
  );
}
