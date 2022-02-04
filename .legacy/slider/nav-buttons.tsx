import { ButtonBack, ButtonNext } from "pure-react-carousel";
import * as Icons from "react-feather";
import { useStyletron } from "styletron-react";
import { border, borderRadius, margin, padding } from ".././utils/css";

export default function SliderNavButtons() {
  const [css] = useStyletron();
  return (
    <>
      <ButtonBack
        className={css({
          position: "absolute",
          bottom: 0,
          top: "auto",
          display: "flex",
          backgroundColor: "var(--light-gray)",
          ...border(),
          ...borderRadius("50%"),
          ...padding("1rem"),
          ...margin("1rem"),
        })}
      >
        <Icons.ChevronLeft />
      </ButtonBack>
      <ButtonNext
        className={css({
          position: "absolute",
          bottom: 0,
          top: "auto",
          right: 0,
          left: "auto",
          display: "flex",
          backgroundColor: "var(--light-gray)",
          ...border(),
          ...borderRadius("50%"),
          ...padding("1rem"),
          ...margin("1rem"),
        })}
      >
        <Icons.ChevronRight />
      </ButtonNext>
    </>
  );
}
