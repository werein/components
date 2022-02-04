import { PropsWithChildren, ReactNode } from "react";
import { useLanguage } from "./utils/language";

export default function DateFormat(
  props: PropsWithChildren<{
    date: string | Date | undefined | null;
    long?: boolean;
    fallback?: ReactNode;
  }>
) {
  const { dateFormat } = useLanguage();

  if (!props.date) {
    return <>{props.fallback}</>;
  }

  return <>{dateFormat(props.date, { long: props.long })}</>;
}
