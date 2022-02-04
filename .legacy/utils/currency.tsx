import { Cashify } from "cashify";
import React, { useContext } from "react";
import { Languages, useLanguage } from "./language";

interface CurrencyContext {
  currency: string;
  setCurrency: (currency: string) => void;
  cashify: Cashify;
}

export const CurrencyContext = React.createContext<CurrencyContext>({
  currency: "CZK",
  setCurrency: () => {},
  cashify: new Cashify({}),
});

export function useCurrency() {
  const { currency, setCurrency, cashify } = useContext(CurrencyContext);
  const { priceFormat } = useLanguage();

  function convert(
    amount: number | undefined,
    inputCurrency: string,
    fallback?: string
  ) {
    if (!amount) {
      return fallback;
    }

    const formatted = priceFormat(
      cashify.convert(amount, {
        from: inputCurrency,
        to: currency,
      }),
      currency
    );

    return formatted;
  }

  const translatedCurrency = priceFormat(1, currency)?.replace("1", "");

  return {
    currency,
    setCurrency,
    cashify,
    convert,
    translatedCurrency,
  };
}

function defaultCurrency(lang: Languages) {
  switch (lang) {
    case Languages.cs:
      return "CZK";
    default:
      return "EUR";
  }
}

export function getDefaultLang() {
  return (localStorage.getItem("lang") as Languages) || Languages.cs;
}

export function getDefaulCurrency(lang?: Languages) {
  return localStorage.getItem("currency") || (lang && defaultCurrency(lang));
}
