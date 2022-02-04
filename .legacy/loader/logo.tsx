import { PropsWithChildren } from "react";
import { useStyletron } from "styletron-react";

export default function LogoLoader(
  props: PropsWithChildren<{ relative?: boolean }>
) {
  const [css] = useStyletron();

  const content = <div id="suspense">{props.children}</div>;

  if (props.relative) {
    return (
      <div
        className={css({
          position: "relative",
          minHeight: "48px",
        })}
      >
        {content}
      </div>
    );
  }

  return content;
}
