import { FastField, FastFieldProps } from "formik";
import React, { PropsWithChildren } from "react";
import SliderField, { SliderFieldProps } from "./slider-field";

export type SliderFieldFormProps = {
  name: string;
  placeholder?: string;
} & Omit<SliderFieldProps, "error" | "onChange" | "value">;

export default function SliderFieldForm(
  props: PropsWithChildren<SliderFieldFormProps>
) {
  const { name, ...input } = props;

  return (
    <FastField name={name}>
      {({ field, form, meta }: FastFieldProps<number[] | undefined>) => {
        return (
          <SliderField
            name={props.name}
            {...input}
            error={meta.touched && meta.error}
            value={field.value}
            onChange={(v) => form.setFieldValue(props.name, v)}
          />
        );
      }}
    </FastField>
  );
}
