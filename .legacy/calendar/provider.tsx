import React, { ReactNode } from "react";
import { StyleObject } from "styletron-react";

export interface DayOverrides {
  defaults: StyleObject;
  date: Date;
  isWithinHoverRange: boolean;
  isSelected: boolean;
  isSelectedStartOrEnd: boolean;
  isDisabled: boolean;
}

export const datepickerContextDefaultValue = {
  focusedDate: null,
  isDateFocused: () => false,
  isDateSelected: () => false,
  isDateHovered: () => false,
  isDateBlocked: () => false,
  isFirstOrLastSelectedDate: () => false,
  onDateFocus: () => {},
  onDateSelect: () => {},
  onDateHover: () => {},
  onResetDates: () => {},
  goToPreviousMonths: () => {},
  goToNextMonths: () => {},
  isDateUnselectable: () => false,
  startDate: null,
  endDate: null,
  minBookingDays: 0,
};

type Context = {
  focusedDate: Date | null;
  isDateFocused(date: Date): boolean;
  isDateSelected(date: Date): boolean;
  isDateHovered(date: Date): boolean;
  isDateBlocked(date: Date): boolean;
  isFirstOrLastSelectedDate(date: Date): boolean;
  onDateFocus(date: Date): void;
  onDateSelect(date: Date): void;
  onDateHover(date: Date): void;
  goToPreviousMonths: () => void;
  goToNextMonths: () => void;
  onResetDates(): void;
  dayRenderer?: (params: { date: Date }) => ReactNode;
  isDateUnselectable(date: Date): boolean;
  minBookingDays: number;
  startDate?: Date | null;
  endDate?: Date | null;
  overrides?: {
    Day?: {
      style: (params: DayOverrides) => StyleObject;
    };
  };
};

const CalendarContext = React.createContext<Context>(
  datepickerContextDefaultValue
);

export default CalendarContext;
