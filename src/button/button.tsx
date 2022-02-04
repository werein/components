import { useStyletron } from "baseui";
import { Button as BaseButton, ButtonOverrides, SIZE } from "baseui/button";
import { mergeDeepRight } from "ramda";
import { PropsWithChildren, ReactNode, Ref } from "react";
import { StyleObject } from "styletron-react";
import { border, borderRadius } from "../utils/css";

export enum ButtonAppearance {
  minimal = "minimal",
  primary = "primary",
  secondary = "secondary",
  tertiary = "tertiary",
  outline = "outline",
}

export enum ButtonRadius {
  square = "square",
  round = "round",
}

export type ButtonProps = PropsWithChildren<{
  ref?: Ref<any>;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any;
  style?: StyleObject;
  radius?: ButtonRadius;
  appearance?: ButtonAppearance;
  size?: SIZE[keyof SIZE];
  isLoading?: boolean;
  disabled?: boolean;
  type?: "submit" | "button";
  icon?: ReactNode;
  overrides?: ButtonOverrides;
  startEnhancer?: ReactNode;
  endEnhancer?: ReactNode;
  outline?: boolean;
}>;

export default function Button(props: ButtonProps) {
  const [css, theme] = useStyletron();

  const {
    appearance,
    size,
    overrides = {},
    style = {},
    radius,
    outline,
  } = props;
  const kind =
    props.appearance === ButtonAppearance.outline
      ? ButtonAppearance.minimal
      : props.appearance;

  return (
    <BaseButton
      ref={props.ref}
      overrides={mergeDeepRight(
        {
          BaseButton: {
            style: () => ({
              ...(props.startEnhancer || props.endEnhancer
                ? { justifyContent: "space-between" }
                : {}),
              ...(appearance === ButtonAppearance.outline || outline
                ? border({
                    style: "solid",
                    width: "2px",
                    color: theme.colors.buttonSecondaryFill,
                  })
                : {}),
              ...(radius === ButtonRadius.round
                ? borderRadius(theme.borders.radius500)
                : {}),
              ...(radius === ButtonRadius.square ? borderRadius("0") : {}),
              ...style,
            }),
          },
        },
        overrides
      )}
      type={props.type || "button"}
      onClick={props.onClick}
      size={size || SIZE.compact}
      kind={kind}
      isLoading={props.isLoading}
      disabled={props.disabled}
      startEnhancer={props.startEnhancer}
      endEnhancer={props.endEnhancer}
    >
      {props.icon && (
        <span
          className={css(
            props.children
              ? { marginRight: "12px", lineHeight: 0 }
              : { lineHeight: 0 }
          )}
        >
          {props.icon}
        </span>
      )}
      {props.children}
    </BaseButton>
  );
}
