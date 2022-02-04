import {
  END_DATE,
  FocusedInput,
  OnDatesChangeProps,
  START_DATE,
  useDatepicker,
} from "@datepicker-react/hooks";
import { endOfMonth, startOfMonth } from "date-fns/esm";
import React, { ReactNode, useEffect, useState } from "react";
import { StyleObject, useStyletron } from "styletron-react";
import CalendarMonth from "./month";
import CalendarContext, { DayOverrides } from "./provider";

interface Interval {
  start?: Date;
  end?: Date;
}

export interface CalendarProps {
  date: Interval;
  onChange?: (
    { start, end }: Interval,
    focusedInput?: typeof START_DATE | typeof END_DATE | null
  ) => void;
  onVisibleMonthsRangeChange?: ({ start, end }: Interval) => void;
  unavailableDates?: Date[];
  minBookingDays?: number;
  overrides?: {
    Day?: {
      style: (params: DayOverrides) => StyleObject;
    };
  };
  isDateBlocked?: (day: Date) => boolean;
  isDateUnselectable?: (day: Date) => boolean;
  numberOfMonths?: number;
  dayRenderer?: (params: { date: Date }) => ReactNode;
  initialVisibleMonth?: Date;
}

export default function Calendar(props: CalendarProps) {
  const [focus, setFocus] = useState<FocusedInput>(START_DATE);
  const [css] = useStyletron();

  function handleDateChange(params: OnDatesChangeProps) {
    setFocus(params.focusedInput || START_DATE);
    const end = focus === START_DATE ? undefined : params.endDate;

    props.onChange &&
      props.onChange(
        {
          start: params.startDate || undefined,
          end: end || undefined,
        },
        params.focusedInput
      );
  }

  const startDate = props.date.start || null;
  const endDate = props.date.end || null;
  const minBookingDays = props.minBookingDays || 1;

  const {
    firstDayOfWeek,
    activeMonths,
    isDateSelected,
    isDateHovered,
    isFirstOrLastSelectedDate,
    isDateFocused,
    isDateBlocked,
    focusedDate,
    onDateHover,
    onDateSelect,
    onDateFocus,
    goToPreviousMonths,
    goToNextMonths,
    onResetDates,
  } = useDatepicker({
    initialVisibleMonth: props.initialVisibleMonth,
    isDateBlocked: props.isDateBlocked,
    startDate,
    endDate,
    focusedInput: focus,
    onDatesChange: handleDateChange,
    numberOfMonths: props.numberOfMonths || 1,
    unavailableDates: props.unavailableDates,
    minBookingDays,
    firstDayOfWeek: 1,
    minBookingDate: new Date(),
  });

  const { onVisibleMonthsRangeChange } = props;
  useEffect(() => {
    if (onVisibleMonthsRangeChange) {
      const nrOfMonths = activeMonths.length;
      onVisibleMonthsRangeChange({
        start: startOfMonth(activeMonths[0].date),
        end: endOfMonth(activeMonths[nrOfMonths - 1].date),
      });
    }
  }, [activeMonths]);

  const isDateUnselectable = props.isDateUnselectable
    ? props.isDateUnselectable
    : () => false;

  return (
    <CalendarContext.Provider
      value={{
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
        onResetDates,
        overrides: props.overrides,
        dayRenderer: props.dayRenderer,
        goToPreviousMonths,
        goToNextMonths,
        minBookingDays,
        isDateUnselectable,
      }}
    >
      <div
        className={css({
          display: "grid",
          gridTemplateColumns: `repeat(${activeMonths.length}, 1fr)`,
          gridGap: "0 2rem",
          paddingRight: "1px",
        })}
      >
        {activeMonths.map((month, i) => (
          <CalendarMonth
            key={`${month.year}-${month.month}`}
            year={month.year}
            month={month.month}
            firstDayOfWeek={firstDayOfWeek}
            showLeftArrow={i === 0}
            showRightArrow={activeMonths.length - 1 === i}
          />
        ))}
      </div>
    </CalendarContext.Provider>
  );
}
