const { widget } = figma;
const { AutoLayout, Ellipse, Frame, Image, Rectangle, SVG, Text } = widget;

import { datesFromThisWeek } from "./date";

enum MonthColor {
  LIGHT = "LIGHT",
  HIGHLIGHT = "HIGHLIGHT",
}

type WeekLabelProps = {
  number: number;
  fillColor: string;
};

function monthColorHex(monthColor: MonthColor): string {
  switch (monthColor) {
    case MonthColor.LIGHT:
      return "#fff";
    case MonthColor.HIGHLIGHT:
      return "#F5F5F5";
  }
}

function weekLabel(number: number, color: MonthColor): Frame {
  return WeekLabel({ number, fillColor: monthColorHex(color) });
}

function WeekLabel(props: WeekLabelProps) {
  return (
    <Frame
      name="WeekLabel"
      overflow="visible"
      width={100}
      height={400}
      {...props}
    >
      <Rectangle
        name="Rectangle 4"
        x={{
          type: "horizontal-scale",
          leftOffsetPercent: 0,
          rightOffsetPercent: 0,
        }}
        y={{
          type: "vertical-scale",
          topOffsetPercent: 0,
          bottomOffsetPercent: 0,
        }}
        fill={props.fillColor}
        stroke="#B6B6B6"
        width={100}
        height={400}
      />
      <Text
        name={`W${props.number}`}
        x={{
          type: "horizontal-scale",
          leftOffsetPercent: 0,
          rightOffsetPercent: 0,
        }}
        y={{
          type: "vertical-scale",
          topOffsetPercent: 7.25,
          bottomOffsetPercent: 85.25,
        }}
        fill="#7D7D7D"
        width={100}
        horizontalAlignText="center"
        lineHeight="150%"
        fontFamily="Inter"
        fontSize={20}
        letterSpacing={-0.44}
        fontWeight={700}
      >
        W{props.number}
      </Text>
    </Frame>
  );
}

enum DaysOfWeek {
  SUNDAY = "SUNDAY",
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
}

function dayOfWeekString(dayOfWeek: DaysOfWeek): string {
  switch (dayOfWeek) {
    case DaysOfWeek.SUNDAY:
      return "Sunday";
    case DaysOfWeek.MONDAY:
      return "Monday";
    case DaysOfWeek.TUESDAY:
      return "Tuesday";
    case DaysOfWeek.WEDNESDAY:
      return "Wednesday";
    case DaysOfWeek.THURSDAY:
      return "Thursday";
    case DaysOfWeek.FRIDAY:
      return "Friday";
    case DaysOfWeek.SATURDAY:
      return "Saturday";
  }
}

enum Months {
  JANUARY = "JANUARY",
  FEBRUARY = "FEBRUARY",
  MARCH = "MARCH",
  APRIL = "APRIL",
  MAY = "MAY",
  JUNE = "JUNE",
  JULY = "JULY",
  AUGUST = "AUGUST",
  SEPTEMBER = "SEPTEMBER",
  OCTOBER = "OCTOBER",
  NOVEMBER = "NOVEMBER",
  DECEMBER = "DECEMBER",
}

function monthString(monthOfYear: Months): string {
  switch (monthOfYear) {
    case Months.JANUARY:
      return "January";
    case Months.FEBRUARY:
      return "February";
    case Months.MARCH:
      return "March";
    case Months.APRIL:
      return "April";
    case Months.MAY:
      return "May";
    case Months.JUNE:
      return "June";
    case Months.JULY:
      return "July";
    case Months.AUGUST:
      return "August";
    case Months.SEPTEMBER:
      return "September";
    case Months.OCTOBER:
      return "October";
    case Months.NOVEMBER:
      return "November";
    case Months.DECEMBER:
      return "December";
  }
}

type DayLabelProps = {
  dayOfWeek: string;
} & Partial<FrameProps>;

function DayLabel(props: DayLabelProps) {
  return (
    <Frame
      name="DayLabel100X400"
      overflow="visible"
      width={400}
      height={100}
      {...props}
    >
      <Rectangle
        name="Rectangle 4"
        x={{
          type: "horizontal-scale",
          leftOffsetPercent: 0,
          rightOffsetPercent: 0,
        }}
        y={{
          type: "vertical-scale",
          topOffsetPercent: 0,
          bottomOffsetPercent: 0,
        }}
        fill="#FFF"
        stroke="#B6B6B6"
        width={400}
        height={100}
      />
      <Text
        name={props.dayOfWeek}
        x={{
          type: "horizontal-scale",
          leftOffsetPercent: 0,
          rightOffsetPercent: 0,
        }}
        y={{
          type: "vertical-scale",
          topOffsetPercent: 0,
          bottomOffsetPercent: 0,
        }}
        fill="#7D7D7D"
        width={400}
        height={100}
        verticalAlignText="center"
        horizontalAlignText="center"
        lineHeight="150%"
        fontFamily="Inter"
        fontSize={32}
        letterSpacing={2.176}
        fontWeight={700}
        textCase="upper"
      >
        {props.dayOfWeek}
      </Text>
    </Frame>
  );
}

