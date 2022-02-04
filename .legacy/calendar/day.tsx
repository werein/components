import { useDay } from "@datepicker-react/hooks";
import { StatefulPopover } from "baseui/popover";
import { addDays, isAfter, isBefore, isSameDay } from "date-fns";
import { useContext, useEffect, useRef, useState } from "react";
import { X } from "react-feather";
import { useTranslation } from "react-i18next";
import { StyleObject, useStyletron } from "styletron-react";
import { border, borderRadius, margin, padding } from ".././utils/css";
import { useLanguage } from "../utils/language";
import CalendarContext from "./provider";

export function boxShadow(color: string) {
  return `1px 0 0 0 ${color}, 
  0 1px 0 0 ${color}, 
  1px 1px 0 0 ${color},
  1px 0 0 0 ${color} inset, 
  0 1px 0 0 ${color} inset`;
}

interface DayProps {
  dayLabel: string;
  date: Date;
  styles: any;
}

export default function CalendarDay({ dayLabel, date, styles }: DayProps) {
  const [double, setDouble] = useState(false);
  const [css] = useStyletron();
  const [t] = useTranslation();
  const { dateFormat } = useLanguage();
  const dayRef = useRef<HTMLButtonElement | null>(null);
  const {
    startDate,
    endDate,
    focusedDate,
    isDateFocused,
    isDateSelected,
    isDateHovered,
    isDateBlocked,
    isFirstOrLastSelectedDate,
    onDateFocus,
    onDateSelect,
    onDateHover,
    overrides,
    onResetDates,
    dayRenderer,
    minBookingDays,
    isDateUnselectable,
  } = useContext(CalendarContext);
  const {
    isSelected,
    isSelectedStartOrEnd,
    isWithinHoverRange,
    disabledDate,
    onClick,
    onKeyDown,
    onMouseEnter,
    tabIndex,
  } = useDay({
    date,
    focusedDate,
    isDateFocused,
    isDateSelected,
    isDateHovered,
    isDateBlocked,
    isFirstOrLastSelectedDate,
    onDateFocus,
    onDateSelect,
    onDateHover,
    dayRef,
  });

  const dayIsSame = startDate && isSameDay(startDate, date);

  const isHistory = isBefore(date, new Date());
  const cantHover = (disabledDate || isDateUnselectable(date)) && !dayIsSame;
  const notSelectableDate = isDateUnselectable(date);

  const onButtonClick = (ev: any) => {
    if (!double) {
      setDouble(true);
      setTimeout(() => setDouble(false), 1000);
      if ((disabledDate || isDateUnselectable(date)) && dayIsSame && !endDate) {
        onResetDates();
      } else {
        onClick();
      }
    }
  };

  useEffect(() => {
    const onTouchStart = () => {
      if (dayRef.current) {
        dayRef.current.addEventListener("touchend", onButtonClick, {
          once: true,
        });
      }
    };

    const onTouchMove = () => {
      if (dayRef.current) {
        dayRef.current.removeEventListener("touchend", onButtonClick);
      }
    };

    if (dayRef && dayRef.current) {
      dayRef.current.addEventListener("touchstart", onTouchStart);
      dayRef.current.addEventListener("touchmove", onTouchMove);
    }

    return () => {
      if (dayRef.current) {
        dayRef.current.removeEventListener("touchstart", onTouchStart);
        dayRef.current.removeEventListener("touchmove", onTouchMove);
        dayRef.current.removeEventListener("touchend", onButtonClick);
      }
    };
  }, [dayRef, onButtonClick]);

  if (!dayLabel) {
    return <div />;
  }

  const isMinReturnDay =
    startDate && isSameDay(addDays(startDate, minBookingDays - 1), date)
      ? true
      : false;

  const colors = (function (): StyleObject {
    const notSelectableStyle: StyleObject = notSelectableDate
      ? {
          borderBottom: "none",
          fontWeight: "normal",
          ":hover": {
            backgroundColor: "var(--red)",
            fontWeight: "normal",
          },
        }
      : {};

    if (dayIsSame && !endDate && (disabledDate || isDateUnselectable(date))) {
      return {
        color: "var(--white)",
        backgroundColor: "var(--red)",
        fontWeight: "bold",
        borderBottom: "none",
        ":hover": {
          backgroundColor: "var(--red)",
          fontWeight: "normal",
        },
      };
    }

    if (isSelectedStartOrEnd)
      return {
        color: "var(--white)",
        backgroundColor: "var(--dark-blue)",
        fontWeight: "bold",
      };

    if (startDate && isSameDay(addDays(startDate, minBookingDays - 1), date))
      return {
        ...notSelectableStyle,
        fontWeight: "bold",
        color: "var(--dark-blue)",
        backgroundColor: "var(--gray)",
      };

    if (
      isSelected ||
      isWithinHoverRange ||
      (startDate && isSameDay(addDays(startDate, minBookingDays - 1), date))
    )
      return {
        ...notSelectableStyle,
        fontWeight: "bold",
        color: "var(--font-dark-gray)",
        backgroundColor: "var(--light-gray)",
      };

    if (startDate && minBookingDays > 2) {
      if (
        isAfter(date, startDate) &&
        isBefore(date, addDays(startDate, minBookingDays - 1))
      ) {
        return {
          ...notSelectableStyle,
          fontWeight: "normal",
          color: "var(--font-dark-gray)",
          backgroundColor: "var(--light-gray)",
          ":hover": {
            backgroundColor: "var(--red)",
          },
        };
      }
    }

    if (disabledDate) {
      return {
        ...notSelectableStyle,
        cursor: "not-allowed",
        textDecorationLine: "line-through",
        textDecorationColor: "var(--font-light-gray)",
        borderBottom: "none",
        fontWeight: "normal",
        color: "var(--font-light-gray)",
        ":hover": {
          backgroundColor: "var(--red)",
          fontWeight: "normal",
        },
      };
    }

    if (notSelectableDate) {
      return notSelectableStyle;
    }

    return {
      ":hover": {
        backgroundColor: "inherit",
        color: "inherit",
        ...border({
          style: "solid",
          width: "1px",
          color: "var(--border-color)",
        }),
        borderTop: "none",
      },
    };
  })();

  const cantBook =
    disabledDate && !startDate ? t("calendar.day.cant-book") : null;
  const cantReturn =
    disabledDate && startDate ? t("calendar.day.cant-return") : null;
  const minDays =
    startDate &&
    minBookingDays > 0 &&
    isAfter(date, startDate) &&
    isBefore(date, addDays(startDate, minBookingDays - 1))
      ? t("calendar.day.cant-min-days", {
          date: dateFormat(addDays(startDate, minBookingDays - 1)),
        })
      : null;

  if (cantHover && !isHistory) {
    return (
      <StatefulPopover
        showArrow
        content={
          cantHover &&
          !dayIsSame && (
            <div
              className={css({
                ...padding("1rem"),
                fontWeight: 600,
              })}
            >
              {cantBook}
              {!minDays && cantReturn}
              {minDays}
            </div>
          )
        }
      >
        <button
          onMouseDown={onButtonClick}
          onKeyDown={onKeyDown}
          onMouseEnter={onMouseEnter}
          tabIndex={tabIndex}
          type="button"
          ref={dayRef}
          className={css({
            ...styles,
            ...margin("0"),
            position: "relative",
            ...borderRadius("0"),
            ...padding("0"),
            // touchAction: "none",
            cursor: "pointer",
            outline: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
            fontSize: "1.1rem",
            ...border(),
            color: "var(--black)",
            borderBottom: "solid 1px var(--border-color)",
            backgroundColor: "var(--white)",
            ":hover": {
              backgroundColor: "var(--dark-blue)",
              color: "var(--white)",
            },
            ...colors,
            ...(overrides?.Day?.style({
              defaults: colors,
              date,
              isWithinHoverRange,
              isSelected,
              isSelectedStartOrEnd,
              isDisabled: disabledDate,
            }) || {}),
          })}
        >
          {dayIsSame && !endDate ? (
            <X />
          ) : dayRenderer ? (
            dayRenderer({ date })
          ) : (
            dayLabel
          )}
          {isMinReturnDay && (
            <div
              className={css({
                fontSize: "0.5rem",
                position: "absolute",
                top: "5px",
              })}
            >
              (min)
            </div>
          )}
        </button>
      </StatefulPopover>
    );
  }

  return (
    <button
      onMouseDown={onButtonClick}
      onKeyDown={onKeyDown}
      onMouseEnter={onMouseEnter}
      tabIndex={tabIndex}
      type="button"
      ref={dayRef}
      className={css({
        ...styles,
        position: "relative",
        ...borderRadius("0"),
        ...padding("0"),
        ...margin("0"),
        // touchAction: "none",
        cursor: "pointer",
        outline: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "bold",
        fontSize: "1.1rem",
        ...border(),
        color: "var(--black)",
        borderBottom: "solid 1px var(--border-color)",
        backgroundColor: "var(--white)",
        ":hover": {
          backgroundColor: "var(--dark-blue)",
          color: "var(--white)",
        },
        ...colors,
        ...(overrides?.Day?.style({
          defaults: colors,
          date,
          isWithinHoverRange,
          isSelected,
          isSelectedStartOrEnd,
          isDisabled: disabledDate,
        }) || {}),
      })}
    >
      {dayIsSame && !endDate && (disabledDate || isDateUnselectable(date)) ? (
        <X />
      ) : dayRenderer ? (
        dayRenderer({ date })
      ) : (
        dayLabel
      )}
      {isMinReturnDay && (
        <div
          className={css({
            fontSize: "0.5rem",
            position: "absolute",
            top: "5px",
          })}
        >
          (min)
        </div>
      )}
    </button>
  );
}
