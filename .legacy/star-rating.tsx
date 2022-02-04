import { StarRating as BaseStarRating } from "baseui/rating";
import React, { Fragment, PropsWithChildren } from "react";
import { StyleObject, useStyletron } from "styletron-react";

export interface StarRatingProps {
  value?: number | null;
  disabled?: boolean;
  onChange?: (v: number) => void;
  size?: number;
}

export default function StarRating(props: PropsWithChildren<StarRatingProps>) {
  const [css] = useStyletron();
  const { value, disabled, size } = props;

  const disabledCss: StyleObject = disabled
    ? {
        pointerEvents: "none",
      }
    : {};

  if ((value === undefined || value === null) && disabled) {
    return <Fragment />;
  }

  return (
    <div>
      <span
        className={css({
          ...disabledCss,
        })}
      >
        <BaseStarRating
          overrides={{
            Root: {
              style: {
                display: "flex",
                flexShrink: 0,
              },
            },
          }}
          size={size}
          value={value || 0}
          numItems={5}
          onChange={({ value }) => props.onChange && props.onChange(value)}
        />
      </span>
      {props.children}
    </div>
  );
}
