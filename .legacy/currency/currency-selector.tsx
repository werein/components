import Select from "react-select";
import { useStyletron } from "styletron-react";
import { useCurrency } from "../utils/currency";
import { useLanguage } from "../utils/language";
import useCashify from "../utils/use-cashify";

export default function CurrencySelector() {
  const [css] = useStyletron();
  const [_, rate] = useCashify();
  const availableCurrencies = [rate.base, ...Object.keys(rate.rates)];
  const { currency, setCurrency } = useCurrency();
  const { priceFormat } = useLanguage();

  const options = availableCurrencies.map((c) => ({
    value: c,
    label: priceFormat(1, c)?.replace("1", ""),
  }));

  return (
    <Select
      className={css({
        width: "100px",
      })}
      menuPlacement="top"
      isMulti={false}
      onChange={(v: any) => {
        if (v.value) {
          setCurrency(v.value);
        }
      }}
      value={options.filter((s) => s.value === currency)}
      options={options}
    />
  );
}
