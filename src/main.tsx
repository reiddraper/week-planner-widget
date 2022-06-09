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

enum Month {
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

function monthString(monthOfYear: Month): string {
  switch (monthOfYear) {
    case Month.JANUARY:
      return "January";
    case Month.FEBRUARY:
      return "February";
    case Month.MARCH:
      return "March";
    case Month.APRIL:
      return "April";
    case Month.MAY:
      return "May";
    case Month.JUNE:
      return "June";
    case Month.JULY:
      return "July";
    case Month.AUGUST:
      return "August";
    case Month.SEPTEMBER:
      return "September";
    case Month.OCTOBER:
      return "October";
    case Month.NOVEMBER:
      return "November";
    case Month.DECEMBER:
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
  month: Month;
  monthVisibility: MonthOnDayVisibility;
  dayNumber: number;
  monthColor: MonthColor;
};

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
        fill={monthColorHex(props.monthColor)}
        stroke="#B6B6B6"
        width={400}
        height={400}
      />
      <Text
        name="Day number"
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

function DayLabels() {
  return (
    <AutoLayout
      name="Day Labels"
      overflow="visible"
      horizontalAlignItems="center"
      verticalAlignItems="center"
      // align the day labels correctly
      padding={{
        top: 0,
        right: 0,
        bottom: 0,
        left: 100,
      }}
    >
      <DayLabel dayOfWeek="Monday" />
      <DayLabel dayOfWeek="Tuesday" />
      <DayLabel dayOfWeek="Wednesday" />
      <DayLabel dayOfWeek="Thursday" />
      <DayLabel dayOfWeek="Friday" />
      <DayLabel dayOfWeek="Saturday" />
      <DayLabel dayOfWeek="Sunday" />
    </AutoLayout>
  );
}

type WeekProps = {
  // used to highlight (or not) the current week
  weekNumber: number;
  weekLabel: MonthColor;
  days: DayProps[];
};

function Week(props: WeekProps): AutoLayout {
  return (
    <AutoLayout
      name="W1"
      y={100}
      strokeWidth={0}
      overflow="visible"
      width={2900}
      height={400}
    >
      {weekLabel(props.weekNumber, props.weekLabel)}
      {props.days.map((day) => Day(day))}
    </AutoLayout>
  );
}

type WeeklyCalendarProps = {
  weeks: WeekProps[];
};

function WeeklyCalendar(props: WeeklyCalendarProps) {
  console.log(`Days of week: ${datesFromThisWeek(new Date())}`);
  return (
    <AutoLayout
      name="Calendar"
      direction="vertical"
      horizontalAlignItems="center"
    >
      {DayLabels()}
      {props.weeks.map((week) => Week(week))}
    </AutoLayout>
  );
}

function Planner(): AutoLayout {
  return WeeklyCalendar({ weeks: [] });
}

widget.register(Planner);
