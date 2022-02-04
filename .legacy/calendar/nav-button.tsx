import { PropsWithChildren } from "react";
import { useStyletron } from "styletron-react";
import { border } from ".././utils/css";

export interface CalendarNavButtonProps {
  onClick?: () => void;
}

export default function CalendarNavButton({
  children,
  onClick,
}: PropsWithChildren<CalendarNavButtonProps>) {
  const [css] = useStyletron();
  return (
    <button
      type="button"
      onClick={onClick}
      className={css({
        ...border(),
        backgroundColor: "rgba(0, 0, 0, 0.03)",
        cursor: "pointer",
        padding: "0.5rem",
        borderRadius: "100%",
        ":hover": {
          backgroundColor: "rgba(0, 0, 0, 0.05)",
        },
      })}
    >
      {children}
    </button>
  );
}
