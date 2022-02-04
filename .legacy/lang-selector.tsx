import Select from "react-select";
import { useStyletron } from "styletron-react";
import { Languages, useLanguage } from "./utils/language";

const defaultLang = {
  value: Languages.cs,
  label: "Čeština",
};

const supportedLanguages = [
  {
    value: Languages.en,
    label: "English",
  },
  {
    value: Languages.de,
    label: "Deutsch",
  },
  defaultLang,
];

export default function LangSelector() {
  const [css] = useStyletron();
  const { setLang, lang } = useLanguage();

  const selectedLanguage =
    supportedLanguages.find((l) => l.value === lang) || defaultLang;

  return (
    <Select
      className={css({
        width: "120px",
      })}
      menuPlacement="top"
      isMulti={false}
      onChange={(v: any) => {
        if (v.value) {
          setLang(v.value);
        }
      }}
      value={selectedLanguage}
      options={supportedLanguages}
    />
  );
}
