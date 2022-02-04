import { useStyletron } from "baseui";
import { Spinner } from "baseui/icon";
import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { ButtonAppearance, ButtonProps } from "./button/button";
import { border, borderRadius, padding } from "./utils/css";

interface LinkButtonProps {
  to: string;
  target?: "_blank";
}

export default function LinkButton(
  props: PropsWithChildren<LinkButtonProps & ButtonProps>
) {
  const { to, target, radius, appearance, disabled, isLoading } = props;
  const [css, theme] = useStyletron();

  const disabledOrLoading = disabled || isLoading;

  const className = css({
    touchAction: disabled ? "none" : "auto",
    cursor: "pointer",
    color: "var(--font-dark-gray)",
    ...(appearance === "primary" && { color: "var(--white)" }),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "5px",
    fontFamily: 'system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif',
    fontSize: "14px",
    ...padding("10px 12px"),
    fontWeight: 500,
    lineHeight: "16px",
    ...border(
      props.appearance === ButtonAppearance.outline
        ? border({
            style: "solid",
            width: "2px",
            color: theme.colors.buttonSecondaryFill,
          })
        : undefined
    ),
    ...borderRadius(radius === "round" ? "2rem" : "32px"),
    backgroundColor: "transparent",
    ...(appearance === "secondary" && {
      backgroundColor: "rgb(238, 238, 238)",
    }),
    ...(appearance === "primary" && {
      backgroundColor: "rgb(0, 0, 0)",
    }),
    ...(disabledOrLoading && { backgroundColor: "rgb(238, 238, 238)" }),
    ":hover": {
      backgroundColor: "rgb(246, 246, 246)",
      ...(appearance === "secondary" && {
        backgroundColor: "rgb(226, 226, 226)",
      }),
      ...(appearance === "primary" && { backgroundColor: "rgb(51, 51, 51)" }),
    },
    ":active": {
      background: "rgb(238, 238, 238)",
    },
    ...props.style,
  });

  if (target === "_blank") {
    return (
      <a href={to} target="_blank" className={className}>
        {props.icon}
        {props.children}
      </a>
    );
  }

  if (disabledOrLoading) {
    return (
      <span className={className}>
        {props.icon}
        {isLoading ? <Spinner /> : props.children}
      </span>
    );
  }

  return (
    <Link to={to} className={className}>
      {props.icon}
      {props.children}
    </Link>
  );
}
