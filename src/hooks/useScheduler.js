import { useState, useMemo, useCallback } from "react";
import { getWeekDays, formatWeekLabel, getTodayKey } from "../utils/dateUtils";
import { createShift, sortShiftsChronologically } from "../utils/shiftUtils";

export function useScheduler() {
  const [weekOffset, setWeekOffset] = useState(0);
  const [shifts, setShifts]         = useState({});

  const weekDays      = useMemo(() => getWeekDays(weekOffset), [weekOffset]);
  const weekLabel     = useMemo(() => formatWeekLabel(weekDays), [weekDays]);
  const todayKey      = useMemo(() => getTodayKey(), []);
  const isCurrentWeek = weekOffset === 0;

  const goToPrevWeek    = useCallback(() => setWeekOffset((o) => o - 1), []);
  const goToNextWeek    = useCallback(() => setWeekOffset((o) => o + 1), []);
  const goToCurrentWeek = useCallback(() => setWeekOffset(0), []);

  const addShift = useCallback((dateKey, startTime, endTime) => {
    const newShift = createShift(startTime, endTime);
    setShifts((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] ?? []), newShift],
    }));
  }, []);

  const getShiftsForDay = useCallback(
    (dateKey) => sortShiftsChronologically(shifts[dateKey] ?? []),
    [shifts]
  );

  return {
    weekDays,
    weekLabel,
    todayKey,
    isCurrentWeek,
    shifts,
    goToPrevWeek,
    goToNextWeek,
    goToCurrentWeek,
    addShift,
    getShiftsForDay,
  };
}