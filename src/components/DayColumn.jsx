import { useState, useMemo } from "react";
import ShiftCard from "./ShiftCard";
import AddShiftForm from "./AddShiftForm";
import { toDateKey, getDayMeta } from "../utils/dateUtils";
import { sortShiftsChronologically } from "../utils/shiftUtils";
import { colors } from "../styles/tokens";

/**
 * @param {{
 *   date:          Date,
 *   shifts:        Record<string, Shift[]>,
 *   onAddShift:    (dateKey, start, end) => void,
 *   isToday:       boolean,
 *   onToastError:  (msg: string) => void,
 * }} props
 */
export default function DayColumn({
  date,
  shifts,
  onAddShift,
  isToday,
  onToastError,
}) {
  const [formOpen, setFormOpen] = useState(false);

  const dateKey = toDateKey(date);
  const { dayName, dayNum, monthName } = getDayMeta(date);

  const sortedShifts = useMemo(
    () => sortShiftsChronologically(shifts[dateKey] ?? []),
    [shifts, dateKey],
  );

  return (
    <div
      style={{
        flex: "1 1 120px",
        minWidth: 110,
        background: colors.surface,
        border: `1px solid ${isToday ? colors.accent : colors.border}`,
        borderRadius: 8,
        padding: "12px 10px 10px",
        display: "flex",
        flexDirection: "column",
        transition: "border-color 0.15s",
      }}
    >
      {/* ── Day Header ──────────────────────────────────────── */}
      <div
        style={{ textAlign: "center", marginBottom: 12, userSelect: "none" }}
      >
        {/* Day name */}
        <div
          style={{
            fontSize: 10,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: isToday ? colors.accent : colors.textMuted,
            marginBottom: 4,
          }}
        >
          {dayName}
        </div>

        {/* Date circle */}
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: isToday ? colors.accent : "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
          }}
        >
          <span
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: isToday ? colors.accentText : colors.textPrimary,
            }}
          >
            {dayNum}
          </span>
        </div>

        {/* Month */}
        <div style={{ fontSize: 10, color: colors.textSubtle, marginTop: 3 }}>
          {monthName}
        </div>
      </div>

      {/* ── Divider ─────────────────────────────────────────── */}
      <div style={{ height: 1, background: colors.border, marginBottom: 10 }} />

      {/* ── Shift List ──────────────────────────────────────── */}
      <div style={{ flex: 1 }}>
        {sortedShifts.length === 0 && !formOpen && (
          <p
            style={{
              fontSize: 11,
              color: colors.textSubtle,
              textAlign: "center",
              marginTop: 10,
              userSelect: "none",
            }}
          >
            No shifts
          </p>
        )}
        {sortedShifts.map((shift) => (
          <ShiftCard key={shift.id} shift={shift} />
        ))}
      </div>

      {/* ── Add Shift Toggle / Form ──────────────────────────── */}
      {formOpen ? (
        <AddShiftForm
          dateKey={dateKey}
          existingShifts={sortedShifts}
          onAdd={onAddShift}
          onCancel={() => setFormOpen(false)}
          onToastError={onToastError}
        />
      ) : (
        <button
          onClick={() => setFormOpen(true)}
          aria-label={`Add shift — ${dayName} ${dayNum} ${monthName}`}
          className="add-shift-btn"
        >
          + Add shift
        </button>
      )}
    </div>
  );
}
