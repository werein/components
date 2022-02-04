import * as locale from "date-fns/locale";
import { Languages } from "../utils/language";

export function localeDateFns(lang: Languages) {
  return lang === Languages.en ? locale["enUS"] : locale[lang];
}