enum MonthOnDayVisibility {
  HIDDEN = "HIDDEN",
  VISIBLE = "VISIBLE",
}

type DayProps = {
  month: string;
  monthVisibility: MonthOnDayVisibility;
  dayNumber: number;
  fillColor: string;
} & Partial<FrameProps>;

function day(
  month: Months,
  dayNumber: number,
  monthColor: MonthColor,
  monthVisibility: MonthOnDayVisibility,
  x: number
): Frame {
  return Day({
    month: monthString(month),
    dayNumber,
    fillColor: monthColorHex(monthColor),
    monthVisibility,
    x,
  });
}

function MonthNameInDay(month: string) {
  return (
    <Text
      name="Month"
      x={{
        type: "horizontal-scale",
        leftOffsetPercent: 9.25,
        rightOffsetPercent: 52,
      }}
      y={{
        type: "vertical-scale",
        topOffsetPercent: 5.75,
        bottomOffsetPercent: 75.5,
      }}
      fill="#7D7D7D"
      lineHeight="150%"
      fontFamily="Inter"
      fontSize={50}
      letterSpacing={-1.1}
      fontWeight={700}
    >
      {month}
    </Text>
  );
}

function Day(props: DayProps) {
  const maybeMonthName =
    props.monthVisibility === MonthOnDayVisibility.VISIBLE
      ? MonthNameInDay(props.month)
      : null;
  return (
    <Frame
      name="Day400X400ColorWhiteStripeFalse"
      overflow="visible"
      width={400}
      height={400}
      {...props}
    >
      <Rectangle
        name="Rectangle 1"
        x={{
          type: "horizontal-scale",
          leftOffsetPercent: 0,
          rightOffsetPercent: 0,
        }}
        y={{
          type: "vertical-scale",
          topOffsetPercent: 0,
          bottomOffsetPercent: 0,
        }}
        fill={props.fillColor}
        stroke="#B6B6B6"
        width={400}
        height={400}
      />
      <Text
        name="1"
        x={{
          type: "horizontal-scale",
          leftOffsetPercent: 67.5,
          rightOffsetPercent: 7.5,
        }}
        y={{
          type: "vertical-scale",
          topOffsetPercent: 7.5,
          bottomOffsetPercent: 67.5,
        }}
        fill="#7D7D7D"
        width={100}
        height={100}
        horizontalAlignText="right"
        lineHeight="150%"
        fontFamily="Inter"
        fontSize={40}
        letterSpacing={-0.88}
        fontWeight={700}
      >
        {props.dayNumber}
      </Text>
      {maybeMonthName}
    </Frame>
  );
}

