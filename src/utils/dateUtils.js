import { DAY_LABELS, MONTH_NAMES, DAYS_IN_WEEK } from "../constants";

export function getMondayOfWeek(weekOffset) {
  const now = new Date();
  const diffToMonday = (now.getDay() + 6) % 7;
  const monday = new Date(now);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(now.getDate() - diffToMonday + weekOffset * DAYS_IN_WEEK);
  return monday;
}

export function getWeekDays(weekOffset) {
  const monday = getMondayOfWeek(weekOffset);
  return Array.from({ length: DAYS_IN_WEEK }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

export function toDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function getTodayKey() {
  return toDateKey(new Date());
}

export function formatWeekLabel(days) {
  const first = days[0];
  const last  = days[DAYS_IN_WEEK - 1];
  const sameYear  = first.getFullYear() === last.getFullYear();
  const sameMonth = first.getMonth()    === last.getMonth();

  const fmt = (d, includeMonth, includeYear) =>
    [
      DAY_LABELS[(d.getDay() + 6) % 7],
      d.getDate(),
      includeMonth ? MONTH_NAMES[d.getMonth()] : null,
      includeYear  ? d.getFullYear()            : null,
    ]
      .filter(Boolean)
      .join(" ");

  if (sameMonth && sameYear) return `${fmt(first, true, false)} – ${fmt(last, false, true)}`;
  if (sameYear)              return `${fmt(first, true, false)} – ${fmt(last, true,  true)}`;
  return                            `${fmt(first, true, true)}  – ${fmt(last, true,  true)}`;
}

export function getDayMeta(date) {
  return {
    dayName:   DAY_LABELS[(date.getDay() + 6) % 7],
    dayNum:    date.getDate(),
    monthName: MONTH_NAMES[date.getMonth()],
  };
}