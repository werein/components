import React, { PropsWithChildren } from "react";
import { useStyletron } from "styletron-react";

export default function List(props: PropsWithChildren<{}>) {
  const [css] = useStyletron();
  return <div>{props.children}</div>;
}
