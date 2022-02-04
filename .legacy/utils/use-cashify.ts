import { captureEvent } from "@sentry/react";
import { Cashify } from "cashify";
import { isBefore, parseISO, subDays } from "date-fns";
import { useEffect, useState } from "react";

export const DEFAULT_RATES = {
  rates: {
    CAD: 1.5307,
    HKD: 9.3684,
    ISK: 155.8,
    PHP: 58.616,
    DKK: 7.4362,
    HUF: 358.73,
    CZK: 25.864,
    AUD: 1.5518,
    RON: 4.8751,
    SEK: 10.0328,
    IDR: 16998.02,
    INR: 87.6695,
    BRL: 6.5252,
    RUB: 88.9872,
    HRK: 7.5765,
    JPY: 127.69,
    THB: 36.276,
    CHF: 1.0829,
    SGD: 1.6028,
    PLN: 4.4888,
    BGN: 1.9558,
    TRY: 8.3975,
    CNY: 7.8172,
    NOK: 10.2178,
    NZD: 1.6735,
    ZAR: 17.5602,
    USD: 1.2084,
    MXN: 24.389,
    ILS: 3.9403,
    GBP: 0.8654,
    KRW: 1336.85,
    MYR: 4.8844,
  },
  base: "EUR",
  date: "2021-02-18",
};
export interface Rate {
  base: string;
  date: string;
  rates: {
    [key: string]: number;
  };
}

async function getRates() {
  try {
    const response = await fetch("https://api.exchangeratesapi.io/latest");
    const result: Rate = await response.json();
    return result;
  } catch (error: any) {
    captureEvent(error);
  }

  return undefined;
}

async function getRatesLocal() {
  try {
    const response = await fetch("/rates.json");
    const result: Rate = await response.json();
    return result;
  } catch (error: any) {
    captureEvent(error);
  }

  return DEFAULT_RATES;
}

function parseCurrency() {
  const initial = {
    cashify: new Cashify(DEFAULT_RATES),
    rate: DEFAULT_RATES,
  };
  try {
    const parsed: Rate = JSON.parse(localStorage.getItem("rates") || "");
    if (parsed && parsed.base && parsed.date && parsed.rates) {
      const cashify = new Cashify(parsed);
      const rate = {
        base: parsed.base,
        date: parsed.date,
        rates: parsed.rates,
      };

      return {
        rate,
        cashify,
      };
    } else {
      return initial;
    }
  } catch (error) {
    return initial;
  }
}

export default function useCashify(): [Cashify, Rate] {
  const init = parseCurrency();
  const [cashify, setCashify] = useState(init.cashify);
  const [rate, setRate] = useState<Rate>(init.rate);

  async function setCurrency() {
    const result: Rate = await getRatesLocal();
    setCashify(new Cashify(result));
    setRate(result);
    localStorage.setItem("rates", JSON.stringify(result));
  }

  useEffect(() => {
    const yesterday = subDays(new Date(), 2);

    if (isBefore(parseISO(rate.date), yesterday)) {
      setCurrency();
    }
  }, []);

  // useEffect(() => {
  //   setCashify(new Cashify(rate));
  // }, [rate]);

  return [cashify, rate];
}