function WeeklyCalendar() {
  console.log(`Days of week: ${datesFromThisWeek(new Date())}`);
  return (
    <Frame name="_12Weeks400X400" width={2900} height={3300}>
      <Frame
        name="W1"
        y={100}
        strokeWidth={0}
        overflow="visible"
        width={2900}
        height={400}
      >
        {day(
          Months.JUNE,
          5,
          MonthColor.HIGHLIGHT,
          MonthOnDayVisibility.VISIBLE,
          100
        )}
        {[
          [6, 500],
          [7, 900],
          [8, 1300],
          [9, 1700],
          [10, 2100],
          [11, 2500],
        ].map(([dayNumber, x]) =>
          day(
            Months.JUNE,
            dayNumber,
            MonthColor.HIGHLIGHT,
            MonthOnDayVisibility.HIDDEN,
            x
          )
        )}
        {weekLabel(1, MonthColor.HIGHLIGHT)}
      </Frame>
      <DayLabel dayOfWeek="Monday" x={100} />
      <DayLabel dayOfWeek="Tuesday" x={500} />
      <DayLabel dayOfWeek="Wednesday" x={900} />
      <DayLabel dayOfWeek="Thursday" x={1300} />
      <DayLabel dayOfWeek="Friday" x={1700} />
      <DayLabel dayOfWeek="Saturday" x={2100} />
      <DayLabel dayOfWeek="Sunday" x={2500} />
      <Frame
        name="W2"
        y={500}
        strokeWidth={0}
        overflow="visible"
        width={2900}
        height={400}
      >
        {[
          [12, 100],
          [13, 500],
          [14, 900],
          [15, 1300],
          [16, 1700],
          [17, 2100],
          [18, 2500],
        ].map(([dayNumber, x]) =>
          day(
            Months.JUNE,
            dayNumber,
            MonthColor.HIGHLIGHT,
            MonthOnDayVisibility.HIDDEN,
            x
          )
        )}
        {weekLabel(2, MonthColor.HIGHLIGHT)}
      </Frame>
      <Frame
        name="W3"
        y={900}
        strokeWidth={0}
        overflow="visible"
        width={2900}
        height={400}
      >
        {[
          [19, 100],
          [20, 500],
          [21, 900],
          [22, 1300],
          [23, 1700],
          [24, 2100],
          [25, 2500],
        ].map(([dayNumber, x]) =>
          day(
            Months.JUNE,
            dayNumber,
            MonthColor.HIGHLIGHT,
            MonthOnDayVisibility.HIDDEN,
            x
          )
        )}
        {weekLabel(3, MonthColor.HIGHLIGHT)}
      </Frame>
      <Frame
        name="W4"
        y={1300}
        strokeWidth={0}
        overflow="visible"
        width={2900}
        height={400}
      >
        {[
          [26, 100],
          [27, 500],
          [28, 900],
          [29, 1300],
          [30, 1700],
        ].map(([dayNumber, x]) =>
          day(
            Months.JUNE,
            dayNumber,
            MonthColor.HIGHLIGHT,
            MonthOnDayVisibility.HIDDEN,
            x
          )
        )}
        {day(
          Months.JULY,
          1,
          MonthColor.LIGHT,
          MonthOnDayVisibility.VISIBLE,
          2100
        )}
        {day(
          Months.JULY,
          2,
          MonthColor.LIGHT,
          MonthOnDayVisibility.HIDDEN,
          2500
        )}
        {weekLabel(4, MonthColor.HIGHLIGHT)}
      </Frame>
      <Frame
        name="W5"
        y={1700}
        strokeWidth={0}
        overflow="visible"
        width={2900}
        height={400}
      >
        {[
          [3, 100],
          [4, 500],
          [5, 900],
          [6, 1300],
          [7, 1700],
          [8, 2100],
          [9, 2500],
        ].map(([dayNumber, x]) =>
          day(
            Months.JULY,
            dayNumber,
            MonthColor.LIGHT,
            MonthOnDayVisibility.HIDDEN,
            x
          )
        )}
        {weekLabel(5, MonthColor.LIGHT)}
      </Frame>
      <Frame
        name="W6"
        y={2100}
        strokeWidth={0}
        overflow="visible"
        width={2900}
        height={400}
      >
        {[
          [10, 100],
          [11, 500],
          [12, 900],
          [13, 1300],
          [14, 1700],
          [15, 2100],
          [16, 2500],
        ].map(([dayNumber, x]) =>
          day(
            Months.JULY,
            dayNumber,
            MonthColor.LIGHT,
            MonthOnDayVisibility.HIDDEN,
            x
          )
        )}
        {weekLabel(6, MonthColor.LIGHT)}
      </Frame>
      <Frame
        name="W7"
        y={2500}
        strokeWidth={0}
        overflow="visible"
        width={2900}
        height={400}
      >
        {[
          [17, 100],
          [18, 500],
          [19, 900],
          [20, 1300],
          [21, 1700],
          [22, 2100],
          [23, 2500],
        ].map(([dayNumber, x]) =>
          day(
            Months.JULY,
            dayNumber,
            MonthColor.LIGHT,
            MonthOnDayVisibility.HIDDEN,
            x
          )
        )}
        {weekLabel(7, MonthColor.LIGHT)}
      </Frame>
      <Frame
        name="W8"
        y={2900}
        strokeWidth={0}
        overflow="visible"
        width={2900}
        height={400}
      >
        {[
          [24, 100],
          [25, 500],
          [26, 900],
          [27, 1300],
          [28, 1700],
          [29, 2100],
          [30, 2500],
        ].map(([dayNumber, x]) =>
          day(
            Months.JULY,
            dayNumber,
            MonthColor.LIGHT,
            MonthOnDayVisibility.HIDDEN,
            x
          )
        )}
        {weekLabel(8, MonthColor.LIGHT)}
      </Frame>
    </Frame>
  );
}

widget.register(WeeklyCalendar);
