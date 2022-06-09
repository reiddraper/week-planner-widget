import { eachDayOfInterval, endOfWeek, startOfWeek } from "date-fns";

export function datesFromThisWeek(date: Date): Date[] {
  return eachDayOfInterval({ start: startOfWeek(date), end: endOfWeek(date) });
}
