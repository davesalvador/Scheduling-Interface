export function timeToMinutes(time) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function formatTime(time) {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour   = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${period}`;
}

export function detectOverlap(existingShifts, newStart, newEnd) {
  const s = timeToMinutes(newStart);
  const e = timeToMinutes(newEnd);
  return existingShifts.some(({ startTime, endTime }) => {
    const es = timeToMinutes(startTime);
    const ee = timeToMinutes(endTime);
    return s < ee && e > es;
  });
}

export function validateShift(startTime, endTime, existingShifts) {
  if (!startTime || !endTime)
    return "Both start and end times are required.";
  if (timeToMinutes(endTime) <= timeToMinutes(startTime))
    return "End time must be after start time.";
  if (detectOverlap(existingShifts, startTime, endTime))
    return "This shift overlaps an existing shift on this day.";
  return null;
}

export function sortShiftsChronologically(shifts) {
  return [...shifts].sort(
    (a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime)
  );
}

export function createShift(startTime, endTime) {
  return {
    id: crypto.randomUUID(),
    startTime,
    endTime,
  };
}