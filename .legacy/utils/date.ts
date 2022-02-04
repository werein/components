import { subMinutes } from "date-fns";

export function utc(date: Date, dateOnly?: boolean) {
  const result = subMinutes(date, new Date().getTimezoneOffset()).toISOString();

  if (dateOnly) {
    return result.split("T")[0];
  }

  return result;
}
