import { Fragment, ReactNode } from "react";

export default function Currency(props: {
  children?: (value?: string) => void;
  amount?: number | null;
  currency: string;
  fallback?: string | ReactNode;
}) {
  return <Fragment />;
  // const { currency, cashify } = useCurrency();
  // const { priceFormat } = useLanguage();

  // if (!props.amount) {
  //   return <>{props.fallback}</>;
  // }

  // const formatted = priceFormat(
  //   cashify.convert(props.amount, {
  //     from: props.currency,
  //     to: currency,
  //   }),
  //   currency
  // );

  // if (props.children) {
  //   return <>{props.children(formatted)}</>;
  // }

  // return <>{formatted}</>;
}
