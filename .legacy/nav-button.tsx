import React, { PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";
import { ButtonAppearance, ButtonProps } from "./button/button";
import LinkButton from "./link-button";

interface NavButtonProps {
  to: string;
  target?: "_blank";
}

export default function NavButton(
  props: PropsWithChildren<NavButtonProps & ButtonProps>
) {
  const { to } = props;
  const { pathname } = useLocation();

  const appearance =
    props.appearance ||
    (pathname.includes(to)
      ? ButtonAppearance.outline
      : ButtonAppearance.secondary);

  return <LinkButton {...props} appearance={appearance} />;
}
