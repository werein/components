import { FirstDayOfWeek, useMonth } from "@datepicker-react/hooks";
import { format } from "date-fns";
import * as locale from "date-fns/esm/locale";
import React, { useContext } from "react";
import * as Icon from "react-feather";
import { useStyletron } from "styletron-react";
import { useLanguage } from "../utils/language";
import Day from "./day";
import CalendarNavButton from "./nav-button";
import CalendarContext from "./provider";

const LOCALE = "cs";

interface MonthProps {
  year: number;
  month: number;
  firstDayOfWeek: FirstDayOfWeek;
  showLeftArrow?: boolean;
  showRightArrow?: boolean;
}

export default function CalendarMonth({
  year,
  month,
  firstDayOfWeek,
  showLeftArrow,
  showRightArrow,
}: MonthProps) {
  const [css] = useStyletron();
  const { lang } = useLanguage();
  const { goToNextMonths, goToPreviousMonths } = useContext(CalendarContext);
  const { days, weekdayLabels, monthLabel } = useMonth({
    year,
    month,
    firstDayOfWeek,
    weekdayLabelFormat: (date: Date) =>
      format(date, "cccccc", { locale: locale[lang as "cs"] }),
    monthLabelFormat: (date: Date) =>
      format(date, "LLLL yyyy", { locale: locale[lang as "cs"] }),
  });

  return (
    <div>
      <div
        className={css({
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "rgba(0, 0, 0, 0.02)",
          borderRadius: "1.5rem",
        })}
      >
        <div>
          {showLeftArrow && (
            <CalendarNavButton onClick={goToPreviousMonths}>
              <Icon.ChevronLeft />
            </CalendarNavButton>
          )}
        </div>
        <div
          className={css({
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          })}
        >
          {monthLabel}
        </div>
        <div>
          {showRightArrow && (
            <CalendarNavButton onClick={goToNextMonths}>
              <Icon.ChevronRight />
            </CalendarNavButton>
          )}
        </div>
      </div>
      <div
        className={css({
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          justifyContent: "center",
          marginTop: "2rem",
          marginBottom: "1rem",
        })}
      >
        {weekdayLabels.map((dayLabel) => (
          <div className={css({ textAlign: "center" })} key={dayLabel}>
            {dayLabel}
          </div>
        ))}
      </div>
      <div
        className={css({
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gridAutoRows: "1fr",
          justifyContent: "center",
          "::before": {
            content: "''",
            width: 0,
            paddingBottom: "100%",
            gridRow: "1 / 1",
            gridColumn: "1 / 1",
          },
        })}
      >
        {days.map((day, index) => {
          // "> *:first-child"
          const styles =
            index === 0
              ? {
                  gridRow: "1 / 1",
                  gridColumn: "1 / 1",
                }
              : {};

          if (typeof day === "object") {
            return (
              <Day
                styles={styles}
                date={day.date}
                key={day.date.toString()}
                dayLabel={day.dayLabel}
              />
            );
          }

          return <div className={css({ ...styles })} key={index} />;
        })}
      </div>
    </div>
  );
}
