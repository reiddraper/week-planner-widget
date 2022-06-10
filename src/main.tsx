const { widget } = figma;
const {
  AutoLayout,
  Ellipse,
  Frame,
  Input,
  Image,
  Rectangle,
  SVG,
  Text,
  useSyncedState,
} = widget;

import { getWeek, isSameDay, isWeekend } from "date-fns";
import { nWeeksFromDate } from "./date";

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

const months: Month[] = [
  Month.JANUARY,
  Month.FEBRUARY,
  Month.MARCH,
  Month.APRIL,
  Month.MAY,
  Month.JUNE,
  Month.JULY,
  Month.AUGUST,
  Month.SEPTEMBER,
  Month.OCTOBER,
  Month.NOVEMBER,
  Month.DECEMBER,
];

function monthColor(month: Month): MonthColor {
  switch (month) {
    case Month.JANUARY:
      return MonthColor.LIGHT;
    case Month.FEBRUARY:
      return MonthColor.HIGHLIGHT;
    case Month.MARCH:
      return MonthColor.LIGHT;
    case Month.APRIL:
      return MonthColor.HIGHLIGHT;
    case Month.MAY:
      return MonthColor.LIGHT;
    case Month.JUNE:
      return MonthColor.HIGHLIGHT;
    case Month.JULY:
      return MonthColor.LIGHT;
    case Month.AUGUST:
      return MonthColor.HIGHLIGHT;
    case Month.SEPTEMBER:
      return MonthColor.LIGHT;
    case Month.OCTOBER:
      return MonthColor.HIGHLIGHT;
    case Month.NOVEMBER:
      return MonthColor.LIGHT;
    case Month.DECEMBER:
      return MonthColor.HIGHLIGHT;
  }
}

function monthFromNumber(index: number): Month {
  if (index > 11) {
    return Month.DECEMBER;
  } else if (index < 0) {
    return Month.JANUARY;
  } else {
    return months[index];
  }
}

function monthFromDate(date: Date): Month {
  return monthFromNumber(date.getMonth());
}

function monthName(monthOfYear: Month): string {
  switch (monthOfYear) {
    case Month.JANUARY:
      return "Jan";
    case Month.FEBRUARY:
      return "Feb";
    case Month.MARCH:
      return "Mar";
    case Month.APRIL:
      return "Apr";
    case Month.MAY:
      return "May";
    case Month.JUNE:
      return "Jun";
    case Month.JULY:
      return "Jul";
    case Month.AUGUST:
      return "Aug";
    case Month.SEPTEMBER:
      return "Sep";
    case Month.OCTOBER:
      return "Oct";
    case Month.NOVEMBER:
      return "Nov";
    case Month.DECEMBER:
      return "Dec";
  }
}

type DayLabelProps = {
  dayOfWeek: string;
} & Partial<FrameProps>;

