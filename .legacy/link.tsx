import { KIND } from "baseui/button";
import React, { PropsWithChildren } from "react";
import { Link as BaseLink } from "react-router-dom";
import { StyleObject, useStyletron } from "styletron-react";

interface LinkProps {
  to: string;
  appearance?: KIND["minimal"] | KIND["primary"] | KIND["secondary"];
  style?: StyleObject;
}

const style: StyleObject = {
  color: "inherit",
  backgroundColor: "rgba(0, 0,0, 0.1)",
  fontWeight: "bold",
  padding: "1rem",
  textAlign: "center",
};

const styles = {
  [KIND["minimal"]]: {
    ...style,
  },
  [KIND["primary"]]: {
    ...style,
    backgroundColor: "rgb(0, 0, 0)",
    color: "rgb(255, 255, 255)",
  },
  [KIND["secondary"]]: { ...style },
};

export default function Link(props: PropsWithChildren<LinkProps>) {
  const [css] = useStyletron();
  return (
    <BaseLink
      className={css({
        ...styles[props.appearance || KIND["minimal"]],
        ...props.style,
      })}
      to={props.to}
    >
      {props.children}
    </BaseLink>
  );
}
