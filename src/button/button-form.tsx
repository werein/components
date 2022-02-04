import { useFormikContext } from "formik";
import Button, { ButtonProps } from "./button";

export type ButtonFormProps = ButtonProps;

export default function ButtonForm(props: ButtonFormProps) {
  const { isSubmitting } = useFormikContext();
  return (
    <Button
      {...props}
      type="submit"
      isLoading={isSubmitting}
      disabled={isSubmitting}
    />
  );
}
