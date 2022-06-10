import { addDays, eachDayOfInterval, endOfWeek, startOfWeek } from "date-fns";

function datesFromThisWeek(date: Date, weekStartsOn: 0 | 1): Date[] {
  console.log(`Week starts on: ${weekStartsOn}`);
  return eachDayOfInterval({
    start: startOfWeek(date, { weekStartsOn }),
    end: endOfWeek(date, { weekStartsOn }),
  });
}

export function nWeeksFromDate(
  date: Date,
  weekStartsOn: 0 | 1,
  n: number
): Date[][] {
  return [...Array(n).keys()].map((i) => {
    return datesFromThisWeek(addDays(date, i * 7), weekStartsOn);
  });
}
