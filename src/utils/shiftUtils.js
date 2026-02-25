/** "HH:MM" → integer minutes since midnight (canonical comparison unit) */
export function timeToMinutes(time) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

/** "HH:MM" → "H:MM AM/PM" */
export function formatTime(time) {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${period}`;
}

/**
 * Half-open interval overlap:  s < ee && e > es
 * Back-to-back shifts (shared endpoint) are allowed.
 */
export function detectOverlap(existingShifts, newStart, newEnd) {
  const s = timeToMinutes(newStart);
  const e = timeToMinutes(newEnd);
  return existingShifts.some(({ startTime, endTime }) => {
    const es = timeToMinutes(startTime);
    const ee = timeToMinutes(endTime);
    return s < ee && e > es;
  });
}

/**
 * Single source of validation truth.
 * Returns an error string or null.
 * Used by AddShiftForm (UI) and could be reused by any API layer.
 */
export function validateShift(startTime, endTime, existingShifts) {
  if (!startTime || !endTime) return "Both start and end times are required.";
  if (timeToMinutes(endTime) <= timeToMinutes(startTime))
    return "End time must be after start time.";
  if (detectOverlap(existingShifts, startTime, endTime))
    return "This shift overlaps an existing shift on this day.";
  return null;
}

/** Immutable sort — never mutates the original array */
export function sortShiftsChronologically(shifts) {
  return [...shifts].sort(
    (a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime),
  );
}

/**
 * Factory keeps the Shift shape consistent everywhere.
 * Add fields here (e.g. label, color) and all callers stay in sync.
 */
export function createShift(startTime, endTime) {
  return {
    id: crypto.randomUUID(),
    startTime,
    endTime,
  };
}
