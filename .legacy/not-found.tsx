import { useTranslation } from "react-i18next";
import { useStyletron } from "styletron-react";
import { margin, padding } from "./utils/css";

export default function NotFound() {
  const [t] = useTranslation();
  const [css] = useStyletron();

  return (
    <div
      className={css({
        maxWidth: "960px",
        ...padding("1rem"),
        ...margin("0 auto"),
      })}
    >
      <h1>{t("not-found.message")}</h1>
      <div
        className={css({
          marginTop: "1rem",
        })}
      >
        {t("not-found.description")}
      </div>
    </div>
  );
}
