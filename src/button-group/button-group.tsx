import { useStyletron } from "baseui";
import { SIZE } from "baseui/button";
import Button, {
  ButtonAppearance,
  ButtonProps,
  ButtonRadius,
} from "../button/button";
import LinkButton from "../link/link-button";
import { borderRadius } from "../utils/css";

export default function ButtonGroup(props: {
  buttons: Array<ButtonProps & { to?: string; target?: "_blank" }>;
  radius?: ButtonRadius;
  appearance?: ButtonAppearance;
  size?: SIZE[keyof SIZE];
}) {
  const [, theme] = useStyletron();

  const size =
    props.radius === ButtonRadius.round
      ? theme.borders.radius500
      : props.radius === ButtonRadius.square
      ? "0"
      : theme.borders.buttonBorderRadius;

  function getBorderRadius(i: number) {
    if (props.buttons.length === 1) {
      return borderRadius(size);
    }

    if (i > 0 && i < props.buttons.length - 1) {
      return borderRadius("0");
    }
    if (i === 0) {
      return borderRadius(`${size} 0 0 ${size}`);
    }

    return borderRadius(`0 ${size} ${size} 0`);
  }

  function getBorderWidth(i: number) {
    if (props.buttons.length === 1) {
      return {};
    }

    if (i > 0 && i < props.buttons.length - 1) {
      return { borderRightWidth: "1px", borderLeftWidth: "1px" };
    }

    if (i === 0) {
      return { borderRightWidth: "1px" };
    }

    return { borderLeftWidth: "1px" };
  }

  return (
    <>
      {props.buttons.map((prop, i) => {
        if (prop.to) {
          return (
            <LinkButton
              {...prop}
              to={prop.to}
              target={prop.target}
              appearance={props.appearance}
              size={props.size}
              style={{
                ...prop.style,
                ...getBorderRadius(i),
                ...getBorderWidth(i),
              }}
            />
          );
        }

        return (
          <Button
            {...prop}
            appearance={props.appearance}
            size={props.size}
            style={{
              ...prop.style,
              ...getBorderRadius(i),
              ...getBorderWidth(i),
            }}
          />
        );
      })}
    </>
  );
}
