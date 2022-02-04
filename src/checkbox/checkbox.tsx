import {
  Checkbox as BaseCheckbox,
  CheckboxOverrides,
  LABEL_PLACEMENT,
  STYLE_TYPE,
} from "baseui/checkbox";
import { PropsWithChildren } from "react";

export interface CheckboxProps {
  overrides?: CheckboxOverrides;
  name?: string;
  value?: boolean;
  error?: boolean;
  onChange?: (checked: boolean) => void;
  appearance?:
    | STYLE_TYPE["toggle"]
    | STYLE_TYPE["default"]
    | STYLE_TYPE["toggle_round"];
  disabled?: boolean;
  placement?:
    | LABEL_PLACEMENT["top"]
    | LABEL_PLACEMENT["right"]
    | LABEL_PLACEMENT["bottom"]
    | LABEL_PLACEMENT["left"];
}

export default function Checkbox(props: PropsWithChildren<CheckboxProps>) {
  return (
    <BaseCheckbox
      name={props.name}
      checked={props.value}
      checkmarkType={props.appearance || STYLE_TYPE.toggle_round}
      onChange={(e: any) => props.onChange && props.onChange(e.target.checked)}
      labelPlacement={props.placement || LABEL_PLACEMENT.right}
      error={props.error}
      disabled={props.disabled}
      overrides={props.overrides}
    >
      {props.children}
    </BaseCheckbox>
  );
}
