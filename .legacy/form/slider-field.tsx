import {
  Slider as BaseSlider,
  SliderProps as BaseSliderProps,
} from "baseui/slider";
import React, { useState } from "react";
import Field, { FieldProps } from "./field";
import Input from "./input";

export interface SliderProps {
  showFields?: boolean;
  range?: boolean;
  min: number;
  max: number;
  value?: number[];
  onChange: (v: number[]) => void;
}

export type SliderFieldProps = { name: string } & FieldProps &
  SliderProps &
  Omit<BaseSliderProps, "error" | "value" | "onChange" | "onFinalChange">;

export default function SliderField(props: SliderFieldProps) {
  const defaultValue =
    props.value || props.range ? [props.min, props.max] : [props.min];
  const [continuousValue, setContinuousValue] = useState(defaultValue);

  const {
    autoHide,
    classNameField,
    name,
    label,
    caption,
    error,
    // value,
    onChange = () => {},
    ...input
  } = props;

  return (
    <Field
      classNameField={classNameField}
      autoHide={autoHide}
      error={error}
      label={label}
      caption={error || caption}
    >
      <div>
        <BaseSlider
          {...input}
          value={continuousValue}
          onChange={(params) =>
            params.value && setContinuousValue(params.value)
          }
          onFinalChange={({ value }) => onChange(value)}
        />
        {props.showFields && (
          <>
            {props.range && (
              <>
                <Input
                  onChange={(e: any) =>
                    onChange([e.target.value, props.value?.[1]])
                  }
                />
                <Input
                  onChange={(e: any) =>
                    onChange([props.value?.[0], e.target.value])
                  }
                />
              </>
            )}
            {!props.range && (
              <Input onChange={(e: any) => onChange([e.target.value])} />
            )}
          </>
        )}
      </div>
    </Field>
  );
}
