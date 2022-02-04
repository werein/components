import { FastField, FastFieldProps } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { useStyletron } from "styletron-react";
import CheckboxFieldForm from "./checkbox-field-form";
import Field, { FieldProps } from "./field";

type WeekDayFieldFormProps = { name: string } & FieldProps;

export default function WeekDayFieldForm(props: WeekDayFieldFormProps) {
  const { autoHide, classNameField, name, label, caption, error } = props;
  const [css] = useStyletron();
  const [t] = useTranslation();

  return (
    <FastField name={name}>
      {({ field, form, meta }: FastFieldProps<string | number | undefined>) => (
        <Field
          classNameField={classNameField}
          autoHide={autoHide}
          error={meta.touched && !!meta.error}
          label={label}
          caption={(meta.touched && meta.error) || caption}
        >
          <div
            className={css({
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            })}
          >
            <CheckboxFieldForm name={`${props.name}.1`}>
              {t("exp.days-of-week.monday")}
            </CheckboxFieldForm>
            <CheckboxFieldForm name={`${props.name}.2`}>
              {t("exp.days-of-week.tuesday")}
            </CheckboxFieldForm>
            <CheckboxFieldForm name={`${props.name}.3`}>
              {t("exp.days-of-week.wednesday")}
            </CheckboxFieldForm>
            <CheckboxFieldForm name={`${props.name}.4`}>
              {t("exp.days-of-week.thursday")}
            </CheckboxFieldForm>
            <CheckboxFieldForm name={`${props.name}.5`}>
              {t("exp.days-of-week.friday")}
            </CheckboxFieldForm>
            <CheckboxFieldForm name={`${props.name}.6`}>
              {t("exp.days-of-week.saturday")}
            </CheckboxFieldForm>
            <CheckboxFieldForm name={`${props.name}.0`}>
              {t("exp.days-of-week.sunday")}
            </CheckboxFieldForm>
          </div>
        </Field>
      )}
    </FastField>
  );
}
