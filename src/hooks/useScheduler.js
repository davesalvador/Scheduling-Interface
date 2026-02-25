import { useState, useMemo, useCallback } from "react";
import { getWeekDays, formatWeekLabel, getTodayKey } from "../utils/dateUtils";
import { createShift, sortShiftsChronologically } from "../utils/shiftUtils";

/**
 * State shape
 * ──────────
 * weekOffset : number
 *   Integer offset from the current real-world week.
 *   0 = this week | -1 = last | +1 = next
 *
 * shifts : Record<"YYYY-MM-DD", Shift[]>
 *   Shift = { id: string, startTime: "HH:MM", endTime: "HH:MM" }
 *
 *   Keyed by ISO date string so:
 *   ① Navigating weeks requires zero data migration
 *   ② O(1) lookup per day
 *   ③ Trivially serialisable to localStorage / REST
 */
export function useScheduler() {
  const [weekOffset, setWeekOffset] = useState(0);
  const [shifts, setShifts] = useState({});

  // ── Derived (memoised) ────────────────────────────────────
  const weekDays = useMemo(() => getWeekDays(weekOffset), [weekOffset]);
  const weekLabel = useMemo(() => formatWeekLabel(weekDays), [weekDays]);
  const todayKey = useMemo(() => getTodayKey(), []); // stable for session
  const isCurrentWeek = weekOffset === 0;

  // ── Navigation actions ────────────────────────────────────
  const goToPrevWeek = useCallback(() => setWeekOffset((o) => o - 1), []);
  const goToNextWeek = useCallback(() => setWeekOffset((o) => o + 1), []);
  const goToCurrentWeek = useCallback(() => setWeekOffset(0), []);

  // ── Shift actions ─────────────────────────────────────────
  /**
   * Appends a validated shift. Callers (AddShiftForm) validate first.
   * @param {string} dateKey
   * @param {string} startTime - "HH:MM"
   * @param {string} endTime   - "HH:MM"
   */
  const addShift = useCallback((dateKey, startTime, endTime) => {
    const newShift = createShift(startTime, endTime);
    setShifts((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] ?? []), newShift],
    }));
  }, []);

  /** Returns shifts for a day sorted chronologically */
  const getShiftsForDay = useCallback(
    (dateKey) => sortShiftsChronologically(shifts[dateKey] ?? []),
    [shifts],
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
