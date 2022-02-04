import { Theme, useStyletron } from "baseui";
import { SIZE } from "baseui/button";
import { Spinner } from "baseui/icon";
import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { StyleObject } from "styletron-react";
import { ButtonAppearance, ButtonProps, ButtonRadius } from "../button/button";
import { border, borderRadius, padding } from "../utils/css";

export type LinkButtonProps = {
  to: string;
  target?: "_blank";
} & ButtonProps;

function styles(
  appearance: ButtonAppearance = ButtonAppearance.primary,
  theme: Theme
): StyleObject {
  switch (appearance) {
    case ButtonAppearance.primary:
      return {
        color: theme.colors.buttonPrimaryText,
        backgroundColor: theme.colors.buttonPrimaryFill,
        ":hover": {
          backgroundColor: theme.colors.buttonPrimaryHover,
        },
      };
    case ButtonAppearance.secondary:
      return {
        color: theme.colors.buttonSecondaryText,
        backgroundColor: theme.colors.buttonSecondaryFill,
        ":hover": {
          backgroundColor: theme.colors.buttonSecondaryHover,
        },
      };
    case ButtonAppearance.tertiary:
      return {
        color: theme.colors.buttonTertiaryText,
        backgroundColor: theme.colors.buttonTertiaryFill,
        ":hover": {
          backgroundColor: theme.colors.buttonTertiaryHover,
        },
      };
    case ButtonAppearance.minimal:
      return {
        color: theme.colors.buttonMinimalText,
        backgroundColor: theme.colors.buttonMinimalFill,
        textDecoration: "underline",
        textDecorationColor: theme.colors.buttonMinimalText,
        ":hover": {
          backgroundColor: theme.colors.buttonMinimalHover,
        },
      };
    case ButtonAppearance.outline:
      return {
        color: theme.colors.buttonMinimalText,
        backgroundColor: theme.colors.buttonMinimalFill,
        ":hover": {
          backgroundColor: theme.colors.buttonMinimalHover,
        },
      };
    default:
      return {};
  }
}

function sizes(
  size: SIZE[keyof SIZE] = SIZE.compact,
  theme: Theme
): StyleObject {
  switch (size) {
    case SIZE.default:
      return {
        ...padding("14px 16px"),
        ...theme.typography.LabelMedium,
      };
    case SIZE.large:
      return {
        ...padding("16px 20px"),
        ...theme.typography.LabelLarge,
      };
    case SIZE.mini:
      return {
        ...padding("6px 8px"),
        ...theme.typography.LabelXSmall,
      };
    case SIZE.compact:
      return {
        ...padding("10px 12px"),
        ...theme.typography.LabelSmall,
      };
    default:
      return {};
  }
}

export default function LinkButton(props: PropsWithChildren<LinkButtonProps>) {
  const { to, target, radius, appearance, disabled, isLoading, style, size } =
    props;
  const [css, theme] = useStyletron();

  const disabledOrLoading = disabled || isLoading;

  const className = css({
    "-webkit-box-orient": "horizontal",
    "-webkit-box-direction": "normal",
    textDecoration: "none",
    display: "inline-flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    transitionTimingFunction: "cubic-bezier(0, 0, 1, 1)",
    transitionDuration: "200ms",
    transitionProperty: "background",
    ...(theme.borders.useRoundedCorners
      ? borderRadius(theme.borders.buttonBorderRadius)
      : {}),
    ...styles(appearance, theme),
    ...sizes(size, theme),
    ...(radius === ButtonRadius.round
      ? borderRadius(theme.borders.radius500)
      : {}),
    ...(radius === ButtonRadius.square ? borderRadius("0") : {}),
    ...(disabledOrLoading
      ? {
          touchAction: "none",
          cursor: "not-allowed",
          backgroundColor: theme.colors.buttonDisabledFill,
          color: theme.colors.buttonDisabledText,
          ":hover": {
            backgroundColor: theme.colors.buttonDisabledFill,
          },
        }
      : {
          touchAction: "auto",
          cursor: "pointer",
        }),
    ...(appearance === ButtonAppearance.outline
      ? {
          ...border({
            style: "solid",
            width: "2px",
            color: theme.colors.buttonSecondaryFill,
          }),
          ...(disabledOrLoading
            ? {
                backgroundColor: "inherit",
                ":hover": {
                  backgroundColor: "inherit",
                },
              }
            : {}),
        }
      : {}),
    ...style,
  });

  const content = (
    <>
      {props.icon && (
        <span
          className={css(
            props.children
              ? { marginRight: "0.5rem", lineHeight: 0 }
              : { lineHeight: 0 }
          )}
        >
          {props.icon}
        </span>
      )}
      {isLoading ? <Spinner /> : props.children}
    </>
  );

  if (target === "_blank") {
    return (
      <a href={to} target="_blank" className={className}>
        {content}
      </a>
    );
  }

  if (disabledOrLoading) {
    return <span className={className}>{content}</span>;
  }

  return (
    <Link to={to} className={className}>
      {content}
    </Link>
  );
}
