import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useStyletron } from "styletron-react";
import { borderRadius } from "../utils/css";
import Field, { FieldProps } from "./field";
import Input from "./input";

export interface ValueRangeProps {
  value?: [number | null, number | null];
  onChange: (v: [number | null, number | null]) => void;
  suffix?: [ReactNode?, ReactNode?];
  template?: string;
}

export type ValueRangeFieldProps = { name: string } & FieldProps &
  ValueRangeProps;

export default function ValueRangeField(props: ValueRangeFieldProps) {
  const [t] = useTranslation();
  const [css] = useStyletron();
  const {
    autoHide,
    classNameField,
    name,
    label,
    caption,
    error,
    // value,
    suffix,
    onChange = () => {},
    template = "1fr 1fr",
    ...input
  } = props;

  return (
    <Field
      classNameField={classNameField}
      autoHide={autoHide}
      error={error}
      label={label}
      caption={error || caption}
    >
      <div
        className={css({
          display: "grid",
          gridTemplateColumns: template,
        })}
      >
        <Input
          style={{
            ...borderRadius("1rem 0 0 1rem"),
          }}
          prefix={t("field.article.price.prefix.from")}
          value={props.value?.[0] || ""}
          suffix={suffix && suffix[0]}
          onChange={(e: any) => {
            const parsed = parseFloat(e.target.value);
            onChange([parsed ? parsed : null, props.value?.[1] || null]);
          }}
          clearable
        />
        <Input
          style={{
            ...borderRadius("0 1rem 1rem 0"),
            borderLeft: "none",
          }}
          prefix={t("field.article.price.prefix.to")}
          suffix={suffix && suffix[1]}
          value={props.value?.[1] || ""}
          onChange={(e: any) => {
            const parsed = parseFloat(e.target.value);

            onChange([props.value?.[0] || null, parsed ? parsed : null]);
          }}
          clearable
        />
      </div>
    </Field>
  );
}
