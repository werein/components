import { format, parseISO } from "date-fns";
import React, { useContext } from "react";
import { localeDateFns } from "../utils/date-fns";

const { HOST } = process.env;

export enum Languages {
  cs = "cs",
  en = "en",
  de = "de",
}

interface LanguageContext {
  lang: Languages;
  setLang: (lang: Languages) => void;
}

export const LanguageContext = React.createContext<LanguageContext>({
  lang: undefined as any,
  setLang: () => {},
});

export function useLanguage() {
  const { lang, setLang } = useContext(LanguageContext);

  const dateFormat = (date: string | Date, props: { long?: boolean } = {}) => {
    const day = date instanceof Date ? date : parseISO(date);
    return format(day, props.long ? "PPP" : "PP", {
      locale: localeDateFns(lang),
    });
  };

  const priceFormat = (
    price: number | undefined,
    currency?: string | undefined
  ) => {
    return price?.toLocaleString(lang, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });
  };

  return {
    lang,
    setLang,
    host: HOST,
    dateFormat,
    priceFormat,
  };
}

function getDefaultLang() {
  return (localStorage.getItem("lang") as Languages) || Languages.cs;
}
