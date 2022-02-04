import { FormControl, FormControlOverrides } from "baseui/form-control";
import { mergeDeepRight } from "ramda";
import { PropsWithChildren, ReactNode } from "react";
import { useStyletron } from "styletron-react";
import { margin } from "../utils/css";

export interface FieldProps {
  classNameField?: string;
  label?: string | ReactNode;
  caption?: string | ReactNode;
  error?: string | ReactNode;
  autoHide?: boolean;
  inline?: boolean;
  overrides?: FormControlOverrides;
}

export default function Field(props: PropsWithChildren<FieldProps>) {
  const [css] = useStyletron();
  const { overrides = {} } = props;
  return (
    <div
      className={
        props.classNameField ||
        css({
          ...(props.inline
            ? {
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }
            : {}),
        })
      }
    >
      <FormControl
        label={props.label ? () => props.label : undefined}
        caption={() =>
          props.caption || (props.autoHide ? undefined : <div>&nbsp;</div>)
        }
        error={props.error}
        overrides={mergeDeepRight(
          {
            ControlContainer: {
              style: {
                marginTop: 0,
                marginRight: 0,
                marginBottom: 0,
                marginLeft: 0,
              },
            },
            Caption: {
              style: props.caption
                ? {
                    marginTop: "0.2rem",
                    marginRight: 0,
                    marginBottom: 0,
                    marginLeft: 0,
                  }
                : margin("0"),
            },
            Label: {
              style: {
                marginTop: "0.5rem",
                marginRight: 0,
                marginBottom: "0.5rem",
                marginLeft: 0,
                ...(props.inline
                  ? {
                      display: "flex",
                      alignItems: "center",
                    }
                  : {}),
              },
            },
          },
          overrides
        )}
      >
        {props.children}
      </FormControl>
    </div>
  );
}