function DayLabel(props: DayLabelProps): Frame {
  return (
    <Frame
      name="DayLabel100X400"
      overflow="visible"
      width={400}
      height={100}
      key={props.dayOfWeek}
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
  settings: PlannerSettings;
  date: Date;
  month: Month;
  monthVisibility: MonthOnDayVisibility;
  dayNumber: number;
  monthColor: MonthColor;
};

function TodayMarker(): Ellipse {
  return (
    <Ellipse
      name="Current"
      x={{
        type: "horizontal-scale",
        leftOffsetPercent: 71.5,
        rightOffsetPercent: 22.5,
      }}
      y={{
        type: "vertical-scale",
        topOffsetPercent: 12,
        bottomOffsetPercent: 82,
      }}
      fill="#F24822"
      width={24}
      height={24}
    />
  );
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
  const maybeTodayIndicator = isSameDay(props.date, props.settings.currentDay)
    ? TodayMarker()
    : null;
  const maybeMonthName =
    props.monthVisibility === MonthOnDayVisibility.VISIBLE
      ? MonthNameInDay(monthName(props.month))
      : null;
  return (
    <Frame
      name="Day400X400ColorWhiteStripeFalse"
      overflow="visible"
      width={400}
      height={400}
      key={props.date.toDateString()}
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
      {maybeTodayIndicator}
    </Frame>
  );
}

function SettingsMenuOpenIcon(settings: PlannerSettings) {
  const fill = settings.showSettings === "SHOW" ? "#E8E8E8" : "#fff";
  return (
    <Frame
      name="Settings"
      fill={fill}
      stroke="#B6B6B6"
      width={100}
      height={100}
      overflow="visible"
      onClick={() => {
        settings.setters.setShowSettings(
          settings.showSettings === "HIDE" ? "SHOW" : "HIDE"
        );
      }}
    >
      <SVG
        name="Icon"
        x={{
          type: "horizontal-scale",
          leftOffsetPercent: 33.084,
          rightOffsetPercent: 33.083,
        }}
        y={{
          type: "vertical-scale",
          topOffsetPercent: 28.25,
          bottomOffsetPercent: 28.25,
        }}
        height={100}
        width={100}
        overflow="visible"
        src='<svg width="38" height="48" viewBox="0 0 38 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.33398 45.75L9.33399 16.75M9.33399 16.75C13.3381 16.75 16.584 13.5041 16.584 9.5C16.584 5.49593 13.338 2.25 9.33398 2.25C5.32992 2.25 2.08398 5.49594 2.08398 9.5C2.08398 13.5041 5.32992 16.75 9.33399 16.75ZM28.6673 31.25L28.6673 2.25M28.6673 31.25C32.6714 31.25 35.9173 34.4959 35.9173 38.5C35.9173 42.5041 32.6714 45.75 28.6673 45.75C24.6633 45.75 21.4173 42.5041 21.4173 38.5C21.4173 34.4959 24.6633 31.25 28.6673 31.25Z" stroke="#7D7D7D" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        '
      />
    </Frame>
  );
}

function CheckIcon(checked: boolean): SVG {
  const strokeColor = checked ? "#7D7D7D" : "white";
  return (
    <SVG
      name="CheckIcon"
      height={18}
      width={27}
      src={`<svg width="31" height="24" viewBox="0 0 31 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28.6667 2.83301L10.3333 21.1663L2 12.833" stroke="${strokeColor}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            `}
    />
  );
}

type WeekViewSettingOptionsProps = {
  settings: PlannerSettings;
  settingText: string;
  settingOnClick: WeekView;
};

function WeekViewSettingOptions(props: WeekViewSettingOptionsProps): Frame {
  const selected = props.settings.weekView === props.settingOnClick;
  return (
    <AutoLayout
      name="MenuRow"
      overflow="visible"
      spacing={50}
      padding={{
        vertical: 0,
        horizontal: 44,
      }}
      width={800}
      height={80}
      verticalAlignItems="center"
      onClick={() => {
        props.settings.setters.setWeekView(props.settingOnClick);
      }}
    >
      {CheckIcon(selected)}
      <Text
        name={props.settingText}
        fill="#7D7D7D"
        verticalAlignText="center"
        lineHeight={60}
        fontFamily="Inter"
        fontSize={32}
        letterSpacing={0.32}
        fontWeight={selected ? 700 : 500}
      >
        {props.settingText}
      </Text>
    </AutoLayout>
  );
}

function SettingsMenuFloating(settings: PlannerSettings): Frame {
  return (
    <Frame
      name="SettingsMenu"
      effect={[
        {
          type: "drop-shadow",
          color: "#00000002",
          offset: {
            x: 0,
            y: 3.435,
          },
          blur: 2.748,
        },
        {
          type: "drop-shadow",
          color: "#00000003",
          offset: {
            x: 0,
            y: 8.687,
          },
          blur: 6.95,
        },
        {
          type: "drop-shadow",
          color: "#00000004",
          offset: {
            x: 0,
            y: 17.721,
          },
          blur: 14.177,
        },
        {
          type: "drop-shadow",
          color: "#00000005",
          offset: {
            x: 0,
            y: 36.502,
          },
          blur: 29.201,
        },
        {
          type: "drop-shadow",
          color: "#00000008",
          offset: {
            x: 0,
            y: 100,
          },
          blur: 80,
        },
      ]}
      fill="#FBFBFB"
      stroke="#0006"
      cornerRadius={6}
      width={800}
      height={900}
      positioning="absolute"
      x={-915}
      y={0}
    >
      <AutoLayout
        name="Menu"
        y={140}
        overflow="visible"
        direction="vertical"
        spacing={10}
      >
        <Frame name="Spacer" width={798} height={20} />
        <AutoLayout
          name="MenuRow"
          overflow="visible"
          spacing={50}
          padding={{
            vertical: 0,
            horizontal: 44,
          }}
          width={800}
          height={80}
          verticalAlignItems="center"
          onClick={() => {
            settings.setters.setCurrentDay(new Date());
          }}
        >
          <SVG
            name="RefreshIcon"
            height={30}
            width={32}
            src='<svg width="36" height="34" viewBox="0 0 36 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 13.6667C2 13.6667 5.34164 9.1137 8.05639 6.39707C10.7711 3.68045 14.5227 2 18.6667 2C26.9509 2 33.6667 8.71573 33.6667 17C33.6667 25.2843 26.9509 32 18.6667 32C11.8282 32 6.05852 27.4238 4.25294 21.1667M2 13.6667V3.66667M2 13.6667H12" stroke="#7D7D7D" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            '
          />
          <Text
            name="Refresh"
            fill="#7D7D7D"
            verticalAlignText="center"
            lineHeight={60}
            fontFamily="Inter"
            fontSize={32}
            letterSpacing={0.32}
            fontWeight={500}
          >
            Refresh
          </Text>
        </AutoLayout>
        <AutoLayout
          name="MenuRow"
          overflow="visible"
          spacing={50}
          padding={{
            vertical: 0,
            horizontal: 44,
          }}
          width={800}
          height={80}
          verticalAlignItems="center"
          onClick={() => {
            settings.setters.setInitialDay(new Date());
          }}
        >
          <SVG
            name="JumpIcon"
            height={32}
            width={33}
            src='<svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="1" d="M25.3333 19.4577C31.2197 20.6151 35.3333 23.2582 35.3333 26.3337C35.3333 30.4758 27.8714 33.8337 18.6667 33.8337C9.46192 33.8337 2 30.4758 2 26.3337C2 23.2582 6.11365 20.6151 12 19.4577M18.6667 25.5003V12.167M18.6667 12.167C21.4281 12.167 23.6667 9.92842 23.6667 7.16699C23.6667 4.40557 21.4281 2.16699 18.6667 2.16699C15.9052 2.16699 13.6667 4.40557 13.6667 7.16699C13.6667 9.92842 15.9052 12.167 18.6667 12.167Z" stroke="#7D7D7D" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            '
          />
          <Text
            name="Jump to today"
            fill="#7D7D7D"
            verticalAlignText="center"
            lineHeight={60}
            fontFamily="Inter"
            fontSize={32}
            letterSpacing={0.32}
            fontWeight={500}
          >
            Jump to today
          </Text>
        </AutoLayout>
        <Frame name="Spacer" width={798} height={30}>
          <SVG
            name="Divider"
            opacity={0.1}
            x={{
              type: "center",
              offset: 0,
            }}
            y={{
              type: "center",
              offset: 0,
            }}
            width={798}
            height={1}
            src="<svg width='798' viewBox='0 0 798 1' fill='none' xmlns='http://www.w3.org/2000/svg'>
<path opacity='1' d='M0 0H798' stroke='black' stroke-width='2'/>
</svg>
"
          />
        </Frame>
        {WeekViewSettingOptions({
          settings,
          settingText: "Full week, starts Sunday",
          settingOnClick: "SUNDAY_START",
        })}
        {WeekViewSettingOptions({
          settings,
          settingText: "Full week, starts Monday",
          settingOnClick: "MONDAY_START_WITH_WEEKENDS",
        })}
        {WeekViewSettingOptions({
          settings,
          settingText: "Weekdays only",
          settingOnClick: "MONDAY_START_WITHOUT_WEEKENDS",
        })}
        <Frame name="Spacer" width={798} height={20} />
      </AutoLayout>
      <SVG
        name="Divider"
        opacity={0.1}
        x={2}
        y={140}
        width={798}
        height={1}
        src="<svg width='798' viewBox='0 0 798 1' fill='none' xmlns='http://www.w3.org/2000/svg'>
<path opacity='1' d='M0 0H798' stroke='black' stroke-width='2'/>
</svg>
"
      />
      <AutoLayout
        name="SizeSelector"
        x={588}
        y={42}
        overflow="visible"
        spacing={50}
        verticalAlignItems="center"
      >
        <Rectangle
          name="Selected"
          x={-10}
          y={-10}
          positioning="absolute"
          stroke="#7D7D7D"
          cornerRadius={3}
          strokeWidth={3}
          width={80}
          height={80}
        />
        <Rectangle
          name="Square"
          fill="#FFF"
          stroke="#0003"
          cornerRadius={3}
          width={60}
          height={60}
        />
        <Rectangle
          name="Rectangular"
          fill="#FFF"
          stroke="#0003"
          cornerRadius={3}
          width={60}
          height={40}
        />
      </AutoLayout>
      <SVG
        name="Divider"
        opacity={0.1}
        x={538}
        height={140}
        width={1}
        src="<svg height='140' viewBox='0 0 1 140' fill='none' xmlns='http://www.w3.org/2000/svg'>
<path opacity='1' d='M0 140L-6.1196e-06 -2.08616e-06' stroke='black' stroke-width='2'/>
</svg>
"
      />
      <AutoLayout
        name="ColorSelector"
        x={36}
        y={46}
        overflow="visible"
        spacing={32}
        verticalAlignItems="center"
      >
        <Ellipse
          name="Selected"
          x={-10}
          y={-10}
          positioning="absolute"
          stroke="#7D7D7D"
          strokeWidth={3}
          width={70}
          height={70}
        />
        <Ellipse
          name="White"
          fill="#FFF"
          stroke="#0003"
          width={50}
          height={50}
        />
        <Ellipse name="Black" fill="#383838" width={50} height={50} />
        <Ellipse name="Yellow" fill="#FDBE00" width={50} height={50} />
        <Ellipse name="Green" fill="#009051" width={50} height={50} />
        <Ellipse name="Blue" fill="#008FEA" width={50} height={50} />
        <Ellipse name="Purple" fill="#923BF6" width={50} height={50} />
      </AutoLayout>
    </Frame>
  );
}

const sundayStart = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const mondayStartWithWeekends = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const mondayStartWithoutWeekends = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

function DayLabels(settings: PlannerSettings) {
  let days: Frame[] = [];
  switch (settings.weekView) {
    case "SUNDAY_START":
      days = sundayStart.map((day) => DayLabel({ dayOfWeek: day }));
      break;
    case "MONDAY_START_WITH_WEEKENDS":
      days = mondayStartWithWeekends.map((day) => DayLabel({ dayOfWeek: day }));
      break;
    case "MONDAY_START_WITHOUT_WEEKENDS":
      days = mondayStartWithoutWeekends.map((day) =>
        DayLabel({ dayOfWeek: day })
      );
      break;
  }
  return (
    <AutoLayout
      name="Day Labels"
      overflow="visible"
      horizontalAlignItems="center"
      verticalAlignItems="center"
    >
      {SettingsMenuOpenIcon(settings)}
      {days}
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
      key={props.weekNumber}
    >
      {weekLabel(props.weekNumber, props.weekLabel)}
      {props.days.map((day, index) => Day(day))}
    </AutoLayout>
  );
}

type WeeklyCalendarProps = {
  plannerSettings: PlannerSettings;
  weeks: WeekProps[];
};

function Title(settings: PlannerSettings) {
  return (
    <Input
      name="Title"
      positioning="absolute"
      fill="#000"
      lineHeight="150%"
      fontFamily="Inter"
      fontSize={140}
      letterSpacing={-5.632}
      fontWeight={700}
      x={0}
      y={-285}
      placeholder="12-week planner"
      value={settings.title}
      onTextEditEnd={(event) => {
        settings.setters.setTitle(event.characters);
      }}
      width={2900}
      horizontalAlignText="left"
    ></Input>
  );
}

function WeeklyCalendar(props: WeeklyCalendarProps) {
  let maybeFloatingSettings: Frame | null = null;
  if (props.plannerSettings.showSettings === "SHOW") {
    maybeFloatingSettings = SettingsMenuFloating(props.plannerSettings);
  }
  return (
    <AutoLayout
      name="Calendar"
      direction="vertical"
      horizontalAlignItems="center"
      overflow="visible"
    >
      {maybeFloatingSettings}
      {Title(props.plannerSettings)}
      {DayLabels(props.plannerSettings)}
      {props.weeks.map((week) => Week(week))}
    </AutoLayout>
  );
}

function dateToDayProps(date: Date, settings: PlannerSettings): DayProps {
  const month = monthFromDate(date);
  return {
    date,
    month,
    monthVisibility: MonthOnDayVisibility.HIDDEN,
    dayNumber: date.getDate(),
    monthColor: monthColor(monthFromDate(date)),
    settings,
  };
}

function datesToWeekProps(dates: Date[], settings: PlannerSettings): WeekProps {
  const dayProps = dates.map((date, index) => dateToDayProps(date, settings));
  // set this so we get the same week numbering as Google Calendar
  const firstWeekContainsDate = 7;
  let weekStartsOn: 0 | 1 = 0;
  if (settings.weekView === "SUNDAY_START") {
    weekStartsOn = 1;
  }
  const weekNumber = getWeek(dates[0], {
    firstWeekContainsDate,
    weekStartsOn,
  });
  const weekLabel = monthColor(monthFromDate(dates[0]));
  return { days: dayProps, weekNumber, weekLabel };
}

// Kind of hacky, would be more elegant if this
// was set during initial creation, but this is
// probably a little easier to do
function setMonthVisibility(weeks: WeekProps[]): void {
  let currentMonth = weeks[0].days[0].month;
  weeks[0].days[0].monthVisibility = MonthOnDayVisibility.VISIBLE;
  for (const week of weeks) {
    for (const day of week.days) {
      if (day.month !== currentMonth) {
        day.monthVisibility = MonthOnDayVisibility.VISIBLE;
        currentMonth = day.month;
      }
    }
  }
}

type PlannerSize = "SMALL" | "LARGE";

function plannerSizeFromString(size: string): PlannerSize {
  switch (size) {
    case "SMALL":
      return "SMALL";
    case "LARGE":
      return "LARGE";
    default:
      return "LARGE";
  }
}

type ShowSettings = "SHOW" | "HIDE";

function showSettingsFromString(show: string): ShowSettings {
  switch (show) {
    case "SHOW":
      return "SHOW";
    case "HIDE":
      return "HIDE";
    default:
      return "HIDE";
  }
}

type WeekView =
  | "SUNDAY_START"
  | "MONDAY_START_WITH_WEEKENDS"
  | "MONDAY_START_WITHOUT_WEEKENDS";

type PlannerSettings = {
  title: string;
  weekView: WeekView;
  size: PlannerSize;
  currentDay: Date;
  initialDay: Date;
  showSettings: ShowSettings;
  setters: SyncStateSetters;
};

type SyncStateSetters = {
  setTitle: (value: string) => void;
  setWeekView: (value: WeekView) => void;
  setSize: (value: PlannerSize) => void;
  setShowSettings: (value: ShowSettings) => void;
  setCurrentDay: (value: Date) => void;
  setInitialDay: (value: Date) => void;
};

function weekViewFromString(weekView: string): WeekView {
  switch (weekView) {
    case "SUNDAY_START":
      return "SUNDAY_START";
    case "MONDAY_START_WITH_WEEKENDS":
      return "MONDAY_START_WITH_WEEKENDS";
    case "MONDAY_START_WITHOUT_WEEKENDS":
      return "MONDAY_START_WITHOUT_WEEKENDS";
    default:
      return "SUNDAY_START";
  }
}

function settingsFromSyncedState(): PlannerSettings {
  const todayFn = () => new Date().toJSON();
  const [currentDayString, setCurrentDayFromString] = useSyncedState(
    "currentDay",
    todayFn
  );
  const currentDay = new Date(currentDayString);
  console.log(`Current day is ${currentDay}`);
  const setCurrentDay = (date: Date) => setCurrentDayFromString(date.toJSON());
  const [initialDayString, setInitialDayDayFromString] = useSyncedState(
    "initialDay",
    todayFn
  );
  const initialDay = new Date(initialDayString);
  console.log(`Initial day is ${initialDay}`);
  const setInitialDay = (date: Date) =>
    setInitialDayDayFromString(date.toJSON());

  const [title, setTitle] = useSyncedState("title", "");
  const [weekView, setWeekView] = useSyncedState("weekView", "SUNDAY_START");
  const [size, setSize] = useSyncedState("size", "LARGE");
  const [showSettings, setShowSettings] = useSyncedState(
    "showSettings",
    "HIDE"
  );
  const setters = {
    setTitle,
    setWeekView,
    setSize,
    setShowSettings,
    setCurrentDay,
    setInitialDay,
  };
  return {
    title,
    weekView: weekViewFromString(weekView),
    size: plannerSizeFromString(size),
    currentDay,
    initialDay,
    showSettings: showSettingsFromString(showSettings),
    setters,
  };
}

function Planner(): AutoLayout {
  const plannerSettings = settingsFromSyncedState();
  console.log(`Settings are: ${JSON.stringify(plannerSettings)}`);

  let weekStartsOn: 0 | 1 = 0;
  if (plannerSettings.weekView !== "SUNDAY_START") {
    weekStartsOn = 1;
  }

  let weeks = nWeeksFromDate(plannerSettings.currentDay, weekStartsOn, 12);

  // If only showing weekdays, filter out weekends
  if (plannerSettings.weekView === "MONDAY_START_WITHOUT_WEEKENDS") {
    weeks = weeks.map((week) => week.filter((day) => !isWeekend(day)));
  }

  const weekProps = weeks.map((week) =>
    datesToWeekProps(week, plannerSettings)
  );
  setMonthVisibility(weekProps);

  const [_showSettings, setShowSettings] = useSyncedState(
    "showSettings",
    "HIDE"
  );
  return WeeklyCalendar({ weeks: weekProps, plannerSettings });
}

widget.register(Planner);
