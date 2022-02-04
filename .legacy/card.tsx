import { Card as BaseCard } from "baseui/card";
import React, { PropsWithChildren } from "react";
import { useStyletron } from "styletron-react";
import { borderColor, borderRadius, margin, padding } from "./utils/css";

export default function Card(props: PropsWithChildren<{}>) {
  const [css] = useStyletron();
  return (
    <div>
      <BaseCard
        overrides={{
          Root: {
            style: {
              boxShadow:
                "0 4px 30px 0 rgba(0, 0, 0, 0.1), 0 2px 5px 0 rgba(0, 0, 0, 0.05)",
              ...borderRadius("2rem"),
              ...borderColor("transparent"),
              "@media screen and (max-width: 880px)": {
                ...borderRadius("0"),
              },
            },
          },
          Contents: {
            style: {
              "@media screen and (max-width: 880px)": {
                ...margin("0"),
              },
            },
          },
          Body: {
            style: {
              "@media screen and (max-width: 880px)": {
                ...margin("0"),
              },
            },
          },
        }}
      >
        <div
          className={css({
            ...padding("0.5rem"),
          })}
        >
          {props.children}
        </div>
      </BaseCard>
    </div>
  );
}
