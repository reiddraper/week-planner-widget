import { addDays, eachDayOfInterval, endOfWeek, startOfWeek } from "date-fns";

export function datesFromThisWeek(date: Date): Date[] {
  // TODO: pass in option for start of week here
  return eachDayOfInterval({ start: startOfWeek(date), end: endOfWeek(date) });
}

export function nWeeksFromDate(date: Date, n: number): Date[][] {
  return [...Array(n).keys()].map((i) => {
    return datesFromThisWeek(addDays(date, i * 7));
  });
}
