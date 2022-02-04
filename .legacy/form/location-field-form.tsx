import { FastField, FastFieldProps } from "formik";
import React, { PropsWithChildren } from "react";
import LocationField, { LocationFieldProps } from "./location-field";

export type LocationFieldFormProps = {
  name: string;
  placeholder?: string;
} & Omit<LocationFieldProps, "error" | "setValue" | "value">;

export default function LocationFieldForm(
  props: PropsWithChildren<LocationFieldFormProps>
) {
  const { name, ...input } = props;

  return (
    <FastField name={name}>
      {({
        field,
        form,
        meta,
      }: FastFieldProps<
        { latitude?: number; longitude?: number; address?: string } | undefined
      >) => {
        const error = (meta.error as any) as
          | { latitude?: string; longitude?: string; address?: string }
          | string;
        const errorMessage =
          typeof error === "object"
            ? error.address || error.latitude || error.longitude
            : meta.error;

        return (
          <LocationField
            name={props.name}
            {...input}
            error={errorMessage}
            value={field.value}
            setValue={(v) => form.setFieldValue(props.name, v)}
          />
        );
      }}
    </FastField>
  );
}
