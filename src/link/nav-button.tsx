import { PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";
import { ButtonAppearance } from "../button/button";
import LinkButton, { LinkButtonProps } from "./link-button";

export type NavButtonProps = {
  active?: ButtonAppearance;
  appearance?: ButtonAppearance;
} & LinkButtonProps;

export default function NavButton(props: PropsWithChildren<NavButtonProps>) {
  const {
    to,
    active = ButtonAppearance.secondary,
    appearance = ButtonAppearance.outline,
    ...rest
  } = props;
  const { pathname } = useLocation();

  const currentAppearance = pathname.includes(to) ? active : appearance;

  return <LinkButton {...rest} to={to} appearance={currentAppearance} />;
}
