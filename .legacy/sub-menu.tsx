import React, { PropsWithChildren } from "react";
import * as Icon from "react-feather";
import { PlusCircle } from "react-feather";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import { useStyletron } from "styletron-react";
import NavButton from "./nav-button";
import { margin, padding } from "./utils/css";

export default function SubMenu(props: PropsWithChildren<{ title: string }>) {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const [css] = useStyletron();

  const isBusiness = pathname.includes("/care");

  return (
    <div
      className={css({
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        backgroundColor: "white",
        ...margin("0"),
        ...padding("0 0 1rem 0"),
        "@media screen and (max-width: 880px)": {
          flexDirection: "column",
          alignItems: "self-start",
        },
      })}
    >
      <h1
        className={css({
          ...margin("0"),
          fontSize: "1.5rem",
          color: "var(--black-87)",
        })}
      >
        {props.title}
      </h1>
      <div
        className={css({
          display: "grid",
          gridGap: "0.5rem",
          gridAutoFlow: "column",
          "@media screen and (max-width: 880px)": {
            marginTop: "1rem",
            gridAutoFlow: "row",
            width: "100%",
          },
        })}
      >
        <NavButton
          style={{ backgroundColor: "transparent" }}
          to="/advertise"
          icon={<PlusCircle size={16} />}
        >
          {t("sub-menu.advertise")}
        </NavButton>
        <NavButton to="/care/bookings">{t("sub-menu.bookings")}</NavButton>
        <NavButton to="/care/reservations">
          {t("sub-menu.reservations")}
        </NavButton>
        <NavButton to="/care/articles">{t("sub-menu.articles")}</NavButton>
        <NavButton to="/care/places">{t("sub-menu.places")}</NavButton>
        <NavButton to="/care/blog">Blog</NavButton>
        <NavButton to="/care/account">{t("sub-menu.account")}</NavButton>
        {/* <NavButton to="/home">
          <Icon.Home size={16} />
        </NavButton> */}
        <NavButton to="/care/home">
          <Icon.Layout size={16} />
        </NavButton>
      </div>
    </div>
  );
}
