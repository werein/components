import { useField } from "formik";
import StarRating, { StarRatingProps } from "../star-rating";
import Field, { FieldProps } from "./field";

export type StarRatingFieldFormProps = { name: string } & Omit<
  FieldProps,
  "error"
> &
  Omit<StarRatingProps, "value" | "onChange">;

export default function StarRatingFieldForm(props: StarRatingFieldFormProps) {
  const { name, label, caption, autoHide, ...input } = props;
  const [{ value }, meta, { setValue }] = useField(name);

  return (
    <Field
      error={meta.touched && meta.error}
      label={label}
      caption={caption}
      autoHide={autoHide}
    >
      <StarRating value={value} onChange={setValue} {...input} />
    </Field>
  );
}
